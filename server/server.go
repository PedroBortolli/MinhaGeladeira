package main

// Inicializar ambiente
// export GOOGLE_APPLICATION_CREDENTIALS="../secrets/auth.json"
// em outra janela, executar:
// http POST localhost:8088/scan < image64.txt

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image/jpeg"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"

	vision "cloud.google.com/go/vision/apiv1"
	proto "google.golang.org/genproto/googleapis/cloud/vision/v1"
)

type Response struct {
	Products []string
}

func main() {

	http.HandleFunc("/scan", scan)
	http.ListenAndServe(":8088", nil)

}

func scan(w http.ResponseWriter, r *http.Request) {

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		err = fmt.Errorf("Failed to read request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	coI := strings.Index(string(data), ",")
	rawImage := string(data)[coI+1:]

	unbased, err := base64.StdEncoding.DecodeString(string(rawImage))
	if err != nil {
		err = fmt.Errorf("Failed to decode base64 string: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res := bytes.NewReader(unbased)

	// TODO: Store the image

	jpgI, err := jpeg.Decode(res)
	if err != nil {
		err = fmt.Errorf("Failed to decode jpg file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	file, err := os.OpenFile("temp.jpg", os.O_RDWR|os.O_CREATE, 0777)
	if err != nil {
		err = fmt.Errorf("Failed to open temp.jpg file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer func() {
		err := os.Remove("temp.jpg")
		if err != nil {
			err = fmt.Errorf("Failed to remove temp.jpg file: %v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}()

	err = jpeg.Encode(file, jpgI, &jpeg.Options{Quality: 75})
	if err != nil {
		err = fmt.Errorf("Failed to encode jpg file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	file.Close()

	temp, err := os.Open("temp.jpg")
	if err != nil {
		err = fmt.Errorf("Failed to read temp.jpg file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer temp.Close()

	text, err := getTextFromImage(temp)
	if err != nil {
		err = fmt.Errorf("Failed to get text from image: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := Response{}
	response.Products = parseTextIntoProducts(text[0].Description)

	responseJson, err := json.Marshal(response)
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJson)
}

func getTextFromImage(file *os.File) ([]*proto.EntityAnnotation, error) {
	ctx := context.Background()

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		err = fmt.Errorf("Failed to create client: %v", err)
		return nil, err
	}
	defer client.Close()

	image, err := vision.NewImageFromReader(file)
	if err != nil {
		err = fmt.Errorf("Failed to create image: %v", err)
		return nil, err
	}

	text, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		err = fmt.Errorf("Failed to detect text: %v", err)
		return nil, err
	}

	return text, nil
}

func parseTextIntoProducts(text string) []string {

	lines := strings.Split(text, "\n")
	products := make([]string, 0)

	for _, line := range lines {
		words := strings.Split(line, " ")
		if len(words[0]) == 3 {
			_, err := strconv.Atoi(words[0])
			if err == nil {
				products = append(products, strings.Join(words[2:], " "))
			}
		}
	}

	return products
}

package main

// Inicializar ambiente
// export GOOGLE_APPLICATION_CREDENTIALS="../secrets/auth.json"
// em outra janela, executar:
// http POST localhost:8088/scan < image64.txt

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/PedroBortolli/MinhaGeladeira/server/encoding"
	"github.com/PedroBortolli/MinhaGeladeira/server/vision"
)

type Response struct {
	Products []string
}

func main() {

	addr := determineListenAddress()
	http.HandleFunc("/scan", scan)

	log.Printf("Listening on %s...\n", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		panic(err)
	}
}

func determineListenAddress() string {
	port := os.Getenv("PORT")
	if port == "" {
		return ":8088"
	}

	return ":" + port
}

func scan(w http.ResponseWriter, r *http.Request) {

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		err = fmt.Errorf("Failed to read request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = encoding.DecodeImageFromBytes(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
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

	temp, err := os.Open("temp.jpg")
	if err != nil {
		err = fmt.Errorf("Failed to read temp.jpg file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer temp.Close()

	text, err := vision.GetTextFromImage(temp)
	if err != nil {
		err = fmt.Errorf("Failed to get text from image: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := Response{}
	response.Products = parseTextIntoProducts(text[0].Description)

	responseJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJson)
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

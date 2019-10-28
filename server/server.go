package main

// Inicializar ambiente
// export GOOGLE_APPLICATION_CREDENTIALS="../secrets/auth.json"
// em outra janela, executar:
// curl localhost:8088/scan 

import (
	"context"
	"io"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	vision "cloud.google.com/go/vision/apiv1"
	proto "google.golang.org/genproto/googleapis/cloud/vision/v1"
)

func main() {

	http.HandleFunc("/scan", scan)
	http.ListenAndServe(":8088", nil)

}

func scan(w http.ResponseWriter, req *http.Request) {

		// Sets the name of the image file to process.
		filename := "../teste2.jpg"

		file, err := os.Open(filename)
		if err != nil {
			log.Fatalf("Failed to read file: %v", err)
		}
		defer file.Close()
	
		text, err := getTextFromImage(file)
		if err != nil {
			log.Fatalf("Failed to get text from image: %v", err)
		}
	
		//	log.Printf("Extracted text %q from image (%d chars).", text, len(text))
		out, err := os.Create("output.txt")
		out.WriteString(text[0].Description)
	
		parsedText := parseText(text[0].Description)

	fmt.Fprintf(w, parsedText)
}

func getTextFromImage(file io.Reader) ([]*proto.EntityAnnotation, error) {
	ctx := context.Background()

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	image, err := vision.NewImageFromReader(file)
	if err != nil {
		log.Fatalf("Failed to create image: %v", err)
	}

	text, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		log.Fatalf("Failed to detect text: %v", err)
	}

	return text, nil
}

func parseText(text string) string {

	lines := strings.Split(text, "\n")
	// //	fmt.Printf("%q\n", strings.Split(text, "\n"))
	// log.Printf("%q\n", lines)
	return fmt.Sprintf("%q\n", lines)
}

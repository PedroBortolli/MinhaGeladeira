package main

// Inicializar ambiente
// export GOOGLE_APPLICATION_CREDENTIALS="...googlekey.json"

import (
	"context"
	"log"
	"os"
	"strings"

	vision "cloud.google.com/go/vision/apiv1"
)

func main() {
	ctx := context.Background()

	// Creates a client.
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Sets the name of the image file to process.
	filename := "../testfiles/ricardo1.jpg"

	file, err := os.Open(filename)
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}
	defer file.Close()
	image, err := vision.NewImageFromReader(file)
	if err != nil {
		log.Fatalf("Failed to create image: %v", err)
	}

	text, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		log.Fatalf("Failed to detect text: %v", err)
	}

	//	log.Printf("Extracted text %q from image (%d chars).", text, len(text))
	out, err := os.Create("output.txt")
	out.WriteString(text[0].Description)

	parseText(text[0].Description)

}

func parseText(text string) error {

	lines := strings.Split(text, "\n")
	//	fmt.Printf("%q\n", strings.Split(text, "\n"))
	log.Printf("%q\n", lines)
	return nil
}

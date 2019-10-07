package main

// Inicializar ambiente
// export GOOGLE_APPLICATION_CREDENTIALS="...googlekey.json"

import (
	"context"
	"log"
	"os"

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

	// Sets the name of the image file to annotate.
	filename := "../testfiles/teste1.jpg"

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

	log.Printf("Extracted text %q from image (%d chars).", text, len(text))

}

/*
import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"cloud.google.com/go/pubsub"
	"golang.org/x/text/language"
	visionpb "google.golang.org/genproto/googleapis/cloud/vision/v1"
)

// detectText detects the text in an image using the Google Vision API.
func detectText(ctx context.Context, bucketName) error {
	filename := "../testfiles/teste1.jpg"
	log.Printf("Looking for text in image %v", fileName)
	maxResults := 1
	image := &visionpb.Image{
		Source: &visionpb.ImageSource{
			GcsImageUri: fmt.Sprintf("gs://%s/%s", bucketName, fileName),
		},
	}
	annotations, err := visionClient.DetectTexts(ctx, image, &visionpb.ImageContext{}, maxResults)
	if err != nil {
		return fmt.Errorf("DetectTexts: %v", err)
	}
	text := ""
	if len(annotations) > 0 {
		text = annotations[0].Description
	}
	if len(annotations) == 0 || len(text) == 0 {
		log.Printf("No text detected in image %q. Returning early.", fileName)
		return nil
	}
	log.Printf("Extracted text %q from image (%d chars).", text, len(text))

	return nil
}
*/

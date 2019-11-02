package vision

import (
	"context"
	"fmt"
	"os"

	vision "cloud.google.com/go/vision/apiv1"
	proto "google.golang.org/genproto/googleapis/cloud/vision/v1"
)

func GetTextFromImage(file *os.File) ([]*proto.EntityAnnotation, error) {
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

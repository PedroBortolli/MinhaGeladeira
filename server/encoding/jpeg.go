package encoding

import(
	"bytes"
	"encoding/base64"
	"fmt"
	"image/jpeg"
	"os"
	"strings"
)

func DecodeImageFromBytes(data []byte) error {

	coI := strings.Index(string(data), ",")
	rawImage := string(data)[coI+1:]

	unbased, err := base64.StdEncoding.DecodeString(string(rawImage))
	if err != nil {
		err = fmt.Errorf("Failed to decode base64 string: %v", err)
		return err
	}

	res := bytes.NewReader(unbased)

	jpgI, err := jpeg.Decode(res)
	if err != nil {
		err = fmt.Errorf("Failed to decode jpg file: %v", err)
		return err
	}

	file, err := os.OpenFile("temp.jpg", os.O_RDWR|os.O_CREATE, 0777)
	if err != nil {
		err = fmt.Errorf("Failed to open temp.jpg file: %v", err)
		return err
	}

	err = jpeg.Encode(file, jpgI, &jpeg.Options{Quality: 75})
	if err != nil {
		err = fmt.Errorf("Failed to encode jpg file: %v", err)
		return err
	}

	file.Close()

	return nil
}
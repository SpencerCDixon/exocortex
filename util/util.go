package util

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/pkg/errors"
)

// EnsureMDPath takes in a path and returns it with a proper .md extension
func EnsureMDPath(path string) string {
	return ensureExtension(".md")(path)
}

// Exists returns a bool of wether or not a path exists
func Exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

// EnsureDirExists takes a file path and ensures that all directories along that
// path are created
func EnsureDirExists(path string) error {
	dir := filepath.Dir(path)
	ok, err := Exists(dir)
	if err != nil {
		return err
	}
	if ok {
		return nil
	}
	if err := os.MkdirAll(dir, 0600); err != nil {
		return err
	}
	return nil
}

// ReadFileJSON reads json from the given path.
func ReadFileJSON(path string, v interface{}) error {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return errors.Wrap(err, "reading")
	}

	if err := json.Unmarshal(b, &v); err != nil {
		return errors.Wrap(err, "unmarshaling")
	}

	return nil
}

func ensureExtension(ext string) func(string) string {
	return func(path string) string {
		e := filepath.Ext(path)
		if e == ext {
			return path
		} else {
			return path + ext
		}
	}
}

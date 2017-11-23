package util

import (
	"os"
	"path/filepath"
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

func ensureExtension(ext string) func(string) string {
	return func(path string) string {
		ext := filepath.Ext(path)
		if ext == ext {
			return path
		} else {
			return path + ext
		}
	}
}

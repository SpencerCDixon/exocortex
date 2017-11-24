package util

import "testing"

func TestEnsureMD(t *testing.T) {
	path := "without"
	with := EnsureMDPath(path)
	expected := "without.md"

	if with != expected {
		t.Errorf("Expected: %s, Got: %s", expected, with)
	}
}

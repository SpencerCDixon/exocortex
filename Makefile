deps:
	go get -u github.com/gobuffalo/packr/...

build:
	packr
	go build
	packr clean

.TARGET: build

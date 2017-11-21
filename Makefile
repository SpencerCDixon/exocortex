deps:
	@echo Ensuring dependencies are up to date
	@which dep || go get -u github.com/golang/dep/cmd/dep
	@which packr || go get -u github.com/gobuffalo/packr/...
	@dep ensure

build: deps
	packr
	go build
	packr clean

.TARGET: build deps

QUIET := &>/dev/null

# Ensures we have all required dependencies
deps:
	@echo Ensuring dependencies are up to date
	@which dep $(QUIET) || go get -u github.com/golang/dep/cmd/dep
	@which packr $(QUIET) || go get -u github.com/gobuffalo/packr/...
	@dep ensure

# Builds the go binary
build: deps
	packr build

# Installs binary as 'exo' which is what it gets distributed as
install: deps
	@echo Building UI
	@cd ui && yarn run build
	packr build -o $(GOPATH)/bin/exo
	@echo 'exo' successfully installed
	@echo
	@exo

# Tests the packages
test: 
	@go test ./...

.PHONY: build deps install test

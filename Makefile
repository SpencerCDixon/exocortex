QUIET := &>/dev/null

# Ensures we have all required dependencies
deps:
	@echo "--> Ensuring dependencies are up to date"
	@which dep $(QUIET) || go get -u github.com/golang/dep/cmd/dep
	@which packr $(QUIET) || go get -u github.com/gobuffalo/packr/...
	@which goreleaser $(QUIET) || go get github.com/goreleaser/goreleaser
	@dep ensure
	@echo "--> Dependencies up to date"

# Builds the go binary
build: deps
	packr build

# Installs binary as 'exo' which is what it gets distributed as
install: deps
	@echo "--> Building UI"
	@cd ui && yarn run build
	packr build -o $(GOPATH)/bin/exodev
	@echo "--> Exo successfully installed"
	@echo
	@exodev

# Bootstraps a contributing setup to make getting involved in project easier
bootstrap: install
	@echo "--> Creating new example wiki for you"
	@mkdir ../example-wiki && cd ../example-wiki && exo init && git init && git init && git add -A && git commit -m "First Commit"
	@echo "--> Starting up the wiki"
	@cd ../example-wiki && exo start . & 
	@open http://localhost:1234

# Releases new version of exo to GitHub and Homebrew
release:
	@echo "--> Releasing"
	@goreleaser -p 1 --rm-dist -config .goreleaser.yml 
	@echo "--> Complete"

pre-release:
	@echo "--> Building UI"
	@cd ui && yarn run build
	@echo "--> Building packr"
	@packr 

post-release:
	@echo "--> Cleaning packr"
	@packr clean

# Tests the packages
test: 
	@echo "--> Testing the backend"
	@go test ./...
	@echo "--> Testing the frontend"
	@cd ./ui && yarn run test

.PHONY: build deps install test bootstrap release

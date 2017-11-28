package wiki

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/apex/log"
	"github.com/gorilla/mux"
	"github.com/spencercdixon/exocortex/exo"
	"github.com/spencercdixon/exocortex/util"
	"gopkg.in/h2non/filetype.v1"
)

func (wiki *wiki) handleList(w http.ResponseWriter, r *http.Request) {
	results, err := wiki.store.LS()
	if err != nil {
		log.WithError(err).Debug("listing store")
		http.Error(w, "Unable to list", http.StatusInternalServerError)
		return
	}

	// remove the .md extensions since it's implied in our wiki
	for i, r := range results {
		results[i] = strings.Replace(r, ".md", "", -1)
	}

	res := &exo.ListResponse{Prefixes: results}
	wiki.renderJSON(w, http.StatusOK, res)
}

func (wiki *wiki) handleView(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	body, err := wiki.store.View(vars["page"])
	res := &exo.PageResponse{}

	if err != nil {
		res.Body = ""
		wiki.renderJSON(w, http.StatusNotFound, res)
		return
	}

	res.Body = body
	wiki.renderJSON(w, http.StatusOK, res)
	return
}

func (wiki *wiki) handleWrite(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	req := &exo.WritePageRequest{}
	if err := wiki.parseRequest(r, req); err != nil {
		log.Error(err.Error())
		return
	}
	page := &exo.Page{
		Prefix: vars["page"],
		Body:   req.Body,
	}

	err := wiki.store.WritePage(page)
	if err != nil {
		log.Error(err.Error())
		return
	}

	res := &exo.PageResponse{Body: page.Body}

	wiki.renderJSON(w, http.StatusCreated, res)
}

func (wiki *wiki) handleSearch(w http.ResponseWriter, r *http.Request) {
	req := &exo.SearchRequest{}
	if err := wiki.parseRequest(r, req); err != nil {
		log.Error(err.Error())
		return
	}
	results, err := wiki.store.Grep(req.Query)
	if err != nil {
		log.Error(err.Error())
		return
	}
	res := &exo.SearchResponse{Results: results}
	wiki.renderJSON(w, http.StatusOK, res)
}

func (wiki *wiki) handleImages(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	imagePath := filepath.Join(wiki.store.Repo, vars["location"])
	log.Debug(imagePath)

	imgBuf, err := ioutil.ReadFile(imagePath)
	if err != nil {
		log.Error(err.Error())
		http.Error(w, "Error opening image", http.StatusNotFound)
		return
	}

	kind, err := filetype.Match(imgBuf[:261])
	if err != nil {
		log.Error(err.Error())
		http.Error(w, "unknown file type", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", kind.MIME.Value)
	io.Copy(w, bytes.NewReader(imgBuf))
	return
}

func (wiki *wiki) handleGetSettings(w http.ResponseWriter, r *http.Request) {
	settings := &exo.WikiSettings{}
	util.ReadFileJSON(wiki.SettingsPath(), settings)
	wiki.renderJSON(w, http.StatusOK, settings)
}

func (wiki *wiki) handleUpdateSettings(w http.ResponseWriter, r *http.Request) {
	// Parse current settings and request
	settings := &exo.WikiSettings{}
	util.ReadFileJSON(wiki.SettingsPath(), settings)
	req := &exo.SettingsUpdateRequest{}
	wiki.parseRequest(r, req)

	// Update any fields that can be updated
	if req.Title != "" {
		settings.Title = req.Title
	}

	// Save new settings
	if err := wiki.WriteSettings(settings); err != nil {
		http.Error(w, "error marshalling settings", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (wiki *wiki) handleDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pageToDelete := vars["page"]
	if pageToDelete == "" {
		http.Error(w, "Nothing to delete", http.StatusOK)
		return
	}
	path := util.EnsureMDPath(pageToDelete)
	log.Debugf("Deleting page: %s", pageToDelete)
	msg := wiki.store.ExoMessage(path, "Deleted")
	err := wiki.store.Remove(path, msg)
	if err != nil {
		log.Errorf("Erorr deleting page: %s", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(200)
}

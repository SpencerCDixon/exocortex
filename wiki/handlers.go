package wiki

import (
	"net/http"
	"strings"

	"github.com/apex/log"
	"github.com/gorilla/mux"
	"github.com/spencercdixon/exocortex/exo"
)

func (wiki *wiki) handleList(w http.ResponseWriter, r *http.Request) {
	results, err := wiki.store.LS()
	if err != nil {
		log.Debug(err.Error())
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
	log.Debug(err.Error())
	if err != nil {
		res := &exo.PageResponse{Body: ""}
		wiki.renderJSON(w, http.StatusNotFound, res)
		return
	}
	res := &exo.PageResponse{Body: body}
	wiki.renderJSON(w, http.StatusOK, res)
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

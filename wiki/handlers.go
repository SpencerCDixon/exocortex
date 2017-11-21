package wiki

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/apex/log"
	"github.com/gorilla/mux"
	"github.com/spencercdixon/exocortex/exo"
)

func (wiki *wiki) handleList(w http.ResponseWriter, r *http.Request) {
	str, err := wiki.store.LS()
	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	results := strings.Split(str, "\n")

	res := &exo.ListResponse{Prefixes: results}
	wiki.renderJSON(w, http.StatusOK, res)
}

func (wiki *wiki) handleView(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	body, err := wiki.store.View(vars["page"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
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
		log.Fatal(err.Error())
		return
	}

	res := &exo.PageResponse{Body: page.Body}

	wiki.renderJSON(w, http.StatusCreated, res)
}

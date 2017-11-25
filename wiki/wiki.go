package wiki

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/apex/log"
	"github.com/gorilla/mux"
	"github.com/spf13/viper"

	"github.com/spencercdixon/exocortex/git"
)

type wiki struct {
	router *mux.Router
	store  *git.Store
}

// New creates a new wiki handler and ensures that our git store is set up
// properly and ready to be queried against.
func New() http.Handler {
	store := &git.Store{
		Repo:   viper.GetString("repository"),
		Branch: viper.GetString("branch"),
		Remote: viper.GetString("remote"),
	}

	if err := store.EnsureValidEnvironment(); err != nil {
		log.Fatal(err.Error())
	}

	// TODO: add better checks for missing remote/branch
	if len(store.Remote) > 0 {
		log.Debug("Starting syncing process")
		go store.Sync(viper.GetInt("syncInterval"))
	}

	router := mux.NewRouter()
	return &wiki{router: router, store: store}
}

// ServeHTTP complies to the http Handler interface
func (wiki *wiki) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	wiki.router.HandleFunc("/images/{location:.*}", wiki.handleImages).Methods("GET")
	wiki.router.HandleFunc("/wiki/{page:.*}", wiki.handleView).Methods("GET")
	wiki.router.HandleFunc("/wiki/{page:.*}", wiki.handleWrite).Methods("POST")
	wiki.router.HandleFunc("/search", wiki.handleSearch).Methods("POST")
	wiki.router.HandleFunc("/", wiki.handleList)
	wiki.router.ServeHTTP(w, r)
}

//---------
// Utility
//---------
func (_ *wiki) parseRequest(r *http.Request, data interface{}) error {
	const maxRequestLen = 16 * 1024 * 1024
	lr := io.LimitReader(r.Body, maxRequestLen)
	return json.NewDecoder(lr).Decode(data)
}

func (_ *wiki) renderJSON(w http.ResponseWriter, status int, data interface{}) {
	jsonData, err := json.Marshal(data)

	if err != nil {
		log.Debugf("Error marshalling JSON: %s", err.Error())
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(jsonData)
}

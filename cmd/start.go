// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"fmt"
	"net/http"

	"github.com/apex/httplog"
	"github.com/apex/log"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/spencercdixon/exocortex/wiki"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func init() {
	RootCmd.AddCommand(startCmd)
}

// startCmd boots up the wiki server
var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Boot up the wiki for a specific repository",
	Run: func(cmd *cobra.Command, args []string) {
		router := mux.NewRouter()

		// Mount wiki under '/api'
		wiki := wiki.New()
		router.PathPrefix("/api").Handler(
			http.StripPrefix("/api", wiki),
		)

		// Add some utility handlers
		var handler http.Handler
		handler = httplog.New(router)
		handler = handlers.CompressHandler(handler)
		handler = handlers.RecoveryHandler()(handler)

		// Boot up wiki
		address := fmt.Sprintf(
			"%s:%d",
			viper.GetString("server.host"),
			viper.GetInt("server.port"),
		)
		log.Infof("Booting up wiki on: %s", address)
		http.ListenAndServe(address, handler)
	},
}

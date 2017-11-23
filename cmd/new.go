// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"github.com/apex/log"
	"github.com/spf13/cobra"
)

func init() {
	RootCmd.AddCommand(newCmd)
}

// newCmd lets users quickly bootstrap a new wiki
var newCmd = &cobra.Command{
	Use:   "new",
	Short: "Creates a new exocortex wiki",
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) < 1 {
			log.Fatal("Requires an arg for wiki name")
		}

		wikiDir := args[0]

		log.Infof("Creating your new wiki: %s", wikiDir)
		// TODO: do on the airplane
	},
}

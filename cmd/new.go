// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"html/template"
	"os"
	"path/filepath"

	"github.com/apex/log"
	"github.com/gobuffalo/packr"
	"github.com/spencercdixon/exocortex/git"
	"github.com/spf13/cobra"
)

func init() {
	RootCmd.AddCommand(newCmd)
}

// newCmd lets users quickly bootstrap a new wiki
// 1. Makes new directory based on the relative path passed in
// 2. Copy a base exocortex.json config into the new dir
// 3. Initializes a git repository in the directory
var newCmd = &cobra.Command{
	Use:   "new",
	Short: "Creates a new exocortex wiki",
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) < 1 {
			log.Fatal("Requires an arg for wiki name")
		}

		wikiDir := args[0]
		log.Infof("Creating your new wiki: %s", wikiDir)

		cwd, err := os.Getwd()
		if err != nil {
			log.Fatal(err.Error())
		}

		newWikiPath := filepath.Join(cwd, wikiDir)
		log.Debugf("new wiki path: %s", newWikiPath)

		err = os.Mkdir(newWikiPath, 0777)
		log.Debug("Made new directory for wiki")
		if err != nil {
			log.Fatal(err.Error())
		}

		box := packr.NewBox("./templates")
		s := box.String("new-exocortex.json")
		tmpl, err := template.New("new-config").Parse(s)

		configPath := filepath.Join(newWikiPath, "exocortex.json")
		f, err := os.Create(configPath)
		defer f.Close()
		if err != nil {
			log.Fatalf("Failed to create exocortex.json: %s", err.Error())
		}

		params := struct{ Repo string }{Repo: newWikiPath}
		err = tmpl.Execute(f, params)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Debug("Initializing repo")
		gs := git.Store{Repo: newWikiPath, Remote: "origin", Branch: "master"}
		if err := gs.Init(); err != nil {
			log.Fatal(err.Error())
		}
		if _, err := gs.Add("exocortex.json", "Initial commit"); err != nil {
			log.Fatal(err.Error())
		}
		log.Infof("Successfully created your wiki: cd %s && exo start", newWikiPath)
	},
}

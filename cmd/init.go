// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"html/template"
	"os"
	"path/filepath"

	"github.com/apex/log"
	"github.com/gobuffalo/packr"
	"github.com/spencercdixon/exocortex/util"
	"github.com/spf13/cobra"
	"github.com/tj/survey"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initializes an exocortex.json file in current directory",
	Run: func(cmd *cobra.Command, args []string) {
		cwd, err := os.Getwd()
		if err != nil {
			log.Fatal(err.Error())
		}
		configPath := filepath.Join(cwd, "exocortex.json")

		if ok, _ := util.Exists(configPath); ok {
			log.Fatal("Config already exists in this directory")
		}

		log.Infof("Creating a new exo config for you in %s", configPath)
		log.Info("First, answer a few questions about your wiki:\n")

		// TODO: Add more questions to survey as features are developed for exo
		var qs = []*survey.Question{
			{
				Name:     "title",
				Prompt:   &survey.Input{Message: "What do you want to name your wiki?"},
				Validate: survey.Required,
			},
			// {
			// Name:     "interval",
			// Prompt:   &survey.Input{Message: "How often do you want your wiki to sync with the remote repo?"},
			// Validate: survey.Required,
			// Help: "Generally every 30s is good"
			// },
		}
		answers := struct {
			Title string
			Repo  string
			// Interval int
			// Port  int
			// Host  string
			// Remote string
			// Branch string
		}{}

		// Init is meant to be done in current directory
		answers.Repo = filepath.ToSlash(cwd)

		println()
		err = survey.Ask(qs, &answers)
		if err != nil {
			log.Fatal(err.Error())
		}
		println()

		box := packr.NewBox("./templates")
		s := box.String("exocortex.json")
		tmpl, err := template.New("config").Parse(s)
		if err != nil {
			log.Fatal(err.Error())
		}

		f, err := os.Create(configPath)
		defer f.Close()
		if err != nil {
			log.Fatal("Failed to create exocortex.json")
		}

		err = tmpl.Execute(f, answers)
		if err != nil {
			log.Fatal(err.Error())
		}
	},
}

func init() {
	RootCmd.AddCommand(initCmd)
}

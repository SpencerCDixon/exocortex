// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"os"

	"github.com/apex/log"
	"github.com/apex/log/handlers/cli"
	"github.com/spencercdixon/exocortex/config"
	"github.com/spf13/cobra"
)

var cfgFile string
var debug bool

var RootCmd = &cobra.Command{
	Use:   "exo",
	Short: "An extension of your brain. A modern wiki for the modern developer.",
}

func Execute() {
	if err := RootCmd.Execute(); err != nil {
		log.Error(err.Error())
		os.Exit(1)
	}
}

func init() {
	// Parse global flags
	RootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file for wiki")
	RootCmd.PersistentFlags().BoolVar(&debug, "debug", false, "set logging to debug level")

	// Initialize configuration and logger
	cobra.OnInitialize(initConfig)
}

func initConfig() {
	log.SetHandler(cli.Default)
	log.SetLevel(log.InfoLevel)
	if debug {
		log.SetLevel(log.DebugLevel)
	}

	config.New(cfgFile)
}

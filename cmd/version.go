// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// Version is the currently running version of Exocortex
const Version = "v0.2.3"

// versionCmd represents the version command
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print version of exo binary",
	Long:  "All software needs a version... this is Exo's.",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("\n  You're currently running Exocortex %s\n\n  Never stop being curious :-)\n\n", Version)
	},
}

func init() {
	RootCmd.AddCommand(versionCmd)
}

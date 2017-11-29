package config

import (
	"os"

	"github.com/apex/log"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
)

// New finds the most appropriate config file and loads it into our Viper
// singleton to be used throughout the rest of the application.
func New(filePath string) {
	homeDir, err := homedir.Dir()
	if err != nil {
		log.WithError(err).Fatal("couldn't find home dir")
	}

	viper.SetConfigName("exocortex")
	viper.AddConfigPath(filePath)
	viper.AddConfigPath(homeDir)
	viper.AddConfigPath(".")
	viper.SetEnvPrefix("exo")

	// Allow environment variables to override any settings
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Errorf("exo: Config file required to start wiki: %s\n", err)
		os.Exit(1)
	}

	// Set some sane defaults:
	viper.SetDefault("host.address", "localhost")
	viper.SetDefault("host.port", 1234)
	log.Infof("Using configuration file %s", viper.ConfigFileUsed())
}

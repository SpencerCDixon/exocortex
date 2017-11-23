package git

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/pkg/errors"
	"github.com/spencercdixon/exocortex/exo"
)

// PrefixIgnore are files that won't get returned when querying for list
var PrefixIgnore = []string{
	".gitignore",
	"exocortex.json",
	"readme.md",
	"",
}

// Store satisfies the Store interface when using local git repo as the
// underlying data storage for the Wiki
type Store struct {
	// absolute path to where the repo lives
	Repo string
	// git remote to push to
	Remote string
	// branch to be pushing/pulling from
	Branch string
}

func (gs *Store) exec(commands ...string) (string, error) {
	cmd := exec.Command("git", commands...)
	cmd.Dir = gs.Repo
	var out bytes.Buffer
	var errors bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &errors

	err := cmd.Run()
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

// Status returns the status of the git repo
func (gs *Store) Status() (string, error) {
	return gs.exec("status", "-v")
}

// Commit does a git commit with whatever message we want
func (gs *Store) Commit(path, msg string) (string, error) {
	if len(msg) == 0 {
		author, err := gs.CurrentUser()
		if err != nil {
			author = "Unknown"
		}
		msg = fmt.Sprintf(
			"exo: Update on %s by %s",
			time.Now().Format(time.UnixDate),
			author,
		)
	}

	return gs.exec("commit", "-m", msg, path)
}

// Add stages a file and commits with the message provided or a default exo
// template message.
func (gs *Store) Add(path, msg string) (string, error) {
	_, err := gs.exec("add", path)
	if err != nil {
		return "", err
	}

	return gs.Commit(path, msg)
}

// LSPattern lets us list files in a specific dir
func (gs *Store) LSPattern(pattern string) (string, error) {
	return gs.exec("ls-tree", "--name-only", "-r", "HEAD", "--", pattern)
}

// LS is a global listing of files in the repo
func (gs *Store) LS() ([]string, error) {
	str, err := gs.LSPattern("")
	if err != nil {
		return nil, err
	}
	return filterPrefixes(str), nil
}

// The current author according to global git config
func (gs *Store) CurrentUser() (string, error) {
	return gs.exec("config", "--get", "user.name")
}

// View the contents of a specific path
func (gs *Store) View(path string) (string, error) {
	resolvedPath := filepath.Join(gs.Repo, ensureMDExtension(path))

	body, err := ioutil.ReadFile(resolvedPath)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func (gs *Store) WritePage(p *exo.Page) error {
	path := ensureMDExtension(p.Prefix)
	absPath := filepath.Join(gs.Repo, path)
	if err := ensureDirExists(absPath); err != nil {
		return err
	}
	if err := ioutil.WriteFile(absPath, []byte(p.Body), os.ModePerm); err != nil {
		return err
	}
	fmt.Println("Made it to after write")
	if _, err := gs.Add(path, ""); err != nil {
		return err
	}
	return nil
}

// Ensures we have git installed and there is a repo in the directory the user
// decided to host their wiki in. Return error if anything is wrong so callers
// can bail out before continueing
func (gs *Store) EnsureValidEnvironment() error {
	cmdResult, err := gs.exec("--version")
	if err != nil {
		return errors.Wrap(err, "failed to get git version")
	}
	pieces := strings.Split(cmdResult, " ")

	if pieces[2] == "" {
		return errors.New("missing git version")
	}

	repoExists, err := exists(gs.Repo)
	if err != nil {
		return err
	}
	dotGitExists, err := exists(filepath.Join(gs.Repo, ".git"))
	if err != nil {
		return err
	}
	if !repoExists || !dotGitExists {
		return errors.New("no git repository found")
	}
	return nil
}

func filterPrefixes(rawList string) []string {
	prefixes := strings.Split(rawList, "\n")

	return filter(prefixes, func(p string) bool {
		return !include(PrefixIgnore, p)
	})
}

func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

func ensureMDExtension(path string) string {
	ext := filepath.Ext(path)
	if ext == ".md" {
		return path
	} else {
		return path + ".md"
	}
}

func ensureDirExists(absPath string) error {
	dir := filepath.Dir(absPath)
	ok, err := exists(dir)
	if err != nil {
		return err
	}
	if ok {
		return nil
	}
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return err
	}
	return nil
}

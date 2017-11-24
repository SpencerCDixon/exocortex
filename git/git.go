package git

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/apex/log"
	"github.com/pkg/errors"
	"github.com/spencercdixon/exocortex/exo"
	"github.com/spencercdixon/exocortex/util"
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
	var out, errors bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &errors

	err := cmd.Run()
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

// Init initializes a git repo if one doesn't already exist
func (gs *Store) Init() error {
	gitDir := filepath.Join(gs.Repo, ".git")
	ok, err := util.Exists(gitDir)
	if err != nil {
		return err
	}
	if !ok {
		_, err := gs.exec("init")
		return err
	} else {
		return errors.New("Git repo already exists")
	}
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
			"exo: Updated %s by %s at %s",
			path,
			author,
			time.Now().Format(time.Kitchen),
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
	resolvedPath := filepath.Join(gs.Repo, util.EnsureMDPath(path))
	log.Debugf("Resolved path: %s", resolvedPath)

	body, err := ioutil.ReadFile(resolvedPath)

	if err != nil {
		return "", err
	}
	return string(body), nil
}

// Grep allows us to search for a pattern in the wiki
func (gs *Store) Grep(pattern string) ([]exo.SearchResult, error) {
	str, err := gs.exec("grep", "--no-color", "-F", "-n", "-i", "-I", pattern)
	if err != nil {
		return nil, err
	}
	lines := strings.Split(str, "\n")

	var results []exo.SearchResult
	for _, l := range lines {
		if len(l) > 0 {
			pieces := strings.Split(l, ":")
			result := exo.SearchResult{
				Page:       pieces[0],
				LineNumber: pieces[1],
				Content:    pieces[2],
			}
			results = append(results, result)
		}
	}
	return results, nil
}

// WritePage writes and commits a page object to the wiki
func (gs *Store) WritePage(p *exo.Page) error {
	path := util.EnsureMDPath(p.Prefix)
	absPath := filepath.Join(gs.Repo, path)
	if err := util.EnsureDirExists(absPath); err != nil {
		return err
	}
	if err := ioutil.WriteFile(absPath, []byte(p.Body), 0600); err != nil {
		return err
	}
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

	repoExists, err := util.Exists(gs.Repo)
	if err != nil {
		return err
	}
	dotGitExists, err := util.Exists(filepath.Join(gs.Repo, ".git"))
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

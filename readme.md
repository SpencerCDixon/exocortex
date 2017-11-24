![](assets/title.png)

# Exocortex

A **modern** personal **wiki** that doesn't suck.

## Features

* **Language independent**
* **Easy/zero configuration**
* **Modern UI**
* **Git based versioning**
* **Git based syncing (to GitHub)**
* **Intuitive hotkeys for better editing UX**
* **Prefetch pages for fast response times**

## Why?

I couldn't find an open source wiki solution that I was happy with.  They either
looked super shitty, had terrible UX, or required a _ton_ of configuration to
get going (including sometimes installing new languages!).  Exocortex aims to
solve these problems.

## First Principles

1. Should be easy to run locally - `brew install exocortex && exo new && exo`
2. Should only require a git repo to operate - `git init`
3. Should have a modern interface that is a pleasure to work with (SPA React) - comes with the binary.
4. Should be backed up in the cloud so I never lose my hard work - thank you GitHub!
5. Should only allow markdown for editing to reduce feature bloat.

## User Requirements

1. Must have `git` installed
2. Wiki must **be a git repository**
3. Must have an `exocortex.json` in your repo.  (`exo init` for existing projects)
4. Nothing else :smiley:

## Feature Roadmap

Exocortex is missing a lot of useful features that would enable it to go beyond
just being a local personal wiki.  I developed it while on Thanksgiving vacation
so there was a limited feature set that I decided to prioritize.  See below for
a list of enhancements I'd like to add in the coming weeks:

- [ ] User authentication
- [ ] Better UI customization/overrides

## Folder structure

```sh
home.md         <-- file used for wiki homepage
exocortex.json  <-- wiki globals
.git            <-- data store for the wiki
```

That's it!  The rest of your wiki can be structured however you'd like.

## Commands

* `new` - creates a new directory with an `exocortex.json` file
* `start` - boots up the wiki server
* `init` - creates a templated `exocortex.json` file based on sensible defaults
* `exo` - alias for start

## Configuration

* `syncInterval` - time between remote pushes if remote is set up
* `repository` - absolute path to where the repo for this wiki lives
* `title` - base title for the wiki
* `remote` - where to push the wiki to on the interval
* `server.host` - can be used for OAuth in the future
* `server.port` - port for the server to listen
* `anonymousRead` - allow anonymous users to read pages

## Hotkeys

TODO: more to come...

<table>
  <tr>
    <th>Action</th>
    <th>Shortcut</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Zen Mode</td>
    <td>
      <kbd>cmd</kbd> + <kbd>z </kbd>
    </td>
    <td>
      Eliminate all noise around the wiki for better editing
    </td>
  </tr>
  <tr>
    <td>Insert Mode</td>
    <td>
      <kbd>cmd</kbd> + <kbd>i </kbd>
    </td>
    <td>
      Turn whatever page you're viewing into 'edit' mode
    </td>
  </tr>
  <tr>
    <td>Preview Mode</td>
    <td>
      <kbd>cmd</kbd> + <kbd>p </kbd>
    </td>
    <td>
      Turn whatever page you're viewing into 'edit' mode and split screen with a
      preview of what the MD will render to on the right
    </td>
  </tr>
</table>

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| **POST** | `/api/session` | TODO. sign in local user (match against white list of email/passes) |
| **GET** | `/api/settings` | TODO. returns global wiki settings |
| **POST** | `/api/settings` | TODO. sets settings |
| **POST** | `/api/search` | search through wiki for a query |
| **GET** | `/api/wiki/:page-name` | retrieves content for this page |
| **POST** | `/api/wiki/:page-name` | writes the file, commits |
| **DELETE** | `/api/wiki/:page-name` | TODO. deletes the page |
| **GET** | `/api/` | returns list of prefixes available|
| **GET** | `/*` | return the UI |

## UI Routes
| Route | Description |
|-------|-------------|
| `/search`| Renders search results |
| `/wiki/:page-name` | Renders markdown of that path |
| `/wiki/new/:page-name` | Create a new page that doesn't exist in tree yet |
| `/wiki/edit/:page-name` | Update a page that exists |
| `/wiki/revisions/:page-name` | See past revisions |


## Why the name Exocortex?

Exocortex was shamelessly stolen from the book [Pragmatic Thinking &
Learning](https://pragprog.com/book/ahptl/pragmatic-thinking-and-learning).
Andy Hunt talks a lot about the value of having an 'excortex' or personal wiki
to record your learning.  I started documenting my own exocortex in `.md` files
a year or so ago and this project aims to be a nice interface for that work.

## Development/Contributing
**Note**: I'm open to bug fixes and feature requests but I'm not sure how much
free time I'll be able to commit to working on this.  If there is a feature you
_aboslutely must have right away_ then feel free to fork!

Ensure you have the following installed:

* `go 1.9`
* `node >6`
* `yarn`

**Quick Start**

Make bootstrap will build the UI, install the Go binary, create an empty example
wiki, and boot up that example wiki on `localhost:1234`.

```sh
$ mkdir -p $GOPATH/github.com/spencercdixon
$ cd $GOPATH/github.com/spencercdixon && git clone git@github.com:SpencerCDixon/exocortex.git
$ cd exocortex
$ make bootstrap
```

**Frontend**

> First make sure you have the backend running on port 1234

To work on the frontend you can run:
```sh
$ cd ui
$ yarn install
$ yarn start
```

This should boot up `http://localhost:3000` with a dev server that proxies to
`localhost:1234` (where the API lives).

![](assets/title.png)

# Exocortex

A wiki to act as an extension of your brain.  

## Features

* **Language independent**
* **Easy/zero configuration**
* **Modern UI**
* **Git based versioning**
* **Git based syncing (to GitHub)**
* **Intuitive hotkeys for better editing UX**

I couldn't find an open source wiki solution that I was happy with.  They either
looked super shitty, had terrible UX, or required a _ton_ of configuration to
get going (including sometimes installing new languages!).  Exocortex aims to
solve these problems.

## First Principles

1. Should be easy to run locally (`brew install exocortex && exo new && exo`)
2. Should only require a git repo to operate
3. Should have a modern interface that is a pleasure to work with (SPA React)
4. **Only** allow markdown for editing

## User Requirements

1. User has local git installation
2. User's wiki has a git repository setup
3. User has pointed the config file to an absolute path of where repo lives
4. Nothing else.


## Feature Roadmap

- [ ] User authentication
- [ ] Better UI customization/overrides

## Ideas (in flux...)

### Folder structure

```sh
home.md         <-- file used for wiki homepage
exocortex.json  <-- wiki globals
.git            <-- data store for the wiki
```

That's it!  The rest of your wiki can be structured however you'd like.

#### Sync Pattern

1. Every time a file gets committed, touch a timestamp
2. Start a background worker that checks that timestamp on an interval
3. If that timestamp is less than or equal to the interval than do a `push` to
   the remote.
4. If no remote is set, skip the whole background syncing process.

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


## Development
Ensure you have the following installed:

* `go 1.9`
* `node >6`
* `yarn`

**Backend**

To work on the backend you'll need a sample wiki to point to.  
TODO: provide a link to sample wiki people can clone down.

```sh
make dev
```

**Frontend**

To work on the backend you can run:
```sh
$ cd ui
$ yarn install
$ yarn start
```

This should boot up `http://localhost:3000` with a dev server that proxies to
`localhost:1234` (where the API lives).

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

## TODO

- [x] when a page doesn't exist redirect to an 'new' page in the UI
- [x] allow exo root command to look in local directory for config file
- [x] change --config flag to instead take it's location as an arg
- [x] hot keys in frontend
- [x] exo init command which just brings in the config file but doesn't create new dir
- [x] add style theme
- [x] extract withWikiPage
- [x] add the hot keys for different modes
- [x] find good icon set to use
- [ ] zen mode editing
- [ ] expose endpoint for setting style theme
- [ ] add state management
- [ ] set up all primitive components
- [ ] change color of top bar based on different modes like vim
- [ ] can I get vim text editing??
- [ ] create local cache of pages that are loaded
- [ ] prefetch pages in same prefix so they're ready to go
- [ ] come up with a better code highlighting solution
- [ ] add ability to customize font theme based on: https://github.com/KyleAMathews/typography.js (expose API endpoint)
- [ ] add TOC with remake: https://github.com/wooorm/remark-toc/blob/master/index.js
- [ ] allow override of code block coloring based on highlight.js
- [ ] change hot key advice based on what mode the user is in
- [ ] add hotkey for 'cmd + ?' to toggle the hotkey toolbar
- [ ] add DELETE page 
- [ ] see past revisions and revert back to specific commit
- [ ] diff view of files
- [ ] image support
- [ ] when a page get's loaded, scan for all other pages and preemptively prefetch them.

On Airplane:
- [ ] set up background syncing 
- [ ] create 'new' command that bootstraps an empty wiki


[resolve path](https://github.com/mjackson/resolve-pathname)

# Exocortex

A wiki to act as an extension of your brain.  

## Philosophy

Sometimes less is more.

* Less configuration
* No language runtime required


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


## Ideas (in flux...)

### Folder structure

```sh
overrides/index.js   <-- component overrides
exocortex.json       <-- wiki globals
.git                 <-- data store for the wiki
```

#### Sync Pattern

1. Every time a file gets committed, touch a timestamp
2. Start a background worker that checks that timestamp on an interval
3. If that timestamp is less than or equal to the interval than do a `push` to
   the remote.
4. If no remote is set, skip the whole background syncing process.

## Commands

* `new` - creates a new directory with an `exocortex.json` file
* `start` - boots up the wiki server 
* `exo` - alias for start

## Configuration

* `pushInterval` - time between remote pushes if remote is set up
* `repository` - absolute path to where the repo for this wiki lives
* `title` - base title for the wiki
* `remote` - where to push the wiki to on the interval
* `server.host` - can be used for OAuth in the future
* `server.port` - port for the server to listen
* `anonymousRead` - allow anonymous users to read pages

## API Routes

POST `/session` - sign in local user (match against white list of email/passes)
GET `/wiki/:page-name` - retrieves content for this page
POST `/wiki/:page-name` - writes the file, commits
DELETE `/wiki/:page-name` - deletes the page
GET `/*` - return the UI

## UI Routes

`/wiki/:page-name`
`/wiki/new/:page-name`
`/wiki/edit/:page-name`
`/wiki/revisions/:page-name`
`/wiki/history/:page-name`

## TODO

- [ ] when a page doesn't exist redirect to an 'new' page in the UI
- [ ] allow exo root command to look in local directory for config file
- [ ] change --config flag to instead take it's location as an arg
- [ ] set up background syncing 

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

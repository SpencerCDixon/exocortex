# Exocortex

An wiki to act as an extension of your brain.  

## Philosophy

Sometimes less is more.  Less configuration.  Less need for a language runtime.
Less customization.  Exocortex aims to be a simple to set up and simple to use
local wiki that can stay in sync with GitHub as a backup.

## First Principles

1. Should be easy to run locally (`brew install exocortex`)
2. Should only require a git repo to operate
3. Should have a modern interface that is a pleasure to work with (SPA React)
4. Only allow markdown for editing

## Requirements

1. User has local git installation
2. User has created a git repository
3. User has pointed the config file to an absolute path of where repo lives

## Sync Pattern

1. Every time a file gets committed, touch a timestamp
2. Start a background worker that checks that timestamp on an interval
3. If that timestamp is less than or equal to the interval than do a `push` to
   the remote.
4. If no remote is set skip the whole background syncing process.

## Ideas

1.  Look into front end markdown parsing libraries that let you map custom React components
2.  Somewhat meta, but, allow users to create custom react components inside the wiki
3.  Expose an API that proxies to local git

Folder structure:
```sh
renderers/custom-react-components
```

## Commands

* `new` - creates a new directory with an `exo.json` file
* `serve` - boots up the wiki server 
* `hash` - creates password hash for local password 

## Configuration

* `pushInterval` - time between remote pushes if remote is set up
* `repository` - absolute path to where the repo for this wiki lives
* `title` - base title for the wiki
* `remote` - where to push the wiki to on the interval
* `server.host` - can be used for OAuth in the future
* `server.port` - port for the server to listen
* `anonymousRead` - allow anonymous users to read pages

## API

POST `/session` - sign in local user (match against white list of email/passes)
GET `/wiki/:page-name` - retrieves content for this page
POST `/wiki/:page-name` - writes the file, commits
DELETE `/wiki/:page-name` - deletes the page
GET `/*` - return the UI

## UI

`/wiki/:page-name`
`/wiki/edit/:page-name`
`/wiki/revisions/:page-name`
`/wiki/history/:page-name`

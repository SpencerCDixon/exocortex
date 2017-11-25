#### Sync Pattern

1. Every time a file gets committed, touch a timestamp
2. Start a background worker that checks that timestamp on an interval
3. If that timestamp is less than or equal to the interval than do a `push` to
   the remote.
4. If no remote is set, skip the whole background syncing process.

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
- [x] image support
- [x] add TOC with remake: https://github.com/wooorm/remark-toc/blob/master/index.js
- [ ] zen mode editing
- [ ] expose endpoint for setting style theme
- [ ] design a better link 
- [ ] add state management
- [ ] set up all primitive components
- [ ] change color of top bar based on different modes like vim
- [ ] can I get vim text editing??
- [ ] create local cache of pages that are loaded
- [ ] prefetch pages in same prefix so they're ready to go
- [ ] come up with a better code highlighting solution
- [ ] add ability to customize font theme based on: https://github.com/KyleAMathews/typography.js (expose API endpoint)
- [ ] allow override of code block coloring based on highlight.js
- [ ] change hot key advice based on what mode the user is in
- [ ] add hotkey for 'cmd + ?' to toggle the hotkey toolbar
- [ ] add DELETE page 
- [ ] see past revisions and revert back to specific commit
- [ ] diff view of files
- [ ] when a page get's loaded, scan for all other pages and preemptively prefetch them.
- [ ] change home icon to be a brain
 
On Airplane:
- [x] set up background syncing 
- [ ] create 'new' command that bootstraps an empty wiki


[resolve path](https://github.com/mjackson/resolve-pathname)

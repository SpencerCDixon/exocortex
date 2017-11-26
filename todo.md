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
- [x] set up basic background syncing 
- [x] create 'new' command that bootstraps an empty wiki
- [x] add endpoints for getting access to the settings
- [x] design a better link 
- [x] add DELETE page 
- [x] zen mode editing
- [x] add state management with redux/mobx to the UI
- [x] add hotkey for 'cmd + ?' to toggle the hotkey toolbar
- [x] create local cache of pages that are loaded 
- [x] prefetch pages in same prefix so they're ready to go
- [x] expose endpoint for setting style theme
- [ ] change color of top bar based on different modes like I have in vim
- [ ] look into vim edit mode for slate
- [ ] come up with a better code highlighting solution
- [ ] add ability to customize font theme based on: https://github.com/KyleAMathews/typography.js (expose API endpoint)
- [ ] allow override of code block coloring based on highlight.js
- [ ] change hot key advice based on what mode the user is in
- [ ] see past revisions and revert back to specific commit
- [ ] diff view of files
- [ ] when a page get's loaded, scan for all other pages and preemptively prefetch them.
- [ ] change home icon to be a brain
- [ ] fix bug with not being able to click through the hot key helper
- [ ] add modals and toast support for alerts to users and confirmations on dangerous tasks
- [ ] add support for titles on various pages
- [ ] add a 'README.md' to generated wikis so their githubs aren't blank
 
## Interesting Resources To Investigate
* [resolve path](https://github.com/mjackson/resolve-pathname)

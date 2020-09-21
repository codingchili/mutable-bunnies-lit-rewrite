# mutable-bunnies-lit-rewrite
Rewriting the frontend for Mutable Bunnies from Polymer 2 -> lit-html.

https://github.com/codingchili/mutable-bunnies-client

The client has 2 dependencies, lit-html and ink-ripple, everything else is custom components.

Views in the game to rewrite - [ui](src/ui)

- [x] Start page
- [x] Login view
- [x] Realm select
- [x] Character select
- [x] Character create
- [x] Patch download
- [x] Game loader
- [ ] All of the game UI tbd.

Components that needs to be replaced - [components](src/component)

- [x] paper-tooltip -> bunny-tooltip
- [x] paper-input -> bunny-input
- [x] paper-toolbar -> bunny-bar
- [x] paper-material -> bunny-box
- [x] paper-toast -> bunny-toast
- [x] paper-button -> bunny-button
- [x] iron-pages -> bunny-pages
- [x] iron-icon -> bunny-icon
- [x] paper-tab -> bunny-tab
- [x] paper-spinner -> bunny-spinner
- [x] paper-progress -> bunny-progress
- [x] paper-ripple -> ink-ripple (dependency)

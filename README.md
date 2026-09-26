# Aetherion showcase site

Static landing page for the Aetherion Discord bot. Plain HTML/CSS/JS with no build step.

- `index.html`: the page. Commands and features come from the bot's source (`src/groksito_discord/discord/*.py`).
- `styles.css`, `script.js`: styling plus command search, filter and click-to-copy.
- `assets/logo.svg`, `assets/favicon.svg`: placeholder logo (the repo has no bot avatar).

**Before publishing:** replace `YOUR_CLIENT_ID` in `index.html` (3 "Add to Discord" links) with the
Application ID from the Discord Developer Portal.

To host on GitHub Pages, put these files in a repo (or a `docs/` folder) and enable Pages for that branch/folder.
The `preview-*.png` files are only screenshots and don't need to be published.

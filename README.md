# Aetherion showcase site

Static landing page for the Aetherion Discord bot. Plain HTML/CSS/JS with no build step.

- `index.html`: the page. Commands and features come from the bot's source (`src/groksito_discord/discord/*.py`).
- `styles.css`, `script.js`: styling plus command search, filter and click-to-copy.
- `assets/logo.svg`, `assets/favicon.svg`: placeholder logo (the repo has no bot avatar).

The "Message Me to Add" buttons open the owner's Discord profile (`https://discord.com/users/1022200760018161684`)
so people can DM to request the bot. Swap in an OAuth invite link later if you want self-serve adds.

To host on GitHub Pages, put these files in a repo (or a `docs/` folder) and enable Pages for that branch/folder.
The `preview-*.png` files are only screenshots and don't need to be published.

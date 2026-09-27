# Aetherion showcase site

Static landing page for the Aetherion Discord bot. Plain HTML/CSS/JS with no build step.

- `index.html`: the page. Commands and features come from the bot's source.
- `styles.css`, `script.js`: styling plus command search, filter and click-to-copy.
- `terms.html`, `privacy.html`: Terms of Service and Privacy Policy (linked from the footer; use these URLs in the Discord Developer Portal).
- `assets/logo.png`, `assets/favicon.png`, `assets/apple-touch-icon.png`: the Aetherion logo.

The "Add to Discord" buttons use the OAuth invite
(`https://discord.com/oauth2/authorize?client_id=1545140271073722378&permissions=309509614800&scope=bot+applications.commands`).
"Message me" links open the owner's Discord profile (`https://discord.com/users/1022200760018161684`) for questions and Premium codes.

To host on GitHub Pages, put these files in a repo (or a `docs/` folder) and enable Pages for that branch/folder.
The `preview-*.png` files are only screenshots and don't need to be published.

# Aetherion showcase site

Static landing page for the Aetherion Discord bot. Plain HTML/CSS/JS with no build step.

- `index.html`: the landing page (Discord-style illustrations, features, Premium, commands, FAQ teaser). Commands come from the bot's source.
- `premium.html`: Get Premium (price, free vs Premium table, how to buy, renewals). `faq.html`: FAQ accordions with FAQPage JSON-LD.
- `styles.css`, `script.js`: styling plus command search, filter and click-to-copy.
- `terms.html`, `privacy.html`: Terms of Service and Privacy Policy (linked from the footer; use these URLs in the Discord Developer Portal).
- `assets/logo.png`: the Aetherion logo. `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `og-image.png` (1200x630 share image) are generated from it. `sitemap.xml`, `robots.txt`, `site.webmanifest` for search/install metadata.

The "Add to Discord" buttons use the OAuth invite
(`https://discord.com/oauth2/authorize?client_id=1545140271073722378&permissions=309576723664&scope=bot+applications.commands`).
"Message me" links open the owner's Discord profile (`https://discord.com/users/1022200760018161684`) for questions and Premium codes.

To host on GitHub Pages, put these files in a repo (or a `docs/` folder) and enable Pages for that branch/folder.
The mock Discord panels are illustrations in HTML/CSS, not screenshots. No tracking scripts.

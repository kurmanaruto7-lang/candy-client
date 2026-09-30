# Candy Client website — how to put it online (free, 24/7)

This folder is a plain static site. GitHub Pages hosts it for free, always on,
with **no server and no port forwarding**. There's a workflow that redeploys it
automatically every time you push.

## One-time setup

1. **Put this repo on GitHub** (it isn't yet). From the project root:
   ```bash
   git add .
   git commit -m "Add Candy Client website"
   gh repo create candy-client --public --source . --push
   ```
   (or make an empty repo on github.com and `git remote add origin <url>` then
   `git push -u origin master`).

2. **Turn on Pages via Actions.** On GitHub: **Settings → Pages → Build and
   deployment → Source → “GitHub Actions.”** That's it — the included workflow
   (`.github/workflows/deploy-pages.yml`) does the rest.

3. Push once more (or use **Actions → Deploy Candy site → Run workflow**). In
   ~1 minute your site is live at:
   ```
   https://<your-username>.github.io/candy-client/
   ```

## Point the download buttons at real files

Open [`assets/app.js`](assets/app.js) and edit the `CONFIG` block at the top:

- `clientDownload` / `optimizerDownload` — the two download URLs.
- `githubRepo` — your repo link.
- `discord` — your invite (leave `""` to hide the link).

**Where to host the actual files:** don't commit big binaries into the site.
Upload them as a **GitHub Release** and point the config at the release asset
(e.g. `.../releases/latest/download/candy-client.jar`). To make a release:
```bash
gh release create v0.1.0 candy-client.jar CandyUltimate_v6.exe -t "Candy Client beta" -n "First public beta"
```
Or, for quick testing, drop files into `website/downloads/` and use a relative
path like `downloads/candy-client.jar`.

## Custom domain (optional)

Buy a domain, add a `CNAME` file in this folder containing just the domain
(e.g. `candyclient.gg`), and set the DNS records GitHub shows under Settings →
Pages. Free HTTPS is issued automatically.

## Local preview

```bash
python -m http.server 8000 --directory website
```
then open <http://localhost:8000>.

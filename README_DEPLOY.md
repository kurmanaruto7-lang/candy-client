# Candy Client — website + downloads

Live at **https://kurmanaruto7-lang.github.io/candy-client/** (GitHub Pages, served
straight from the `master` branch root — free, always on, no server).

| File | What it is |
|---|---|
| `index.html`, `assets/` | the website |
| `CandyClientSetup.exe` | the Candy Client launcher installer (main download) |
| `downloads/candy-client.jar` | just the Fabric mod, for people with their own setup |
| `CandyUltimate_v6.exe` | the Candy Ultimate PC optimizer |

## Shipping an update

1. Build: `python tools/build.py` in `candy-launcher` (and `gradlew build` in `candy-client` for the mod).
2. Replace `CandyClientSetup.exe` / `downloads/candy-client.jar` here with the new builds.
3. Commit and push — Pages updates within a minute or two.

Download links and the Discord invite live in the `CONFIG` block at the top of
`assets/app.js`. Paths are relative, so files sitting next to `index.html` just work.

GitHub refuses single files over 100 MB in a repo (and warns above 50 MB). If the
installer ever grows past that, attach it to a **Release** instead and point
`launcherDownload` at `https://github.com/kurmanaruto7-lang/candy-client/releases/latest/download/CandyClientSetup.exe`.

# QUBINU — Cinematic Website V2

A responsive, single-page Ethereum meme-token website (static HTML/CSS/JavaScript). No install, build process, wallet connection, API key, or backend required.

## Preview

Open `index.html` in Chrome/Edge, or serve the folder locally:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. All paths are relative for GitHub Pages, Netlify, and similar static hosts.

## Launch settings

Edit `config.js`:

- `contractAddress` — currently `Coming Soon..` (copy button works even before launch).
- `xUrl` — official X link after launch.
- `telegramUrl` — official Telegram group/channel link after launch (no Telegram banner is used or included).

Avoid publishing unverified contract or liquidity claims. Planned liquidity lock is not confirmation of a completed lock.

## Design and QA notes

- The original wide banner is displayed with its entire intrinsic ratio (no object-fit cover crop).
- The Origin, Multiverse, and Explorer illustrations are shown with their full 3:2 aspect ratio; no faces or outer portals are cut by a fixed-height viewport.
- The full-body mascot uses `object-fit: contain` rather than being cropped.
- Navigation is single-page and anchor-based. No Connect Wallet button or integration exists.
- Reality selector supports clicks and Left/Right/Home/End keyboard navigation.
- Animated sections respect reduced-motion preferences.
- Images are WebP encoded and stored in `assets/`.

## Deployment

Upload all files and `assets/` intact to your static host. GitHub Pages: place the directory content at the published site root (or appropriate subdirectory). No absolute asset URLs are used. Test HTTPS after deploy.

Original Qubinu illustrations were generated for this project. Qubinu is an independent fictional meme project, not affiliated with Google or Google Quantum AI.

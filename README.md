# Hardened Hide My Email

[![Tests](https://github.com/felixthuermer/hardened-hide-my-email-extension/actions/workflows/tests.yaml/badge.svg)](https://github.com/felixthuermer/hardened-hide-my-email-extension/actions/workflows/tests.yaml)

A **privacy-hardened fork** of [`icloud-hide-my-email-browser-extension`](https://github.com/dedoussis/icloud-hide-my-email-browser-extension) by [Dimitrios Dedoussis](https://github.com/dedoussis).

It lets you use Apple's [Hide My Email](https://support.apple.com/en-us/HT210425) (iCloud+) service from any Chromium-based browser or Firefox — generating, reserving, and managing private email aliases — **without granting the extension access to the pages you browse**. All functionality lives in the toolbar pop-up; generate an alias and copy it to your clipboard.

_Disclaimer: This extension is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Apple. "Hide My Email" and "iCloud" are trademarks of Apple Inc._

## Why this fork?

The upstream extension is well-behaved (it talks only to Apple, reuses your existing icloud.com session cookies, never sees your password, and has no telemetry). This fork narrows the trust surface even further and modernizes the UI. See [CHANGELOG.md](./CHANGELOG.md) for the full list. Highlights:

- **Removed the broad "all websites" access.** The in-page autofill feature (the on-focus button and right-click context menu) was dropped, which is what required injecting code into every page you visit.
- **Permissions reduced from 8 to 3.**

  |                 | Upstream                                                                                  | This fork                                  |
  | --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------ |
  | Host access     | `*.icloud.com(.cn)`                                                                       | `*.icloud.com(.cn)`                        |
  | Permissions     | `declarativeNetRequest`, `storage`, `tabs`, `contextMenus`, `webRequest`, `notifications` | `declarativeNetRequest`, `storage`, `tabs` |
  | Content scripts | `<all_urls>`, `http://*/*`, `https://*/*`                                                 | **none**                                   |

- **No third-party network calls.** Removed an external "Fork me on GitHub" image that loaded from `github.blog`; the only requests the extension makes are to `*.icloud.com`.
- **Modern, system-adaptive UI** that follows your OS light/dark mode.
- **New icon** (envelope instead of the green-apple emoji).
- **Build/tooling hardening** (loud failures, source-map-free production build).

## Features

- Simple pop-up UI for generating and reserving new Hide My Email addresses
- Manage existing addresses (search, deactivate, reactivate, delete)
- One-click copy of a generated address to the clipboard, ready to paste into any sign-up form
- Choose the Forward-To address from the Options page

## How it works

The extension simulates the network requests of the icloud.com web app. For authentication it relies on the icloud.com cookies already stored in your browser after you sign in. **At no point does it have access to your Apple ID email or password** — you sign in directly on icloud.com. Because the extension only holds host permissions for `*.icloud.com`, those (and only those) requests are sent with your credentials.

## Supported browsers

Works on Chromium-based browsers (Chrome, Brave, Edge, …) and Firefox — any browser implementing the [Chromium extension API](https://developer.chrome.com/docs/extensions/reference/). It is **not** published to any extension store; build it and load it unpacked (below).

## Install (load unpacked)

```sh
nvm use            # Node 25.1 (see .nvmrc); optional if your Node matches
npm ci
npm run build      # Chromium → outputs to ./build
# or: npm run build:firefox
```

Then load `./build` as an unpacked extension:

- **Chromium**: go to `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the `build` folder. Then open the puzzle-piece (Extensions) menu and **pin** "Hardened Hide My Email" so its icon shows in the toolbar.
- **Firefox**: `npx web-ext -s build run`.

To use it: sign in at [icloud.com](https://icloud.com) (complete 2FA and "Trust This Browser"), then click the toolbar icon to generate an alias.

## Develop

Written in TypeScript; the UI pages (Pop-Up, Options, Userguide) are React apps styled with TailwindCSS (v4). The adaptive color theme lives in [`src/theme.css`](./src/theme.css).

> **Important — do not keep this project inside iCloud Drive / a synced `Documents` folder.** iCloud creates duplicate `" 2"` copies of files under `node_modules` (including under `@types`), which breaks the TypeScript build in confusing ways. Clone it somewhere unsynced (e.g. `~/Developer`). A `tsconfig` guard (`"types": []`) mitigates the `@types` case, but keeping `node_modules` out of sync is the real fix.

Commands (run from the repo root):

| #   | Description                                  | Chromium                                                                                                                                  | Firefox                      |
| --- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1   | Install deps                                 | `npm ci`                                                                                                                                  | `npm ci && npm i -g web-ext` |
| 2   | Dev server (writes `build/` with hot reload) | `npm run start`                                                                                                                           | `npm run start:firefox`      |
| 3   | Load the unpacked extension                  | Load `build/` via the browser UI ([guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)) | `web-ext -s build run`       |
| 4   | Lint & format                                | `npm run lint && npm run prettier:check`                                                                                                  | same                         |
| 5   | Production build                             | `npm run build`                                                                                                                           | `npm run build:firefox`      |
| 6   | Package                                      | `zip -r build.zip ./build/*`                                                                                                              | `web-ext -s build build`     |

### Replacing the icon

The toolbar icon is `src/assets/img/icon-{16,32,48,128}.png`, copied verbatim into `build/` and referenced by name in `src/manifest.json`. To change it, drop in PNGs with the same names/sizes (transparent background) and rebuild — no config changes needed. `src/assets/img/mail-icon.svg` is the (unused-by-build) vector source.

## Credits & License

This is a fork of [icloud-hide-my-email-browser-extension](https://github.com/dedoussis/icloud-hide-my-email-browser-extension) by Dimitrios Dedoussis, used under the MIT License. Original work © 2022–2024 Dimitrios Dedoussis; fork modifications © 2026 Felix Thürmer. Released under the [MIT License](./LICENSE).

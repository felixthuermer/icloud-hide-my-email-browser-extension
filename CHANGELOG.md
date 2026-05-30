# Changelog

All notable changes in this fork relative to upstream are documented here. This
project adheres loosely to [Keep a Changelog](https://keepachangelog.com/) and
[Semantic Versioning](https://semver.org/).

This is a hardened fork of
[`dedoussis/icloud-hide-my-email-browser-extension`](https://github.com/dedoussis/icloud-hide-my-email-browser-extension),
branched from upstream **v1.2.11**.

## [Unreleased] — hardened fork

### Security & privacy

- **Removed the in-page autofill feature** (on-focus button + right-click
  context-menu autofill). This eliminated the need for content scripts and the
  broad `<all_urls>` / `http://*/*` / `https://*/*` host access — the extension
  no longer runs on, or can read, the pages you browse.
- **Reduced permissions from 8 to 3.** Dropped `contextMenus`, `webRequest`, and
  `notifications`; removed the `content_scripts` block entirely. Remaining
  permissions: `declarativeNetRequest`, `storage`, `tabs`, plus host access to
  `*.icloud.com` / `*.icloud.com.cn`.
- **Removed the only third-party network call** — an external "Fork me on GitHub"
  ribbon image served from `github.blog` on the Options and Userguide pages. The
  extension now contacts only `*.icloud.com`.
- **Gated all debug logging** behind a dev-only flag (`src/log.ts`); nothing is
  logged in production builds.
- Confirmed: no source maps are emitted in production builds.

### Changed

- The pop-up now **validates the iCloud session directly on open** (against
  `setup.icloud.com`) instead of relying on a background `webRequest` listener,
  so sign-in/sign-out are still detected after the listener's removal.
- "Autofill" buttons in the pop-up (which wrote into the active tab) were removed;
  **Copy to clipboard** is the way to use a generated alias.
- The Options page no longer has autofill toggles (the feature is gone).
- The Userguide was rewritten for the pop-up-only workflow.

### UI

- **System-adaptive light/dark theme.** Introduced a semantic color system
  (`src/theme.css`) using "iCloud blue" accent tokens that follow
  `prefers-color-scheme`. Added an adaptive pop-up background (previously unset,
  which broke dark mode), softer radii, hairline borders, subtle success/danger/
  warning tints, and consistent focus rings. No behavioral changes.

### Icon

- Replaced the green-apple emoji icon with a **blue envelope** icon
  (`icon-{16,32,48,128}.png`, generated from `src/assets/img/mail-icon.svg`).
  `action.default_icon` now declares all four sizes.

### Dependencies

- Fixed all critical/high `npm audit` findings; removed unused packages
  (`uuid`, `lodash.startcase`, `@fortawesome/free-regular-svg-icons`, and their
  `@types`); upgraded `copy-webpack-plugin` (7 → 14). Remaining advisories are
  moderate and confined to the dev-only `webpack-dev-server` chain (never shipped).

### Build / tooling

- `utils/build.js` now **fails loudly** (non-zero exit + printed errors) on a
  webpack compilation error, instead of silently exiting 0 with no output.
- `tsconfig.json` sets `"types": []` so TypeScript does not auto-scan
  `node_modules/@types`, making builds robust against stray/duplicate type
  packages (e.g. iCloud Drive `" 2"` copies). No ambient `@types` are needed
  because all types come from explicit imports.

### Removed

- Source files: `src/pages/Content/*`, `src/messages.ts`,
  `src/pages/Background/constants.ts`, `src/options.ts`, and the unused
  `src/assets/img/icon-120.png`.

---

Upstream history for versions up to 1.2.11 lives in the
[original repository](https://github.com/dedoussis/icloud-hide-my-email-browser-extension).

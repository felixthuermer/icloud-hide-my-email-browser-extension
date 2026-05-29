# iCloud Hide My Email Browser Extension

[![Tests Status](https://github.com/dedoussis/icloud-hide-my-email-browser-extension/workflows/tests/badge.svg)](https://github.com/dedoussis/icloud-hide-my-email-browser-extension/actions/workflows/tests.yml)

[Hide My Email](https://support.apple.com/en-us/HT210425) is a premium privacy service of iCloud. Safari offers a native integration with Hide My Email, whereby users are prompted to generate a Hide My Email address upon registration to any website. This extension aims to bring a similar UX into a wider variety of browsers. In particular, it has been explicitly tested to work on:

- [Chrome](https://chrome.google.com/webstore/detail/icloud-hide-my-email/omiaekblhgfopjkjnenhahfgcgnbohlk)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/icloud-hide-my-email/)
- [Brave](https://chrome.google.com/webstore/detail/icloud-hide-my-email/omiaekblhgfopjkjnenhahfgcgnbohlk)
- Microsoft Edge

Note that the extension _should_ work on any browser that implements the [extension API](https://developer.chrome.com/docs/extensions/reference/) supported by Chromium-based browsers.

_Disclaimer: This extension is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Apple._

<p align="center">
<img src="./src/assets/img/demo-popup.gif" alt="Extension popup demo" width="400" height="auto"/>
</p>

<p align="center">
<img src="./src/assets/img/demo-content.gif" alt="Extension content demo" width="600" height="auto"/>
</p>

## Features

- Simple pop-up UI for generating and reserving new Hide My Email addresses
- Ability to manage existing Hide My Email addresses (including deactivation, reactivation, and deletion)
- One-click copy of a generated address to the clipboard, ready to paste into any sign-up form
- Quick configuration of Hide My Email settings, such as the Forward-To address, through the Options page of the extension

> **Note**: This is a privacy-hardened fork. The original in-page autofill (the
> on-focus button and right-click context menu) has been removed so the
> extension no longer needs access to every website you visit (`<all_urls>`).
> All functionality now lives in the toolbar pop-up; use **Copy to clipboard**
> and paste the address where you need it. The extension only ever communicates
> with `*.icloud.com` and requests just the `declarativeNetRequest`, `storage`,
> and `tabs` permissions.

## Options

### Forward-To address

Through the Options page you can choose which of your real addresses your Hide
My Email aliases forward incoming mail to.

## Develop

This extension is entirely written in TypeScript. The UI pages of the extension (e.g. Pop-Up and Options) are implemented as React apps and styled with TailwindCSS.

### Dev environment

Development was carried out in an environment that matches the following Docker image:

```Dockerfile
FROM node:25.1.0-alpine3.22

RUN apk add --update --no-cache g++ make python3

ADD . /opt/extension

WORKDIR /opt/extension

ENTRYPOINT ["sh"]
```

### Development workflow

The table below outlines the sequence of steps that need to be followed in order to ship a change in the extension. The execution of some of these steps varies per browser engine.

Note: the following console commands are to be executed from the root directory of this repo

<!-- prettier-ignore-start -->
| # | Description | Chromium | Firefox |
| - | - | - | - |
| 0 | Configure node environment (not required when building with Docker) | `nvm use` | `nvm use` |
| 1 | Install deps | `npm ci` | `npm ci && npm i -g web-ext` |
| 2 | Spin up the DevServer. The server generates the `build` dir. | `npm run start` | `npm run start:firefox` |
| 3 | Load the unpacked extension on the browser |  The `build` dir can be loaded as an unpacked extension through the browser's UI. See the relevant [Google Chrome guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked). | `web-ext -s build run` |
| 4 | Develop against the local browser instance on which the `build` dir is loaded | N/A | N/A |
| 5 | Build productionised artefact | `npm run build` | `npm run build:firefox` |
| 6 | Compress productionised artefact | `zip build.zip ./build/*` | `web-ext -s build build` |
| 7 | Publish | [Chrome webstore dev console](https://chrome.google.com/webstore/devconsole/) | [Mozilla Add-on developer hub](https://addons.mozilla.org/en-US/developers/addon/icloud-hide-my-email/versions/submit/) |
<!-- prettier-ignore-end -->

### TODOs

- [ ] Ability to modify the label and note of existing HME addresses
- [ ] CI and maybe CD
- [ ] Dependabot

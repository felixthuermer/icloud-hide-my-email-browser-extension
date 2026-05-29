import {
  getBrowserStorageValue,
  setBrowserStorageValue,
  DEFAULT_STORE,
} from '../../storage';
import ICloudClient, { DEFAULT_SETUP_URL } from '../../iCloudClient';
import browser from 'webextension-polyfill';
import { debug } from '../../log';

const constructClient = async (): Promise<ICloudClient> => {
  const clientState = await getBrowserStorageValue('clientState');

  if (clientState === undefined) {
    debug('constructClient: Using default setupUrl');
    return new ICloudClient(DEFAULT_SETUP_URL);
  }

  return new ICloudClient(clientState.setupUrl, clientState.webservices);
};

const performDeauthSideEffects = (): void => {
  setBrowserStorageValue('popupState', DEFAULT_STORE.popupState);
  setBrowserStorageValue('clientState', DEFAULT_STORE.clientState);
};

const performAuthSideEffects = (client: ICloudClient): void => {
  setBrowserStorageValue('clientState', {
    setupUrl: client.setupUrl,
    webservices: client.webservices,
  });
};

// ===== Post installation hooks =====

browser.runtime.onInstalled.addListener(
  async (details: browser.Runtime.OnInstalledDetailsType) => {
    // Sync the extension with the authentication state of the browser, so that
    // an already-signed-in user does not need to log out and back in to get the
    // extension working.
    if (['install', 'update'].includes(details.reason)) {
      const client = await constructClient();
      const isAuthenticated = await client.isAuthenticated();
      if (isAuthenticated) {
        performAuthSideEffects(client);
      } else {
        performDeauthSideEffects();
      }
    }

    // Present the user with a getting-started guide on first install.
    if (details.reason === 'install') {
      const userguideUrl = browser.runtime.getURL('userguide.html');
      browser.tabs.create({ url: userguideUrl }).catch(debug);
    }
  }
);

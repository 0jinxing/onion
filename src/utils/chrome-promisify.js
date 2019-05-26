/**
 * Functionn promisify
 * @param {Function} fn
 * @param {Object} thisArg
 */
const promisify = (fn, thisArg) => {
  return (...args) => {
    return new Promise(resolve => {
      args.push((...resultArg) => {
        resolve(resultArg);
      });
      fn.apply(thisArg, args);
    });
  };
};

const chrome = window.chrome;

// chrome extension api promisify

export const chromeTabsQuery = promisify(chrome.tabs.query, chrome.tabs);

export const chromeTabsReload = promisify(chrome.tabs.reload, chrome.tabs);

export const chromeStorageSyncGet = promisify(
  chrome.storage.sync.get,
  chrome.storage.sync
);

export const chromeStorageSyncSet = promisify(
  chrome.storage.sync.set,
  chrome.storage.sync
);

export const chromeProxySettingsSet = promisify(
  chrome.proxy.settings.set,
  chrome.proxy.settings
);

export const chromeBrowserActionSetIcon = promisify(
  chrome.browserAction.setIcon,
  chrome.browserAction
);

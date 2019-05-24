const chrome = window.chrome;

chrome.browserAction.onClicked.addListener(() => {});

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

let lastHost;
const handleTagUpdatedAndChanged = () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const location = new URL(tabs[0].url);
    if (lastHost === location.host) return;
    lastHost = location.host;
    // @TODO
  });
};

chrome.windows.onRemoved.addListener(function(windowId) {
  // @TODO async
});

chrome.tabs.onUpdated.addListener(handleTagUpdatedAndChanged);
chrome.tabs.onSelectionChanged.addListener(handleTagUpdatedAndChanged);

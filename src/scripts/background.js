import {
  CombinedMatcher,
  Filter,
  BlockingFilter,
  WhitelistFilter
} from "../utils/pac-match";
import defaultPacRules from "../utils/default-pac-rules";
import { local, sync } from "../utils/storage";

const chrome = window.chrome;

const defaultMatcher = new CombinedMatcher();
defaultPacRules.forEach(rule => {
  defaultMatcher.add(Filter.fromText(rule));
});

chrome.browserAction.onClicked.addListener(() => {
  // @TODO
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

let lastHost;
const handleTagUpdatedAndChanged = async () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const location = new URL(tabs[0].url);
    const { href: url, host } = location;
    if (lastHost === host) return;
    lastHost = host;
    // @TODO
    const dfilter = defaultMatcher.matchesAny(url, host);
    if (dfilter instanceof BlockingFilter) {
      chrome.browserAction.setIcon({ path: "proxy-enable.png" });
    } else {
      chrome.browserAction.setIcon({ path: "proxy-unable.png" });
    }
  });
};

chrome.windows.onRemoved.addListener(function(windowId) {
  // @TODO async
});

chrome.tabs.onUpdated.addListener(handleTagUpdatedAndChanged);
chrome.tabs.onSelectionChanged.addListener(handleTagUpdatedAndChanged);

import _ from "lodash";
import store from "../store";
import { toggle } from "../actions/rules";
import { getCurrentFilter } from "../utils";
import { BlockingFilter } from "../lib/adblockplus";
import aIcon from "../assets/emoticon.png";
import dIcon from "../assets/emoticon_d.png";

const handleTabsUpdatedAndChanged = async () => {
  const tabs: chrome.tabs.Tab[] = await new Promise(resolve => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });
  if (!tabs.length) return;
  const currentTab = tabs[0];
  // Set browser action icon
  if (!currentTab.url || !currentTab.url.startsWith("http")) {
    chrome.browserAction.setIcon({ path: dIcon });
    return;
  }

  const curFilter = getCurrentFilter(
    currentTab.url,
    store.getState().rules.val
  );
  if (curFilter instanceof BlockingFilter) {
    chrome.browserAction.setIcon({ path: aIcon });
  } else {
    chrome.browserAction.setIcon({ path: dIcon });
  }
};

chrome.tabs.onUpdated.addListener(_.debounce(handleTabsUpdatedAndChanged, 400));
chrome.tabs.onSelectionChanged.addListener(
  _.debounce(handleTabsUpdatedAndChanged, 400)
);

const handleBrowserActionClicked = async () => {
  const tabs: chrome.tabs.Tab[] = await new Promise(resolve => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });

  if (
    !tabs.length ||
    !tabs[0].url ||
    !tabs[0].url.toLowerCase().startsWith("http")
  ) {
    return;
  }
  store.dispatch(toggle(tabs[0].url));
};

chrome.browserAction.onClicked.addListener(
  _.debounce(handleBrowserActionClicked, 400)
);

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") chrome.runtime.openOptionsPage();
});

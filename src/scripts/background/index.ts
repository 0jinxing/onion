import _ from "lodash";
import store from "@/store";
import { toToggle } from "@/actions/rule";
import { queryFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";
import aIcon from "@/assets/emoticon.png";
import dIcon from "@/assets/emoticon_d.png";

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

  const curFilter = queryFilter(
    [currentTab.url],
    store.getState().rule.map(i => i.pattern)
  )[0];
  if (curFilter instanceof BlockingFilter) {
    chrome.browserAction.setIcon({ path: aIcon });
  } else {
    chrome.browserAction.setIcon({ path: dIcon });
  }
};

chrome.tabs.onUpdated.addListener(
  _.debounce(handleTabsUpdatedAndChanged, 1000 / 30)
);
chrome.tabs.onSelectionChanged.addListener(
  _.debounce(handleTabsUpdatedAndChanged, 1000 / 30)
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
  store.dispatch(toToggle(tabs[0].url));
};

chrome.browserAction.onClicked.addListener(
  _.debounce(handleBrowserActionClicked, 400)
);

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") chrome.runtime.openOptionsPage();
});

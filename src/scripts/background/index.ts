import queryStore from "@/store/query-store";
import queryFilter from "@/utils/query-filter";

import blockingIcon from "@/assets/blocking.png";
import whitelistIcon from "@/assets/whitelist.png";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import { GFWMode } from "@/actions/proxy";
import { addRule, deleteRule } from "@/actions/rule";

const store = queryStore(true);

async function handleTabsActivated() {
  const tabs: chrome.tabs.Tab[] = await new Promise(resolve => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });
  if (!tabs.length) return;

  const curTab = tabs[0];
  if (!curTab.url || !curTab.url.startsWith("http")) {
    chrome.browserAction.setIcon({ path: whitelistIcon });
    return;
  }

  const state = store.getState();
  const userRules = state.rule.map(i => i.pattern);

  let curFilter = queryFilter(curTab.url, userRules);
  if (!curFilter) {
    curFilter = queryFilter(curTab.url, state.proxy.gfwList);
  }

  if (curFilter instanceof BlockingFilter) {
    chrome.browserAction.setIcon({ path: blockingIcon });
  } else if (curFilter instanceof WhitelistFilter) {
    chrome.browserAction.setIcon({ path: whitelistIcon });
  } else {
    chrome.browserAction.setIcon({
      path: state.proxy.gfwMode === GFWMode.BLOCKLIST ? whitelistIcon : blockingIcon
    });
  }
}

chrome.tabs.onActivated.addListener(handleTabsActivated);

function handleTabsUpdated(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) {
  if (tab.active && changeInfo.status === "loading") {
    handleTabsActivated();
  }
}

chrome.tabs.onUpdated.addListener(handleTabsUpdated);

async function handleBrowserActionClicked() {
  const tabs: chrome.tabs.Tab[] = await new Promise(resolve => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });
  const curTab = tabs[0];
  if (!curTab || !curTab.url || !curTab.url.toLowerCase().startsWith("http")) {
    return;
  }
  const state = store.getState();
  const userRules = state.rule.map(i => i.pattern);
  const gfwRules = state.proxy.gfwList;

  const { hostname } = new URL(curTab.url);
  const pattern = userRules.find(rule => rule.replace(/^@@/, "") === hostname);
  // 存在对应的用户规则
  if (pattern) {
    store.dispatch(deleteRule(pattern));
    if (pattern.startsWith("@@")) store.dispatch(addRule(pattern.replace(/^@@/, "")));
    else store.dispatch(addRule("@@" + pattern));
  } else {
    let filter = queryFilter(curTab.url, gfwRules);
    // 存在于 gfwlist 中
    if (filter instanceof BlockingFilter) store.dispatch(addRule("@@" + hostname));
    else if (filter instanceof WhitelistFilter) store.dispatch(addRule(hostname));
    // 即不存在 用户规则 中，又不存在于 gfwlist 中
    else if (!filter) {
      if (state.proxy.gfwMode === GFWMode.BLOCKLIST) store.dispatch(addRule(hostname));
      else store.dispatch(addRule("@@" + hostname));
    }
  }

  if (curTab.id) {
    chrome.tabs.reload(curTab.id);
    // 改变 icon
    handleTabsActivated();
  }
}

chrome.browserAction.onClicked.addListener(handleBrowserActionClicked);

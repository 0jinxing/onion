import store from "@/store";
import queryFilter from "@/utils/query-filter";

import blockingIcon from "@/assets/blocking.png";
import whitelistIcon from "@/assets/whitelist.png";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import { GFWMode } from "@/actions/proxy";
import { addRule, deleteRule } from "@/actions/rule";

async function handleTabsChanged() {
  const tabs: chrome.tabs.Tab[] = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });
  if (!tabs.length) return;

  const curTab = tabs[0];
  if (!curTab.url || !curTab.url.startsWith("http")) {
    chrome.browserAction.setIcon({ path: whitelistIcon });
    return;
  }

  const state = store.getState();
  const userRules = state.rule.map((i) => i.pattern);

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
      path:
        state.proxy.gfwMode === GFWMode.BLOCKING ? whitelistIcon : blockingIcon,
    });
  }
}

chrome.tabs.onSelectionChanged.addListener(handleTabsChanged);

async function handleBrowserActionClicked() {
  const tabs: chrome.tabs.Tab[] = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, resolve);
  });
  const curTab = tabs[0];
  if (!curTab || !curTab.url || !curTab.url.toLowerCase().startsWith("http")) {
    return;
  }
  const state = store.getState();
  const userRules = state.rule.map((i) => i.pattern);
  const gfwRules = state.proxy.gfwList;

  let curFilter = queryFilter(curTab.url, userRules);
  const { hostname } = new URL(curTab.url);
  // 存在于用户规则中
  if (curFilter instanceof BlockingFilter) {
    store.dispatch(deleteRule(curFilter.text));
    store.dispatch(addRule("@@" + hostname));
  } else if (curFilter instanceof WhitelistFilter) {
    store.dispatch(deleteRule(curFilter.text));
    store.dispatch(addRule(hostname));
  }
  // 存在于 gfwlist 中
  if (!curFilter && (curFilter = queryFilter(curTab.url, gfwRules))) {
    if (curFilter instanceof BlockingFilter) {
      store.dispatch(addRule("@@" + hostname));
    } else if (curFilter instanceof WhitelistFilter) {
      store.dispatch(addRule(hostname));
    }
  }
  // 即不存在 用户规则 中，又不存在于 gfwlist 中
  if (!curFilter) {
    if (state.proxy.gfwMode === GFWMode.BLOCKING) {
      store.dispatch(addRule(hostname));
    } else {
      store.dispatch(addRule("@@" + hostname));
    }
  }

  if (curTab.id) {
    chrome.tabs.reload(curTab.id);
    // 改变 icon
    handleTabsChanged();
  }
}

chrome.browserAction.onClicked.addListener(handleBrowserActionClicked);

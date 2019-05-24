import {
  CombinedMatcher,
  Filter,
  BlockingFilter,
  WhitelistFilter
} from "../utils/pac-match";
import defaultPacRules from "../utils/default-pac-rules";
import { local, sync } from "../utils/storage";

const chrome = window.chrome;

(async () => {
  let lastHost; // 用于避免事件的重复触发
  let currentUrlHasProxy = false; // 判断点击 browser_action_icon 时，该进行的操作

  // chrome 数据加载加载
  let { enable, proxy, userRulesSerial } = await local.get([
    "enable",
    "proxy",
    "userRulesSerial"
  ]);

  // 图标
  if (!enable) chrome.browserAction.setIcon({ path: "proxy-unable.png" });

  // default matcher 初始化
  const defaultMatcher = new CombinedMatcher();
  defaultPacRules.forEach(rule => {
    defaultMatcher.add(Filter.fromText(rule));
  });
  // user matcher 初始化
  const userRules = (userRulesSerial || "").split(";").filter(rule => !!rule);
  const userRulesMatcher = new CombinedMatcher();
  userRules.forEach(rule => {
    userRulesMatcher.add(Filter.fromText(rule));
  });

  chrome.browserAction.onClicked.addListener(() => {
    // 未开启，打开选项页
    if (!enable) chrome.runtime.openOptionsPage();
    if (currentUrlHasProxy) {
      // 取消代理
    } else {
      // 启用代理
    }
  });

  chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
  });

  const handleTagUpdatedAndChanged = async () => {
    if (!enable) {
      chrome.browserAction.setIcon({ path: "proxy-unable.png" });
      return;
    }
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const location = new URL(tabs[0].url);
      const { href: url, host } = location;
      if (lastHost === host) return;
      lastHost = host;
      const ufilter = userRulesMatcher.matchesAny(url, host);
      const dfilter = defaultMatcher.matchesAny(url, host);
      if (ufilter instanceof BlockingFilter) {
        chrome.browserAction.setIcon({ path: "proxy-enable.png" });
        currentUrlHasProxy = true;
      } else if (ufilter instanceof WhitelistFilter) {
        chrome.browserAction.setIcon({ path: "proxy-unable.png" });
        currentUrlHasProxy = false;
      } else if (dfilter instanceof BlockingFilter) {
        chrome.browserAction.setIcon({ path: "proxy-enable.png" });
        currentUrlHasProxy = true;
      } else {
        chrome.browserAction.setIcon({ path: "proxy-unable.png" });
        currentUrlHasProxy = false;
      }
    });
  };
  chrome.tabs.onUpdated.addListener(handleTagUpdatedAndChanged);
  chrome.tabs.onSelectionChanged.addListener(handleTagUpdatedAndChanged);

  chrome.windows.onRemoved.addListener(() => {
    // @TODO async
  });

  // options 页面的数据更新
  chrome.runtime.onMessage.addListener(request => {
    const { type, data } = request;
    switch (type) {
      case "SWITCH":
        enable = data;
        chrome.browserAction.setIcon(
          enable ? "proxy_enable.png" : "proxy_unable.png"
        );
        // @TODO cancel proxy, sync data
        break;
      case "PROXY":
        proxy = data;
        // @TODO update proxy config，sync data
        break;
    }
  });
})();

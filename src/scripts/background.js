import createHelper from "../utils/create-helper";
import {
  chromeTabsQuery,
  chromeTabsReload,
  chromeBrowserActionSetIcon
} from "../utils/chrome-promisify";
const chrome = window.chrome;

(async () => {
  let lastUrl = "chrome://new"; // 用于避免事件的重复触发

  const helper = await createHelper();
  chrome.browserAction.onClicked.addListener(async () => {
    const resultArr = await chromeTabsQuery({
      active: true,
      lastFocusedWindow: true
    });
    const tabs = resultArr[0];
    if (!tabs || !tabs.length) return;
    const currentTag = tabs[0];
    let iconPath;
    if (!currentTag.url || !currentTag.url.startsWith("http")) return;
    else if (helper.check(currentTag.url)) {
      await helper.disallow(currentTag.url);
      iconPath = "proxy-unable.png";
    } else {
      await helper.allow(currentTag.url);
      iconPath = "proxy-enable.png";
    }
    await chromeTabsReload(currentTag.id);
    await chromeBrowserActionSetIcon({ path: iconPath });
  });

  chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
  });

  const handleTagUpdatedAndChanged = async () => {
    const resultArr = await chromeTabsQuery({
      active: true,
      lastFocusedWindow: true
    });
    const tabs = resultArr[0];
    if (!tabs.length) return;
    const url = tabs[0].url;
    const { host: curHost } = new URL(url);
    const { host: lastHost } = new URL(lastUrl);
    if (lastHost === curHost) return;
    lastUrl = url;
    let iconPath;
    if (helper.check(url)) iconPath = "proxy-enable.png";
    else iconPath = "proxy-unable.png";

    await chromeBrowserActionSetIcon({ path: iconPath });
  };

  chrome.tabs.onUpdated.addListener(handleTagUpdatedAndChanged);
  chrome.tabs.onSelectionChanged.addListener(handleTagUpdatedAndChanged);

  chrome.windows.onRemoved.addListener(async () => {
    await helper.state.pushState();
  });

  // options 页面的数据更新
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, data } = message;
    if (type === "REQUEST_PROXY_CHANGED") {
      helper.state.setProxy("PROXY localhost:1080").then(() => {
        sendResponse({ type: "PROXY_CHANGED", data });
      });
    }
    return true;
  });
})();

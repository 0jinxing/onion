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
    // 未开启，打开选项页
    if (!helper.state.getEnable()) chrome.runtime.openOptionsPage();
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
    if (!helper.state.getEnable) {
      chrome.browserAction.setIcon({ path: "proxy-unable.png" });
      return;
    }
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
  chrome.runtime.onMessage.addListener(request => {
    const { type, data } = request;
    switch (type) {
      case "SWITCH":
        helper.state.setEnable(data);
        chrome.browserAction.setIcon(
          data ? "proxy-enable.png" : "proxy-unable.png"
        );
        break;
      case "PROXY":
        helper.state.proxy = data;
        break;
    }
  });
})();

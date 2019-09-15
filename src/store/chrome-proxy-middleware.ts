import _ from "lodash";
import { Middleware } from "redux";
import { createPacScript, getCurrentFilter } from "../utils";
import { BlockingFilter } from "../lib/adblockplus";
import aIcon from "../assets/emoticon.png";
import dIcon from "../assets/emoticon_d.png";

import { setProxy } from "../actions/proxy";
import { toggle } from "../actions/rules";

const passingActions = [setProxy, toggle].map(a => a.toString());

const chromeProxyMiddleware: Middleware = store => {
  // Receive message
  chrome.runtime.onMessage.addListener(request => {
    store.dispatch({
      ...request,
      passed: true
    });
  });

  return next => action => {
    const {
      rules,
      proxy
    }: { rules: { val: string[] }; proxy: { val: string } } = store.getState();
    next(action);
    // Send message to options page or background script

    const {
      rules: nextRules,
      proxy: nextProxy
    }: { rules: { val: string[] }; proxy: { val: string } } = store.getState();

    if (_.isEqual(rules, nextRules) && _.isEqual(proxy, nextProxy)) return;

    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }

    const pacScript = createPacScript(`PROXY ${nextProxy.val};`, nextRules.val);

    const config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    chrome.proxy.settings.set({ value: config, scope: "regular" }, async () => {
      // Set browser action icon
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
      const url = tabs[0].url;

      const curFilter = getCurrentFilter(url, nextRules.val);
      if (curFilter instanceof BlockingFilter) {
        chrome.browserAction.setIcon({ path: aIcon });
      } else {
        chrome.browserAction.setIcon({ path: dIcon });
      }
    });
  };
};

export default chromeProxyMiddleware;

import _ from "lodash";
import { Middleware } from "redux";
import { createPacScript, getCurrentFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";
import aIcon from "@/assets/emoticon.png";
import dIcon from "@/assets/emoticon_d.png";

import { setProxy } from "@/actions/proxy";
import { toggle } from "@/actions/rule";
import { State } from "@/store";

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
    const { rule, proxy }: State = store.getState();
    next(action);
    // Send message to options page or background script

    const { rule: nextRule, proxy: nextProxy }: State = store.getState();

    if (_.isEqual(rule, nextRule) && _.isEqual(proxy, nextProxy)) return;

    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }

    const pacScript = createPacScript(
      `PROXY ${nextProxy.val};`,
      nextRule.val.map(i => i.pattern)
    );

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

      const curFilter = getCurrentFilter(
        url,
        nextRule.val.map(i => i.pattern)
      );
      if (curFilter instanceof BlockingFilter) {
        chrome.browserAction.setIcon({ path: aIcon });
      } else {
        chrome.browserAction.setIcon({ path: dIcon });
      }
    });
  };
};

export default chromeProxyMiddleware;

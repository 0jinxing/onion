import _ from "lodash";
import { Middleware } from "redux";
import { createPacScript, queryFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";
import aIcon from "@/assets/emoticon.png";
import dIcon from "@/assets/emoticon_d.png";

import { setProxy } from "@/actions/proxy";
import { toggle, allow, disallow } from "@/actions/rule";
import { report } from "@/actions/report";
import { State } from "@/store";

const passingActions = [setProxy, toggle, allow, disallow, report].map(a =>
  a.toString()
);

const extRuntime = document.location.protocol === "chrome-extension:";

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

    // Send message to other store
    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }

    const { rule: nextRule, proxy: nextProxy }: State = store.getState();

    const hasChanged = _.isEqual(rule, nextRule) && _.isEqual(proxy, nextProxy);

    if (!extRuntime || hasChanged) return;

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

      const curFilter = queryFilter(
        [url],
        nextRule.val.map(i => i.pattern)
      )[0];
      if (curFilter instanceof BlockingFilter) {
        chrome.browserAction.setIcon({ path: aIcon });
      } else {
        chrome.browserAction.setIcon({ path: dIcon });
      }
    });
  };
};

export default chromeProxyMiddleware;

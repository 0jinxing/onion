import _ from "lodash";
import { Middleware } from "redux";
import { createPacScript, getCurrentFilter } from "../utils";
import { BlockingFilter } from "../lib/adblockplus";
import aIcon from "../assets/emoticon.png";
import dIcon from "../assets/emoticon_d.png";

const chromeProxyMiddleware: Middleware = store => next => action => {
  const {
    rules,
    proxy
  }: { rules: { val: string[] }; proxy: { val: string } } = store.getState();
  next(action);
  const {
    rules: nextRules,
    proxy: nextProxy
  }: { rules: { val: string[] }; proxy: { val: string } } = store.getState();

  if (_.isEqual(rules, nextRules) && _.isEqual(proxy, nextProxy)) return;

  const pacScript = createPacScript(nextProxy.val, nextRules.val);

  // Send message to options page
  chrome.runtime.sendMessage(action);

  const config = {
    mode: "pac_script",
    pacScript: { data: pacScript }
  };
  chrome.proxy.settings.set({ value: config, scope: "regular" }, async () => {
    console.log(nextRules.val, nextProxy.val, {
      value: config,
      scope: "regular"
    });
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

export default chromeProxyMiddleware;

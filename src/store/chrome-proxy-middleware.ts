import { Middleware } from "redux";
import { GFWMode } from "@/actions/proxy";

import { RootState } from "./query-store";

import createPAC from "@/utils/create-pac";
import queryFilter from "@/utils/query-filter";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import blockingIcon from "@/assets/blocking.png";
import whitelistIcon from "@/assets/whitelist.png";

const isHttpDocument = /https?/.test(document.location.protocol);

const chromeProxyMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    const state: RootState = store.getState();
    next(action);
    const nextState: RootState = store.getState();

    let hasProxyChange = false;

    const patterns = state.rule.map((i) => i.pattern);
    const nextPatterns = nextState.rule.map((i) => i.pattern);
    // 比较代价小的
    if (state.proxy.proxyUrl !== nextState.proxy.proxyUrl) {
      hasProxyChange = !!nextState.proxy.proxyUrl;
    } else if (state.proxy.gfwMode !== nextState.proxy.gfwMode) {
      hasProxyChange = true;
    } else if (state.proxy.gfwList.length !== nextState.proxy.gfwList.length) {
      hasProxyChange = true;
    } else if (state.rule.length !== nextState.rule.length) {
      hasProxyChange = true;
    } else {
      const sortPatters = patterns.sort();
      const sortNextPatterns = nextPatterns.sort();
      const ruleChange = sortPatters.some((pattern, ind) => {
        return pattern !== sortNextPatterns[ind];
      });
      hasProxyChange = ruleChange;

      if (!hasProxyChange) {
        const sortGFWList = state.proxy.gfwList.sort();
        const sortNextGFWList = nextState.proxy.gfwList.sort();
        hasProxyChange = sortGFWList.some((item, ind) => {
          return item !== sortNextGFWList[ind];
        });
      }
    }
    // 不需要更新 chrome 代理设置
    if (!hasProxyChange) return;

    // 需要更新 chrome 代理设置
    const pacScript = createPAC(
      nextState.proxy.proxyUrl,
      nextState.proxy.gfwList,
      nextPatterns,
      state.proxy.gfwMode === GFWMode.BLOCKLIST
    );

    const proxyConfig = {
      mode: "pac_script",
      pacScript: { data: pacScript },
    };

    chrome.proxy.settings.set(
      { value: proxyConfig, scope: "regular" },
      async () => {
        if (!isHttpDocument) return;

        let curFilter = queryFilter(document.location.href, nextPatterns);

        if (!curFilter) {
          curFilter = queryFilter(
            document.location.href,
            nextState.proxy.gfwList
          );
        }

        if (nextState.proxy.gfwMode === GFWMode.WHITELIST) {
          if (curFilter instanceof WhitelistFilter) {
            chrome.browserAction.setIcon({ path: whitelistIcon });
          } else {
            chrome.browserAction.setIcon({ path: blockingIcon });
          }
        } else {
          if (curFilter instanceof BlockingFilter) {
            chrome.browserAction.setIcon({ path: blockingIcon });
          } else {
            chrome.browserAction.setIcon({ path: whitelistIcon });
          }
        }
      }
    );
  };
};

export default chromeProxyMiddleware;

import { Middleware, Action } from "redux";

import { RuleTypeEnum } from "@/actions/rule";
import { ProxyTypeEnum, GFWMode } from "@/actions/proxy";
import { ReportTypeEnum } from "@/actions/report";

import { State } from "./index";

import createPAC from "@/utils/create-pac";
import queryFilter from "@/utils/query-filter";
import { BlockingFilter, WhitelistFilter } from "@/lib/adblockplus";
import blockingIcon from "@/assets/blocking.png";
import whitelistIcon from "@/assets/whitelist.png";

// 需要同步效果的 action
const passingActions = [
  RuleTypeEnum.ADD_RULE,
  RuleTypeEnum.DELETE_RULE,
  ProxyTypeEnum.UPDATE_PROXY_URL,
  ProxyTypeEnum.UPDATE_GFW_LIST,
  ReportTypeEnum.TO_REPORT,
];

const isHttpDocument = /https?/.test(document.location.protocol);

const chromeProxyMiddleware: Middleware = (store) => {
  // Receive message
  chrome.runtime.onMessage.addListener((request: Action) => {
    // dispatch 保持多个 store 数据一致
    // passed 标记，避免重复的 dispatch
    if (passingActions.indexOf(request && request.type) >= 0) {
      store.dispatch({
        ...request,
        passed: true,
      });
    }
  });

  return (next) => (action) => {
    const state: State = store.getState();
    next(action);
    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }
    const nextState: State = store.getState();

    let hasProxyChange = false;

    const patterns = state.rule.map((i) => i.pattern);
    const nextPatterns = nextState.rule.map((i) => i.pattern);
    // 比较代价小的
    if (state.proxy.proxyUrl !== nextState.proxy.proxyUrl) {
      hasProxyChange = !!nextState.proxy.proxyUrl;
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
      `PROXY ${nextState.proxy.proxyUrl};`,
      nextState.proxy.gfwList,
      nextPatterns,
      state.proxy.gfwMode === GFWMode.BLOCKING
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

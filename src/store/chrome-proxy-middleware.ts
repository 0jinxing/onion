import { isEqual } from "lodash";
import { Middleware } from "redux";

import { RuleTypeEnum } from "@/actions/rule";
import { ProxyTypeEnum } from "@/actions/proxy";
import { ReportTypeEnum } from "@/actions/report";

import { State } from "./index";

// 需要同步效果的 action
const passingActions = [
  RuleTypeEnum.ADD_RULE,
  RuleTypeEnum.DELETE_RULE,
  ProxyTypeEnum.UPDATE_PROXY_URL,
  ProxyTypeEnum.UPDATE_GFW_LIST,
  ReportTypeEnum.TO_REPORT
];

const isHttpDocument = /https?/.test(document.location.protocol);

const chromeProxyMiddleware: Middleware = store => {
  // Receive message
  chrome.runtime.onMessage.addListener(request => {
    // dispatch 保持多个 store 数据一致
    // passed 标记，避免重复的 dispatch
    store.dispatch({
      ...request,
      passed: true
    });
  });

  return next => action => {
    const state: State = store.getState();
    next(action);
    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }
    const nextState: State = store.getState();

    const hasProxyChange =
      isEqual(state.proxy, nextState.proxy) ||
      isEqual(state.rule, nextState.rule);
    // 需要更新 chrome 代理设置
    if (hasProxyChange) {
    }
  };
};

export default chromeProxyMiddleware;

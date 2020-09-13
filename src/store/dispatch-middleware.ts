import { Action, Middleware } from "redux";

import { RuleTypeEnum } from "@/actions/rule";
import { ProxyTypeEnum } from "@/actions/proxy";
import { LoadingTypeEnum } from "@/actions/loading";
import { ErrorTypeEnum } from "@/actions/error";

// 需要同步效果的 action
const passingActions = [
  RuleTypeEnum.ADD_RULE,
  RuleTypeEnum.DELETE_RULE,

  ProxyTypeEnum.UPDATE_GFW_MODE,
  ProxyTypeEnum.UPDATE_PROXY_URL,
  ProxyTypeEnum.UPDATE_GFW_URL,
  ProxyTypeEnum.UPDATE_GFW_LIST,

  LoadingTypeEnum.START_LOADING,
  LoadingTypeEnum.END_LOADING,

  ErrorTypeEnum.THROW_ERROR,
  ErrorTypeEnum.CATCH_ERROR
];

// 接受和分发 action 的中间件
const dispatchMiddleware: Middleware = store => {
  // Receive message
  chrome.runtime.onMessage.addListener((request: Action) => {
    // dispatch 保持多个 store 数据一致
    // passed 标记，避免重复的 dispatch
    if (passingActions.indexOf(request && request.type) >= 0) {
      store.dispatch({
        ...request,
        passed: true
      });
    }
  });
  return next => action => {
    if (passingActions.indexOf(action.type) >= 0 && !action.passed) {
      chrome.runtime.sendMessage(action);
    }
    next(action);
  };
};

export default dispatchMiddleware;

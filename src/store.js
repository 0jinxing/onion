import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { local, sync } from "./utils/storage";
import {
  CombinedMatcher,
  Filter,
  BlockingFilter,
  WhitelistFilter
} from "./utils/pac-match";

// 涉及读写 local，读 sync 操作
const reducer = (state = {}, action) => {
  const url = location.href;
  const host = location.host;

  const data = action.payload ? action.payload.data || {} : {};
  const userRules = action.payload ? action.payload.userRules || [] : [];
  const userRulesMatcher = new CombinedMatcher();
  userRules.forEach(rule => {
    userRulesMatcher.add(Filter.fromText(rule));
  });
  const ufilter = userRulesMatcher.matchesAny(url, host);

  let newUserRules = [];

  switch (action.type) {
    case "INIT_STATE":
      local.set(data);
      return {
        ...state,
        userRules: (data.userRulesSerial || "").split(";"),
        enable: !!data.enable
      };
    case "TURN_OFF_OP":
      local.set({ enable: false });
      return {
        ...state,
        enable: false
      };
    case "TURN_ON_OP":
      local.set({ enable: true });
      return {
        ...state,
        enable: true
      };
    case "PROXY_HOST":
      // 已存在用户规则返回
      if (ufilter instanceof BlockingFilter) {
        return state;
      }
      // 添加对应规则
      newUserRules = [...userRules, host];
      // 删除对应白名单规则
      if (ufilter instanceof WhitelistFilter) {
        newUserRules = newUserRules.splice(
          newUserRules.indexOf(ufilter.text),
          1
        );
      }
      local.set({ userRulesSerial: newUserRules.join(";") });
      return {
        ...state,
        userRules: newUserRules
      };
    case "CANCEL_PROXY_HOST":
      // 已存在白名单
      if (ufilter instanceof WhitelistFilter) {
        return state;
      }
      newUserRules = [...userRules, `@@${host}`];

      // 删除对应的 Blocking 规则
      if (ufilter instanceof BlockingFilter) {
        newUserRules = newUserRules.splice(
          newUserRules.indexOf(ufilter.text),
          1
        );
      }
      local.set({ userRulesSerial: newUserRules.join(";") });
      return {
        ...state,
        userRules: newUserRules
      };
  }
};

export const turnOffOP = () => ({ type: "TURN_OFF_OP" });

export const turnOnOP = () => ({ type: "TURN_ON_OP" });

export const initState = () => {
  return async dispatch => {
    const syncData = await sync.get(["enable", "userRulesSerial"]);
    const localData = await local.get(["enable", "userRulesSerial"]);
    dispatch({
      type: "INIT_STATE",
      payload: { data: { ...syncData, ...localData } }
    });
  };
};

export const proxyHost = () => {
  return async dispatch => {
    const userRulesSerial = await local.get(["userRulesSerial"])[
      "userRulesSerial"
    ];
    const userRules = (userRulesSerial || "").split(";").filter(rule => !!rule);
    dispatch({ type: "PROXY_HOST", payload: { userRules } });
  };
};

export const cancelProxyHost = () => {
  return async dispatch => {
    const userRulesSerial = await local.get(["userRulesSerial"])[
      "userRulesSerial"
    ];
    const userRules = (userRulesSerial || "").split(";").filter(rule => !!rule);
    dispatch({ type: "CANCEL_PROXY_HOST", payload: { userRules } });
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));
store.dispatch(initState());

export default store;

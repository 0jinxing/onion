import { Action, ActionCreator } from "redux";

export enum ProxyTypeEnum {
  UPDATE_PROXY_URL = "proxy/update_proxy_url",
  UPDATE_GFW_URL = "proxy/update_gfw_url",
  UPDATE_GFW_MODE = "proxy/update_gfw_mode",
  EMIT_FETCH_GFW_LIST = "proxy/emit_fetch_gfw_list",
  UPDATE_GFW_LIST = "proxy/update_gfw_list"
}

export enum GFWMode {
  BLOCKING = "BLOCKING",
  WHITELIST = "WHITELIST"
}

interface ProxyUrlAction extends Action {
  type: ProxyTypeEnum.UPDATE_PROXY_URL;
  payload: { proxyUrl: string };
}

interface GFWUrlAction extends Action {
  type: ProxyTypeEnum.UPDATE_GFW_URL;
  payload: { gfwUrl: string };
}

interface GFWModeAction extends Action {
  type: ProxyTypeEnum.UPDATE_GFW_MODE;
  payload: { gfwMode: GFWMode };
}

interface GFWListAction extends Action {
  type: ProxyTypeEnum.UPDATE_GFW_LIST;
  payload: { gfwList: string[] };
}

interface EmitFetchAction extends Action {
  type: ProxyTypeEnum.EMIT_FETCH_GFW_LIST;
}

export type ProxyAction =
  | ProxyUrlAction
  | GFWUrlAction
  | GFWModeAction
  | GFWListAction
  | EmitFetchAction;

export const updateProxyUrl: ActionCreator<ProxyUrlAction> = (proxyUrl: string) => {
  return { type: ProxyTypeEnum.UPDATE_PROXY_URL, payload: { proxyUrl } };
};

export const updateGFWMode: ActionCreator<GFWModeAction> = (mode: GFWMode) => {
  return { type: ProxyTypeEnum.UPDATE_GFW_MODE, payload: { gfwMode: mode } };
};

export const updateGFWUrl: ActionCreator<GFWUrlAction> = (gfwUrl: string) => {
  return {
    type: ProxyTypeEnum.UPDATE_GFW_URL,
    payload: { gfwUrl }
  };
};

export const emitFetchGFWList: ActionCreator<EmitFetchAction> = () => {
  return { type: ProxyTypeEnum.EMIT_FETCH_GFW_LIST };
};

export const updateGFWList: ActionCreator<GFWListAction> = (list: string[]) => {
  return {
    type: ProxyTypeEnum.UPDATE_GFW_LIST,
    payload: { gfwList: list }
  };
};

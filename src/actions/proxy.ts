import { Action } from "redux";

export enum ProxyTypeEnum {
  UPDATE_PROXY_URL = "UPDATE_PROXY_URL",
  UPDATE_GFW_URL = "UPDATE_GFW_URL",
  UPDATE_GFW_MODE = "UPDATE_GFW_MODE",
  EMIT_FETCH_GFW_LIST = "EMIT_FETCH_GFW_LIST",
  UPDATE_GFW_LIST = "UPDATE_GFW_LIST",
}

export enum GFWMode {
  BLACKLIST = "blacklist",
  WHITELIST = "whitelist",
}

const {
  UPDATE_PROXY_URL,
  UPDATE_GFW_URL,
  UPDATE_GFW_MODE,
  EMIT_FETCH_GFW_LIST,
  UPDATE_GFW_LIST,
} = ProxyTypeEnum;

export interface ProxyAction extends Action {
  payload: {
    proxyUrl?: string;
    gfwUrl?: string;
    gfwMode?: GFWMode;
    gfwList?: string[];
    error?: Error;
  };
}

export const updateProxyUrl = (proxyUrl: string) => {
  return { type: UPDATE_PROXY_URL, payload: { proxyUrl } };
};

export const updateGFWMode = (mode: GFWMode) => {
  return { type: UPDATE_GFW_MODE, payload: { gfwMode: mode } };
};

export const updateGFWUrl = (gfwUrl: string) => {
  return {
    type: UPDATE_GFW_URL,
    payload: { gfwUrl },
  };
};

export const emitFetchGFWList = () => {
  return { type: EMIT_FETCH_GFW_LIST, payload: {} };
};

export const updateGFWList = (list: string[]) => {
  return {
    type: UPDATE_GFW_LIST,
    payload: { gfwList: list },
  };
};

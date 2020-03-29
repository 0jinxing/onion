import { Action } from "redux";

export enum ProxyTypeEnum {
  "SET_PROXY",
  "UPDATE_GFW_LIST"
}

export interface ProxyAction extends Action {
  payload: {
    proxy?: string;
    gfwUrl?: string;
    gfwList: string[];
  };
}

export const setProxy = (proxy: string) => {
  return {
    type: "SET_PROXY",
    payload: { proxy }
  };
};

export const updateGFWList = (url: string, list: string[] = []) => {
  return {
    type: "UPDATE_GFW_LIST",
    payload: { gfwUrl: url, gfwList: list }
  };
};

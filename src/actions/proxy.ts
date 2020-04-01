import { Action } from "redux";

export enum ProxyTypeEnum {
  SET_PROXY = "SET_PROXY",
  UPDATE_GFW_URL = "UPDATE_GFW_URL",

  // Saga
  FETCH_GFW_LIST = "FETCH_GFW_LIST",
  UPDATE_GFW_LIST = "UPDATE_GFW_LIST",
  START_UPDATE_GFW_LIST = "START_UPDATE_GFW_LIST",
  FINALLY_UPDATE_GFW_LIST = "FINALLY_UPDATE_GFW_LIST",
  THROW_UPDATE_GFW_LIST = "THROW_UPDATE_GFW_LIST",
  CATCH_UPDATE_GFW_LIST = "CATCH_UPDATE_GFW_LIST"
}

const {
  SET_PROXY,
  UPDATE_GFW_URL,
  FETCH_GFW_LIST,
  UPDATE_GFW_LIST,
  START_UPDATE_GFW_LIST,
  FINALLY_UPDATE_GFW_LIST,
  THROW_UPDATE_GFW_LIST,
  CATCH_UPDATE_GFW_LIST
} = ProxyTypeEnum;

export interface ProxyAction extends Action {
  payload: {
    proxy?: string;
    gfwUrl?: string;
    gfwList?: string[];
    error?: Error;
  };
}

export const setProxy = (proxy: string) => {
  return { type: SET_PROXY, payload: { proxy } };
};

export const updateGFWUrl = (gfwUrl: string) => {
  return {
    type: UPDATE_GFW_URL,
    payload: { gfwUrl }
  };
};

export const fetchGFWList = () => {
  return { type: FETCH_GFW_LIST, payload: {} };
};

export const updateGFWList = (list: string[]) => {
  return {
    type: UPDATE_GFW_LIST,
    payload: { gfwList: list }
  };
};

export const startUpdateGFWList = () => {
  return { type: START_UPDATE_GFW_LIST, payload: {} };
};

export const finallyUpdateGFWList = () => {
  return { type: FINALLY_UPDATE_GFW_LIST, payload: {} };
};

export const throwUpdateGFWList = (error: Error) => {
  return { type: THROW_UPDATE_GFW_LIST, payload: { error } };
};

export const catchUpdateGFWList = () => {
  return { type: CATCH_UPDATE_GFW_LIST, payload: {} };
};

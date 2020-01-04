import { createAction } from "redux-actions";

// types
export type ProxyState = { val: string };
export type ProxyPayload = { proxy: string };

export const setProxy = createAction("SET_PROXY", (proxy: string) => ({
  proxy
}));

import { createAction } from "redux-actions";

export type ProxyPayload = { proxy: string };
export type ProxyState = { val: string };

export const setProxy = createAction("SET_PROXY", (proxy: string) => ({
  proxy
}));

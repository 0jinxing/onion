import { createAction, Action } from "redux-actions";

export type ProxyAction = Action<{ proxy: string }>;

export const setProxy = createAction("SET_PROXY", (proxy: string) => ({
  proxy
}));

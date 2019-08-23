import { createAction } from "redux-actions";

export const allow = createAction("ALLOW", (url: string) => ({ url }));
export const disallow = createAction("DISALLOW", (url: string) => ({ url }));
export const toggle = createAction("TOGGLE", (url: string) => ({ url }));
export const setProxy = createAction("SET_PROXY", (proxy: string) => ({
  proxy
}));
export const updateProxy = createAction("UPDATE_PROXY");
export const updateActionIcon = createAction(
  "UPDATE_ACTION_ICON",
  (url: string) => ({ url })
);

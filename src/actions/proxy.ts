import { createAction } from "redux-actions";

export const setProxy = createAction("SET_PROXY", (proxy: string) => ({
  proxy
}));

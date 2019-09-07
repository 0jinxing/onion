import { createAction } from "redux-actions";

export const toggle = createAction("TOGGLE", (url: string) => ({ url }));
export const allow = createAction("ALLOW", (host: string, delInd?: number) => ({
  host,
  delInd
}));
export const disallow = createAction(
  "DISALLOW",
  (host: string, delInd?: number) => ({ host, delInd })
);

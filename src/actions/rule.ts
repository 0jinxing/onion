import { createAction, Action } from "redux-actions";

export type RuleAction = Action<{
  host: string;
  delInd?: number;
}>;

export const toggle = createAction("TOGGLE", (url: string) => ({ url }));
export const allow = createAction("ALLOW", (host: string, delInd?: number) => ({
  host,
  delInd
}));
export const disallow = createAction(
  "DISALLOW",
  (host: string, delInd?: number) => ({ host, delInd })
);

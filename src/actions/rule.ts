import { createAction, Action } from "redux-actions";

export type RuleAction = Action<{
  hostname: string;
  delInd?: number;
}>;

export const toggle = createAction("TOGGLE", (url: string) => ({ url }));
export const allow = createAction("ALLOW", (hostname: string, delInd?: number) => ({
  hostname,
  delInd
}));
export const disallow = createAction(
  "DISALLOW",
  (hostname: string, delInd?: number) => ({ hostname, delInd })
);

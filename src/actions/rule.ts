import { createAction } from "redux-actions";

// types
export type Rule = { pattern: string; timestamp: number };
export type RuleState = { val: Rule[] };
export type RulePayload = { hostname: string; delInd: number };
export type TogglePayload = { url: string };

export const toggle = createAction("TOGGLE", (url: string) => ({ url }));

export const allow = createAction(
  "ALLOW",
  (hostname: string, delInd?: number) => ({
    hostname,
    delInd
  })
);

export const disallow = createAction(
  "DISALLOW",
  (hostname: string, delInd?: number) => ({ hostname, delInd })
);

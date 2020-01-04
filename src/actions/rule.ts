import { createAction } from "redux-actions";

// types
export type Rule = { pattern: string; timestamp: number };
export type RuleState = { val: Rule[] };

export type AllowPayload = { hostname: string; delInd: number };
export type DelePayload = { pattern: string[] };
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

export const dele = createAction("DELE", (patterns: string[]) => ({
  patterns
}));

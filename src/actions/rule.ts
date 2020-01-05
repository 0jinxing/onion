import { createAction } from "redux-actions";

// types
export type Rule = { pattern: string; timestamp: number };

export const toToggle = createAction("TOGGLE", (url: string) => url);

export const toAllow = createAction(
  "ALLOW",
  (hostname: string, delInd?: number) => ({ hostname, delInd })
);

export const toDisallow = createAction(
  "DISALLOW",
  (hostname: string, delInd?: number) => ({ hostname, delInd })
);

export const toDelete = createAction("DELETE", (patterns: string[]) => patterns);

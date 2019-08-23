import { createAction } from "redux-actions";

export const allow = createAction("ALLOW", (url: string) => ({ url }));
export const disallow = createAction("DISALLOW", (url: string) => ({ url }));
export const toggle = createAction("TOGGLE", (url: string) => ({ url }));

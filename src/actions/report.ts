import { createAction } from "redux-actions";

// types
export type Report = { hostname: string; href: string; timestamp: number };

export const report = createAction("REPORT", (url: string) => url);

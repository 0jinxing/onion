import { createAction } from "redux-actions";

// types
export type Report = { hostname: string; href: string; timestamp: number };

export const toReport = createAction("REPORT", (url: string) => url);

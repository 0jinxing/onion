import { createAction, Action } from "redux-actions";

export type ReportAction = Action<{ url: string }>;

export const report = createAction("REPORT", (url: string) => ({ url }));

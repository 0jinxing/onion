import { ErrorAction } from "@/actions/error";

export type ErrorState = { [key: string]: Error | null };

export default function errorReducer(
  state: ErrorState = {},
  action: ErrorAction
) {
  return state;
}

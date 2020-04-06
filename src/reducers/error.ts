import { ErrorAction } from "@/actions/error";
export default function errorReducer(
  state: { [key: string]: Error | null } = {},
  action: ErrorAction
) {
  return state;
}

import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { allow, disallow, toggle } from "../actions/rules";
import {
  CombinedMatcher,
  Filter,
  BlockingFilter,
  WhitelistFilter
} from "../lib/adblockplus";
import { dMatcher } from "../utils/default-pac-rules";

const rulesSelector = (state: { val: Array<string> }) => state.val;
const uMatcherSelector = createSelector(
  rulesSelector,
  rules => {
    return rules.reduce((pre, cur) => {
      pre.add(Filter.fromText(cur));
      return pre;
    }, new CombinedMatcher());
  }
);

export default handleActions(
  {
    [toggle.toString()]: (
      state: { val: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      const { href, host } = new URL(url);
      const uMatcher = uMatcherSelector(state);
      const uFilter = uMatcher.matchesAny(href, host);
      let isBlocking = false;
      if (uFilter instanceof WhitelistFilter) {
        isBlocking = false;
      } else if (uFilter instanceof BlockingFilter) {
        isBlocking = true;
      } else {
        const dFilter = dMatcher.matchesAny(href, host);
        isBlocking = dFilter instanceof BlockingFilter;
      }
      // @TODO
      if (isBlocking) {
      } else {
      }
      return state;
    }
  },
  { val: [] }
);

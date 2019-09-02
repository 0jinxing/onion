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
    [allow.toString()]: (
      state: { val: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      // @TODO
      const { val: rules } = state;
      const { href, host } = new URL(url);

      const uMatcher = uMatcherSelector(state);

      const uFilter = uMatcher.matchesAny(href, host);
      if (uFilter instanceof BlockingFilter) {
        return { ...state };
      }
      const nRules = [...rules, host];
      return { ...state, val: nRules };
    },

    [disallow.toString()]: (
      state: { val: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      const { val: rules } = state;
      const { href, host } = new URL(url);

      const uMatcher = uMatcherSelector(state);
      const uFilter = uMatcher.matchesAny(href, host);

      if (uFilter instanceof WhitelistFilter) {
        return { ...state };
      } else if (uFilter instanceof BlockingFilter) {
        const delInd = rules.indexOf((uFilter as Filter).text);
        rules.splice(delInd, 1);
      }
      const nRules = [...rules, "@@" + host];

      return { ...state, val: nRules };
    },

    [toggle.toString()]: (
      state: { val: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      // @TODO
      const { val: rules } = state;
      const uMatcher = uMatcherSelector(state);

      return state;
    }
  },
  { val: [] }
);

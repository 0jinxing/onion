import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import {
  allow,
  disallow,
  toggle,
  setProxy,
  updateProxy,
  updateActionIcon
} from "../actions";
import {
  CombinedMatcher,
  Filter,
  BlockingFilter,
  WhitelistFilter
} from "../libs/adblockplus";

const rulesSelector = (state: { rules: Array<string> }) => state.rules;
const uMatcherSelector = createSelector(
  rulesSelector,
  rules => {
    return rules.reduce((pre, cur) => {
      pre.add(Filter.fromText(cur));
      return pre;
    }, new CombinedMatcher());
  }
);

const reducer = handleActions(
  {
    [allow.toString()]: (
      state: { rules: Array<string>; proxy: string },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      // @TODO
      const { rules } = state;
      const { href, host } = new URL(url);

      const uMatcher = uMatcherSelector(state);

      const uFilter = uMatcher.matchesAny(href, host);
      if (uFilter instanceof BlockingFilter) {
        return { ...state };
      }
      const nRules = [...rules, host];
      return { ...state, rules: nRules };
    },

    [disallow.toString()]: (
      state: { rules: Array<string>; proxy: string },
      { payload: { url } }: { payload: { url: string } }
    ) => {
      const { rules } = state;
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

      return { ...state, rules: nRules };
    },

    [toggle.toString()]: (
      state: { rules: Array<string>; proxy: string },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),

    [updateActionIcon.toString()]: (
      state: { rules: Array<string>; proxy: string },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    })
  },
  { rules: [], proxy: "PROXY 127.0.0.1:1080" }
);

export default reducer;

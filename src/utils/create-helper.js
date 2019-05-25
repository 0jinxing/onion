import { BlockingFilter, WhitelistFilter } from "./pac-match";
import createState from "./create-state";

let state = null;
const createHelper = async () => {
  state = state ? state : await createState();
  return {
    state,
    allow: async url => {
      const { href, host } = new URL(url);
      const ufilter = state.getUserRulesMatcher().matchesAny(href, host);
      const userRules = state.getUserRules();
      if (ufilter instanceof BlockingFilter) return;
      else if (ufilter instanceof WhitelistFilter) {
        const delInd = userRules.indexOf(ufilter.text);
        userRules.splice(delInd, 1);
      }
      await state.setUserRules([...userRules, host]);
    },
    disallow: async url => {
      const { href, host } = new URL(url);
      const ufilter = state.getUserRulesMatcher().matchesAny(href, host);
      const userRules = state.getUserRules();
      if (ufilter instanceof WhitelistFilter) return;
      else if (ufilter instanceof BlockingFilter) {
        const delInd = userRules.indexOf(ufilter.text);
        userRules.splice(delInd, 1);
      }
      await state.setUserRules([...userRules, "@@" + host]);
    },
    check: url => {
      const { href, host } = new URL(url);
      const ufilter = state.getUserRulesMatcher().matchesAny(href, host);
      if (ufilter instanceof WhitelistFilter) return false;
      else if (ufilter instanceof BlockingFilter) return true;
      const dfilter = state.getDefaultMatcher().matchesAny(href, host);
      return dfilter instanceof BlockingFilter;
    }
  };
};

export default createHelper;

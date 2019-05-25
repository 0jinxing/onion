import { BlockingFilter, WhitelistFilter } from "./pac-match";
import createState from "./create-state";

let state = null;
const createHelper = async () => {
  state = state ? state : await createState();
  return {
    state,
    enableProxy: () => {
      state.enable = true;
    },
    unableProxy: () => {
      state.enable = false;
    },
    setProxy: val => {
      state.proxy = val;
    },
    allow: (url, host) => {
      const ufilter = state.userRulesMatcher.matchesAny(url, host);
      if (ufilter instanceof BlockingFilter) return;
      else if (ufilter instanceof WhitelistFilter) {
        const delInd = state.userRules.indexOf(ufilter.text);
        state.userRules = [...state.userRules.splice(delInd, 1), host];
      } else {
        state.userRules = [state.userRules, host];
      }
    },
    disallow: (url, host) => {
      const ufilter = state.userRulesMatcher.matchesAny(url, host);
      if (ufilter instanceof WhitelistFilter) return;
      else if (ufilter instanceof BlockingFilter) {
        const delInd = state.userRules.indexOf(ufilter.text);
        state.userRules = [...state.userRules.splice(delInd, 1), "@@" + host];
      } else {
        state.userRules = [state.userRules, "@@" + host];
      }
    },
    check: (url, host) => {
      const ufilter = state.userRulesMatcher.matchesAny(url, host);
      if (ufilter instanceof WhitelistFilter) return false;
      else if (ufilter instanceof BlockingFilter) {
        return true;
      }
      return (
        state.defaultMatcher.matchesAny(url, host) instanceof BlockingFilter
      );
    }
  };
};

export default createHelper;

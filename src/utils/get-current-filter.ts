import { Filter, CombinedMatcher } from "../lib/adblockplus";
import { dMatcher } from "./default-pac-rules";

const getCurrentFilter = (url: string, rules: string[]): null | Filter => {
  const { host, href } = new URL(url);
  const uMatcher = rules.reduce((pre, cur) => {
    pre.add(Filter.fromText(cur));
    return pre;
  }, new CombinedMatcher());

  const uFilter = uMatcher.matchesAny(href, host);
  if (uFilter) return uFilter;
  return dMatcher.matchesAny(href, host);
};

export default getCurrentFilter;

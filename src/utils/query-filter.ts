import { Filter, CombinedMatcher } from "@/lib/adblockplus";
import { defaultMatcher } from "./default-pac-list";

const queryFilter = (urls: string[], patterns: string[]): (null | Filter)[] => {
  const oUrlArr = urls.map(u => new URL(u));
  const userMatcher = patterns.reduce((pre, cur) => {
    pre.add(Filter.fromText(cur));
    return pre;
  }, new CombinedMatcher());

  return oUrlArr.map((url: URL) => {
    const { hostname, href } = url;
    const userFilter = userMatcher.matchesAny(href, hostname);
    if (userFilter) return userFilter;
    return defaultMatcher.matchesAny(href, hostname);
  });
};

export default queryFilter;

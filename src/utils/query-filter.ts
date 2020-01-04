import { Filter, CombinedMatcher } from "@/lib/adblockplus";
import { dMatcher } from "./default-pac-list";

const queryFilter = (urls: string[], patterns: string[]): (null | Filter)[] => {
  const oUrlArr = urls.map(u => new URL(u));
  const uMatcher = patterns.reduce((pre, cur) => {
    pre.add(Filter.fromText(cur));
    return pre;
  }, new CombinedMatcher());

  return oUrlArr.map((url: URL) => {
    const { hostname, href } = url;
    const uFilter = uMatcher.matchesAny(href, hostname);
    if (uFilter) return uFilter;
    return dMatcher.matchesAny(href, hostname);
  });
};

export default queryFilter;

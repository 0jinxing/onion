import { Filter, CombinedMatcher } from "@/lib/adblockplus";

function queryFilter(url: string, patterns: string[]): Filter | null {
  const matcher = patterns.reduce((_matcher, pattern) => {
    _matcher.add(Filter.fromText(pattern));
    return _matcher;
  }, new CombinedMatcher());

  const { hostname, href } = new URL(url);

  return matcher.matchesAny(href, hostname);
}

export default queryFilter;

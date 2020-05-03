import { Filter, CombinedMatcher } from "@/lib/adblockplus";

export function genMatcher(patterns: string[]): CombinedMatcher {
  const matcher = patterns.reduce((_matcher, pattern) => {
    _matcher.add(Filter.fromText(pattern));
    return _matcher;
  }, new CombinedMatcher());
  return matcher;
}

function queryFilter(url: string, patterns: string[]): Filter | null {
  const matcher = genMatcher(patterns);

  const { hostname, href } = new URL(url);

  return matcher.matchesAny(href, hostname);
}

export default queryFilter;

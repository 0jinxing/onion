import { CombinedMatcher, Filter } from "../libs/adblockplus";

const getCurrentFilter = (url: string, ...matcherArray: Array<CombinedMatcher>) => {
  const { href, host } = new URL(url);
  for (let matcher of matcherArray) {
  }
  return !!1;
};

export default getCurrentFilter;

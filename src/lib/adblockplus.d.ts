export class Filter {
  text: string;
  subscriptions: string[];

  constructor(text: string);

  static knownFilters: any;
  static elemhideRegExp: RegExp;
  static regexpRegExp: RegExp;
  static optionsRegExp: RegExp;

  static fromText(text: string): Filter;
}

export class InvalidFilter extends Filter {
  reason: string;

  constructor(text: string, reason: string);
}

export class CommentFilter extends Filter {}

export abstract class ActiveFilter extends Filter {
  domainSource: string;
  domainSeparator: string;
  ignoreTrailingDot: boolean;
  domainSourceIsUpperCase: boolean;
  sitekeys: string[];

  constructor(text: string, domains: string);

  getDomains(): string[];
  isActiveOnDomain(docDomain: string, sitekey: string): boolean;
  isActiveOnlyOnDomain(docDomain: string): boolean;

  abstract getSitekeys(): string[];
}

export class RegExpFilter extends ActiveFilter {
  length: number;
  regexpSource: string;
  contentType: number;
  matchCase: boolean;
  thirdParty: boolean;
  sitekeySource: string;

  constructor(
    text: string,
    regexpSource: string,
    contentType: number,
    matchCase: number,
    domains: string,
    thirdParty: boolean,
    sitekeys: string[]
  );

  getSitekeys(): string[];
  getRegexp(): RegExp;
  matches(
    location: string,
    contentType: number,
    docDomain: string,
    thirdParty: boolean,
    sitekey: string
  ): boolean;

  static fromText(text: string): Filter;
  static typeMap: any;
}

export class BlockingFilter extends RegExpFilter {
  collapse: boolean;

  constructor(
    text: string,
    regexpSource: string,
    contentType: number,
    matchCase: boolean,
    domains: string[],
    thirdParty: boolean,
    sitekeys: string[],
    collapse: boolean
  );
}

export class WhitelistFilter extends RegExpFilter {
  constructor(
    text: string,
    regexpSource: string,
    contentType: number,
    matchCase: boolean,
    domains: string[],
    thirdParty: boolean,
    sitekeys: string[]
  );
}

export class Matcher {
  filterByKeyword: any;
  keywordByFilter: any;
  constructor();

  clear(): void;
  add(filter: Filter): void;
  remove(filter: Filter): void;
  findKeyword(filter: Filter): string;
  hasFilter(filter: Filter): boolean;
  getKeywordForFilter(filter: Filter): string;
  matchesAny(
    location: string,
    contentType: number,
    docDomain: string,
    thirdParty: boolean,
    sitekey: string
  ): Filter | null;
}

export class CombinedMatcher {
  blacklist: Matcher;
  whitelist: Matcher;
  resultCache: any;
  cacheEntries: number;

  clear(): void;
  add(filter: Filter): void;
  remove(filter: Filter): void;
  findKeyword(filter: Filter): string;
  hasFilter(filter: Filter): boolean;
  getKeywordForFilter(filter: Filter): string;
  isSlowFilter(filter: Filter): boolean;
  matchesAnyInternal(
    location: string,
    contentType: number,
    docDomain: string,
    thirdParty: boolean,
    sitekey: string
  ): Filter;
  matchesAny(location: string, docDomain: string): Filter | null;

  static maxCacheEntries: number;
}

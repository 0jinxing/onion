export class CombinedMatcher {}

export class Filter {
  text: string;
  subscriptions: string[];

  static knownFilters: object;
  static elemhideRegExp: RegExp;
  static regexpRegExp: RegExp;
  static optionsRegExp: RegExp;

  static fromText(text: string): Filter;
}

export class InvalidFilter extends Filter {
  reason: string;
}

export class CommentFilter extends Filter {}

export abstract class ActiveFilter extends Filter {
  domainSource: string;
  domainSeparator: string;
  ignoreTrailingDot: boolean;
  domainSourceIsUpperCase: boolean;
  sitekeys: string[];

  getDomains(): string[];

  isActiveOnDomain(docDomain: string, sitekey: string): boolean;

  isActiveOnlyOnDomain(docDomain: string): boolean;

  abstract getSitekeys(): string[];
}

export class RegExpFilter extends ActiveFilter {
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
}

export class BlockingFilter extends RegExpFilter {}

import queryStore from "@/store/query-store";
import { addReport } from "@/actions/report";

const store = queryStore();

function getCSSText(styleSheet: CSSStyleSheet): string {
  try {
    const rules = styleSheet.cssRules;
    return Array.from(rules).reduce((prev, cur) => prev + getCSSRuleText(cur), "");
  } catch {
    return "";
  }
}

function getCSSRuleText(rule: CSSRule): string {
  return rule instanceof CSSImportRule ? getCSSText(rule.styleSheet) : rule.cssText;
}

const IMAGE_STYLE_PROPS = [
  "background",
  "background-image",
  "list-style",
  "list-style-image",
  "content",
  "cursor",
  "border",
  "border-image",
  "border-image-source",
  "mask",
  "mask-image",
  "symbols"
];

function toCamelCase(str: string) {
  return str.replace(/\-(\w)/, (_, m: string) => {
    return m.toUpperCase();
  });
}

function isImageProp(key: string) {
  return IMAGE_STYLE_PROPS.includes(key) || IMAGE_STYLE_PROPS.map(toCamelCase).includes(key);
}

function getURLForPropValue(propValue: string) {
  return (propValue.match(/url\(['"]?(.+?)['"]?\)/gi) || [])
    .map(val => val.match(/url\(['"]?(.+?)['"]?\)/i)![1])
    .filter(url => !url.startsWith("data:"));
}

function getImageURLForStyleSheet(sheet: CSSStyleSheet): string[] {
  const cssText = getCSSText(sheet);
  const matchArr = cssText.match(/([a-z\-]+?):[^:]*?url\(['"]?(.+?)['"]?\)[^;]*/gi) || [];
  return matchArr
    .map(match => {
      const [key, val] = match.split(":");
      if (!isImageProp(key)) return [];
      return getURLForPropValue(val);
    })
    .reduce((pre, cur) => [...pre, ...cur], [])!;
}

function getImageURLForDocInlineStyle(doc: HTMLDocument): string[] {
  const urlNodeList = doc.querySelectorAll<HTMLElement>("[style*=url]");
  const result = [];
  for (let nodeIndex = 0; nodeIndex < urlNodeList.length; nodeIndex++) {
    const node = urlNodeList[nodeIndex];
    const inlineURLArr = IMAGE_STYLE_PROPS.map(toCamelCase)
      .map(prop => {
        const value: string = Reflect.get(node.style, prop);
        return value ? getURLForPropValue(value) : [];
      })
      .reduce((pre, cur) => [...pre, ...cur], []);
    result.push(...inlineURLArr);
  }
  return result;
}

function getCSSImageURLForDoc(doc: HTMLDocument): string[] {
  const imageURLArr: string[] = [];
  // styleSheets
  for (let sheetIndex = 0; sheetIndex < doc.styleSheets.length; sheetIndex++) {
    const sheet = doc.styleSheets[sheetIndex] as CSSStyleSheet;
    imageURLArr.push(...getImageURLForStyleSheet(sheet));
  }

  // inline style
  imageURLArr.push(...getImageURLForDocInlineStyle(doc));

  return imageURLArr;
}

function getFontFacesMap(doc: HTMLDocument) {
  const fontFacesMap = new Map();
  const styleSheets = doc.styleSheets;
  for (let sheetIndex = 0; sheetIndex < styleSheets.length; sheetIndex++) {
    const sheet = styleSheets[sheetIndex] as CSSStyleSheet;
    let rules = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
      const rule = rules[ruleIndex];
      if (rule instanceof CSSFontFaceRule) {
        const [, family] = rule.style.cssText.match(/font-family: ['"]?(.+?)['"]?;/);
        const [, url] = rule.style.cssText.match(/url\(['"]?(.+?)['"]?\)/);
        fontFacesMap.set(family, url);
      }
    }
  }
  return fontFacesMap;
}

function startCSSReport() {
  const fontFacesMap = getFontFacesMap(document);
  document.fonts.addEventListener("loadingerror", ({ fontfaces }) => {
    for (let font of fontfaces) {
      // report
      const url = fontFacesMap.get(font.family);
      if (url) {
        const { hostname, href } = new URL(url, window.location.href);
        store.dispatch(addReport(hostname, href, "font"));
      }
    }
  });

  const cssImageURLArr = getCSSImageURLForDoc(document);
  if (cssImageURLArr.length) {
    let curIndex = 0;
    const sniffImage = new Image();
    sniffImage.src = cssImageURLArr[curIndex];
    sniffImage.addEventListener("error", event => {
      event.preventDefault();
      event.stopPropagation();
      const $el = event.target as HTMLImageElement;
      const url = $el.src;
      if (url) {
        const { hostname, href } = new URL(url, window.location.href);
        store.dispatch(addReport(hostname, href, "image"));
      }
      curIndex += 1;
      if (curIndex < cssImageURLArr.length) {
        sniffImage.src = cssImageURLArr[curIndex];
      }
      return false;
    });
    sniffImage.addEventListener("load", event => {
      curIndex += 1;
      if (curIndex < cssImageURLArr.length) {
        sniffImage.src = cssImageURLArr[curIndex];
      }
    });
  }
}

window.addEventListener("load", startCSSReport);

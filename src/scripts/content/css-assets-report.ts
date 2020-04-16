import queryStore from "@/store/query-store";
import { addReport } from "@/actions/report";

const store = queryStore();

function getCSSImageURLForDoc(doc: HTMLDocument): string[] {
  const imageURLArr: string[] = [];
  // styleSheets
  for (let sheetIndex = 0; sheetIndex < doc.styleSheets.length; sheetIndex++) {
    const sheet = doc.styleSheets[sheetIndex] as CSSStyleSheet;
    try {
      for (let ruleIndex = 0; ruleIndex < sheet.rules.length; ruleIndex++) {
        const rule = sheet.rules[ruleIndex] as CSSStyleRule;
        const [_, url] = rule.style.cssText.match(/url\(['"](.+)['"]\)/) || [];
        if (!url || /^data/.test(url)) continue;
        if (/(^background)|(image)|(content)|(cursor)/.test(rule.cssText)) {
          imageURLArr.push(url);
        }
      }
    } catch {}
  }

  // inline style
  const urlNodeList = doc.querySelectorAll<HTMLElement>("[style*=url]");
  for (let nodeIndex = 0; nodeIndex < urlNodeList.length; nodeIndex++) {
    const node = urlNodeList[nodeIndex];
    const imageStyleProps = ["backgroundImage", "borderImage", "maskImage", "listStyleImage"];
    const inlineURLArr = imageStyleProps
      .map(prop => {
        const value: string = Reflect.get(node.style, prop);
        if (/url\(/.test(value)) {
          const [_, url] = value.match(/url\(['"](.+)['"]\)/) || [];
          if (url && !/^data/.test(url)) return url;
        }
      })
      .filter(url => url) as string[];
    imageURLArr.push(...inlineURLArr);
  }

  return imageURLArr;
}

function getFontFacesMap(doc: HTMLDocument) {
  const fontFacesMap = new Map();
  const styleSheets = doc.styleSheets;
  for (let sheetIndex = 0; sheetIndex < styleSheets.length; sheetIndex++) {
    const sheet = styleSheets[sheetIndex] as CSSStyleSheet;
    const rules = sheet.rules;
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
        const { hostname } = new URL(url, window.location.href);
        store.dispatch(addReport(hostname, "font"));
      }
    }
  });

  const cssImageURLArr = getCSSImageURLForDoc(document);
  if (cssImageURLArr.length) {
    let curIndex = 0;
    const sniffImage = new Image();
    sniffImage.src = cssImageURLArr[curIndex];
    sniffImage.onerror = () => {
      const url = cssImageURLArr[curIndex];
      if (url) {
        const { hostname } = new URL(url, window.location.href);
        store.dispatch(addReport(hostname, "image/*"));
      }
      curIndex += 1;
      sniffImage.src = cssImageURLArr[curIndex];
    };
    sniffImage.onload = () => {
      curIndex += 1;
      sniffImage.src = cssImageURLArr[curIndex];
    };
  }
}

window.addEventListener("load", startCSSReport);

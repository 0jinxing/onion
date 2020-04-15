import ReportReducer from "@/reducers/report";

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

async function startCSSReport() {
  console.log("startreport==========>");
  const fonts = document.fonts;
  fonts.addEventListener("loadingerror", ({ fontfaces }) => {
    const styleSheets = document.styleSheets;
    for (let sheetIndex = 0; sheetIndex < styleSheets.length; sheetIndex++) {
      const sheet = styleSheets[sheetIndex] as CSSStyleSheet;
      const rules = sheet.rules;
      for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
        const rule = rules[ruleIndex];
        if (rule instanceof CSSFontFaceRule) {
          const [_0, family] = rule.style.cssText.match(/font-family: ['"]?(.+?)['"]?;/);
          if (fontfaces.find(f => f.family === family)) {
            const [_1, url] = rule.style.cssText.match(/url\(['"]?(.+?)['"]?\)/);
            console.log(url);
          }
        }
      }
    }
    console.log("font error =====>", fontfaces);
  });
  const cssImageURLArr = getCSSImageURLForDoc(document);
  for (let url of cssImageURLArr) {
    const image = new Image();
    image.src = url;
    image.addEventListener("error", () => {
      // report
      console.log("image error===>", url);
    });
  }
}

window.addEventListener("load", startCSSReport);

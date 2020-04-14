function startCSSReport() {
  for (let sheetIndex = 0;sheetIndex < document.styleSheets.length;sheetIndex++) {
    const sheet = document.styleSheets[sheetIndex] as CSSStyleSheet;
    try {
      for (let ruleIndex = 0; ruleIndex < sheet.rules.length; ruleIndex++) {
        const rule = sheet.rules[ruleIndex] as CSSStyleRule;
        const [_, url] = rule.style.cssText.match(/url\(['"](.+)['"]\)/) || [];
        if (!url || /^data/.test(url)) return;
        if (/^font/.test(rule.cssText)) {
          // font report
        } else if (/^background/.test(rule.cssText)) {
          // image report
        }
      }
    } catch {}
  }
}

window.addEventListener("load", startCSSReport);

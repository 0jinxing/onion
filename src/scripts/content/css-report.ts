function getBgImgs(doc: Document) {
  const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
  return Array.from(
    Array.from(doc.querySelectorAll("*")).reduce((collection, node) => {
      let prop = window
        .getComputedStyle(node, null)
        .getPropertyValue("background-image");
      // match `url(...)`
      let match = srcChecker.exec(prop);
      if (match) {
        collection.add(match[1]);
      }
      return collection;
    }, new Set())
  );
}

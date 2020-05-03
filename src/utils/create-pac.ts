import pacTemplate from "@/lib/pac-template.txt";

export function transformProxy(url: string) {
  const proxySplits = url.replace(/^http:\/\//i, "").split("://");
  const [protocol, host] = proxySplits.length > 1 ? proxySplits : ["proxy", ...proxySplits];
  return `${protocol.toUpperCase()} ${host};`;
}

const createPac = (url: string, rules: string[], userRules: string[], isBlocking = true) => {
  return pacTemplate
    .replace("$$PROXY$$", transformProxy(url))
    .replace("$$RULES$$", JSON.stringify(rules))
    .replace("$$USERRULES$$", JSON.stringify(userRules))
    .replace("$$DEFAULT$$", isBlocking ? "direct" : "proxy");
};

export default createPac;

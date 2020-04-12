import pacTemplate from "@/lib/pac-template.pac";

const createPac = (
  proxy: string,
  rules: string[],
  userRules: string[],
  isBlocking = true
) => {
  const proxySplits = proxy.split("://");
  const [protocol, host] =
    proxySplits.length > 1 ? proxySplits : ["proxy", ...proxySplits];

  return pacTemplate
    .replace("$$PROXY$$", `${protocol.toUpperCase()} ${host};`)
    .replace("$$RULES$$", JSON.stringify(rules))
    .replace("$$USERRULES$$", JSON.stringify(userRules))
    .replace("$$DEFAULT$$", isBlocking ? "direct" : "proxy");
};

export default createPac;

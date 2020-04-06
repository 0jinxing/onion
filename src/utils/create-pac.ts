import pacTemplate from "@/lib/pac-template.pac";

const createPac = (
  proxy: string,
  rules: string[],
  userRules: string[],
  isBlocking = true
) => {
  return pacTemplate
    .replace("$$PROXY$$", proxy)
    .replace("$$RULES$$", JSON.stringify(rules))
    .replace("$$USERRULES$$", JSON.stringify(userRules))
    .replace("$$DEFAULT$$", isBlocking ? "direct" : "proxy");
};

export default createPac;

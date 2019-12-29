import pacScriptTemplate from "../assets/pac-script-template.pac";
import pacList from "./default-pac-list";

export default (proxy: string, userRules: Array<string>) => {
  return pacScriptTemplate
    .replace("$PROXY", proxy)
    .replace("$RULES", JSON.stringify(pacList))
    .replace("$USERRULES", JSON.stringify(userRules));
};

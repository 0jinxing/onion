import pacScriptTemplate from "../assets/pac-script-template.pac";
import defaultRacRules from "./default-pac-rules";

export default (proxy, userRules) => {
  return pacScriptTemplate
    .replace("$PROXY", proxy)
    .replace("$RULES", JSON.stringify(defaultRacRules))
    .replace("$USERRULES", JSON.stringify(userRules));
};

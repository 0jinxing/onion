import pacScriptTemplate from "../assets/pac-script-template.pac";
import pacRules from "./pac-rules";

export default (proxy, userRules) => {
  return pacScriptTemplate
    .replace("$PROXY", proxy)
    .replace("$RULES", JSON.stringify(pacRules))
    .replace("$USERRULES", JSON.stringify(userRules));
};

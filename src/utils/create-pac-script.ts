import pacScriptTemplate from "@/assets/pac-script-template.pac";

type CreatePacScriptFn = (
  proxy: string,
  defaultPacList: Array<string>,
  userRules: Array<string>
) => string;

const createPacScript: CreatePacScriptFn = (
  proxy,
  defaultPacList,
  userRules
) => {
  return pacScriptTemplate
    .replace("$PROXY", proxy)
    .replace("$RULES", defaultPacList)
    .replace("$USERRULES", JSON.stringify(userRules));
};

export default createPacScript;

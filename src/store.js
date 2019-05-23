import { local } from "./utils/storage";
import defaultPacRules from "./utils/default-pac-rules";

var defaultMatcher = new CombinedMatcher();

const reducer = async (state = {}, action) => {
  switch (action.type) {
    case "TURN_OFF_OP":
      await local.set({ enable: false });
      return {
        ...state,
        enable: false
      };
    case "TURN_ON_OP":
      await local.set({ enable: true });
      return {
        ...state,
        enable: true
      };
    case "PROXY_HOST":
      const host = action.payload;
      const userRulesSerial = await local.get(["userRulesSerial"])[
        "userRulesSerial"
      ];
      const userRules = userRulesSerial.split(";");
      // @TODO check
      const newUserRules = [...userRules, host];
      await local.set({ userRulesSerial: newUserRules.join(";") });
      return {
        ...state,
        userRules: newUserRules
      };
    case "CANCEL_PROXY_HOST":
      const host = action.payload;
      const userRulesSerial = await local.get(["userRulesSerial"])[
        "userRulesSerial"
      ];
      const userRules = userRulesSerial.split(";");
      // @TODO check
      const newUserRules = userRules.splice(userRules.indexOf(host), 1);
      await local.set({ userRulesSerial: newUserRules.join(";") });
      return {
        ...state,
        userRules: newUserRules
      };
  }
};

export default reducer;

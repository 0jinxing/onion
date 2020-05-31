import changeReducer from "@/reducers/change";
import errorReducer from "@/reducers/error";
import loadingReducer from "@/reducers/loading";
import proxyReducer from "@/reducers/proxy";
import reportReducer from "@/reducers/report";
import ruleReducer from "@/reducers/rule";

import * as changeCreator from "@/actions/change";
import * as errorCreator from "@/actions/error";
import * as loadingCreator from "@/actions/loading";
import * as proxyCreator from "@/actions/proxy";
import * as reportCreator from "@/actions/report";
import * as ruleCreator from "@/actions/rule";

describe("change reducer", () => {
  it("should return the change reducer state", () => {
    expect(changeReducer(false, changeCreator.createChange())).toBeTruthy();
    expect(changeReducer(true, changeCreator.saveChange())).toBeFalsy();
  });
});

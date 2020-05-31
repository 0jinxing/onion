import * as changeCreator from "@/actions/change";
import * as errorCreator from "@/actions/error";
import * as loadingCreator from "@/actions/loading";
import * as proxyCreator from "@/actions/proxy";
import * as reportCreator from "@/actions/report";
import * as ruleCreator from "@/actions/rule";

describe("actions", () => {
  it("should create an action to create a change", () => {
    expect(changeCreator.createChange()).toEqual({
      type: changeCreator.ChangeTypeEnum.CREATE_CHANGE
    });
  });

  it("should create an action to save the change", () => {
    expect(changeCreator.saveChange()).toEqual({ type: changeCreator.ChangeTypeEnum.SAVE_CHANGE });
  });
});

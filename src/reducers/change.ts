import { ChangeAction, ChangeTypeEnum } from "@/actions/change";

const changeReducer = (state: boolean, action: ChangeAction) => {
  const { type } = action;

  switch (type) {
    case ChangeTypeEnum.CREATE_CHANGE:
      return true;
    case ChangeTypeEnum.SAVE_CHANGE:
      return false;
    default:
      return state;
  }
};

export default changeReducer;

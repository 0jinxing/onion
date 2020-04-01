import { ChangeAction, ChangeTypeEnum } from "@/actions/change";

const { CREATE_CHANGE, SAVE_CHANGE } = ChangeTypeEnum;

const changeReducer = (state: boolean = false, action: ChangeAction) => {
  const { type } = action;

  switch (type) {
    case CREATE_CHANGE:
      return true;
    case SAVE_CHANGE:
      return false;
    default:
      return state;
  }
};

export default changeReducer;

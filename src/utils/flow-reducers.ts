import { Action, Reducer } from "redux-actions";
import { each, isEqual } from "lodash";

const flowReducers = <T extends Object>(
  initState: T,
  ...reducers: Reducer<T, any>[]
) => {
  return (state: T = initState, action: Action<any>): T => {
    let nextState = state;
    each(
      reducers.map(fn => fn(state, action)),
      curState => {
        if (!isEqual(nextState, curState)) {
          nextState = curState;
          return false;
        }
      }
    );
    return nextState;
  };
};

export default flowReducers;

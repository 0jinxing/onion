import { combineReducers } from "redux";

import change from "./change";
import proxy from "./proxy";
import report from "./report";
import rule from "./rule";

const rootReducer = combineReducers({ change, proxy, report, rule });

export default rootReducer;

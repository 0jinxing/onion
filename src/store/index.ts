import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

import { ProxyState } from "@/reducers/proxy";
import { ReportState } from "@/reducers/report";
import { RuleState } from "@/reducers/rule";

import { emitFetchGFWList } from "@/actions/proxy";
import { LoadingState } from "@/reducers/loading";

export type State = {
  change: boolean;
  proxy: ProxyState;
  rule: RuleState;
  report: ReportState;
  loading: LoadingState
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

const state: State = store.getState();

// 初始化 GFW List
if (!state.proxy.gfwList.length) {
  store.dispatch(emitFetchGFWList());
}

export default store;

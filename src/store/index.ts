import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

import { ProxyState } from "@/reducers/proxy";
import { ReportState } from "@/reducers/report";
import { RuleState } from "@/reducers/rule";

import { fetchGFWList } from "@/actions/proxy";

export type State = {
  change: boolean;
  proxy: ProxyState;
  rule: RuleState;
  report: ReportState;
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const state: State = store.getState();

// 初始化 GFW List
if (!state.proxy.gfwList.length) {
  store.dispatch(fetchGFWList());
}

export default store;

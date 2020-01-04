import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import chromeProxyMiddleware from "./chrome-proxy-middleware";

import rootReducer from "@/reducers";
import rootSagas from "@/sagas";
import ChromeLocalStorage from "@/lib/chrome-local-storage";
import { Rule } from "@/actions/rule";
import { Report } from "@/actions/report";

const storage = new ChromeLocalStorage();

const persistedReducer = persistReducer(
  {
    key: "_0jinxing",
    storage,
    blacklist: ["modify"]
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();

export type State = {
  rule: { val: Rule[] };
  report: { val: Report[] };
  proxy: { val: string };
  modify: { val: boolean };
};

const middleware = applyMiddleware(chromeProxyMiddleware, sagaMiddleware);
const devMiddleware = applyMiddleware(
  logger,
  chromeProxyMiddleware,
  sagaMiddleware
);

const store =
  process.env.NODE_ENV === "development"
    ? createStore(persistedReducer, devMiddleware)
    : createStore(persistedReducer, middleware);

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export default store;

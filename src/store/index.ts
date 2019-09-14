import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import chromeProxyMiddleware from "./chrome-proxy-middleware";

import rootReducer from "../reducers";
import rootSagas from "../sagas";
import ChromeLocalStorage from "../lib/chrome-local-storage";

const storage = new ChromeLocalStorage();

const persistedReducer = persistReducer(
  {
    key: "0jinxing",
    storage
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        persistedReducer,
        applyMiddleware(logger, chromeProxyMiddleware, sagaMiddleware)
      )
    : createStore(
        persistedReducer,
        applyMiddleware(chromeProxyMiddleware, sagaMiddleware)
      );

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export default store;

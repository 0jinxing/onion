import dayjs from "dayjs";
import { createStore, applyMiddleware, Store, Middleware, Reducer, Action } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

import { ProxyState } from "@/reducers/proxy";
import { RuleState } from "@/reducers/rule";

import { emitFetchGFWList } from "@/actions/proxy";
import { LoadingState } from "@/reducers/loading";
import ChromeLocalStorage from "@/utils/chrome-local-storage";
import chromeProxyMiddleware from "./chrome-proxy-middleware";
import dispatchMiddleware from "./dispatch-middleware";
import { ErrorState } from "@/reducers/error";

export type State = {
  change: boolean;
  proxy: ProxyState;
  rule: RuleState;
  loading: LoadingState;
  error: ErrorState;
};

const queryStore = (isBackground = false): Store<State> => {
  const storage = new ChromeLocalStorage(true, isBackground, true);
  const persistedReducer = persistReducer(
    {
      key: "onion",
      storage,
      blacklist: ["change", "error", "loading"],
      debug: process.env.NODE_ENV === "development"
    },
    rootReducer
  );

  const sagaMiddleware = createSagaMiddleware();

  const isTest = process.env.NODE_ENV === "test";
  const isDev = process.env.NODE_ENV === "development";

  const middleware: Middleware[] = [sagaMiddleware];

  if (!isTest) {
    middleware.push(dispatchMiddleware);
    isBackground && middleware.push(chromeProxyMiddleware);
  }

  isDev && middleware.push(logger);

  const store = createStore(persistedReducer, applyMiddleware.apply(null, middleware));

  sagaMiddleware.run(rootSaga);

  persistStore(store, null, () => {
    window.postMessage({ type: "APP_RENDER" }, location.origin);

    const state: State = store.getState();
    // 更新 GFW List，频率 1 周
    if (
      state.proxy.gfwUrl &&
      (!state.proxy.gfwList.length || +dayjs(state.proxy.updateAt).add(1, "week") < Date.now())
    ) {
      store.dispatch(emitFetchGFWList());
    }
  });

  return store;
};

export default queryStore;

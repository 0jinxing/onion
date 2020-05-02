import dayjs from "dayjs";
import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

import { ProxyState } from "@/reducers/proxy";
import { ReportState } from "@/reducers/report";
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
  report: ReportState;
  loading: LoadingState;
  error: ErrorState;
};

const storage = new ChromeLocalStorage();

const emptyTransform = createTransform((inboundState: ProxyState) => inboundState, null, {
  whitelist: ["proxy"]
});

const persistedReducer = persistReducer(
  {
    key: "_0jinxing",
    storage,
    blacklist: ["change", "error", "loading"],
    transforms: [emptyTransform]
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();

const queryStore = (isBackground = false): Store<State> => {
  const store = createStore(
    persistedReducer,
    applyMiddleware.apply(
      null,
      isBackground
        ? [logger, chromeProxyMiddleware, dispatchMiddleware, sagaMiddleware]
        : [logger, dispatchMiddleware, sagaMiddleware]
    )
  );

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

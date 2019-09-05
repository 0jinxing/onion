import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, Storage } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./reducers";

export class ChromeLocalStorage implements Storage {
  getItem(key: string): Promise<string> {
    return new Promise(resolve => {
      chrome.storage.local.get(key, item => {
        resolve(item[key]);
      });
    });
  }
  setItem(key: string, value: string): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }
  removeItem(key: string): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.remove(key, resolve);
    });
  }
}

const storage = new ChromeLocalStorage();

const persistedReducer = persistReducer(
  {
    key: "0jinxing",
    storage
  },
  rootReducer
);

export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(store);

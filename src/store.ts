import { createStore } from "redux";
import { persistStore, persistReducer, AsyncStorage } from "redux-persist";
import rootReducer from "./reducers";

class ChromeLocalStorage implements AsyncStorage {
  getItem(
    key: string,
    callback?:
      | ((error?: Error | undefined, result?: string | undefined) => void)
      | undefined
  ): Promise<string> {
    return new Promise(resolve => {
      chrome.storage.local.get(key, item => {
        resolve(item[key]);
      });
    });
  }
  setItem(
    key: string,
    value: string,
    callback?: ((error?: Error | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeItem(
    key: string,
    callback?: ((error?: Error | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  mergeItem(
    key: string,
    value: string,
    callback?: ((error?: Error | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clear(
    callback?: ((error?: Error | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllKeys(
    callback?:
      | ((error?: Error | undefined, keys?: string[] | undefined) => void)
      | undefined
  ): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  multiGet(
    keys: string[],
    callback?:
      | ((
          errors?: Error[] | undefined,
          result?: [string, string][] | undefined
        ) => void)
      | undefined
  ): Promise<[string, string][]> {
    throw new Error("Method not implemented.");
  }
  multiSet(
    keyValuePairs: string[][],
    callback?: ((errors?: Error[] | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  multiRemove(
    keys: string[],
    callback?: ((errors?: Error[] | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  multiMerge(
    keyValuePairs: string[][],
    callback?: ((errors?: Error[] | undefined) => void) | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const storage = new ChromeLocalStorage();

const persistedReducer = persistReducer(
  {
    key: "just",
    storage
  },
  rootReducer
);

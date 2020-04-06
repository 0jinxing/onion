import { Storage } from "redux-persist";

export default class ChromeLocalStorage implements Storage {
  getItem(key: string): Promise<string> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (item) => {
        resolve(item[key]);
      });
    });
  }
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }
  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, resolve);
    });
  }
}

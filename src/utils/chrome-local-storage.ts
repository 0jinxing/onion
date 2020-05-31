import { Storage } from "redux-persist";

export default class ChromeLocalStorage implements Storage {
  constructor(private readable = true, private writable = true, private quiet = false) {}

  getItem(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.readable && !this.quiet) {
        return reject(new Error(`get ${key} fail: [readable] false`));
      } else if (this.readable) {
        chrome.storage.local.get(key, item => resolve(item[key]));
      }
    });
  }
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.writable && !this.quiet) {
        return reject(new Error(`set ${key} fail: [writable] false`));
      } else if (this.writable) {
        chrome.storage.local.set({ [key]: value }, resolve);
      }
    });
  }
  removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.writable && !this.quiet) {
        return reject(new Error(`remove ${key} fail: [writable] false`));
      } else if (this.writable) {
        chrome.storage.local.remove(key, resolve);
      }
    });
  }
}

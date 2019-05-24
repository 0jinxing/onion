const chrome = window.chrome;

const createStorageHelpper = storage => {
  return {
    get: keys => new Promise(resolve => storage.get(keys, resolve)),
    set: kv => new Promise(resolve => storage.set(kv, resolve)),
    clear: () => new Promise(resolve => storage.clear(resolve))
  };
};

export const local = createStorageHelpper(chrome.storage.local);
export const sync = createStorageHelpper(chrome.storage.sync);

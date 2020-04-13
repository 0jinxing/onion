function startFetchReport() {
  if (!window.fetch) return;

  const _fetch = window.fetch;
  window.fetch = async function (...args) {
    try {
      return await _fetch.apply(window, args);
    } catch (e) {
      // 错误上报
      throw e;
    }
  };
}

function startXHRReport() {
  if (window.XMLHttpRequest) return;
  const _XMLHttpRequest = window.XMLHttpRequest;
}

function startRequestReport() {
  startFetchReport();
  startXHRReport();
}

window.addEventListener("load", startRequestReport);

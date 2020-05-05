import queryStore from "@/store/query-store";
import { addReport } from "@/actions/report";

const store = queryStore();

function startFetchReport() {
  if (!window.fetch) return;

  const _fetch = window.fetch;
  window.fetch = async function (input: RequestInfo, init?: RequestInit) {
    try {
      return await _fetch.apply(window, [input, init]);
    } catch (e) {
      // 错误上报
      const url = typeof input === "string" ? input : input.url;
      const { hostname, href } = new URL(url, window.location.href);
      store.dispatch(addReport(hostname, href, "xhr"));
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

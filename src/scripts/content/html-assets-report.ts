import queryStore from "@/store/query-store";
import { addReport } from "@/actions/report";

const store = queryStore();

const typeMap = new WeakMap<object, string>([
  [HTMLImageElement, "image"],
  [HTMLVideoElement, "video"],
  [HTMLAudioElement, "audio"],
  [HTMLAudioElement, "audio"],
  [HTMLScriptElement, "js"],
  [HTMLStyleElement, "css"]
]);

function resultErrorListener(ev: ErrorEvent) {
  const target = ev.target;
  if (target) {
    let url: string | null = null;
    let type: string | null = null;

    if (target instanceof HTMLElement) {
      type = typeMap.get(target.constructor) || "";
      url = target.getAttribute("src");
    }

    if (url && type) {
      const { hostname, href } = new URL(url, window.location.href);
      store.dispatch(addReport(hostname, href, type));
    }
  }
}

window.addEventListener("error", resultErrorListener, true);

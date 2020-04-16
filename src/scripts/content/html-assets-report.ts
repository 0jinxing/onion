import queryStore from "@/store/query-store";
import { addReport } from "@/actions/report";

const store = queryStore();

function resultErrorListener(ev: ErrorEvent) {
  const target = ev.target;
  if (target) {
    let url: string | null = null;
    let mime: string | null = null;

    if (target instanceof HTMLImageElement) {
      mime = "image/*";
      url = target.getAttribute("src");
    } else if (target instanceof HTMLVideoElement) {
      mime = "video/*";
      url = target.getAttribute("src");
    } else if (target instanceof HTMLAudioElement) {
      mime = "audio/*";
      url = target.getAttribute("src");
    } else if (target instanceof HTMLScriptElement) {
      mime = "text/javascript";
      url = target.getAttribute("src");
    } else if (target instanceof HTMLStyleElement) {
      mime = "text/css";
      url = target.getAttribute("href");
    }
    if (url && mime) {
      const { hostname } = new URL(url, window.location.href);
      store.dispatch(addReport(hostname, mime));
    }
  }
}

window.addEventListener("error", resultErrorListener, true);

import store from "@/store";
import { report } from "@/actions/report";
import _ from "lodash";

const trackPool = new Set();

function $(selectors: string): HTMLElement[] {
  return Array.prototype.slice.call(document.querySelectorAll(selectors));
}

function resultErrorListener(ev: ErrorEvent) {
  const target = ev.target;
  if (target) {
    const url = Reflect.get(target, "src");
    url && store.dispatch(report(url));
    console.log(url);
  }
}

function observeFn(mutations: MutationRecord[], observer: MutationObserver) {
  _.each($("[src]"), node => {
    if (!trackPool.has(node)) {
      trackPool.add(node);
      node.addEventListener("error", resultErrorListener);
    }
  });
}

_.each($("[src]"), node => {
  trackPool.add(node);
  node.addEventListener("error", resultErrorListener);
});

const observer = new MutationObserver(observeFn);

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributeFilter: ["src"]
});

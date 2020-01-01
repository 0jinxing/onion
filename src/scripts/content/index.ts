import store from "@/store";

function resultNodeListener(ev: ErrorEvent) {
  const target = ev.target;
  if (target && "src" in target) {
    
  }
}

function observeFn(mutations: MutationRecord[], observer: MutationObserver) {}

const initNodeArr: HTMLElement[] = Array.prototype.slice.call(
  document.querySelectorAll("[src]")
);

initNodeArr.forEach(node => {
  node.dataset.observed = "on:error";
  node.addEventListener("error", resultNodeListener);
});

const observer = new MutationObserver((mutations, observer) => {});
observer.observe(document, {
  childList: true,
  subtree: true,
  attributeFilter: ["src"]
});

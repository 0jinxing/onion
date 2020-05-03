import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

if (typeof window !== "undefined") {
  window.resizeTo = (width, height) => {
    Reflect.set(window, "innerWidth", width || window.innerWidth);
    Reflect.set(window, "innerHeight", width || window.innerHeight);
    window.dispatchEvent(new Event("resize"));
  };
  window.scrollTo = () => {};
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(query => ({
        matches: query.includes("max-width"),
        addListener: () => {},
        removeListener: () => {}
      }))
    });
  }
}

Object.assign(Enzyme.ReactWrapper.prototype, {
  findObserver() {
    const _this = (this as unknown) as Enzyme.ReactWrapper;
    return _this.find("ResizeObserver");
  },
  triggerResize() {
    const ob = this.findObserver();
    const instance = ob.instance() as React.Component & { onResize: Function };
    instance.onResize([{ target: ob.getDOMNode() }]);
  }
});

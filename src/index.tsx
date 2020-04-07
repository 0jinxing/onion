import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.addEventListener("message", ({ data }) => {
  // store 填充完成，开始渲染 options 页面
  if (data.type === "APP_RENDER") {
    ReactDOM.render(<App />, document.getElementById("root"));
  }
});

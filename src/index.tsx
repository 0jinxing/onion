import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

console.time("render time");
ReactDOM.render(<App />, document.getElementById("root"));
console.timeEnd("render time");

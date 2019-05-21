import React from "react";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>配置</h1>
        <div id="configuration">
          <div>
            <input type="radio" name="proxy-type" value="direct" id="proxy-type-direct" />
            <label htmlFor="proxy-type-direct">不使用任何代理</label>
          </div>
          <div>
            <input type="radio" name="proxy-type" value="system" id="proxy-type-system"/>
            <label htmlFor="proxy-type-system">使用系统代理</label>
          </div>
        </div>
      </>
    );
  }
}

export default App;

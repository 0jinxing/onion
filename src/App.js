import React from "react";

import Input from "./components/Input";
import List from "./components/List";
import Button from "./components/Button";
import { chromeStorageSyncGet } from "./utils/chrome-promisify";

import logoPic from "./assets/spider-proxy.png";
import styles from "./App.css";

const chrome = window.chrome;

class App extends React.Component {
  state = {
    proxy: "",
    userRulesSerial: ""
  };

  handleReceiveResponse = (...args) => {
    console.log(args);
    // if (type === "ENABLE_CHANGED") {
    //   this.setState({ enable: data });
    // } else if (type === "PROXY_CHANGED") {
    //   this.setState({ proxy: data });
    // }
  };

  handleProxySwitch = checked => {
    console.log(11);
    chrome.runtime.sendMessage(
      {
        type: "REQUEST_ENABLE_CHANGED",
        data: checked
      },
      this.handleReceiveResponse
    );
  };

  handleProxyChange = e => {
    this.setState({ proxy: e.target.value });
  };

  handleProxyUpdate = () => {
    chrome.runtime.sendMessage(
      {
        type: "REQUEST_PROXY_CHANGED",
        data: this.state.proxy
      },
      this.handleReceiveResponse
    );
  };

  async componentDidMount() {
    const resultArr = await chromeStorageSyncGet(["proxy", "userRulesSerial"]);
    const data = resultArr[0];
    this.setState(data);
  }

  render() {
    const { proxy, userRulesSerial } = this.state;
    const userRules = userRulesSerial.split(";").filter(rule => !!rule);

    return (
      <div>
        <div className={styles.wrap}>
          <header className={styles.headerWrap}>
            <img
              className={styles.logo}
              src={logoPic}
              alt="spider proxy logo"
            />
            <h1 className={styles.title}>Spider Proxy Configuration</h1>
          </header>
          <main className={styles.container}>
            <label className={styles.inlineField}>
              <h2 className={styles.fieldTitle}>Proxy URI</h2>
              <div className={styles.fieldContainer}>
                <Input
                  placeholder="Enter Your Proxy URI"
                  value={proxy}
                  onChange={this.handleProxyChange}
                />
              </div>
            </label>
            <div className={styles.field}>
              <h2 className={styles.fieldTitle}>User Rules</h2>
              <div className={styles.fieldContainer}>
                <List items={userRules} />
              </div>
            </div>
            <div>
              <div style={{ float: "right" }}>
                <span
                  style={{
                    color: "#bbb",
                    fontSize: "16px",
                    marginRight: "16px"
                  }}
                >
                  SUCCESS
                </span>
                <Button>SAVE</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

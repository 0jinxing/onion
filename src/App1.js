import React from "react";

import Input from "./components/Input";
import List from "./components/List";
import Button from "./components/Button";
import { chromeStorageLocalGet } from "./utils/chrome-promisify";

import logoPic from "./assets/heroic-proxy.png";
import styles from "./App.css";
import Toast from "./components/Toast";

const chrome = window.chrome;

class App extends React.Component {
  state = {
    proxy: "",
    userRulesSerial: ""
  };

  handleReceiveResponse = ({ type, data }) => {
    if (type === "PROXY_CHANGED") {
      this.setState({ proxy: data });
      this.toast.show({
        type: "success",
        message: "Configuration settings were updated successfully"
      });
    }
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
    const resultArr = await chromeStorageLocalGet(["proxy", "userRulesSerial"]);
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
              alt="heroic proxy logo"
            />
            <h1 className={styles.title}>Heroic Proxy Configuration</h1>
          </header>
          <main className={styles.container}>
            <label className={styles.inlineField}>
              <label className={styles.fieldTitle}>Proxy URI</label>
              <div className={styles.fieldContainer}>
                <Input
                  placeholder="Enter Your Proxy URI"
                  value={proxy}
                  onChange={this.handleProxyChange}
                />
              </div>
            </label>
            <div className={styles.field}>
              <label className={styles.fieldTitle}>User Rules</label>
              <div className={styles.fieldContainer}>
                <List items={userRules} />
              </div>
            </div>
            <div className={styles.controllWrap}>
              <Button onClick={this.handleProxyUpdate}>SAVE</Button>
            </div>
          </main>
        </div>
        <Toast ref={toast => (this.toast = toast)} />
      </div>
    );
  }
}

export default App;

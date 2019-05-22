import React from "react";
import ReactDOM from "react-dom";

import Switch from "../components/Switch";
import ConfigForm from "../components/ConfigForm";

import logoPic from "../assets/oh-proxy.png";

class Options extends React.Component {
  render() {
    return (
      <div>
        <div className="wrap">
          <header>
            <img className="logo" src={logoPic} alt="oh proxy logo" />
            <h1> Oh Proxy Configuration</h1>
            <div className="switch-container">
              <Switch />
            </div>
          </header>
          <main className="container">
            <ConfigForm />
          </main>
        </div>
        <style jsx>{`
          .wrap {
            max-width: 600px;
            margin: 64px auto;
          }
          .logo {
            width: 60px;
            vertical-align: bottom;
          }
          header {
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 18px;
            position: relative;
          }
          header h1 {
            display: inline;
            font-weight: 100;
          }
          .switch-container {
            position: absolute;
            bottom: 10px;
            right: 0;
          }
          .container {
            margin: 16px 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default Options;

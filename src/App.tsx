import React from "react";
import {
  QuestionOutlined,
  HeartOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import ProxySetting from "@/components/ProxySetting";
import RuleTable from "@/components/RuleTable";
import RuleInput from "@/components/RuleInput";
import UrlTags from "@/components/UrlTags";
import GFWList from "@/components/GFWList";
import "antd/dist/antd.css";
import "./styles/app.scss";

const App: React.FunctionComponent = () => {
  return (
    <div className="ghoo-container">
      <header className="ghoo-container__header">
        <img src="icon.png" className="icon" />
        <h1 className="title">PROXY - OPTIONS</h1>
        <div className="github">
          <a
            className="issue"
            href="https://github.com/0jinxing/just-proxy/issues"
            target="__blank"
          >
            <QuestionOutlined />
            issue
          </a>
          <a
            className="star"
            href="https://github.com/0jinxing/just-proxy"
            target="__blank"
          >
            <HeartOutlined />
            star
          </a>
          <a
            className="wiki"
            href="https://github.com/0jinxing/just-proxy/wiki"
            target="__blank"
          >
            <FileTextOutlined />
            wiki
          </a>
        </div>
      </header>
      <main className="ghoo-container__main">
        <ProxySetting />
        <GFWList />
        <RuleTable />
        <RuleInput />
        <UrlTags />
      </main>
    </div>
  );
};

export default App;

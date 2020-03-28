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
import GWFList from "@/components/GWFList";
import "antd/dist/antd.css";
import "./styles/app.scss";

const App: React.FunctionComponent = () => {
  return (
    <div className="ghoo-container">
      <header className="ghoo-container__header">
        <img src="icon.png" className="icon" />
        <h1 className="title">PROXY - OPTIONS</h1>
        <div className="github">
          <a className="issue">
            <QuestionOutlined />
            issue
          </a>
          <a className="star">
            <HeartOutlined />
            star
          </a>
          <a className="wiki">
            <FileTextOutlined />
            wiki
          </a>
        </div>
      </header>
      <main className="ghoo-container__main">
        <ProxySetting />
        <GWFList />
        <RuleTable />
        <RuleInput />
        <UrlTags />
      </main>
    </div>
  );
};

export default App;

import React from "react";
import {
  QuestionOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export type PageHeaderProps = {
  change: boolean;
  proxyUrl: string;
};

const PageHeader = (props: PageHeaderProps) => {
  const { change, proxyUrl } = props;
  return (
    <header className="ghoo-page-header">
      <img src="icon.png" className="ghoo-page-header__icon" />
      <h1 className="ghoo-page-header__title">OPTIONS {change ? "*" : null}</h1>
      <span className="ghoo-page-header__tip">当前未填写代理地址，使用系统代理</span>
      <div className="ghoo-page-header__github">
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
  );
};

export default PageHeader;

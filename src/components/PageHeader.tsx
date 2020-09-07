import React from "react";
import { QuestionOutlined, HeartOutlined, FileTextOutlined } from "@ant-design/icons";

import whitelistIcon from "@/assets/whitelist.png";
import { GFWMode } from "@/actions/proxy";

export type PageHeaderProps = {
  change: boolean;
  proxyUrl: string;
  gfwMode: GFWMode;
};

const PageHeader = (props: PageHeaderProps) => {
  const { change, proxyUrl, gfwMode } = props;
  return (
    <header className="ghoo-page-header">
      <img src={whitelistIcon} className="ghoo-page-header__icon" />
      <h1 className="ghoo-page-header__title">
        OPTIONS<span className="ghoo-page-header__change">{change ? "*" : null}</span>
      </h1>
      {proxyUrl ? (
        <span className="ghoo-page-header__tip">
          {gfwMode.toUpperCase()} {proxyUrl.toUpperCase()}
        </span>
      ) : (
        <span className="ghoo-page-header__tip">当前未填写代理地址，使用系统代理</span>
      )}
      <div className="ghoo-page-header__github">
        <a className="issue" href="https://github.com/0jinxing/onion/issues" target="__blank">
          <QuestionOutlined />
          issue
        </a>
        <a className="star" href="https://github.com/0jinxing/onion" target="__blank">
          <HeartOutlined />
          star
        </a>
        <a className="wiki" href="https://github.com/0jinxing/onion/wiki" target="__blank">
          <FileTextOutlined />
          wiki
        </a>
      </div>
    </header>
  );
};

export default PageHeader;

import React from "react";
import LogoImage from "@/assets/emoticon.png";
import "./TitleHeader.scss";
import proxy from "@/reducers/proxy";

export type TitleHeaderProps = {
  modify: boolean;
  proxy: string;
};

const TitleHeader = (props: TitleHeaderProps) => {
  return (
    <header className="title-header">
      <img className="logo" src={LogoImage} />
      <h1 className="title">PROXY OPTIONS {props.modify ? "*" : ""}</h1>
      {!props.proxy && <span className="tip">未填写代理地址，当前使用系统代理</span>}
    </header>
  );
};

export default TitleHeader;

import React from "react";
import LogoImage from "../assets/emoticon.png";
import "./TitleHeader.scss";

export type TitleHeaderProps = {
  modify: boolean;
};

const TitleHeader = (props: TitleHeaderProps) => {
  return (
    <header className="title-header">
      <img className="logo" src={LogoImage} />
      <h1 className="title">Just proxy - options {props.modify ? "*" : ""}</h1>
    </header>
  );
};

export default TitleHeader;

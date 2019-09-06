import React from "react";
import LogoImage from "../assets/emoticon.svg";

export type TitleHeaderProps = {
  modify: boolean;
};

const TitleHeader = (props: TitleHeaderProps) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px"
      }}
    >
      <img
        src={LogoImage}
        style={{
          height: "40px",
          marginRight: "15px"
        }}
      />
      <h1
        style={{
          fontWeight: "normal"
        }}
      >
        Just proxy - options {props.modify ? "*" : ""}
      </h1>
    </header>
  );
};

export default TitleHeader;

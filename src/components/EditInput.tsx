import React, { useState, useEffect } from "react";
import { Action } from "redux";
import {
  Button,
  ControlGroup,
  InputGroup,
  Tag,
  Intent
} from "@blueprintjs/core";
import "./EditInput.scss";
export type EditInputProps = {
  initValue: string;
  onChange: () => Action;
};

const EditInput = () => {
  // const [canUpdate, setCanUpdate] = useState(false || props.initValue);
  // const [pattern, setPattern] = useState(props.initValue || "");
  return (
    <div className="edit-input">
      <ControlGroup>
        <InputGroup leftIcon="asterisk" className="input"></InputGroup>
        <Button icon="walk" intent={Intent.PRIMARY}>
          添加到代理
        </Button>
        <Button icon="disable" intent={Intent.WARNING}>
          添加到黑名单
        </Button>
      </ControlGroup>
      <div className="tag-wrap">
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
        <Tag className="tag">11</Tag>
      </div>
    </div>
  );
};

export default EditInput;

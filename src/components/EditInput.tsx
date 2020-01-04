import React, { useState, useEffect } from "react";
import { Action } from "redux";
import {
  Button,
  ControlGroup,
  InputGroup,
  Tag,
  Intent
} from "@blueprintjs/core";
import { Report } from "@/actions/report";
import { Rule } from "@/actions/rule";
import "./EditInput.scss";

export type EditInputProps = {
  rule: Rule[];
  report: Report[];
  addRule: (hostname: string, delInd?: number) => Action;
};

const EditInput = (props: EditInputProps) => {
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
        {props.report.map(r => (
          <Tag className="tag" key={r.hostname} onClick={() => {
            
          }}>
            {r.hostname}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default EditInput;

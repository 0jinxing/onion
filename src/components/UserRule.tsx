import React from "react";
import dayjs from "dayjs";
import { Table, Column, Cell, TruncatedFormat } from "@blueprintjs/table";
import { Intent } from "@blueprintjs/core";
import { Rule } from "../reducers/rule";
import EditInput from "./EditInput";
import "./UserRule.scss";

export type UserRulrsProps = {
  rule: Rule[];
};

const UserRulrs = (props: UserRulrsProps) => {
  const patternRenderer = (rowIndex: number) => {
    const rule = props.rule[rowIndex];
    return (
      <Cell
        tooltip={rule.pattern}
        intent={rule.pattern.startsWith("@@") ? Intent.DANGER : Intent.SUCCESS}
      >
        {rule.pattern}
      </Cell>
    );
  };

  const modifyRenderer = (rowIndex: number) => {
    const rule = props.rule[rowIndex];
    const moment = dayjs(rule.modifyAt);
    return (
      <Cell>
        <TruncatedFormat>
          {moment.format("YYYY-MM-DD HH:mm:ss")}
        </TruncatedFormat>
      </Cell>
    );
  };

  return (
    <div className="user-rule">
      <Table
        enableMultipleSelection
        numRows={props.rule.length}
        defaultColumnWidth={200}
      >
        <Column name="Pattern" cellRenderer={patternRenderer} />
        <Column name="Modify at" cellRenderer={modifyRenderer} />
      </Table>
      <p className="desc">
        用户规则，遵循与
        <a className="link" href="https://adblockplus.org/" target="_blank">
          Adblockplus
        </a>
        一样的设定，阅读
        <a
          className="link"
          target="_blank"
          href="https://help.eyeo.com/en/adblockplus/how-to-write-filters"
        >
          《如何撰写用户规则》
        </a>
        了解更多
      </p>
      <EditInput />
    </div>
  );
};

export default UserRulrs;

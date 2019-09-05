import React from "react";
import { Table, Column, Cell } from "@blueprintjs/table";

export type UserRulrsProps = {
  rules: string[];
};

const UserRulrs = (props: UserRulrsProps) => {
  const cellRenderer = (rowIndex: number) => (
    <Cell>{props.rules[rowIndex]}</Cell>
  );

  return (
    <div>
      <Table numRows={props.rules.length}>
        <Column name="用户规则列表" cellRenderer={cellRenderer} />
      </Table>
      <p
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#5c7080"
        }}
      >
        用户规则，遵循与
        <a
          href="https://adblockplus.org/"
          target="_blank"
          style={{
            margin: "0 .4em"
          }}
        >
          Adblockplus
        </a>
        一样的设定，阅读
        <a
          target="_blank"
          href="https://help.eyeo.com/en/adblockplus/how-to-write-filters"
          style={{
            margin: "0 .4em"
          }}
        >
          《如何撰写用户规则》
        </a>
        了解更多
      </p>
    </div>
  );
};

export default UserRulrs;

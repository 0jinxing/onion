import React from "react";
import { Table } from "antd";
import { RuleState, Rule } from "@/reducers/rule";
import dayjs from "dayjs";

const { Column } = Table;

export type RuleTableProps = {
  rules: RuleState;
  deleteRule: (pattern: string) => void;
};

const RuleTable = (props: RuleTableProps) => {
  const { rules, deleteRule } = props;
  const tableData = rules.map((i) => ({ ...i, key: i.pattern }));

  return (
    <div className="ghoo-rule-table">
      <Table
        bordered
        dataSource={tableData}
        className="ghoo-rule-table__table"
        size="small"
      >
        <Column dataIndex="pattern" title="PATTERN" />
        <Column
          width="15em"
          dataIndex="timestamp"
          title="TIMESTAMP"
          render={(_, record: Rule) => {
            return dayjs(record.timestamp).format();
          }}
        />
        <Column
          width="10em"
          title="ACTION"
          render={(_, record: Rule) => (
            <span>
              <a onClick={() => deleteRule(record.pattern)}>Delete</a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default RuleTable;

import React from "react";
import { Table } from "antd";
import { RuleState } from "@/reducers/rule";
import dayjs from "dayjs";

const { Column } = Table;

const _tableData = Array.from({ length: 1 }).map((_, ind) => ({
  key: ind,
  pattern: "baidu.com",
  timestamp: "2019/01/01 00:00:00",
}));

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
        dataSource={_tableData}
        className="ghoo-rule-table__table"
        size="small"
      >
        <Column key="pattern" dataIndex="pattern" title="PATTERN" />
        <Column
          width="15em"
          key="timestamp"
          dataIndex="timestamp"
          title="TIMESTAMP"
          render={(_, record: { pattern: string; timestamp: number }) => {
            return dayjs(record.timestamp).format();
          }}
        />
        <Column
          width="10em"
          key="timestamp"
          title="ACTION"
          render={(text, record: { pattern: string; timestamp: number }) => (
            <span>
              <a
                onClick={() => {
                  deleteRule(record.pattern);
                }}
              >
                Delete
              </a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default RuleTable;

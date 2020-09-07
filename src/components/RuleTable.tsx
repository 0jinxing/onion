import React from "react";
import { Table } from "antd";
import { RuleState, Rule } from "@/reducers/rule";
import RuleInput from "@/containers/RuleInput";
import dayjs from "dayjs";

const { Column } = Table;

export type RuleTableProps = {
  rules: RuleState;
  deleteRule: (pattern: string) => void;
};

const RuleTable = (props: RuleTableProps) => {
  const { rules, deleteRule } = props;
  const tableData = rules.map(i => ({ ...i, key: i.pattern }));

  return (
    <div className="ghoo-table-panel">
      <div className="ghoo-table-panel__helper">
        <span>自定义的规则列表，列表中的优先级高于 GWFList</span>
        <RuleInput />
      </div>
      <Table bordered dataSource={tableData} className="ghoo-table-panel__table" size="small">
        <Column dataIndex="pattern" title="PATTERN" />
        <Column
          width="20em"
          dataIndex="timestamp"
          title="TIMESTAMP"
          render={(_, record: Rule) => {
            return dayjs(record.timestamp).format();
          }}
        />
        <Column
          width="10em"
          title="ACTION"
          align="center"
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

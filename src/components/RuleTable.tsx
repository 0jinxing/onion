import React from "react";
import { Table } from "antd";

const { Column } = Table;

const tableData = Array.from({ length: 100 }).map((_, ind) => ({
  key: ind,
  pattern: "baidu.com",
  timestamp: "2019/01/01 00:00:00"
}));

const RuleTable = () => {
  return (
    <div className="ghoo-rule-table">
      <Table
        bordered
        dataSource={tableData}
        pagination={false}
        className="ghoo-rule-table__table"
        size="small"
        scroll={{ y: 300 }}
      >
        <Column key="pattern" dataIndex="pattern" title="PATTERN" />
        <Column
          width="15em"
          key="timestamp"
          dataIndex="timestamp"
          title="TIMESTAMP"
        />
        <Column
          width="10em"
          key="timestamp"
          title="ACTION"
          render={(text, record) => (
            <span>
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
      <p className="ghoo-rule-table__tip">
        用户规则，遵循与
        <a href="https://adblockplus.org/" target="__blank">
          Adblockplus
        </a>
        一样的设定，阅读
        <a
          href="https://help.eyeo.com/en/adblockplus/how-to-write-filters"
          target="__blank"
        >
          《如何撰写用户规则》
        </a>
        了解更多
      </p>
    </div>
  );
};

export default RuleTable;

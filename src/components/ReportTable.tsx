import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { Report } from "@/reducers/report";
import dayjs from "dayjs";
import SearchInput from "@/components/SearchInput";

const { Column } = Table;

export type ReportTableProps = {
  reports: Report[];
  deleteReport: (hostname: string) => void;
  addRule: (pattern: string) => void;
};

export type ReportTableData = {
  hostname: string;
  timestamp: number;
  key: string;
};

function ReportTable(props: ReportTableProps) {
  const { reports, addRule, deleteReport } = props;

  const [kw, setKw] = useState("");

  const [tableData, setTableData] = useState<ReportTableData[]>([]);

  useEffect(() => {
    const data: ReportTableData[] = reports
      .reduce((arr: Report[], item) => {
        if (arr.find(i => i.hostname === item.hostname)) {
          return arr;
        }
        return [...arr, item];
      }, [])
      .map(i => ({ hostname: i.hostname, timestamp: i.timestamp, key: i.hostname }))
      .filter(i => i.hostname.includes(kw || ""));

    setTableData(data);
  }, [kw, reports]);

  const expandedRowRender = ({ hostname }: { hostname: string }) => {
    const expandedRow = reports
      .filter(i => i.hostname === hostname)
      .map(i => ({ href: i.href, type: i.type, key: i.href }));

    const columns = [
      {
        title: "HREF",
        dataIndex: "href",
        ellipsis: true,
        render: (text: string, { href }: { href: string }) => (
          <a href={href} target="__blank">
            {text}
          </a>
        )
      },
      { title: "TYPE", dataIndex: "type", width: "10em" }
    ];

    return <Table columns={columns} dataSource={expandedRow} pagination={false} size="small" />;
  };

  return (
    <div className="ghoo-table-panel">
      <div className="ghoo-table-panel__helper">
        <span>加载失败的资源列表</span>
        <SearchInput
          onChange={ev => {
            debugger;
            setKw(ev.target.value);
          }}
        />
      </div>
      <Table
        className="ghoo-table-panel__table"
        bordered
        dataSource={tableData}
        size="small"
        expandedRowRender={expandedRowRender}
      >
        <Column dataIndex="hostname" title="HOSTNAMES" />
        <Column
          width="15em"
          dataIndex="timestamp"
          title="TIMESTAMP"
          render={(_, record: Report) => {
            return dayjs(record.timestamp).format();
          }}
        />
        <Column
          title="ACTION"
          align="center"
          width="15em"
          render={(_, record: Report) => {
            return (
              <span>
                <a
                  style={{ marginRight: 16 }}
                  onClick={() => {
                    addRule(record.hostname);
                    deleteReport(record.hostname);
                  }}
                >
                  Add rule
                </a>
                <a onClick={() => deleteReport(record.hostname)}>Delete</a>
              </span>
            );
          }}
        />
      </Table>
    </div>
  );
}

export default ReportTable;

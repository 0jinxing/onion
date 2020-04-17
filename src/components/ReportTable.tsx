import React from "react";
import { Table } from "antd";
import type { ReportState, Report } from "@/reducers/report";
import dayjs from "dayjs";

const { Column } = Table;

export type ReportTableProps = {
  reports: ReportState;
  deleteReport: (hostname: string) => void;
  addRule: (pattern: string) => void;
};

function ReportTable(props: ReportTableProps) {
  const { reports, addRule, deleteReport } = props;

  const tableData = reports
    .reduce((arr: Report[], item) => {
      if (arr.find(i => i.hostname === item.hostname)) {
        return arr;
      }
      return [...arr, item];
    }, [])
    .map(i => ({ hostname: i.hostname, timestamp: i.timestamp, key: i.hostname }));

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
    <Table bordered dataSource={tableData} size="small" expandedRowRender={expandedRowRender}>
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
  );
}

export default ReportTable;

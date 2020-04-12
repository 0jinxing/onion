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
  const tableData = reports.map((i) => ({ ...i, key: i.hostname }));

  return (
    <Table bordered dataSource={tableData} size="small">
      <Column dataIndex="hostname" title="HOSTNAMES" />
      <Column dataIndex="mime" title="MIME" />
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

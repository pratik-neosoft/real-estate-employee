import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Log ID",
    dataIndex: "logId",
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ["descend"],
  },
  {
    title: "Application Type",
    dataIndex: "applicationType",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Application ID",
    dataIndex: "applicationID",
    render: (_, record) => (
      <div>
        {record.applicationId ? (
          <span>{record.applicationId}</span>
        ) : (
          <span style={{ color: "#a5a5a5" }}>-/-</span>
        )}
      </div>
    ),
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Action",
    dataIndex: "actionType",
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ["descend"],
  },
  {
    title: "Action Details",
    dataIndex: "actionDetails",
    render: (_, record) => (
      <div>
        {record.actionDetails ? (
          <span>{record.actionDetails}</span>
        ) : (
          <span style={{ color: "#a5a5a5" }}>-/-</span>
        )}
      </div>
    ),
  },
  {
    title: "Date: Time",
    dataIndex: "creationTimestamp",
    render: (_, record) => (
      <div>{record.creationTimestamp.replace(" ", " / ")}</div>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function EmployeLogs(props) {
  const { data } = props;
  return (
    <Table
      columns={columns}
      dataSource={data.auditLog}
      onChange={onChange}
      pagination={{
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
    />
  );
}

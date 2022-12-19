import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { parseUrlToJson } from "../../helper/helper";
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
  const { data, queryParams } = props;
  const [employeeData, setEmployeeData] = useState(data.auditLog);

  useEffect(() => {
    setEmployeeData(data.auditLog);
    const query = parseUrlToJson(queryParams);
    if (query.employee_name) {
      setEmployeeData((prevData) => {
        return prevData.filter((item) =>
          item.logId.toString().includes(query.employee_name)
        );
      });
    }
    if (query.action_type) {
      setEmployeeData((prevData) => {
        return prevData.filter((item) =>
          item.actionType.includes(query.action_type)
        );
      });
    }
    if (query.application_type) {
      setEmployeeData((prevData) => {
        return prevData.filter((item) =>
          item.applicationType?.includes(query.application_type)
        );
      });
    }
    if (query.application_id) {
      setEmployeeData((prevData) => {
        return prevData.filter((item) =>
          item.applicationId?.toString().includes(query.application_id)
        );
      });
    }
    if (query.from_date && query.to_date) {
      setEmployeeData((prevData) =>
        prevData.filter(
          (item) =>
            new Date(item.creationTimestamp).getTime() >=
              new Date(query.from_date).getTime() &&
            new Date(item.creationTimestamp).getTime() <=
              new Date(query.to_date).getTime()
        )
      );
    } else if (query.from_date) {
      setEmployeeData((prevData) =>
        prevData.filter(
          (item) =>
            new Date(item.creationTimestamp).getTime() >=
            new Date(query.from_date).getTime()
        )
      );
    } else if (query.to_date) {
      setEmployeeData((prevData) =>
        prevData.filter(
          (item) =>
            new Date(item.creationTimestamp).getTime() <=
            new Date(query.to_date).getTime()
        )
      );
    }
  }, [data, queryParams]);

  return (
    <Table
      columns={columns}
      dataSource={employeeData}
      onChange={onChange}
      pagination={{
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
    />
  );
}

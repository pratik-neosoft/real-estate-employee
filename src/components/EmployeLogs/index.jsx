import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { parseUrlToJson } from "../../helper/helper";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.css";

const TableHeaderColumn = (sortColumns, title, dataIndex) => {
  const sortedColumn = sortColumns?.find(
    ({ order }) => order === "ascend" || order === "descend"
  );
  return (
    <span>
      {title}
      {sortedColumn && sortedColumn?.column?.dataIndex === dataIndex ? (
        sortedColumn.order === "ascend" ? (
          <span className="sort-icon">
            <ArrowUpOutlined />
          </span>
        ) : (
          <span className="sort-icon">
            <ArrowDownOutlined />
          </span>
        )
      ) : null}
    </span>
  );
};

const columns = [
  {
    dataIndex: "logId",
    sorter: (a, b) => a.logId - b.logId,
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Log ID", "logId"),
    width: "15%",
  },
  {
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Application Type", "applicationType"),
    dataIndex: "applicationType",
    render: (_, record) => (
      <div>
        {record.applicationType ? (
          <span>{record.applicationType}</span>
        ) : (
          <span style={{ color: "#a5a5a5" }}>-/-</span>
        )}
      </div>
    ),
    sorter: (a, b) => {
      if (a?.applicationType && b?.applicationType) {
        return a.applicationType.localeCompare(b.applicationType);
      } else if (a?.applicationType) {
        return -1;
      } else if (b?.applicationType) {
        return 1;
      }
      return 0;
    },
    width: "20%",
  },
  {
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Application ID", "applicationId"),
    dataIndex: "applicationId",
    render: (_, record) => (
      <div>
        {record.applicationId ? (
          <span>{record.applicationId}</span>
        ) : (
          <span style={{ color: "#a5a5a5" }}>-/-</span>
        )}
      </div>
    ),
    sorter: (a, b) => {
      if (a?.applicationId && b?.applicationId) {
        return a.applicationId - b.applicationId;
      } else if (a?.applicationId) {
        return -1;
      } else if (b?.applicationId) {
        return 1;
      }
      return 0;
    },
    width: "15%",
  },
  {
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Action", "actionType"),
    dataIndex: "actionType",
    sorter: (a, b) => {
      if (a?.actionType && b?.actionType) {
        return a.actionType.localeCompare(b.actionType);
      } else if (a?.actionType) {
        return -1;
      } else if (b?.actionType) {
        return 1;
      }
      return 0;
    },
    width: "20%",
  },
  {
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Action Details", "actionDetails"),
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
    sorter: (a, b) => {
      if (a?.actionDetails && b?.actionDetails) {
        return a.actionDetails.localeCompare(b.actionDetails);
      } else if (a?.actionDetails) {
        return -1;
      } else if (b?.actionDetails) {
        return 1;
      }
      return 0;
    },
    width: "15%",
  },
  {
    title: ({ sortColumns }) =>
      TableHeaderColumn(sortColumns, "Date: Time", "creationTimestamp"),
    dataIndex: "creationTimestamp",
    render: (_, record) => (
      <div>{record.creationTimestamp.replace(" ", " / ")}</div>
    ),
    sorter: (a, b) =>
      moment(a.creationTimestamp).unix() - moment(b.creationTimestamp).unix(),
    width: "15%",
  },
];

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
      pagination={{
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
    />
  );
}

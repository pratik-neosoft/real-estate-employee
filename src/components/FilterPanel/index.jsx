import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { getFilterOption } from "../../helper/helper";
import "./index.css";

export default function FilterPanel({ data }) {
  const [form] = Form.useForm();
  const ActionTypes = getFilterOption(data, "actionType");
  const ApplicationTypes = getFilterOption(data, "applicationType");

  const onFinish = (values) => {
    let updateValues;
    updateValues = {
      ...values,
      from_date: values.from_date?.format("YYYY-MM-DD HH:mm:ss"),
      to_date: values.to_date?.format("YYYY-MM-DD HH:mm:ss"),
    };
    var newurl =
      window.location.origin +
      "?" +
      new URLSearchParams(updateValues).toString();
    window.history.pushState({ path: newurl }, "", newurl);
  };

  return (
    <div className="filter-container">
      <Form form={form} layout="inline" colon={false} onFinish={onFinish}>
        <Form.Item
          className="filter-form"
          name="employee_name"
          label="Employee Name"
        >
          <Input placeholder="e.g. Admin.User" />
        </Form.Item>
        <Form.Item
          className="filter-form"
          name="action_type"
          label="Action Type"
        >
          <Select style={{ width: 220 }} options={ActionTypes} />
        </Form.Item>
        <Form.Item
          className="filter-form"
          name="application_type"
          label="Application Type"
        >
          <Select style={{ width: 220 }} options={ApplicationTypes} />
        </Form.Item>
        <Form.Item className="filter-form" name="from_date" label="From Date">
          <DatePicker
            style={{ width: 220 }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item className="filter-form" name="to_date" label="To Date">
          <DatePicker
            style={{ width: 220 }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item
          className="filter-form"
          name="application_id"
          label="Application ID"
        >
          <Input placeholder="e.g. 219841/2021" />
        </Form.Item>
        <Form.Item className="filter-form" label={<div />}>
          <Button
            style={{ backgroundColor: "#10489b", width: 220 }}
            type="primary"
            htmlType="submit"
          >
            Search Logger
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

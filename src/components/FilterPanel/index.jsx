import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilterOption, parseUrlToJson } from "../../helper/helper";
import "./index.css";
import dayjs from "dayjs";

export default function FilterPanel({ data, queryParams }) {
  const handleInitialValue = () => {
    const params = {
      ...parseUrlToJson(queryParams),
      from_date: parseUrlToJson(queryParams)?.from_date
        ? dayjs(parseUrlToJson(queryParams).from_date)
        : undefined,
      to_date: parseUrlToJson(queryParams)?.to_date
        ? dayjs(parseUrlToJson(queryParams).to_date)
        : undefined,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    return params;
  };

  const [form] = Form.useForm();
  const ActionTypes = getFilterOption(data, "actionType");
  const ApplicationTypes = getFilterOption(data, "applicationType");
  const [searchParams, setsearchParams] = useState(
    handleInitialValue(queryParams)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const query = parseUrlToJson(queryParams);
    const params = {
      action_type: query?.action_type || undefined,
      application_id: query?.application_id || undefined,
      application_type: query?.application_type || undefined,
      employee_name: query?.employee_name || undefined,
      from_date: query?.from_date ? dayjs(query.from_date) : undefined,
      to_date: query?.to_date ? dayjs(query.to_date) : undefined,
    };

    form.setFieldsValue(params);
  }, [queryParams, form]);

  const onFinish = (values) => {
    let updateValues;

    updateValues = {
      ...values,
      from_date: values.from_date?.format("YYYY-MM-DD HH:mm:ss"),
      to_date: values.to_date?.format("YYYY-MM-DD HH:mm:ss"),
    };

    Object.keys(updateValues).forEach((key) => {
      if (updateValues[key] === undefined || updateValues[key] === "") {
        delete updateValues[key];
      }
    });

    navigate(`/?${new URLSearchParams(updateValues).toString()}`);
  };

  return (
    <div className="filter-container">
      <Form
        form={form}
        layout="inline"
        initialValues={searchParams}
        colon={false}
        onFinish={onFinish}
      >
        <Form.Item
          className="filter-form"
          name="employee_name"
          label="Employee Name"
        >
          <Input placeholder="e.g. Admin.User" allowClear />
        </Form.Item>
        <Form.Item
          className="filter-form"
          name="action_type"
          label="Action Type"
        >
          <Select style={{ width: 220 }} options={ActionTypes} allowClear />
        </Form.Item>
        <Form.Item
          className="filter-form"
          name="application_type"
          label="Application Type"
        >
          <Select
            style={{ width: 220 }}
            options={ApplicationTypes}
            allowClear
          />
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
          <Input placeholder="e.g. 219841/2021" allowClear />
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

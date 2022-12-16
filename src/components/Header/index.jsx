import { Breadcrumb } from "antd";
import React from "react";
import "./index.css";

export default function Header() {
  return (
    <div>
      <Breadcrumb separator={">"}>
        <Breadcrumb.Item className="breadcrumb-item breadcrumb-active">Home</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item breadcrumb-active">
          Administration
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-item">Logger search</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

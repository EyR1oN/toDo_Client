import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export default function Header() {
  return (
    <div className="center-cont">
      <div className="header">
        <div>
          <Title level={2}>ToDo List</Title>
        </div>
      </div>
    </div>
  );
}

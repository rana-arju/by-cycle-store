import type React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={93}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}lg={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={15600}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;

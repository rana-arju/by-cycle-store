import type React from "react";
import { Table, Tag, Space, Button } from "antd";

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
}

const columns = [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (total: number) => `$${total.toFixed(2)}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "green";
      if (status === "Pending") {
        color = "gold";
      } else if (status === "Cancelled") {
        color = "red";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: Order) => (
      <Space size="middle">
        <Button type="primary">View Details</Button>
        <Button danger={record.status === "Pending"}>
          {record.status === "Pending" ? "Cancel" : "Update Status"}
        </Button>
      </Space>
    ),
  },
];

const data: Order[] = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-05-01",
    total: 99.99,
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-05-02",
    total: 149.99,
    status: "Pending",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2023-05-03",
    total: 79.99,
    status: "Cancelled",
  },
];

const Orders: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
};

export default Orders;

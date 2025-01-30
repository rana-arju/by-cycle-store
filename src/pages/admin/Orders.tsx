import type React from "react";
import { Table, Tag, Space, Button } from "antd";
import { useAllOrdersQuery } from "../../redux/features/order/orderApi";
import moment from "moment";
interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
}

const columns = [
  {
    title: "transaction ID",
    dataIndex: "transaction.id",
    key: "transaction",
  },
  {
    title: "Customer",
    dataIndex: "user.name",
    key: "customer",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Total",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (total: number) => `$${total?.toFixed(2)}`,
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



const Orders: React.FC = () => {
  const {
    data: allOrders,
    isFetching,
    isLoading,
  } = useAllOrdersQuery(undefined);
  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <Table columns={columns} dataSource={allOrders?.data} rowKey="id" />
    </>
  );
};

export default Orders;

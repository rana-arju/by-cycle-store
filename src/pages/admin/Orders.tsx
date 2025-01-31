import type React from "react";
import { Table, Tag } from "antd";
import { useAllOrdersQuery } from "../../redux/features/order/orderApi";
import { OrderActions } from "../../components/actions/OrderAction";
interface Order {
  id: number;
  user: {
    name:string,
    email: string
  };
  date: string;
  total: number;
  status: string;
}

const columns = [
  {
    title: "transaction ID",
    dataIndex: "transaction",
    key: "transaction",
    render: (item: any) => `${item.id}`,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (item: any) => `${item.email}`,
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
    render: (total: number) => `৳${total?.toFixed(2)}`,
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
    render: (_: any, record: Order) => <OrderActions url="" item={record} />,
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

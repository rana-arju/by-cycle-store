import type React from "react";
import { useState } from "react";
import { Table, Tag, Card, List, Typography, Space, Spin } from "antd";
import { useAllOrdersQuery } from "../../redux/features/order/orderApi";
import { OrderActions } from "../../components/actions/OrderAction";
import { useMediaQuery } from "react-responsive";
import "./Order.css";

const { Title, Text } = Typography;

interface Order {
  id: number;
  transaction: {
    id: string;
  };
  customer: {
    email: string;
  };
  createdAt: string;
  totalPrice: number;
  status: string;
}

const Orders: React.FC = () => {
  const {
    data: allOrders,
    isFetching,
    isLoading,
  } = useAllOrdersQuery(undefined);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: ["transaction", "id"],
      key: "transaction",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "email"],
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
      render: (_: any, record: Order) => (
        <OrderActions
          url={`/dashboard/order/${record?.transaction?.id}`}
          target="admin"
          item={record}
        />
      ),
    },
  ];

  const onExpandRow = (expanded: boolean, record: Order) => {
    const keys = expanded
      ? [...expandedRowKeys, record.id.toString()]
      : expandedRowKeys.filter((key) => key !== record.id.toString());
    setExpandedRowKeys(keys);
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="orders-container">
      <Title level={2} className="mb-6">
        Orders
      </Title>
      {isMobile ? (
        <List
          dataSource={allOrders?.data}
          renderItem={(item: Order) => (
            <List.Item key={item.id}>
              <Card className="w-full">
                <Space direction="vertical" className="w-full">
                  <Text strong>Transaction ID: {item.transaction.id}</Text>
                  <Text>Customer: {item.customer?.email}</Text>
                  <Text>Date: {item.createdAt}</Text>
                  <Text>Total: ৳{item.totalPrice.toFixed(2)}</Text>
                  <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                  <OrderActions url="" item={item} />
                </Space>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={allOrders?.data}
          rowKey="id"
          expandable={{
            expandedRowKeys,
            onExpand: onExpandRow,
          }}
          className="orders-table"
        />
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "gold";
    case "Cancelled":
      return "red";
    default:
      return "green";
  }
};

export default Orders;

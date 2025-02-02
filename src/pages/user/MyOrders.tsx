import type React from "react";
import { useState } from "react";
import { Table, Tag, Card, List, Typography, Space, Spin } from "antd";
import { useMediaQuery } from "react-responsive";
import { useMyOrdersQuery } from "../../redux/features/order/orderApi";
import { MyOrderActions } from "../../components/actions/MyOrderAction";
const { Title, Text } = Typography;

interface Order {
  id: number;
  transaction: {
    id: string;
  };
  user: {
    email: string;
  };
  createdAt: string;
  totalPrice: number;
  status: string;
}

const MyOrders: React.FC = () => {
  const { data: myOrders, isFetching, isLoading } = useMyOrdersQuery(undefined);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const orderData = myOrders?.data;
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: ["transaction", "id"],
      key: "transaction",
    },
    {
      title: "Customer",
      dataIndex: ["user", "email"],
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
        <MyOrderActions
          url={`/dashboard/order/${record.transaction.id}`}
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
        My Orders
      </Title>
      {isMobile ? (
        <List
          dataSource={orderData}
          renderItem={(item: Order) => {
            
            return (
              <List.Item key={item.id}>
                <Card className="w-full">
                  <Space direction="vertical" className="w-full">
                    <Text strong>Transaction ID: {item.transaction.id}</Text>
                    <Text>Customer: {item?.user?.email}</Text>
                    <Text>Date: {item.createdAt}</Text>
                    <Text>Total: ৳{item.totalPrice.toFixed(2)}</Text>
                    <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                    <MyOrderActions
                      url={`/dashboard/order/${item.transaction.id}`}
                      item={item}
                    />
                  </Space>
                </Card>
              </List.Item>
            );
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={orderData}
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

export default MyOrders;

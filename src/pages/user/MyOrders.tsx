import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  List,
  Avatar,
  Tag,
  Spin,
  Typography,
  Statistic,
  Row,
  Col,
  Timeline,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { mockOrders } from "./mockData";

const { Title} = Typography;

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
  price: number;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrderData(mockOrders);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const renderOrderCard = (order: Order) => (
    <Card
      key={order._id}
      className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300"
      actions={[
        <Statistic
          key="totalPrice"
          title="Total Price"
          value={order.totalPrice}
          prefix="$"
          precision={2}
        />,
        <Statistic key="items" title="Items" value={order.products.length} />,
        <Statistic
          key="status"
          title="Status"
          value={order.status}
          formatter={(value) => <Tag color={getStatusColor(value as string)}>{value}</Tag>}
        />,
      ]}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4}>
            <UserOutlined className="mr-2" />
            Customer Information
          </Title>
          <p>
            <strong>Name:</strong> {order.user}
          </p>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </Col>
        <Col span={12}>
          <Title level={4}>
            <ShoppingCartOutlined className="mr-2" />
            Products
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={order.products}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<ShoppingCartOutlined />} />}
                  title={item.product}
                  description={`Quantity: ${
                    item.quantity
                  } | Price: $${item.price.toFixed(2)}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4}>
            <DollarOutlined className="mr-2" />
            Transaction Details
          </Title>
          <p>
            <strong>Transaction ID:</strong> {order.transaction.id}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.transaction.method}
          </p>
          <p>
            <strong>Transaction Status:</strong> {order.transaction.bank_status}
          </p>
        </Col>
        <Col span={12}>
          <Title level={4}>
            <ClockCircleOutlined className="mr-2" />
            Order Timeline
          </Title>
          <Timeline>
            <Timeline.Item color="green">
              Order Placed ({new Date(order.createdAt).toLocaleString()})
            </Timeline.Item>
            <Timeline.Item color="blue">
              Payment {order.transaction.bank_status} (
              {order.transaction.date_time})
            </Timeline.Item>
            {order.status === "Completed" && (
              <Timeline.Item color="green">
                Order Completed ({new Date(order.updatedAt).toLocaleString()})
              </Timeline.Item>
            )}
          </Timeline>
        </Col>
      </Row>
    </Card>
  );
 
  return (
    <div className="p-6 max-w-7xl mx-auto container" style={{marginBottom: "50px"}} >
      <Title level={2} className="mb-6 text-center">
        Order Details
      </Title>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        orderData.map(renderOrderCard)
      )}
    </div>
  );
};

export default OrderDetails;

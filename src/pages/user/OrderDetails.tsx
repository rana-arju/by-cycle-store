import type React from "react";
import {
  Card,
  List,
  Tag,
  Spin,
  Typography,
  Statistic,
  Row,
  Col,
  Timeline,
  Divider,
  Image,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useMyOrdersQuery } from "../../redux/features/order/orderApi";
import styles from "../../styles/OrderDetails.module.css";
const { Title } = Typography;

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
  product: {
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  _id: string;
  price: number;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: {
    name: string;
    email: string;
  };
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrdersDetails: React.FC = () => {
  const { data: orders, isFetching, isLoading } = useMyOrdersQuery(undefined);
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  const orderData = orders?.data;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "paid":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const renderOrderCard = (order: Order) => (
    <Card key={order._id} className={styles.orderCard}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title level={4} className={styles.cardTitle}>
            <UserOutlined className="mr-2" />
            Customer Information
          </Title>
          <p>
            <strong>Name:</strong> {order.user.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Title level={4} className={styles.cardTitle}>
            <ShoppingCartOutlined className="mr-2" />
            Products
          </Title>
          <List
            className={styles.productList}
            itemLayout="horizontal"
            dataSource={order.products}
            renderItem={(item) => (
              <List.Item className={styles.productItem}>
                <Image
                  src={item?.product?.images[0]}
                  alt={item.product?.name}
                  className={styles.productImage}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{item.product?.name}</div>
                  <div className={styles.productDetails}>
                    Quantity: {item.quantity} | Price: $
                    {item?.product?.price.toFixed(2)}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title level={4}>
            <DollarOutlined className="mr-2" />
            Transaction Details
          </Title>
          {order.transaction ? (
            <>
              <p>
                <strong>Transaction ID:</strong> {order.transaction.id}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order.transaction.method || "N/A"}
              </p>
              <p>
                <strong>Transaction Status:</strong>{" "}
                {order.transaction.bank_status ||
                  order.transaction.transactionStatus ||
                  "N/A"}
              </p>
            </>
          ) : (
            <p>No transaction details available</p>
          )}
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Title level={4}>
            <ClockCircleOutlined className="mr-2" />
            Order Timeline
          </Title>
          <Timeline>
            <Timeline.Item color="green">
              Order Placed ({new Date(order.createdAt).toLocaleString()})
            </Timeline.Item>
            {order.transaction && order.transaction.date_time && (
              <Timeline.Item color="blue">
                Payment{" "}
                {order.transaction.bank_status ||
                  order.transaction.transactionStatus}{" "}
                ({order.transaction.date_time})
              </Timeline.Item>
            )}
            {order.status === "Paid" && (
              <Timeline.Item color="green">
                Order Completed ({new Date(order.updatedAt).toLocaleString()})
              </Timeline.Item>
            )}
          </Timeline>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Statistic
            title="Total Price"
            value={order.totalPrice}
            prefix="$"
            precision={2}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic title="Items" value={order.products.length} />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="Status"
            formatter={() => (
              <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
            )}
          />
        </Col>
      </Row>
    </Card>
  );

  return (
    <div
      className="p-6 max-w-7xl mx-auto container"
      style={{ paddingTop: "20px", paddingBottom: "50px" }}
    >
      <Title level={2} className="mb-6 text-center">
        My Order Details
      </Title>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : orderData && orderData?.length > 0 ? (
        orderData.map(renderOrderCard)
      ) : (
        <div>
          <p>No order data</p>
        </div>
      )}
    </div>
  );
};

export default OrdersDetails;

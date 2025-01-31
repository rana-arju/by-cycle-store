import type React from "react";
import { Row, Col, Button, Typography, Card } from "antd";
import "./seles.css";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const SaleComponent: React.FC = () => {
  return (
    <Row
      justify="center"
      align="middle"
      //gutter={[16, 16]}
      className="container"
      style={{ backgroundColor: "#f3f4f6", borderRadius: "8px", paddingTop: "24px", paddingBottom: "24px", marginTop: "20px" }}
    >
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card className="sale-card">
          <Title level={4} className="sale-subtitle">
            Big
          </Title>
             <Title level={1} className="sale-title">
            Sale!
          </Title>
          <Paragraph className="sale-paragraph">
            Arriving this weekend
          </Paragraph>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="offer-column">
        <Title level={2} className="offer-title">
          Special Offer
        </Title>
        <Title level={4} className="offer-subtitle">
          Limited Time Deal
        </Title>
        <Paragraph className="offer-paragraph">
          Discover amazing discounts and deals. Don't miss out on our exclusive
          offers available for a limited time.
        </Paragraph>
        <Link to="/shop">
        
        <Button type="primary" size="large" className="shop-button">
          Shop Now
        </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default SaleComponent;

import React from "react";
import { Layout, Row, Col, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./footer.css";
import { Link } from "react-router-dom";
const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer
      className="container footer"
      style={{
        marginTop: "20px",
        color: "#000",
        backgroundColor: "white",
        borderTop: "1px solid #d9d9d9",
      }}
    >
      <div>
        {/* Footer Content */}
        <Row gutter={[16, 16]}>
          {/* About Section */}
          <Col xs={24} sm={12} md={6}>
            <h3>About Us</h3>
            <p>
              We are committed to providing the best services and products to
              our customers.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <h3>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" >
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" >
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col xs={24} sm={12} md={6}>
            <h3>Contact Us</h3>
            <p>
              Email: info@example.com <br />
              Phone: +123 456 7890
            </p>
          </Col>

          {/* Social Media */}
          <Col xs={24} sm={12} md={6}>
            <h3>Follow Us</h3>
            <Space size="large">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined
                  style={{ fontSize: "24px" }}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterOutlined
                  style={{ fontSize: "24px"}}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined
                  style={{ fontSize: "24px" }}
                />
              </a>
            </Space>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            borderTop: "1px solid #d9d9d9",
            paddingTop: "10px",
          }}
        >
          <a href="https://github.com/rana-arju" style={{ fontSize: "14px" }}>
            &copy; {new Date().getFullYear()} Rana Arju. All rights reserved.
          </a>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;

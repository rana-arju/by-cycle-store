import { Col, Image, Layout, Row } from "antd";
import AboutHeader from "../components/about";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Boxes from "../components/annouce/Boxes";
import Teams from "../components/team";

function About() {
  return (
    <div className="" style={{ position: "relative" }}>
      <AboutHeader />
      <div className="container">
        <Layout style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
          <Content
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "40px 20px",
            }}
          >
            {/* Mission Section */}
            <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
              <Col xs={24} md={12}>
                <Image
                  src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1737822258/mission_fxof3s.webp" // Replace with your mission image
                  alt="Mission"
                  style={{ borderRadius: "8px" }}
                />
              </Col>
              <Col xs={24} md={12}>
                <Title level={3}>Our Mission</Title>
                <Paragraph style={{ color: "#666" }}>
                  At <b>Speedy Wheels Bicycle Shop</b>, our mission is to
                  provide high-quality bicycles that enhance your riding
                  experience. We aim to create a vibrant community of cycling
                  enthusiasts by promoting healthy and eco-friendly
                  transportation solutions.
                </Paragraph>
                <Paragraph style={{ color: "#666" }}>
                  We believe cycling is more than just a hobby—it's a lifestyle
                  that fosters fitness, adventure, and a cleaner environment.
                </Paragraph>
              </Col>
            </Row>

            {/* Values Section */}
            <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
              <Col xs={24} md={12}>
                <Title level={3}>Our Values</Title>
                <ul style={{ color: "#666", paddingLeft: "20px" }}>
                  <li>
                    <b>Quality:</b> Providing only the best bicycles and
                    accessories.
                  </li>
                  <li>
                    <b>Customer Satisfaction:</b> Ensuring our customers leave
                    with a smile.
                  </li>
                  <li>
                    <b>Sustainability:</b> Promoting eco-friendly transportation
                    alternatives.
                  </li>
                  <li>
                    <b>Community:</b> Supporting local cycling events and
                    building a cycling-friendly community.
                  </li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <Image
                  src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1737822386/values_yhu6wq.webp" // Replace with your values image
                  alt="Values"
                  style={{ borderRadius: "8px" }}
                />
              </Col>
            </Row>
          </Content>
          <Teams />
        </Layout>
      </div>
      <Boxes />
    </div>
  );
}

export default About;

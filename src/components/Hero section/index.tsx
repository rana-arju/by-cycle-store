import { Col, Row } from "antd";
import LeftHero from "./LeftHero";
import RightHero from "./RightHero";
import "./hero.css"
function Hero() {
  return (
      <div className="container mx-auto px-4 py-8">
        <Row gutter={[16, 16]} className="h-full">
          <Col xs={24} lg={16} className="h-full">
            <LeftHero />
          </Col>
          <Col xs={24} lg={8} className="h-full">
            <RightHero />
          </Col>
        </Row>
      </div>
  
  );
}

export default Hero;

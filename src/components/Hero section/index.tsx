import { Col, Row } from "antd";
import LeftHero from "./LeftHero";
import RightHero from "./RightHero";
import "./hero.css"
function Hero() {
  return (
      <div className="container mx-auto " style={{marginTop: "65px"}}>
        <Row gutter={[5, 5]} className="h-full">
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

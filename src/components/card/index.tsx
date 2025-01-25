import { Button, Card } from "antd";
import Rating from "./Rating";
import "./card.css";
const { Meta } = Card;

const ProductCard = () => (
  <Card
    hoverable
 
    cover={
      <img
        alt="example"
        src="https://stryderbikes.com/cdn/shop/products/Voltic-Red-wo-fender_1000x740_a2ecc7f8-abeb-475d-bef7-d9b278ce7fa0.jpg?v=1648544004"
      />
    }
  >
    <Meta title="Europe Street beat" />
    <div className="rating">
     
        <Rating rating={4.6} />
      
      <p style={{fontSize: "15px", fontWeight: "600"}}>4.5</p>
    </div>
    <div>
      <span style={{ fontSize: "15px", fontWeight: "bold" }}>BDT: 500</span>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <Button
        type="primary"
        style={{ fontSize: "15px", textTransform: "capitalize" }}
      >
        Add to Cart
      </Button>
      <Button
        type="primary"
        style={{ fontSize: "15px", textTransform: "capitalize" }}
      >
        Buy Now
      </Button>
    </div>
  </Card>
);

export default ProductCard;

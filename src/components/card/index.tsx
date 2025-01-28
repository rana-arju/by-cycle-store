import { Button, Card } from "antd";
import Rating from "./Rating";
import "./card.css";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }: any) => {
  return (
    <Card hoverable cover={<img alt={product.name} src={product.images[0]} />}>
      <Meta
        title={product.name}
        description={
          <div>
            <div className="flex justify-between items-center gap-4">

            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Model:</span> {product.model}
            </p>
            </div>
          
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>
        }
      />{" "}
      <div className="rating">
        <Rating rating={4.6} />

        <p style={{ fontSize: "15px", fontWeight: "600" }}>4.5</p>
      </div>
      <div>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          BDT: {product.price}
        </span>
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "block",
        }}
      >
        <Link to={`/details/${product?._id}`}>
          <Button
            type="primary"
            style={{ fontSize: "15px", textTransform: "capitalize" }}
            className="w-full"
          >
            Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;

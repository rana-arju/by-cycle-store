import ProductCard from "../card";
import "./featured.css";
import { Link } from "react-router-dom";
function Featured() {
  return (
    <div className="container">
      <div className="featured">
        <h2 className="title">Featured Products</h2>
        <Link
          to="/shop"
          style={{ fontSize: "14px", border: "1px solid #4096FF" ,padding: "5px", borderRadius: "6px"}}
        >
          View All
        </Link>
      </div>
      <div className="productGrid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
       
      </div>
    </div>
  );
}

export default Featured;

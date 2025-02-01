import { Spin } from "antd";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import ProductCard from "../card";
import "./featured.css";
import { Link } from "react-router-dom";
function Featured() {
  const {
    data: products,
    isFetching,
    isLoading,
  } = useGetAllProductQuery([{ name: "limit", value: 6 }]);
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }
  console.log("products", products);
  
  return (
    <div className="container">
      <div className="featured">
        <h2 className="title">Featured Products</h2>
        <Link
          to="/shop"
          style={{
            fontSize: "14px",
            border: "1px solid #4096FF",
            padding: "5px",
            borderRadius: "6px",
          }}
        >
          View All
        </Link>
      </div>
      <div className="productGrid">
        {products &&
          products?.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Featured;

import type React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { AppstoreOutlined, DollarOutlined, ShopOutlined, TagOutlined } from "@ant-design/icons";


const ProductL: React.FC = ({ product }: any) => {
  return (
    <Card
      key={product._id}
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.images[0] || "/placeholder.svg"}
          className="h-48 object-cover"
        />
      }
      className="w-full"
    >
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <ShopOutlined className="mr-2 text-gray-500" />
          <span>{product.brand}</span>
        </div>
        <div className="flex items-center">
          <TagOutlined className="mr-2 text-gray-500" />
          <span>{product.model}</span>
        </div>
        <div className="flex items-center">
          <DollarOutlined className="mr-2 text-gray-500" />
          <span>${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center">
          <AppstoreOutlined className="mr-2 text-gray-500" />
          <span>{product.category}</span>
        </div>
      </div>
      <div className="mt-4">
        <Link to={`/product/${product._id}`}>
          <Button type="primary" block>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductL;

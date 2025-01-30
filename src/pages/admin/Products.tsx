import type React from "react";
import { Table, Tag,  Button} from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { IProduct } from "../../types/product";
import { ProductActions } from "../../components/Actions";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity: number) => (
      <Tag color={quantity > 0 ? "green" : "red"}>{quantity}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "x",
    render: (item: IProduct) => {      
      return <ProductActions item={item} url={`/dashboard/productUpdate/${item._id}`} />
    },
  }
];

const Products: React.FC = () => {
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetAllProductQuery(undefined, { refetchOnMountOrArgChange: true });
  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  const products: IProduct[] = allProducts?.data || [];
  return (
    <>
      <h1 className="text-2xl font-bold " style={{ marginBottom: "10px" }}>
        Products
      </h1>
      <Link to="/dashboard/add-product">
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Add New Product
        </Button>
      </Link>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </>
  );
};

export default Products;

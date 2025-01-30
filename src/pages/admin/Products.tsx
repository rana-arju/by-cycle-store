import type React from "react";
import { Table, Tag, Space, Button } from "antd";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
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
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
    render: (stock: number) => (
      <Tag color={stock > 0 ? "green" : "red"}>{stock}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, _record: Product) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
];

const data: Product[] = [
  {
    id: 1,
    name: "Product A",
    price: 19.99,
    category: "Electronics",
    stock: 50,
  },
  { id: 2, name: "Product B", price: 29.99, category: "Clothing", stock: 100 },
  { id: 3, name: "Product C", price: 9.99, category: "Books", stock: 0 },
];

const Products: React.FC = () => {
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <Link to="/products/add">
        <Button type="primary" className="mb-4">
          Add New Product
        </Button>
      </Link>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
};

export default Products;

import type React from "react";
import { useState } from "react";
import { Table, Tag, Button, List, Card, Typography, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import type { IProduct } from "../../types/product";
import { ProductActions } from "../../components/Actions";
import { useMediaQuery } from "react-responsive";
const { Title, Text } = Typography;

const Products: React.FC = () => {
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetAllProductQuery(undefined, { refetchOnMountOrArgChange: true });

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

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
      key: "actions",
      render: (item: IProduct) => (
        <ProductActions
          item={item}
          url={`/dashboard/productUpdate/${item._id}`}
        />
      ),
    },
  ];

  const onExpandRow = (expanded: boolean, record: IProduct) => {
    const keys = expanded
      ? [...expandedRowKeys, record._id]
      : expandedRowKeys.filter((key) => key !== record._id);
    setExpandedRowKeys(keys);
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const products: IProduct[] = allProducts?.data || [];

  return (
    <div className="products-container">
      <div className="flex justify-between items-center" style={{paddingTop: "40px"}}>
        <Title level={2}>Products</Title>
        <Link to="/dashboard/add-product">
          <Button type="primary">Add New Product</Button>
        </Link>
      </div>
      {isMobile ? (
        <List
          dataSource={products}
          renderItem={(item: IProduct) => (
            <List.Item key={item._id}>
              <Card className="w-full">
                <Space direction="vertical" className="w-full">
                  <Text strong>ID: {item._id}</Text>
                  <Text>Product: {item.name}</Text>
                  <Text>Price: ${item.price.toFixed(2)}</Text>
                  <Text>Category: {item.category}</Text>
                  <Tag color={item?.quantity > 0 ? "green" : "red"}>
                    Quantity: {item?.quantity}
                  </Tag>
                  <ProductActions
                    item={item}
                    url={`/dashboard/productUpdate/${item._id}`}
                  />
                </Space>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          expandable={{
            expandedRowKeys,
            onExpand: onExpandRow,
          }}
          className="orders-table"
        />
      )}
    </div>
  );
};

export default Products;

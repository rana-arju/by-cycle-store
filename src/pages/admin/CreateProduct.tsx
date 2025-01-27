import type React from "react";
import {  Button, Flex, Col } from "antd";
import BForm from "../../components/form/BForm";
import { zodResolver } from "@hookform/resolvers/zod";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { productSchema } from "../../schema/product.schema";
import BSelect from "../../components/form/BSelect";
import { modelOptions } from "../../constant/product";

const AddProduct: React.FC = () => {
  const onSubmit = (values: FieldValues) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className="container" style={{ paddingBottom: "50px" }}>
        <Flex justify="center" align="middle">
          <Col span={12}>
            <h3
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "20px",
                textTransform: "uppercase",
              }}
            >
              Add New Product
            </h3>
            <BForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
              <BInput
                type="text"
                placeholder="Enter product name"
                label="Enter product name"
                name="name"
              />
              <BInput
                type="text"
                placeholder="Brand"
                label="Enter brand"
                name="brand"
              />
              <BSelect
                placeholder="Model"
                label="Model"
                name="model"
                options={modelOptions}
              />
              <BInput
                type="number"
                placeholder="Enter price"
                label="Enter price"
                name="price"
              />{" "}
              <BInput
                type="number"
                placeholder="Enter quantity"
                label="Enter quantity"
                name="quantity"
              />
              <BInput
                type="text"
                placeholder="Product image url"
                label="Enter one Product image url"
                name="images"
              />
              <BInput
                placeholder="Write product description..."
                type="textarea"
                name="description"
                label="Write product description"
              />
              <Button type="primary" htmlType="submit">
                Create new Product
              </Button>
            </BForm>
          </Col>
        </Flex>
      </div>
    </>
  );
};

export default AddProduct;

import type React from "react";
import { Button, Flex, Col, Row, Spin } from "antd";
import BForm from "../../components/form/BForm";
import { zodResolver } from "@hookform/resolvers/zod";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { productSchema } from "../../schema/product.schema";
import BSelect from "../../components/form/BSelect";
import { CategoryOptions, ModelOptions } from "../../constant/product";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { ISingleResponse } from "../../types/global";
import { useNavigate, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useMediaQuery } from "react-responsive";

const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [updateProduct] = useUpdateProductMutation();

  const { data: product, isFetching, isLoading } = useGetSingleProductQuery(id);
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  const data = product?.data;
  const defaultValues = {
    name: data?.name,
    model: data?.model,
    brand: data?.brand,
    quantity: data.quantity.toString(),
    price: data.price.toString(),
    description: data?.description,
    images: data?.images[0],
    category: data?.category,
  };
  const onSubmit = async (values: FieldValues) => {
    const productData = {
      name: values.name,
      model: values.model,
      brand: values.brand,
      quantity: Number(values.quantity),
      price: Number(values.price),
      description: values.description,
      images: [values.images],
      category: values.category,
    };

    const toastId = toast.loading("Adding new product...");
    try {
      const res = (await updateProduct({
        data: productData,
        id,
      })) as ISingleResponse;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        navigate("/dashboard/products", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <div className="add-product-container">
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Title level={3} className="add-product-title">
              Update Product
            </Title>
            <BForm
              onSubmit={onSubmit}
              resolver={zodResolver(productSchema)}
              defaultValues={defaultValues}
            >
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
                options={ModelOptions}
              />
              <BSelect
                placeholder="Category"
                label="Category"
                name="category"
                options={CategoryOptions}
              />
              <Flex wrap="wrap" gap="small">
                <BInput
                  type="number"
                  placeholder="Enter price"
                  label="Enter price"
                  name="price"
                />
                <BInput
                  type="number"
                  placeholder="Enter quantity"
                  label="Enter quantity"
                  name="quantity"
                />
              </Flex>
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
              <Button type="primary" htmlType="submit" block={isMobile}>
                Update Product
              </Button>
            </BForm>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UpdateProduct;

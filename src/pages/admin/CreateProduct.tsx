import type React from "react";
import { Button, Flex, Col, Row, Typography, Modal,  Spin } from "antd";
import { useMediaQuery } from "react-responsive";
import BForm from "../../components/form/BForm";
import { zodResolver } from "@hookform/resolvers/zod";
import BInput from "../../components/form/BInput";
import type { FieldValues } from "react-hook-form";
import { productSchema } from "../../schema/product.schema";
import BSelect from "../../components/form/BSelect";
import {
  bicycleBrandOptions,
  CategoryOptions,
  ModelOptions,
} from "../../constant/product";
import { useAddProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import type { ISingleResponse } from "../../types/global";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ImageUpload from "../../components/upload/imageUpload";

const { Title } = Typography;

const AddProduct: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUploadComplete = (urls: string[]) => {
    setImageUrls(urls);
  };

  const [addProduct, {isLoading}] = useAddProductMutation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const onSubmit = async (values: FieldValues) => {
    const productData = {
      name: values.name,
      model: values.model,
      brand: values.brand,
      quantity: Number(values.quantity),
      price: Number(values.price),
      description: values.description,
      images: imageUrls,
      category: values.category,
    };

    const toastId = toast.loading("Adding new product...");
    try {
      const res = (await addProduct(productData)) as ISingleResponse;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="add-product-container">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={3} className="add-product-title">
            Add New Product
          </Title>
          <BForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
            <BInput
              type="text"
              placeholder="Enter product name"
              label="Enter product name"
              name="name"
            />
     
            <BSelect
              placeholder="Brand"
              label="Brand"
              name="brand"
              options={bicycleBrandOptions}
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
              placeholder="Write product description..."
              type="textarea"
              name="description"
              label="Write product description"
            />
            <div style={{ marginBottom: "20px" }}>
              <Button icon={<UploadOutlined />} onClick={showModal}>
                Click to Upload
              </Button>
            </div>

            <Button type="primary" htmlType="submit" block={isMobile}>
              Create new Product
            </Button>
          </BForm>
          <>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ImageUpload onUploadComplete={handleUploadComplete} />
            </Modal>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;

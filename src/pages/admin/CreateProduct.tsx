import type React from "react";
import { Form, Input, InputNumber, Select, Button, message } from "antd";

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("Product added successfully");
    form.resetFields();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Form
        form={form}
        name="add_product"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-lg"
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            min={0}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select placeholder="Select a category">
            <Option value="electronics">Electronics</Option>
            <Option value="clothing">Clothing</Option>
            <Option value="books">Books</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[
            { required: true, message: "Please input the stock quantity!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the product description!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;

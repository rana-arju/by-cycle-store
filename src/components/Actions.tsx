import { useState } from "react";
import { Button,  Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, ExportOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { IProduct } from "../types/product";
import { useDeleteProductMutation, useGetAllProductQuery } from "../redux/features/product/productApi";

type AdminActionsProps = {
  item: IProduct;
  url: string;
};

export const ProductActions = ({ item, url }: AdminActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
const { refetch } = useGetAllProductQuery(undefined); 
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const toastId = toast.loading("Deleting product...");

    try {
      const res = await deleteProduct(item?._id);

      if (res.error) {
        const errorMessage = (res.error as any)?.data?.message as string;
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space>
      <Link to={`/details/${item._id}`}>
        <Button>
          <ExportOutlined />
        </Button>
      </Link>
      <Link to={url}>
        <Button>
          <EditTwoTone />
        </Button>
      </Link>
      <Button onClick={showModal}>
        <DeleteTwoTone />
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{
            fontSize: "20px",
            textTransform: "capitalize",
            color: "red",
          }}
        >
          Do you want to delete?
        </p>
      </Modal>
    </Space>
  );
};

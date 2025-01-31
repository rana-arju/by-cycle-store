import { useState } from "react";
import { Button, Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, ExportOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useMyOrdersQuery,
} from "../../redux/features/order/orderApi";

export const MyOrderActions = ({ item, url }: any) => {
  console.log(url);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteOrder] = useDeleteOrderMutation();
  const { refetch } = useMyOrdersQuery(undefined);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    const toastId = toast.loading("Deleting order...");

    try {
      const res = await deleteOrder(item?._id);

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

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Space>
      <Link to={url}>
        <Button>
          <ExportOutlined />
        </Button>
      </Link>

      {(item?.status === "Pending" || item.status === "Cancelled") && (
        <Button onClick={showDeleteModal}>
          <DeleteTwoTone />
        </Button>
      )}

      <Modal
        title=""
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
      >
        <p
          style={{
            fontSize: "20px",
            textTransform: "capitalize",
            color: "red",
          }}
        >
          Do you want to remove?
        </p>
      </Modal>
    </Space>
  );
};

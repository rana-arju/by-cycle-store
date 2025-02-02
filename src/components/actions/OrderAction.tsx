import { useState } from "react";
import { Button, Modal, Select, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, ExportOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useOrderStatusUpdateMutation,
} from "../../redux/features/order/orderApi";

export const OrderActions = ({ item ,url }:any) => {
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [status, setStatus] = useState(item?.status);
  const [deleteOrder] = useDeleteOrderMutation();
  const [orderStatusUpdate] = useOrderStatusUpdateMutation();
  const { refetch } = useAllOrdersQuery(undefined);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const showStatusModal = () => {
    setIsStatusModalOpen(true);
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
  const handleStatus = async () => {
    setIsStatusModalOpen(false);
    const toastId = toast.loading("Status update...");

    try {
      const res = await orderStatusUpdate({ id: item?._id, data: status });

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
  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  return (
    <Space>
      <Link to={url}>
        <Button>
          <ExportOutlined />
        </Button>
      </Link>
      {(item?.status === "Paid" ||
        item?.status === "Shipped" ||
        item?.status === "Completed") && (
        <Button onClick={showStatusModal}>
          <EditTwoTone />
        </Button>
      )}
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
          Do you want to delete?
        </p>
      </Modal>
      <Modal
        title={`Status :- ${item?.status}`}
        open={isStatusModalOpen}
        onOk={handleStatus}
        onCancel={handleStatusCancel}
      >
        <p
          style={{
            fontSize: "20px",
            textTransform: "capitalize",
            marginBottom: "10px"
          }}
        >
         Change status
        </p>
        <Select
          defaultValue={status}
          onChange={handleStatusChange}
          className="w-full"
          allowClear
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Paid", label: "Paid" },
            { value: "Shipped", label: "Shipped" },
            { value: "Completed", label: "Completed" },
          ]}
          placeholder="Select status"
        />
      </Modal>
    </Space>
  );
};

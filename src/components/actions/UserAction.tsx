import { useState } from "react";
import { Button, Modal, Select, Space } from "antd";
import {
  RestOutlined,
  ThunderboltOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
  useRoleUpdateMutation,
  useStatusUpdateMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { ISingleResponse } from "../../types/global";

type UserActionsProps = {
  item: {
    createdAt: string;
    email: string;
    isDeleted: boolean;
    name: string;
    role: "user" | "admin";
    status: "in-progress" | "blocked";
    updatedAt: string;
    _id: string;
  };
};

export const UserActions = ({ item }: UserActionsProps) => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [status, setStatus] = useState(item?.status);
  const [role, setRole] = useState(item?.role);
  const { refetch } = useAllUsersQuery(undefined);
  const [statusUpdate, { isLoading: isStatusLoading }] =
    useStatusUpdateMutation();
  const [roleUpdate, { isLoading: isRoleLoading }] = useRoleUpdateMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  if (isDeleteLoading || isRoleLoading || isStatusLoading) {
    return <p>Loading...</p>;
  }
  const showStatusModal = () => {
    setIsStatusModalOpen(true);
  };
  const showRoleModal = () => {
    setIsRoleModalOpen(true);
  };
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleRole = async () => {
    setIsRoleModalOpen(false);
    const toastId = toast.loading("Role Updating...");

    try {
      const res = (await roleUpdate({
        data: role,
        id: item?._id,
      })) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else if (res?.data?.message) {
        refetch();
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  const handleStatus = async () => {
    setIsStatusModalOpen(false);
    const toastId = toast.loading("Status Updating...");

    try {
      const res = (await statusUpdate({
        data: status,
        id: item?._id,
      })) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else if (res?.data?.message) {
        refetch();

        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const handleRoleCancel = () => {
    setIsRoleModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
  };
  const handleStatusChange = (value: "in-progress" | "blocked") => {
    setStatus(value);
  };
  const handleRoleChange = (value: "admin" | "user") => {
    setRole(value);
  };
  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    const toastId = toast.loading("User deleting...");

    try {
      const res = (await deleteUser({
        id: item?._id,
      })) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        refetch();

        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  return (
    <Space>
      <Button onClick={showDeleteModal}>
        <RestOutlined />
      </Button>
      <Button onClick={showStatusModal}>
        <ThunderboltOutlined />
      </Button>
      <Button onClick={showRoleModal}>
        <UserSwitchOutlined />
      </Button>
      <Modal
        title={`Status: ${item?.status}`}
        open={isStatusModalOpen}
        onOk={handleStatus}
        onCancel={handleStatusCancel}
      >
        <p style={{ marginBottom: "10px" }}>Want to Change Status?</p>
        <Select
          defaultValue={item?.status}
          onChange={handleStatusChange}
          className="w-full"
          allowClear
          options={[
            { value: "in-progress", label: "In Progress" },
            { value: "blocked", label: "Blocked" },
          ]}
          placeholder="Select status"
        />
      </Modal>
      <Modal
        title={`Role: ${item?.role}`}
        open={isRoleModalOpen}
        onOk={handleRole}
        onCancel={handleRoleCancel}
      >
        <p style={{ marginBottom: "10px" }}>Want to Change role?</p>
        <Select
          defaultValue={item?.role}
          onChange={handleRoleChange}
          className="w-full"
          allowClear
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "user" },
          ]}
          placeholder="Select  user role"
        />
      </Modal>

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
    </Space>
  );
};

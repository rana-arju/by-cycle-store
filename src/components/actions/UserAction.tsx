import { useState } from "react";
import { Button, Modal, Select, Space } from "antd";
import {
  RestOutlined,
  ThunderboltOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";


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
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  console.log("item", item);

  const showStatusModal = () => {
    setIsStatusModalOpen(true);
  };
  const showRoleModal = () => {
    setIsRoleModalOpen(true);
  };

  const handleRole = async () => {
    setIsRoleModalOpen(false);
    //const toastId = toast.loading("Creating new semester ....");
    /*
    try {
      const res = (await statusUpdate({
        data: status,
        id: item?.user?._id,
      })) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
      */
  };
  const handleStatus = async () => {
    setIsStatusModalOpen(false);
  };

  const handleRoleCancel = () => {
    setIsRoleModalOpen(false);
  };
  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };
  const handleRoleChange = (value: string) => {
    setRole(value);
  };
  const handleDelete = async () => {};
  return (
    <Space>
      <Button onClick={handleDelete}>
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
    </Space>
  );
};

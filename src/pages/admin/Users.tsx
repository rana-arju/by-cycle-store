import type React from "react";
import { Table, Tag } from "antd";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: string) => (
      <Tag color={role === "Admin" ? "red" : "geekblue"}>{role}</Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Active" ? "green" : "orange"}>{status}</Tag>
    ),
  },
];

const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
];

const Users: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
};

export default Users;

import type React from "react";
import { Table, Tag } from "antd";
import { useAllUsersQuery } from "../../redux/features/auth/authApi";
import { UserActions } from "../../components/actions/UserAction";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
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
      <Tag color={status === "in-progress" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "status",
    render: (item: any) => <UserActions item={item} />,
  },
];

const Users: React.FC = () => {
  const {
    data: AllUsers,
    isLoading,
    isFetching,
  } = useAllUsersQuery(undefined, { refetchOnMountOrArgChange: true });
  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  console.log(AllUsers);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Table columns={columns} dataSource={AllUsers.data} rowKey="id" />
    </>
  );
};

export default Users;

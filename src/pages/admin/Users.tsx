import type React from "react";
import { useState } from "react";
import { Table, Tag, List, Card, Typography, Space, Spin } from "antd";
import { useAllUsersQuery } from "../../redux/features/auth/authApi";
import { UserActions } from "../../components/actions/UserAction";
import { useMediaQuery } from "react-responsive";

const { Title, Text } = Typography;

interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "in-progress" | "blocked";
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
}

const Users: React.FC = () => {
  const {
    data: AllUsers,
    isLoading,
    isFetching,
  } = useAllUsersQuery(undefined, { refetchOnMountOrArgChange: true });

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

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
        <Tag color={status === "in-progress" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (item: User) => <UserActions item={item} />,
    },
  ];

  const onExpandRow = (expanded: boolean, record: User) => {
    const keys = expanded
      ? [...expandedRowKeys, record._id]
      : expandedRowKeys.filter((key) => key !== record._id);
    setExpandedRowKeys(keys);
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="users-container">
      <Title level={2} className="mb-6">
        Users
      </Title>
      {isMobile ? (
        <List
          dataSource={AllUsers?.data}
          renderItem={(item: User) => (
            <List.Item key={item._id}>
              <Card className="w-full">
                <Space direction="vertical" className="w-full">
                  <Text strong>ID: {item._id}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Email: {item.email}</Text>
                  <Tag color={item.role === "admin" ? "red" : "geekblue"}>
                    {item.role}
                  </Tag>
                  <Tag
                    color={item.status === "in-progress" ? "green" : "orange"}
                  >
                    {item.status}
                  </Tag>
                  <UserActions item={item} />
                </Space>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={AllUsers?.data}
          rowKey="_id"
          expandable={{
            expandedRowKeys,
            onExpand: onExpandRow,
          }}
          className="orders-table"
        />
      )}
    </div>
  );
};

export default Users;

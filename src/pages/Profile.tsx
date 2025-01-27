import type React from "react";
import { useState } from "react";
import { Form, Input, Button, Upload, message, Avatar } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  });

  const onFinish = (values: any) => {
    setProfile({ ...profile, ...values });
    message.success("Profile updated successfully");
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      setProfile({ ...profile, avatar: info.file.response.url });
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="flex items-center mb-8">
        <Avatar size={64} src={profile.avatar} icon={<UserOutlined />} />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <Form
        name="profile_form"
        initialValues={profile}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar" valuePropName="file">
          <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleAvatarChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;

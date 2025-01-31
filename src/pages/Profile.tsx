import type React from "react";
import { Button, Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useGetMyDataQuery,
  useProfileUpdateMutation,
} from "../redux/features/auth/authApi";
import BForm from "../components/form/BForm";
import { FieldValues } from "react-hook-form";
import BInput from "../components/form/BInput";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const [profileUpdate] = useProfileUpdateMutation();
  const { data, isFetching, isLoading, refetch } = useGetMyDataQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  const defaultValues = {
    name: data?.data?.name,
    email: data?.data?.email,
    phone: data?.data?.phone,
    address: data?.data?.address,
    city: data?.data?.city,
  };

  const onSubmit = async (values: FieldValues) => {
    const data = {
      name: values.name,
      email: values.email,
      city: values.city,
      address: values.address,
      phone: values.phone,
    };

    const res = await profileUpdate(data);
    if (res?.data?.success) {
      refetch();
      toast.success(res?.data?.message);
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto"
      style={{ paddingBottom: "50px", paddingTop: "50px" }}
    >
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="flex items-center mb-8" style={{ marginBottom: "10px" }}>
        <Avatar size={64} src="" icon={<UserOutlined />} />
        <div className="ml-4" style={{ marginLeft: "10px" }}>
          <h2 className="text-xl font-semibold">{data?.data?.name}</h2>
          <p className="text-gray-600">{data?.data?.email}</p>
        </div>
      </div>
      <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BInput placeholder="Name" label="Name" name="name" type="text" />
        <BInput
          placeholder="Email"
          label="Email"
          name="email"
          type="text"
          disabled
        />
        <BInput
          placeholder="Address"
          label="Address"
          name="address"
          type="text"
        />
        <BInput placeholder="city" label="City" name="city" type="text" />
        <BInput placeholder="Phone" label="Phone" name="phone" type="text" />

        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </BForm>
    </div>
  );
};

export default Profile;

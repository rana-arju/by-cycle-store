import { Button, Card, Col, Flex } from "antd";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema} from "../../schema/user.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { usePasswordChangeMutation } from "../../redux/features/auth/authApi";

function PasswordChange() {
  const [passwordChange] = usePasswordChangeMutation();
  const navigate = useNavigate();
  const onSubmit = async (values: FieldValues) => {

    const toastID = toast.loading("Updating password...");
    try {
      const res: any = await passwordChange(values);

      if (res.error) {
        const errorMessage = (res.error as any)?.data?.message as string;
        toast.error(errorMessage, { id: toastID });
      } else {
        toast.success(res?.data?.message, { id: toastID });
        return navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastID });
    }
  };
  return (
    <div className="container h-[100vh]">
      <Card className="customForm">
        <Flex justify="center" align="middle">
          <Col span={12}>
            <h3
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "20px",
                textTransform: "uppercase",
              }}
            >
              Password Change
            </h3>
            <BForm onSubmit={onSubmit} resolver={zodResolver(passwordSchema)}>
              <BInput
                type="password"
                placeholder="Enter old password"
                label="Enter old password"
                name="oldPassword"
              />

              <BInput
                type="password"
                placeholder="Enter new password"
                label="Enter new password"
                name="newPassword"
              />
              <Button type="primary" htmlType="submit">
                password Change
              </Button>
            </BForm>
          </Col>
        </Flex>
      </Card>
    </div>
  );
}

export default PasswordChange;

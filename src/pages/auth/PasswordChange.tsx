import { Button, Col, Flex, Row } from "antd";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema} from "../../schema/user.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { usePasswordChangeMutation } from "../../redux/features/auth/authApi";
import Title from "antd/es/typography/Title";

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
    <div className="h-[100vh]" style={{paddingTop: "40px"}}>

        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={24}>
            <Flex justify="center" align="middle">
              <Col span={12}>
                <Title level={3} className="add-product-title" style={{paddingTop: "20px", fontSize: "20px"}}>
                  Password Change
                </Title>
                <BForm
                  onSubmit={onSubmit}
                  resolver={zodResolver(passwordSchema)}
                >
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
          </Col>
        </Row>
    </div>
  );
}

export default PasswordChange;

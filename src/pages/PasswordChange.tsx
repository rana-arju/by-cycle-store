import { Button, Card, Col, Flex } from "antd";
import BForm from "../components/form/BForm";
import BInput from "../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schema/user.schema";

function PasswordChange() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="container">
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
            <BForm
              onSubmit={onSubmit}
              resolver={zodResolver(registrationSchema)}
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
      </Card>
    </div>
  );
}

export default PasswordChange;

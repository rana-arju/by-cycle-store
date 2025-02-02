import { Button, Card, Col, Flex } from "antd";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schema/user.schema";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/VerifyToken";
import { IUser, setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

function Registration() {
  const [registration] = useRegistrationMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (value: FieldValues) => {
    const data = {
      email: value.email,
      password: value.password,
      name: value.name,
    };

    const res = await registration(data).unwrap();
    const user = verifyToken(res.data.accessToken) as IUser;

    if (!res.success) {
      toast.error(res?.data?.error?.message);
    } else {
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success(res.message);
      navigate("/", { replace: true });
    }
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
              Registration
            </h3>
            <BForm
              onSubmit={onSubmit}
              resolver={zodResolver(registrationSchema)}
            >
              <BInput
                type="text"
                placeholder="Enter your name"
                label="Enter your name"
                name="name"
              />
              <BInput
                type="text"
                placeholder="Enter your email"
                label="Enter your email"
                name="email"
              />
              <BInput
                type="password"
                placeholder="Enter your password"
                label="Enter your password"
                name="password"
              />
              <Button type="primary" htmlType="submit">
                Registration
              </Button>
            </BForm>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <p>Already have an account? </p>
              <Link to="/login">Login</Link>
            </div>
          </Col>
        </Flex>
      </Card>
    </div>
  );
}

export default Registration;

import { Button, Card, Col, Flex } from "antd";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { loginSchema } from "../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser, setUser } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/VerifyToken";
import { toast } from "sonner";

function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (value: FieldValues) => {
    const data = {
      email: value.email,
      password: value.password,
    };

    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken) as IUser;
    console.log("user", user);
    if (!res.data.success) {
      toast.error(res?.data?.error?.message);
    }

    dispatch(setUser({ user: user, token: res.data.accessToken }));
    toast.success(res.message);
    navigate("/", { replace: true });
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
              Login
            </h3>
            <BForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
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
                Login
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
              <p>Don't have an account? </p>
              <Link to="/registration">Registration</Link>
            </div>
          </Col>
        </Flex>
      </Card>
    </div>
  );
}

export default Login;

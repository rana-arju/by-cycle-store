import { Button, Card, Col, Flex } from "antd";
import BForm from "../components/form/BForm";
import BInput from "../components/form/BInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";

function Registration() {
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
              Login
            </h3>
            <BForm onSubmit={onSubmit}>
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
                marginTop: "10px"
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

import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
type IInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder: string;
};
function BInput({ name, type, label, placeholder }: IInputProps) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            {type == "password" ? (
              <Input.Password
                type={type}
                id={name}
                {...field}
                size="large"
                placeholder={placeholder}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            ) : (
              <Input
                type={type}
                id={name}
                {...field}
                size="large"
                placeholder={placeholder}
              />
            )}

            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
}

export default BInput;

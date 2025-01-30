import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
type IInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder: string;
  disabled?: boolean
};
function BInput({ name, type, label, placeholder, disabled }: IInputProps) {
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
            ) : type == "textarea" ? (
              <TextArea
                rows={4}
                placeholder={placeholder}
                maxLength={500}
                id={name}
                {...field}
                showCount
              />
            ) : (
              <Input
                type={type}
                id={name}
                {...field}
                size="large"
                placeholder={placeholder}
                disabled={disabled ? true : false}
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

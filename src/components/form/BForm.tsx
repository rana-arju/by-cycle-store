import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type IFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type IFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & IFormConfig;

function BForm({ onSubmit, children, defaultValues, resolver }: IFormProps) {
  const formConfig: IFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
}

export default BForm;

import { Checkbox as AntCheckbox, Form } from "antd";

interface CheckBoxProps {
  label?: string | undefined;
  name?: any;
  restProps?: any;
  initialvalue?: any;
  required?: boolean;
  requiredMessage?: string | undefined;
  onChange?: any;
  text?: string | number | undefined;
  checked?: boolean;
  valuePropName?: any;
}

const CheckBox = ({
  label,
  name,
  restProps,
  initialvalue,
  checked = false,
  required,
  requiredMessage,
  text,
  onChange,
  valuePropName,
}: CheckBoxProps) => {
  return (
    <Form.Item
      label={<>{label}</>}
      {...restProps}
      name={name}
      valuePropName={valuePropName}
      initialValue={initialvalue}
      rules={[
        {
          required: required,
          message: required && requiredMessage,
        },
      ]}
    >
      <AntCheckbox onChange={onChange} checked={checked}>
        {text}
      </AntCheckbox>
    </Form.Item>
  );
};

export default CheckBox;

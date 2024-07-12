import styled from "styled-components";
import { Form, Input as AntInput } from "antd";

export const InputContainer = styled.div<any>`
  margin: 0 auto;
  width: 100%;
  .ant-input-affix-wrapper {
    padding: 0 11px;
  }
  .ant-form-item,
  .ant-select-in-form-item {
    margin: 0;

    .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled) {
      border-radius: 4px;
      width: 100%;
      box-shadow: none;

      &:focus {
        box-shadow: none;
      }
      &:hover,
      &:focus {
        box-shadow: none;
      }
    }

    .ant-form-item-control-input {
      input {
        border-radius: 4px;
        width: 100%;
        height: 38px;

        &:hover,
        &:focus {
        }

        &:focus {
          box-shadow: none;
        }
      }
    }
  }
`;

interface InputProps {
  label?: string | number;
  name?: any;
  requiredMessage?: any;
  required?: boolean;
  padding?: any;
  margin?: any;
  onChange?: any;
  onFocus?: any;
  pattern?: any;
  initialValue?: any;
  regexMessage?: any;
  fieldKey?: any;
  value?: any;
  disabled?: boolean;
  error?: string | number;
  restProps?: any;
  type?: string;
  placeholder?: any;
  suffix?: any;
}

const Input = ({
  label,
  name,
  requiredMessage,
  required = false,
  pattern = "",
  regexMessage,
  placeholder,
  initialValue,
  type,
  value,
  onChange = () => {},
  restProps,
  onFocus = () => {},
  fieldKey,
  disabled,
  error,
  suffix,
}: InputProps) => {
  const getInputComponent = (inputType: string | undefined) => {
    switch (inputType) {
      case "password": {
        return (
          <AntInput.Password
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            onFocus={(e) => onFocus(e)}
            disabled={disabled}
            suffix={suffix}
          />
        );
        break;
      }
      case "number": {
        return (
          <AntInput
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            onFocus={(e) => onFocus(e)}
            disabled={disabled}
            suffix={suffix}
          />
        );
        break;
      }
      default: {
        return (
          <AntInput
            placeholder={placeholder}
            value={value}
            onFocus={(e) => onFocus(e)}
            onChange={(e) => onChange(e)}
            disabled={disabled}
            suffix={suffix}
          />
        );
      }
    }
  };

  return (
    <InputContainer placeholder={placeholder} error={error}>
      <Form.Item
        label={<>{label}</>}
        {...restProps}
        fieldKey={fieldKey}
        name={name}
        initialValue={initialValue?.toString()}
        rules={[
          {
            required: required,
            message: required && requiredMessage,
          },

          pattern && {
            pattern: pattern,
            message: regexMessage,
          },
        ]}
      >
        {getInputComponent(type)}
      </Form.Item>
    </InputContainer>
  );
};

export default Input;

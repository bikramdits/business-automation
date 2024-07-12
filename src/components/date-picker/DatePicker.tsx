import { DatePicker as AntDatePicker, Form } from "antd";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  margin: auto;
  padding: auto;
  .ant-picker {
    width: 100%;
    height: 38px;
  }

  .ant-form-item,
  .ant-select-in-form-item {
    margin: 0 0 8px 10px !important;

    .ant-form-item-control-input {
      input {
        border-radius: 4px;
        width: 100%;

        &:hover,
        &:focus {
          border-color: red;
        }

        &:focus {
          box-shadow: none;
        }
      }
    }
  }
`;

interface DatePickerProps {
  label?: any;
  name?: any;
  onChange?: any;
  type?: any;
  margin?: any;
  picker?: any;
  padding?: any;
  size?: any;
  width?: any;
  className?: any;
  value?: any;
  disabled?: any;
  required?: any;
  requiredMessage?: any;
  defaultValue?: any;
  initialValue?: any;
  format?: any;
  restProps?: any;
  fieldKey?: any;
  placeholder?: any;
  disabledDate?: any;
  allowClear?: any;
  locale?: any;
}

const DatePicker = ({
  label,
  name,
  onChange,
  size,
  value,
  disabled,
  required = false,
  requiredMessage,
  defaultValue,
  initialValue,
  format = "DD/MM/YYYY",
  restProps,
  fieldKey,
  disabledDate,
  placeholder,
  locale,
}: DatePickerProps) => {
  return (
    <>
      <DatePickerContainer>
        <Form.Item
          disabledDate={disabledDate}
          disabled={disabled}
          format={format}
          label={<>{label}</>}
          {...restProps}
          name={name}
          fieldKey={fieldKey}
          initialValue={initialValue}
          rules={[
            {
              required: required,
              message: required && requiredMessage,
            },
          ]}
        >
          <AntDatePicker
            name={name}
            disabled={disabled}
            locale={locale}
            value={value}
            size={size}
            onChange={(e) => onChange(e)}
            defaultValue={defaultValue}
            format={format}
            disabledDate={disabledDate}
            placeholder={placeholder}
          />
        </Form.Item>
      </DatePickerContainer>
    </>
  );
};

export default DatePicker;

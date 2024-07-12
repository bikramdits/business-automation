import { Form, Select as AntSelect } from "antd";
import styled from "styled-components";
import { InputContainer } from "./Input";

const CustomAntSelect = styled(AntSelect)`
  min-width: 100px;

  .ant-select-selector {
    box-shadow: none !important;
    border-radius: 5px !important;
  }
  .ant-select-selector {
    height: 38px !important;
  }
  .ant-select-selection-item {
    line-height: 38px !important;
  }
  .ant-form-item-control-input {
    height: 38px !important;
  }

  .ant-select-selection-search-input {
    position: relative;
    &:placeholder-shown {
      position: absolute;
      top: 2px;
    }
  }
  .ant-select-arrow {
    margin-top: -4px;
  }
`;

interface AntSelectProps {
  label?: string | number;
  showSearch?: boolean;
  name?: any;
  requiredMessage?: any;
  required?: boolean;
  mode?: any;
  options: any;
  onChange?: any;
  onFocus?: any;
  initialValue?: any;
  loading?: boolean;
  fieldKey?: any;
  value?: any;
  disabled?: any;
  restProps?: any;
  placeholder?: any;
  defaultValue?: any;
  filterOptions?: any;
  suffixIcon?: any;
}

const Select = ({
  label,
  showSearch = true,
  name,
  requiredMessage,
  loading,
  required,
  onChange,
  onFocus,
  initialValue,
  filterOptions = false,
  fieldKey,
  value,
  defaultValue,
  mode = "",
  disabled,
  restProps,
  options,
  placeholder,
  suffixIcon,
}: AntSelectProps) => {
  const filterOption = (input: any, option: any) => {
    return option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;
  };
  return (
    <InputContainer>
      <Form.Item
        label={<>{label}</>}
        {...restProps}
        fieldKey={fieldKey}
        name={name}
        initialValue={initialValue}
        rules={[
          {
            required: required,
            message: required && requiredMessage,
          },
        ]}
      >
        <CustomAntSelect
          size="large"
          placeholder={placeholder}
          loading={loading}
          filterOption={filterOptions ? true : filterOption}
          value={value}
          showSearch={showSearch}
          mode={mode}
          options={options}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          suffixIcon={suffixIcon}
        />
      </Form.Item>
    </InputContainer>
  );
};

export default Select;

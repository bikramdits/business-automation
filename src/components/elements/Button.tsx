import { Button as AntButton } from "antd";
import styled from "styled-components";
import Colors from "../../styles/Colors";

type ButtonContainerProps = {
  background?: string;
  width?: string;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
  margin?: string;
  height?: string;
  xsWidth?: string;
};

const ButtonContainer = styled(AntButton)<ButtonContainerProps>`
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || ""};
  padding: ${(props) => props.padding || "6px 25px"};
  min-height: ${(props) => props.minHeight || "38px"};
  min-width: ${(props) => props.minWidth || null};
  margin: ${(props) => props.margin || "0"};
  color: ${Colors.White};
  font-size: 16px;
  transition: height 2s;
  height: ${(props) => props.height || "38px"};
  font-weight: bold;
  box-shadow: none;
  outline: none !important;
  transition: all 0.8s;

  &:focus-visible {
    box-shadow: none;
    outline: none;
  }
  &:focus::after {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background: ${(props) => (props.background ? props.background : Colors.White)} !important;
    /* border: 1px solid ${Colors.Primary} !important; */
    color: ${Colors.Primary} !important;
    box-shadow: 0 0 3px #00588b inset;
  }

  &.ant-btn-default {
    background: ${(props) => (props.background ? props.background : Colors.White)} !important;
    /* border: 1px solid ${Colors.Primary} !important; */
    color: ${Colors.Primary} !important;
    box-shadow: 0 0 5px #00588b inset;

    &:hover {
      background: ${(props) => (props.background ? props.background : Colors.Primary)} !important;
      /* border: 1px solid ${Colors.Primary} !important; */
      color: ${Colors.White} !important;
    }
  }

  & .ant-select-selection__rendered {
    width: 200px;
    margin-left: 0;
    margin-right: 0;
    &:focus {
      outline: none;
      border: none;
    }
  }
  &.ant-select-focused {
    border: none;
    &:focus {
      outline: 0;
    }
  }

  @media screen and (max-width: 991px) {
    height: ${(props) => props.height || ""};
    font-size: 14px;
    width: ${(props) => props.width || ""};
  }

  @media screen and (max-width: 450px) {
    width: ${(props) => props.xsWidth || null};
  }
`;

type ButtonProps = {
  text: string;
  onClick?: () => void;
  margin?: string;
  type?: "button" | "reset" | "submit" | undefined;
  width?: string;
  background?: string;
  height?: string;
  disabled?: boolean;
  xsWidth?: string;
  padding?: string;
  minWidth?: string;
  variant?: any;
  minHeight?: string;
  icon?: any;
  size?: any;
  loading?: boolean;
  className?: string;
  title?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  size = "middle",
  icon,
  margin,
  type,
  width,
  background,
  height,
  disabled,
  xsWidth,
  padding,
  variant = "primary",
  minWidth,
  minHeight,
  loading,
  className,
  title,
}) => {
  return (
    <ButtonContainer
      background={background}
      htmlType={type}
      type={variant}
      onClick={onClick}
      margin={margin}
      icon={icon}
      loading={loading}
      size={size}
      width={width}
      xsWidth={xsWidth || ""}
      height={height}
      disabled={disabled || false}
      padding={padding}
      minWidth={minWidth}
      minHeight={minHeight}
      className={className}
      title={title}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;

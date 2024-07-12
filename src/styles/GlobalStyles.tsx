import { ConfigProvider } from "antd";
import { createGlobalStyle } from "styled-components";
import Colors from "./Colors";

const Style = createGlobalStyle`
  *{
    box-sizing: border-box;
  }

  body.hideScroll{
    overflow: hidden;
  }

  .errormsg {
    margin: 0;
    color: ${Colors.Red};
    position: relative;
    font-size: 12px;
    line-height: 17px;
    z-index: 1;
    bottom: 0;
  }

  .ant-image-img{
    max-width: 100%;
    height: 100%;
  }

  .ant-form-item{
    margin-bottom: 15px;
  }
  .ant-input {
      box-shadow: none !important;
    }

  .ant-form-item {
    .ant-form-item-label >label {
    font-weight: 600;
    }
    .ant-form-item-label {
      padding: 0 0 5px !important;
    }
    .ant-form-item-label > label::after {
      content: "";
      position: absolute;
      top: 0;
      margin: 0;
    }
    

  }
  
.ant-switch .ant-switch-handle {
    transition: all 0.13s ease-in-out;
}

/*  */

.ant-drawer-content-wrapper {
  box-shadow: none !important;
  width: calc(100% - 290px) !important;
}


/* Direction Changes */
.ant-row-rtl {
  textarea {
      text-align: right;
  }
  .ant-col-rtl{
    label {
      width: 100%;
      justify-content: end;
    }
  }
}


.ant-picker{
  width: 100%;
  height: 38px;
}


 
`;

const GlobalStyles = () => {
  ConfigProvider.config({
    theme: {
      primaryColor: Colors.Primary,
    },
  });

  return <Style />;
};

export default GlobalStyles;

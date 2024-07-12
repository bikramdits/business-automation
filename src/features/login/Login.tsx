import { Col, Form, Row } from "antd";
import styled from "styled-components";
import Input from "components/elements/Input";
import RegexMessages from "utils/regexMessages";
import RegexPattern from "utils/regexPattern";
import LogoImg from "../../assets/Images/becLogo.png";
import RequiredMessages from "utils/requiredMessages";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { useNavigate } from "react-router-dom";
import storage from "utils/storage";
import { Flex, Spacer } from "components/SharedStyles";
import Button from "components/elements/Button";

export const Logo = styled.img`
  width: 140px;
  height: 140px;
`;
export const Heading = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #00588b;
  margin-bottom: 20px;
`;
export const FormContainer = styled.div``;

const Login = () => {
  const [loginApi, { loading }] = useRequest({
    path: ENDPOINTS.LOGIN,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const variables = {
      email: values.email,
      password: values.password,
    };
    loginApi({
      variables,
      onCompleted: (data: any) => {
        storage.setToken(data?.token);
        navigate("/machines");
      },
      onError: () => {},
    });
  };

  return (
    <>
      <Flex Justify="center" Align="center" direction="column">
        <Logo src={LogoImg} />
      </Flex>
      <Heading>Login</Heading>
      <FormContainer>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 24 }} span={12}>
              <Input
                name="email"
                label="Email"
                pattern={RegexPattern.EMAIL}
                regexMessage={RegexMessages.EMAIL}
                requiredMessage={RequiredMessages.EMAIL}
                required={true}
              />
            </Col>
            <Col md={{ span: 24 }} span={12}>
              <Input
                type="password"
                name="password"
                label="Password"
                required={true}
                requiredMessage={RequiredMessages.PASSWORD}
              />
            </Col>

            <Col span={24}>
              <Form.Item>
                <Spacer />
                <Button loading={loading} text="Login" type="submit" padding="22px 40px" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;

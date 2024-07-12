import { Col, Form, Radio, Row } from "antd";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegexMessages from "utils/regexMessages";
import RegexPattern from "utils/regexPattern";
import RequiredMessages from "utils/requiredMessages";
// import ENDPOINTS from "api/endpoints/Endpoints";
// import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";

const positionTypeOptions = [
  {
    value: "Administer",
  },
  {
    value: "Manager",
  },
  {
    value: "Supervisor",
  },
  {
    value: "Technician",
  },
];
const userTypeOptions = [
  {
    value: "Copper Wire",
  },
  {
    value: "Global Code",
  },
  {
    value: "Mechanical",
  },
  {
    value: "Test Code",
  },
];

const UsersModal = ({ data, close }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(data?.isChecked || true);

  // const [createUsers, { loading: createUserLoader }] = useRequest({
  //   successToast: true,
  //   path: ENDPOINTS.USER,
  //   errorToast: true,
  //   method: HTTP_METHODS.POST,
  // });

  // const [updateUsers, { loading: updateUserLoader }] = useRequest({
  //   path: ENDPOINTS.USER,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.PUT,
  // });

  const onFinish = (values: any) => {
    console.log(values);
    // const variables = {
    //   userName: values?.userName,
    //   password: values?.password,
    //   firstName: values?.firstName,
    //   lastName: values?.lastName,
    //   email: values?.email,
    //   position: values?.position,
    //   userType: values?.userType,
    //   roles: values?.roles,
    //   status: isChecked ? 1 : 0,
    // };

    // if (data) {
    //   updateUsers({
    //     id: data?._id,
    //     variables,
    //     onCompleted: () => {
    //       close();
    //       setIsSuccess(true);
    //     },
    //     onError: () => {},
    //   });
    // } else {
    //   createUsers({
    //     variables,
    //     onCompleted: () => {
    //       close();
    //       setIsSuccess(true);
    //     },
    //     onError: () => {},
    //   });
    // }
  };
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };
  return (
    <>
      <ModalWidth width="700px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input
                  name="userName"
                  initialValue={data?.userName}
                  label={t("userName") || "User Name"}
                  requiredMessage={RequiredMessages.USERNAME}
                  required={true}
                  placeholder={t("username")}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="password"
                  initialValue={data?.password}
                  label={t("password") || "Password"}
                  requiredMessage={RequiredMessages.PASSWORD}
                  required={true}
                  placeholder={t("password")}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="firstName"
                  initialValue={data?.firstName}
                  label={t("firstName") || "First Name"}
                  requiredMessage={RequiredMessages.FIRSTNAME}
                  required={true}
                  placeholder={t("firstName")}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="lastName"
                  initialValue={data?.lastName}
                  label={t("lastName") || "Last Name"}
                  requiredMessage={RequiredMessages.FIRSTNAME}
                  required={true}
                  placeholder={t("lastName")}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="email"
                  initialValue={data?.email}
                  label={t("email") || "Email"}
                  pattern={RegexPattern.EMAIL}
                  regexMessage={RegexMessages.EMAIL}
                  requiredMessage={RequiredMessages.EMAIL}
                  required={true}
                  placeholder={t("email")}
                />
              </Col>
              {/* <Col span={12}></Col> */}
              <Col span={12}>
                <Select
                  name="position"
                  initialValue={data?.position}
                  label={t("position") || "Position"}
                  placeholder={t("pleaseSelectPosition")}
                  options={positionTypeOptions}
                />
              </Col>
              <Col span={11}>
                <Select
                  name="userType"
                  initialValue={data?.userType}
                  label={t("userType") || "User Type"}
                  placeholder={t("pleaseSelectUserType")}
                  options={userTypeOptions}
                />
              </Col>
              <Col span={10}>
                <Form.Item name="roles" initialValue={data?.role} label={t("role") || "Role"}>
                  <Radio.Group defaultValue="admin">
                    <Radio value="admin">Admin</Radio>
                    <Radio value="administrator">Adminstrator</Radio>
                    <Radio value="supervisor">Supervisor</Radio>
                    <Radio value="technician">Technician</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name="checkbox"
                  label={t("status") || "Status"}
                  initialValue={data?.isChecked}
                >
                  <Toggle onChange={handleCheckbox} checked={isChecked} />
                </Form.Item>
              </Col>
            </Row>
          </MainContent>

          <Form.Item>
            <ModalFooter Justify="end" gap="10px">
              <Button text={t("cancel")} type="reset" onClick={close} />
              <Button text={data ? t("update") : t("submit")} type="submit" />
            </ModalFooter>
          </Form.Item>
        </Form>
      </ModalWidth>
    </>
  );
};

export default UsersModal;

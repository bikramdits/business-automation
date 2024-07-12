import { Col, Form, Row } from "antd";
// import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter } from "components/modal/BaseModal";
// ModalWidth
import Button from "components/elements/Button";
import Input from "components/elements/Input";
// import TextArea from "components/elements/Textarea";
// import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";

const OrganizationsModal = ({ close, data, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  //   const [isChecked, setIsChecked] = useState<boolean>(true);
  //   const handleCheckbox = (value: boolean) => {
  //     setIsChecked(value);
  //   };

  const [createOrganizations, { loading: createLoader }] = useRequest({
    path: ENDPOINTS.ORGANIZATIONS,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateOrganizations, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.ORGANIZATIONS,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      organizationName: values?.organizationName,
      organizationemail: values?.organizationemail,
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2,
      contactNumber: values?.contactNumber,
      city: values?.city,
      state: values?.state,
      country: values?.country,
      zipcode: values?.zipcode,
    };
    if (data) {
      updateOrganizations({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createOrganizations({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };

  //   useEffect(() => {
  //     if (data) {
  //       setIsChecked(data?.status);
  //     }
  //   }, []);

  return (
    <>
      {/* <ModalWidth width="3000px"> */}
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <MainContent>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Input
                initialValue={data?.organizationName}
                placeholder={"Organization Name"}
                name="organizationName"
                required={true}
                requiredMessage={RequiredMessages.ORGANIZATION}
                // label={t("part") || "Part"}
                label="Organization Name"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.organizationemail}
                placeholder={"Organization Email"}
                name="organizationemail"
                required={true}
                requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="Organization Email"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.addressLine1}
                placeholder={"Address Line 1"}
                name="addressLine1"
                required={true}
                requiredMessage={RequiredMessages.ORGANIZATIONADDRESSLINE1}
                // label={t("part") || "Part"}
                label="Address Line 1"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.addressLine2}
                placeholder={"Address Line 2"}
                name="addressLine2"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="Address Line 2"
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Input
                initialValue={data?.contactNumber}
                placeholder={"Contact Number"}
                name="contactNumber"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="Contact Number"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.city}
                placeholder={"City"}
                name="city"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="City"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.state}
                placeholder={"State"}
                name="state"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="State"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.country}
                placeholder={"Country"}
                name="country"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="Country"
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.zipcode}
                placeholder={"Zipcode"}
                name="zipcode"
                required={true}
                // requiredMessage={RequiredMessages.ORGANIZATIONEMAIL}
                // label={t("part") || "Part"}
                label="Zipcode"
              />
            </Col>
          </Row>
        </MainContent>
        <Row>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                <Button
                  text={data ? t("update") : t("submit")}
                  type="submit"
                  loading={createLoader || updateLoader}
                />
              </ModalFooter>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default OrganizationsModal;

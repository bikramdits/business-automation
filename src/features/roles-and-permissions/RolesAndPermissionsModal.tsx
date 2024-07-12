import { Col, Form, Row } from "antd";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import { useTranslation } from "react-i18next";
import Input from "components/elements/Input";
// import ENDPOINTS from "api/endpoints/Endpoints";
// import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";

const RolesAndPermissionsModal = ({ close, data }: any) => {
  // setIsSuccess
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // const [createRole, { loading: createLoader }] = useRequest({
  //   path: ENDPOINTS.ROLE,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.POST,createLoader
  // });

  // const [updateRole, { loading: updateLoader }] = useRequest({
  //   path: ENDPOINTS.ROLE,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.PUT,
  // });

  // const onFinish = (values: any) => {
  //   const variables = {
  //     role: values?.role,
  //   };
  //   if (data) {
  //     updateRole({
  //       id: data?._id,
  //       variables,
  //       onCompleted: () => {
  //         close();
  //         setIsSuccess(true);
  //       },
  //       onError: () => {},
  //     });
  //   } else {
  //     createRole({
  //       variables,
  //       onCompleted: () => {
  //         close();
  //         setIsSuccess(true);
  //       },
  //       onError: () => {},
  //     });
  //   }
  // };

  return (
    <>
      <ModalWidth width="700px">
        <Form form={form} layout="vertical" autoComplete="off">
          {/* onFinish={onFinish} */}
          <MainContent>
            <Row>
              <Col span={24}>
                <Input label="Add Roles" placeholder="Add Roles" />
              </Col>
              <Col span={24}>
                <Form.Item>
                  <ModalFooter Justify="end" gap="10px">
                    <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                    <Button
                      text={data ? t("update") : t("submit")}
                      type="submit"
                      // loading={createLoader || updateLoader}
                    />
                  </ModalFooter>
                </Form.Item>
              </Col>
            </Row>
          </MainContent>
        </Form>
      </ModalWidth>
    </>
  );
};

export default RolesAndPermissionsModal;

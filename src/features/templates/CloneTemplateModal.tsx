import { Col, Form, Row } from "antd";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useTranslation } from "react-i18next";
import RequiredMessages from "utils/requiredMessages";

const CloneTemplateModal = ({ data, close, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [createClone, { loading: createLoader }] = useRequest({
    path: ENDPOINTS.TEMPLATE_CLONE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.POST,
  });
  // console.log("setIsSuccess", setIsSuccess);

  const onFinish = (values: any) => {
    const variables = {
      code: values.templateCode,
      name: values.templateName,
    };
    createClone({
      id: data?._id,
      variables,
      onCompleted: () => {
        close();
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  return (
    <>
      <ModalWidth width="600px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Input
                  name="templateCode"
                  label={t("enterNewTemplateCode") || "Enter New Template Code"}
                  required={true}
                  requiredMessage={RequiredMessages.TEMPLATECODE}
                  placeholder={t("templateCode") || "Template Code"}
                />
              </Col>
              <Col span={24}>
                <Input
                  name="templateName"
                  label={t("enterNewTemplateName") || "Enter New Template Name"}
                  required={true}
                  requiredMessage={RequiredMessages.TEMPLATENAME}
                  placeholder={t("templateName") || "Template Name"}
                />
              </Col>
            </Row>
          </MainContent>
          <Row>
            <Col span={24}>
              <Form.Item>
                <ModalFooter Justify="end" gap="10px">
                  <Button variant={"default"} text={t("cancel")} type="reset" onClick={close} />
                  <Button text={t("submit")} type="submit" loading={createLoader} />
                </ModalFooter>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalWidth>
    </>
  );
};

export default CloneTemplateModal;

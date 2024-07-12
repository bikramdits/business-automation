import { Col, Form, Row } from "antd";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import TextArea from "components/elements/Textarea";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { useTranslation } from "react-i18next";
import { Spacer } from "components/SharedStyles";
// import Title from "antd/es/skeleton/Title";

const StagesModal = ({ close, data, setIsSuccess }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
    }
  }, []);

  const [createStage, { loading: createStageLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.STAGE,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateStage, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.STAGE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      stageTitle: values?.stageTitle,
      description: values.description,
      status: isChecked ? 1 : 0,
    };
    if (data) {
      updateStage({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createStage({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };
  return (
    <>
      <ModalWidth width="700px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[10, 5]}>
              <Col span={18}>
                <Input
                  initialValue={data?.stageTitle}
                  placeholder={t("stage") || "Stage"}
                  name="stageTitle"
                  required={true}
                  requiredMessage={RequiredMessages.SEGMENT}
                  label={t("stage") || "Stage"}
                />
              </Col>
              <Col span={5} offset={1}>
                <Form.Item
                  name="checkbox"
                  label={t("status") || "Status"}
                  initialValue={data?.isChecked}
                >
                  <Toggle onChange={handleCheckbox} checked={isChecked} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Spacer />
                <Form.Item
                  name="description"
                  label={t("description") || "Description"}
                  initialValue={data?.description}
                >
                  <TextArea
                    placeholder={t("typeTheDescriptionHere") || "Type the description here"}
                  />
                </Form.Item>
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
                    loading={createStageLoader || updateLoader}
                  />
                </ModalFooter>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalWidth>
    </>
  );
};

export default StagesModal;

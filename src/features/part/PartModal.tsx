import { Col, Form, Row } from "antd";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import TextArea from "components/elements/Textarea";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";

const PartModal = ({ close, data, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  const [createPart, { loading: createLoader }] = useRequest({
    path: ENDPOINTS.PARTS,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateParts, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.PARTS,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      part: values?.part,
      status: isChecked ? 1 : 0,
      description: values?.description || "",
    };
    if (data) {
      updateParts({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createPart({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
    }
  }, []);

  return (
    <>
      <ModalWidth width="600px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[10, 5]}>
              <Col span={18}>
                <Input
                  initialValue={data?.part}
                  placeholder={t("part") || "Part"}
                  name="part"
                  required={true}
                  requiredMessage={RequiredMessages.PART}
                  label={t("part") || "Part"}
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
                    loading={createLoader || updateLoader}
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

export default PartModal;

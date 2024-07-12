import { useEffect, useState } from "react";
import { Col, Form, Row } from "antd";
import RequiredMessages from "utils/requiredMessages";
import Input from "components/elements/Input";
import Button from "components/elements/Button";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { useTranslation } from "react-i18next";

const GlobalCategoryCodeModal = ({ data, close, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [createGlobalCategoryCode, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [updateCategoryCodes, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
    successToast: true,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      categoryName: values.categoryName,
      status: isChecked ? 1 : 0,
      description: values?.description || "",
    };
    if (data) {
      updateCategoryCodes({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createGlobalCategoryCode({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };
  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
    }
  }, []);

  return (
    <ModalWidth width="700px">
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <MainContent>
          <Row gutter={[10, 0]}>
            <Col span={18}>
              <Input
                initialValue={data?.categoryName}
                name="categoryName"
                label={t("categoryName") || "Category Name"}
                requiredMessage={RequiredMessages.CATEGORYNAME}
                required={true}
                placeholder={t("categoryName") || "Category Name"}
              />
            </Col>
            <Col span={5} offset={1}>
              <Form.Item
                name="checkbox"
                label={t("status") || "Status"}
                initialValue={data?.status}
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
      </Form>
    </ModalWidth>
  );
};

export default GlobalCategoryCodeModal;

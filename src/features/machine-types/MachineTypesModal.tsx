import { Col, Form, Row } from "antd";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";

const MachineTypesModal = ({ data = {}, close, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  const [creatMachineType, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.MACHINE_TYPES,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateMachineType, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.MACHINE_TYPES,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      machineType: values.machineType,
      status: isChecked ? 1 : 0,
      description: values?.description || "",
    };
    if (Object.keys(data)?.length) {
      updateMachineType({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      creatMachineType({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
    console.log(variables);
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
                  initialValue={data?.machineType}
                  placeholder={t("machineType") || "Machine Type"}
                  name="machineType"
                  required={true}
                  requiredMessage={RequiredMessages.MACHINETYPE}
                  label={t("machineType") || "Machine Type"}
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

export default MachineTypesModal;

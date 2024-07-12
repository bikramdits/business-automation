import { Col, Form, Row } from "antd";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";

const JobTypeModal = ({ close, data, setIsSuccess }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  const [creatJobType, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.JOB_TYPES,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateJobType, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.JOB_TYPES,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      jobType: values.jobType,
      status: isChecked ? 1 : 0,
      description: values?.description || "",
    };

    if (data) {
      updateJobType({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      creatJobType({
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
    <ModalWidth width="600px">
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <MainContent>
          <Row gutter={[10, 5]}>
            <Col span={18}>
              <Input
                initialValue={data?.jobType}
                placeholder={t("jobType") || "Job Type"}
                name="jobType"
                required={true}
                requiredMessage={RequiredMessages.JOBTYPE}
                label={t("jobType") || "Job Type"}
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
                <TextArea placeholder={t("description") || "Description"} />
              </Form.Item>
            </Col>
          </Row>
        </MainContent>
        <Row>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" text={t("cancel")} type="reset" onClick={close} />
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
  );
};

export default JobTypeModal;

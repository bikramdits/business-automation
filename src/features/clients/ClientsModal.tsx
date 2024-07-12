import { Col, Form, Row } from "antd";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegexMessages from "utils/regexMessages";
import RegexPattern from "utils/regexPattern";
import RequiredMessages from "utils/requiredMessages";

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
const clientsTypeOptions = [
  {
    value: "Cash",
  },
  {
    value: "Regular",
  },
];

const ClientsModal = ({ data, close }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(data?.isChecked || true);
  const onFinish = (values: any) => {
    console.log(values);
  };
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };
  return (
    <>
      <ModalWidth width="800px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={11}>
                <Select
                  name="type"
                  initialValue={data?.type}
                  label="Type"
                  required={true}
                  requiredMessage={RequiredMessages.CLIENTTYPE}
                  placeholder="Please Select Client Type"
                  options={clientsTypeOptions}
                />
              </Col>
              <Col span={11}>
                <Input
                  name="clientName"
                  initialValue={data?.clientName}
                  label="Client Name"
                  requiredMessage={RequiredMessages.CLIENTNAME}
                  required={true}
                  placeholder="Client Name"
                />
              </Col>
              <Col span={2}>
                <Form.Item
                  name="checkbox"
                  initialValue={data?.isChecked}
                  style={{ marginBottom: 0 }}
                  label={t("status") || "Status"}
                >
                  <Toggle onChange={handleCheckbox} checked={isChecked} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Input
                  name="email"
                  initialValue={data?.email}
                  label="Email"
                  pattern={RegexPattern.EMAIL}
                  regexMessage={RegexMessages.EMAIL}
                  requiredMessage={RequiredMessages.EMAIL}
                  required={true}
                  placeholder="lastname"
                />
              </Col>
              <Col span={12}>
                <Input
                  name="password"
                  initialValue={data?.password}
                  label="Password"
                  requiredMessage={RequiredMessages.PASSWORD}
                  required={true}
                  placeholder="Password"
                />
              </Col>
              <Col span={12}>
                <Input
                  name="phoneNumber"
                  initialValue={data?.phoneNumber}
                  label="Phone No."
                  placeholder="Phone No."
                />
              </Col>
              <Col span={12}>
                <Select
                  name="state"
                  initialValue={data?.state}
                  label="State"
                  placeholder="Please Select States"
                  options={positionTypeOptions}
                />
              </Col>
              <Col span={24}>
                <Form.Item label={t("description") || "Description"}>
                  <TextArea name="description" initialValue={data?.description} />
                </Form.Item>
              </Col>
            </Row>
          </MainContent>
          <Row>
            <Col span={24}>
              <Form.Item>
                <ModalFooter Justify="end" gap="10px">
                  <Button variant={"default"} text={t("cancel")} type="reset" onClick={close} />
                  <Button text={data ? t("update") : t("submit")} type="submit" />
                </ModalFooter>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalWidth>
    </>
  );
};

export default ClientsModal;

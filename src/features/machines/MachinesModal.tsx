import { Col, Form, Row } from "antd";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import TextArea from "components/elements/Textarea";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import Toggle from "components/elements/Toggle";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { useTranslation } from "react-i18next";

const MachinesModal = ({ close, data, setIsSuccess }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [machineType, setMachineType] = useState<any>({ id: data?.machineTypeId });
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [getAllMachinesTypes, { response: machineTypeList, loading: machineTypeLoader }] =
    useRequest({
      path: ENDPOINTS.MACHINE_TYPES,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });
  const [createMachine, { loading: machineLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [updateMachine, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  const onFinish = (values: any) => {
    const variables = {
      machineTypeId: machineType?.id,
      description: values?.description || "",
      status: isChecked ? 1 : 0,
      machineName: values?.machineName,
    };
    if (data) {
      updateMachine({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createMachine({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };
  const handleMachine = (_: any, e: any) => {
    setMachineType(e);
  };
  useEffect(() => {
    if (data) {
      setIsChecked(data.status);
    }
    const params = {
      type: 1,
    };
    getAllMachinesTypes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);
  const machineTypeOptions =
    machineTypeList?.data?.records?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.machineType,
      };
    }) || [];
  machineTypeOptions.unshift({ label: "Please Select Machine type", value: "" });

  return (
    <>
      <ModalWidth width="600px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[10, 5]}>
              <Col span={10}>
                <Select
                  options={machineTypeOptions}
                  loading={machineTypeLoader}
                  initialValue={data?.machineType}
                  name="machineType"
                  label={t("machineType") || "Machine Type"}
                  onChange={(value: any, e: any) => handleMachine(value, e)}
                  requiredMessage={RequiredMessages.MACHINETYPE}
                  required={true}
                  placeholder={t("pleaseSelect") || "Please Select"}
                />
              </Col>
              <Col span={10}>
                <Input
                  initialValue={data?.machineName}
                  placeholder={t("machineName") || "Machine Name"}
                  name="machineName"
                  required={true}
                  requiredMessage={RequiredMessages.MACHINE}
                  label={t("machine") || "Machine"}
                />
              </Col>
              <Col span={3} offset={1}>
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
                    showCount
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
                    loading={machineLoader || updateLoader}
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

export default MachinesModal;

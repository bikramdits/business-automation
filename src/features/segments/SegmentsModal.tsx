import { Col, Form, Row } from "antd";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import TextArea from "components/elements/Textarea";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { useTranslation } from "react-i18next";
import { Spacer } from "components/SharedStyles";

// const optionsMachines = [
//   {
//     value: "New Machine For 2023",
//     label: "New Machine For 2023",
//   },
//   {
//     value: "New Machine For 2023",
//     label: "New Machine For 2023",
//   },
// ];

// const optionsMachinesParentSegment = [
//   {
//     value: "Select Parent Segment",
//     label: "Select Parent Segment",
//   },
// ];

const SegmentsModal = ({ close, data, setIsSuccess }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [machines, setMachines] = useState<any>();
  const [parentSegment, setParentSegment] = useState({ id: data?.parentSegmentId });
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };
  const [getParentSegment, { response: parentSegmentList, loading: parentSegmentLoader }] =
    useRequest({
      path: ENDPOINTS.PARENT_SEGMENT,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });

  const [getAllMachines, { response: machineList, loader: listLoader }] = useRequest({
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [createSegment, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateSegment, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.SEGMENT,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
      setMachines({ id: data?.machinesId });
    }
    getAllMachines({
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);

  const machineOptions =
    machineList?.data?.records?.map((res: any) => {
      return { id: res?._id, value: res?.machineName };
    }) || [];
  machineOptions.unshift({ value: "", label: "Please Select" });

  const getMachineName = (_: any, e: any) => {
    setMachines(e);
    form.setFieldsValue({ parentSegment: "" });
  };
  useEffect(() => {
    if (machines) {
      getParentSegment({
        id: machines?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [machines]);

  console.log(machines);
  const handleParentSegment = (_: any, record: any) => {
    setParentSegment(record);
  };
  const onFinish = (values: any) => {
    const variables = {
      machinesId: machines?.id,
      segment: values.segment,
      parentSegmentId: parentSegment?.id,
      status: isChecked ? 1 : 0,
      description: values.description,
    };

    if (data) {
      updateSegment({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createSegment({
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
  const parentSegementOptions =
    parentSegmentList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.segment,
      };
    }) || [];
  parentSegementOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });
  return (
    <>
      <ModalWidth width="700px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[10, 5]}>
              <Col span={18}>
                <Select
                  options={machineOptions}
                  loading={listLoader}
                  initialValue={data?.machines}
                  name="machines"
                  label={t("machine") || "Machine"}
                  requiredMessage={RequiredMessages.MACHINE}
                  required={true}
                  placeholder="Please Select"
                  onChange={(value: any, e: any) => getMachineName(value, e)}
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
              <Col span={12}>
                <Input
                  initialValue={data?.segment}
                  placeholder="Segment"
                  name="segment"
                  required={true}
                  requiredMessage={RequiredMessages.SEGMENT}
                  label={t("segment") || "Segment"}
                />
              </Col>

              <Col span={12}>
                <Select
                  options={parentSegementOptions}
                  initialValue={data?.parentSegment}
                  loading={parentSegmentLoader}
                  name="parentSegment"
                  onChange={(value: any, e: any) => handleParentSegment(value, e)}
                  label={t("parentSegment") || "Parent Segment"}
                  placeholder="Please Select"
                />
              </Col>

              <Col span={24}>
                <Spacer />
                <Form.Item
                  name="description"
                  label={t("description") || "Description"}
                  initialValue={data?.description}
                >
                  <TextArea placeholder="Type the description here" />
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

export default SegmentsModal;

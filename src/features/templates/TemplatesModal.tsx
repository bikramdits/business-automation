import { Col, Form, Row } from "antd";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RequiredMessages from "utils/requiredMessages";

const TemplatesModal = ({ data, close, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [machineType, setMachineType] = useState<any>();
  const [machines, setMachines] = useState<any>();
  const [segment, setSegment] = useState<any>();
  const [subSegment, setSubSegment] = useState<any>();
  const [jobStage, setJobStage] = useState<any>();
  const [userType, setUserType] = useState<any>();
  const [isChecked, setIsChecked] = useState(true);

  const [getAllMachinesTypes, { response: machineTypeList, loading: machineTypeLoader }] =
    useRequest({
      path: ENDPOINTS.MACHINE_TYPES,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });

  const [getAllStages, { response: stageResponse, loading: stageLoader }] = useRequest({
    path: ENDPOINTS.STAGE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getGlobalCodeUserType, { response: userTypeList, loading: userTypeLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getAllMachines, { response: machineList, loading: machineListLoader }] = useRequest({
    path: ENDPOINTS.GET_MACHINES_BY_MACHINE_TYPE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getSegment, { response: segmentList, loading: segmentLoader }] = useRequest({
    path: ENDPOINTS.PARENT_SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getSubSegment, { response: subSegmentList, loading: subSegmentLoader }] = useRequest({
    path: ENDPOINTS.SUB_SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [createTemplate, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateTemplate, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      machineType: machineType?.id,
      machine: machines?.id,
      segment: segment?.id,
      subSegment: subSegment?.id,
      jobStages: jobStage?.id,
      userType: userType?.id,
      code: values.templateCode || "",
      name: values.templateName || "",
      status: isChecked ? 1 : 0,
      description: values.description || "",
    };

    if (data) {
      updateTemplate({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createTemplate({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
    console.log("variables", variables);
  };
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };

  const handleMachineType = (_: any, e: any) => {
    console.log(e);
    setMachineType(e);
    form.setFieldsValue({
      machine: "",
    });
  };

  const getMachineName = (_: any, e: any) => {
    console.log(e);
    setMachines(e);
    form.setFieldsValue({
      segment: "",
    });
  };

  const handleSegment = (_: any, e: any) => {
    console.log(e);
    setSegment(e);
    form.setFieldsValue({
      subSegment: "",
    });
  };

  const handleSubSegment = (value: any, e: any) => {
    console.log(e);
    setSubSegment(e);
  };

  const handleStage = (value: any, e: any) => {
    setJobStage(e);
  };

  const handleUserType = (_: any, e: any) => {
    console.log(e);
    setUserType(e);
  };

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
      setMachineType({ id: data?.machineType });
      setMachines({ id: data?.machine });
      setSegment({ id: data?.segment });
      setSubSegment({ id: data?.subSegment });
      setJobStage({ id: data?.jobStages });
      setUserType({ id: data?.userType });
    }

    getGlobalCodeUserType({
      id: "User Type",
      onCompleted: () => {},
      onError: () => {},
    });

    const params = {
      type: 1,
    };
    getAllMachinesTypes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });

    getAllStages({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);

  useEffect(() => {
    if (machineType) {
      getAllMachines({
        id: machineType?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [machineType]);

  useEffect(() => {
    if (machines) {
      getSegment({
        id: machines?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [machines]);

  useEffect(() => {
    if (segment) {
      getSubSegment({
        id: segment?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [segment]);
  const machineTypeOptions =
    machineTypeList?.data?.records?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.machineType,
      };
    }) || [];
  machineTypeOptions.unshift({ label: "Please Select Machine type", value: "" });

  const machineOptions =
    machineList?.data?.map((item: any) => {
      return { id: item?._id, value: item?.machineName };
    }) || [];
  machineOptions.unshift({ label: "Please Select", value: "" });

  const segementOptions =
    segmentList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.segment,
      };
    }) || [];
  segementOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });

  const subSegementOptions =
    subSegmentList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.segment,
      };
    }) || [];
  subSegementOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });

  const jobStateOptions =
    stageResponse?.data?.records?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.stageTitle,
      };
    }) || [];
  jobStateOptions.unshift({ label: "Please Select Job Stage", value: "" });

  console.log("test", jobStage);

  const userTypeOptions =
    userTypeList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.codeName,
      };
    }) || [];
  userTypeOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });

  console.log(subSegment);

  return (
    <>
      <ModalWidth width="800px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Select
                  name="machineType"
                  label={t("machineType") || "Machine Type"}
                  required={true}
                  requiredMessage={RequiredMessages.MACHINETYPE}
                  initialValue={data?.machineTypeName || ""}
                  placeholder={t("pleaseSelectMachineType") || "Please Select Machine Type"}
                  options={machineTypeOptions}
                  loading={machineTypeLoader}
                  onChange={(value: any, e: any) => handleMachineType(value, e)}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="machine"
                  label={t("machine") || "Machine"}
                  required={true}
                  requiredMessage={RequiredMessages.MACHINE}
                  initialValue={data?.machineName || ""}
                  placeholder={t("pleaseSelectMachine") || "Please Select Machine"}
                  options={machineOptions}
                  loading={machineListLoader}
                  onChange={(value: any, e: any) => getMachineName(value, e)}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="segment"
                  label={t("segment") || "Segment"}
                  required={true}
                  requiredMessage={RequiredMessages.SEGMENT}
                  initialValue={data?.segmentName || ""}
                  placeholder={t("pleaseSelectSegment") || "Please Select Segment"}
                  options={segementOptions}
                  loading={segmentLoader}
                  onChange={(value: any, e: any) => handleSegment(value, e)}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="subSegment"
                  label={t("subSegment") || "Sub Segment"}
                  // required={true}
                  initialValue={data?.subSegmentName || ""}
                  placeholder={t("pleaseSelectSubSegment") || "Please Select Sub Segment"}
                  options={subSegementOptions}
                  loading={subSegmentLoader}
                  onChange={(value: any, e: any) => handleSubSegment(value, e)}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="jobStage"
                  label={t("jobStage") || "Job Stage"}
                  required={true}
                  requiredMessage={RequiredMessages.JOBTYPE}
                  initialValue={data?.jobStagesName || ""}
                  placeholder={t("pleaseSelect") || "Please Select"}
                  options={jobStateOptions}
                  loading={stageLoader}
                  onChange={(value: any, e: any) => handleStage(value, e)}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="userType"
                  label={t("userType") || "User Type"}
                  required={true}
                  requiredMessage={RequiredMessages.USERTYPE}
                  initialValue={data?.userTypeName || ""}
                  placeholder={t("pleaseSelectUserType") || "Please Select User Type"}
                  options={userTypeOptions}
                  loading={userTypeLoader}
                  onChange={(value: any, e: any) => handleUserType(value, e)}
                />
              </Col>

              <Col span={12}>
                <Input
                  name="templateCode"
                  label={t("templateCode") || "Template Code"}
                  required={true}
                  requiredMessage={RequiredMessages.TEMPLATECODE}
                  initialValue={data?.code}
                  placeholder={t("templateCode") || "Template Code"}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="templateName"
                  label={t("templateName") || "Template Name"}
                  required={true}
                  requiredMessage={RequiredMessages.TEMPLATENAME}
                  initialValue={data?.name}
                  placeholder={t("templateName") || "Template Name"}
                />
              </Col>
              <Col span={20}>
                <Form.Item
                  label={t("description") || "Description"}
                  name="description"
                  initialValue={data?.description}
                >
                  <TextArea
                    placeholder={t("typeTheDescriptionHere") || "Type the description here"}
                  />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Form.Item
                  name="checkbox"
                  initialValue={data?.isChecked}
                  style={{ marginBottom: 0 }}
                  label={t("status") || "Status"}
                >
                  <Toggle onChange={handleCheckbox} checked={isChecked} />
                </Form.Item>
              </Col>
            </Row>
          </MainContent>
          <Row>
            <Col span={24}>
              <Form.Item>
                <ModalFooter Justify="end" gap="10px">
                  <Button variant={"default"} text={t("cancel")} type="reset" onClick={close} />
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

export default TemplatesModal;

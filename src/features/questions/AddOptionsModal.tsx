/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Form, Row } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import CheckBox from "components/elements/CheckBox";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RequiredMessages from "utils/requiredMessages";
// import { DeleteIcon } from "components/elements/drop-file-input/DropFileInputStyles";
import styled from "styled-components";
import { Flex } from "components/SharedStyles";

enum GetFields {
  Checkbox = "jXt_NkXAf",
  RadioButton = "z29v6QQ_d",
  InputType = "jyOVMAfy1",
}

const RemoveIcon = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
  padding-bottom: 11px;
  font-size: 25px;
  color: #00588b;
`;

const AddOptionsModal = ({ data, setIsSuccess, close, isEdit, id }: any) => {
  const [form] = Form.useForm();
  const [isRequired, setIsRequired] = useState(true);
  const [controlType, setControlType] = useState<any>();
  const [addMoreAction, setAddMoreAction] = useState<any>([]);
  const [isDefault, setIsDefault] = useState<any>(false);
  const [actionType, setActionType] = useState<any>(null);
  const [isAddMore, setIsAddMore] = useState(false);
  const { t } = useTranslation();
  const [getAllControlType, { response: controlTypeList, loading: controlTypeLoader }] = useRequest(
    {
      path: ENDPOINTS.PARENT_GLOBAL_CODE,
      errorToast: true,
      method: HTTP_METHODS.GET,
    },
  );
  const [createOptions, { loading: createOptionLoader }] = useRequest({
    path: ENDPOINTS.CREATE_OPTION,
    successToast: true,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [
    getExistingQuestions,
    { response: existQuestionsResponse, loading: existingQuestionLoader },
  ] = useRequest({
    path: ENDPOINTS.GET_EXISTING_QUESTIONS,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getAllActions, { response: actionList, loading: actionLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const addMoreInitialValues: any = [
    {
      title: "",
      questionType: "",
      nextQuestion: "",
      default: "",
      defaultValue: "",
      required: "",
    },
  ];
  const handleActiontype = (_: any, e: any) => {
    setActionType(e);
  };
  const handleControlType = (_: any, e: any) => {
    setIsRequired(false);
    setControlType(e);
  };

  const onFinish = (values: any) => {
    let addMoreData: any = [];
    if (values.fields?.length) {
      addMoreData = values?.fields?.map((item: any) => {
        return {
          optionType: controlType?.value,
          title: item?.title,
          questionType: item?.questionType,
          defaultValue: item?.defaultValue,
          default: item?.default ? 1 : 0,
          required: item?.required ? 1 : 0,
          nextQuestion: item?.nextQuestion,
          questionId: data?.qId,
        };
      });
    }
    const variables: any = {
      payload: [
        {
          optionType: controlType?.value,
          title: values?.optionText,
          questionType: actionType?.value,
          defaultValue: values?.defaultValue,
          default: isDefault ? 1 : 0,
          required: isRequired ? 1 : 0,
          nextQuestion: values?.nextQuestion,
          questionId: data?.qId || data?.attributes?.qId,
        },
      ],
    };
    if (addMoreData?.length) {
      variables.payload = [...variables.payload, ...addMoreData];
    }
    if (isEdit) {
      variables.payload[0].id = data?._id;
    }
    createOptions({
      variables,
      onCompleted: () => {
        setIsSuccess(true);
        close();
      },
      onError: () => {},
    });
  };
  const handleDefault = (e: any) => {
    setIsDefault(e.target.checked);
  };
  const handleRequired = (e: any) => {
    setIsRequired(e.target.checked);
  };

  const getFields = (type: any) => {
    switch (type as GetFields) {
      case GetFields.RadioButton: {
        return <CheckBox onChange={handleDefault} checked={isDefault} text="Default" />;
      }
      case GetFields.Checkbox: {
        return <CheckBox onChange={handleDefault} checked={isDefault} text="Default" />;
      }
      case GetFields.InputType: {
        return (
          <>
            <Input
              name="defaultValue"
              initialValue={isEdit ? data?.defaultValue : ""}
              placeholder="Default value"
            />
            Required <CheckBox onChange={handleRequired} checked={isRequired} />
          </>
        );
      }
      default: {
        return null;
      }
    }
  };

  const getNestedFields = (index: number, type: any) => {
    switch (type as GetFields) {
      case GetFields.RadioButton: {
        return <CheckBox name={[index, "default"]} text="Default" valuePropName="checked" />;
      }
      case GetFields.Checkbox: {
        return <CheckBox name={[index, "default"]} text="Default" valuePropName="checked" />;
      }
      case GetFields.InputType: {
        return (
          <>
            <Input name={[index, "defaultValue"]} placeholder="Default value" />
            <CheckBox text="Required" name={[index, "required"]} valuePropName="checked" />
          </>
        );
      }

      default: {
        return null;
      }
    }
  };
  useEffect(() => {
    if (data && isEdit) {
      setActionType({ value: data?.questionType });
      setControlType({ value: data?.optionType });
      setIsDefault(data?.default);
      setIsRequired(data?.required);
    }
    getAllControlType({
      id: "Control Type",
      onCompleted: () => {
        if (data && isEdit) {
          form.setFieldsValue({
            controlType: data?.optionType,
          });
        } else {
          if (data?.options.length) {
            form.setFieldsValue({
              controlType: data?.optionType,
            });
            setActionType({ value: data?.questionType });
          } else {
            form.setFieldsValue({
              controlType: "",
            });
          }
        }
      },
      onError: () => {},
    });
    getAllActions({
      id: "Question Action",
      onCompleted: () => {
        if (data && isEdit) {
          form.setFieldsValue({
            actionType: data?.questionType,
          });
        } else {
          form.setFieldsValue({
            actionType: "",
          });
        }
      },
      onError: () => {},
    });
  }, []);
  useEffect(() => {
    if (actionType?.value === "GcsWp2qKl") {
      getExistingQuestions({
        id: id,
        questionId: data?.attributes?.parentQuestionId || data?._id,
        onCompleted: () => {
          if (data && isEdit) {
            form.setFieldsValue({
              nextQuestion: data?.nextQuestion,
            });
          } else {
            form.setFieldsValue({
              nextQuestion: "",
            });
          }
        },
        onError: () => {},
      });
    }
  }, [actionType]);
  useEffect(() => {
    addMoreAction?.map((item: any) => {
      if (item === "GcsWp2qKl" && !existQuestionsResponse?.data?.questions?.length) {
        getExistingQuestions({
          id: id,
          questionId: data?._id,
          onCompleted: () => {},
          onError: () => {},
        });
      }
    });
  }, [addMoreAction]);

  let actionOptions: any = [];
  if (actionList) {
    actionOptions = actionList?.data?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.codeName,
      };
    });
    actionOptions.unshift({ label: "Please Select Action", value: "" });
  }
  let controltypeOptions: any = [];
  if (controlTypeList) {
    controltypeOptions = controlTypeList?.data?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.codeName,
      };
    });
    controltypeOptions.unshift({ label: "Please Select Control Type", value: "" });
  }

  let nextQuestionOptions: any = [];
  if (existQuestionsResponse) {
    nextQuestionOptions = existQuestionsResponse?.data?.questions?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.questionId?.question,
      };
    });
    nextQuestionOptions.unshift({ label: "Please Select", value: "" });
  }

  const handleAddMore = (add: any) => {
    if (isAddMore) {
      add();
    } else {
      setIsAddMore(true);
    }
  };
  // const handleRemove = (fields: any, remove: any) => {

  // };
  const handleChange = (value: any, ids: number) => {
    if (addMoreAction?.length) {
      const filterData = addMoreAction?.filter((_: any, index: any) => ids === index);
      if (filterData?.length) {
        const updateData = addMoreAction?.map((item: any, index: number) => {
          if (ids === index) {
            return (item = value);
          }
        });
        setAddMoreAction(updateData);
      } else {
        setAddMoreAction((old: any) => [...old, value]);
      }
    } else {
      return setAddMoreAction([value]);
    }
  };
  return (
    <ModalWidth width="800px">
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <MainContent>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Select
                options={controltypeOptions}
                loading={controlTypeLoader}
                disabled={data?.optionType}
                requiredMessage={RequiredMessages.CONTROLTYPE}
                onChange={(_: any, e: any) => handleControlType(_, e)}
                name="controlType"
                label="Conrtol Type"
                required={true}
                //   placeholder={t("pleaseSelect") || "Please Select"}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Flex>
                    <Input
                      name="optionText"
                      label="Option Text"
                      initialValue={isEdit ? data?.title : ""}
                      requiredMessage={RequiredMessages.OPTIONSTEXT}
                      required={true}
                      placeholder="Option Text"
                    />
                    {getFields(controlType?.value)}
                  </Flex>
                </Col>
                <Col span={24}>
                  <Select
                    options={actionOptions}
                    loading={actionLoader}
                    requiredMessage={RequiredMessages.ACTION}
                    onChange={(_: any, e: any) => handleActiontype(_, e)}
                    name="actionType"
                    label="Action Type"
                    required={true}
                    //   placeholder={t("pleaseSelect") || "Please Select"}
                  />
                </Col>
                {actionType?.value === "GcsWp2qKl" && (
                  <Col span={12}>
                    <Select
                      options={nextQuestionOptions}
                      loading={existingQuestionLoader}
                      requiredMessage={RequiredMessages.NEXTQUESTION}
                      name="nextQuestion"
                      label="Next Question"
                      required={true}
                    />
                  </Col>
                )}
              </Row>
            </Col>
            {/* <Col span={4}>{getFields(controlType?.value)}</Col> */}

            {!isEdit ? (
              <Form.List name="fields">
                {(fields: any, { add, remove }) => {
                  return (
                    <>
                      {isAddMore && (
                        <>
                          {fields.map((field: any, index: number) => (
                            <>
                              <Col span={24} key={field.key}>
                                <Row>
                                  <Col span={24}>
                                    <Flex>
                                      <Input
                                        name={[index, "title"]}
                                        required={true}
                                        label="Option Text"
                                        requiredMessage={RequiredMessages.OPTIONSTEXT}
                                        placeholder="Option Text"
                                      />
                                      {getNestedFields(index, controlType?.value)}
                                    </Flex>
                                  </Col>
                                  <Col span={22} key={field.key}>
                                    <Select
                                      options={actionOptions}
                                      loading={actionLoader}
                                      label="Action Type"
                                      initialValue=""
                                      onChange={(value: any) => handleChange(value, index)}
                                      required={true}
                                      requiredMessage={RequiredMessages.ACTION}
                                      name={[index, "questionType"]}
                                    />
                                  </Col>
                                  {addMoreAction[index] === "GcsWp2qKl" ? (
                                    <Col span={12}>
                                      <Select
                                        options={nextQuestionOptions}
                                        loading={existingQuestionLoader}
                                        initialValue=""
                                        requiredMessage={RequiredMessages.NEXTQUESTION}
                                        name={[index, "nextQuestion"]}
                                        label="Next Question"
                                        required={true}
                                      />
                                    </Col>
                                  ) : (
                                    ""
                                  )}
                                  <Col span={2}>
                                    {fields?.length ? (
                                      <RemoveIcon
                                        title="Remove"
                                        onClick={() => {
                                          if (fields?.length === 1) {
                                            setIsAddMore(false);
                                          }
                                          remove(field.name);
                                        }}
                                      >
                                        <MinusCircleOutlined />
                                      </RemoveIcon>
                                    ) : null}
                                  </Col>
                                </Row>
                              </Col>
                            </>
                          ))}
                        </>
                      )}
                      <Col span={24}>
                        <Form.Item>
                          <Button
                            variant="default"
                            text="ADD MORE"
                            type="button"
                            onClick={() => handleAddMore(add())}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                }}
              </Form.List>
            ) : (
              ""
            )}
            {/* )} */}
            {/* )} */}
          </Row>
        </MainContent>
        <Row>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                <Button
                  // disabled={loading}
                  text={isEdit ? t("update") : t("submit")}
                  loading={createOptionLoader}
                  type="submit"
                  // loading={createQuestionLoader}
                />
              </ModalFooter>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWidth>
  );
};

export default AddOptionsModal;

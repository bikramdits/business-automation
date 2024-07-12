/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Form, Image, Row, Spin, Upload } from "antd";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RequiredMessages from "utils/requiredMessages";
import Button from "components/elements/Button";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import DropFileInput from "components/elements/drop-file-input/DropFileInput";
import { LoadingOutlined } from "@ant-design/icons";
import CloseOutlined from "assets/Images/close.svg";

import {
  DeleteIcon,
  FileInputWrapper,
  FileItem,
  FileItemImage,
} from "components/elements/drop-file-input/DropFileInputStyles";
import { Flex, Label, Spacer } from "components/SharedStyles";

const QuestionsModal = ({ close, data, setIsSuccess, id, isEdit, isChildQuestion }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<any>();
  const [questionType, setQuestionType] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<any>(null);
  const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
  const [isLinkInventory, setIsLinkInventory] = useState<boolean>(false);
  const [inputType, setInputType] = useState<any>("");

  const [getAllQuestionType, { response: questionTypeList, loading: questionTypeLoader }] =
    useRequest({
      path: ENDPOINTS.PARENT_GLOBAL_CODE,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });
  const [updateQuestion, { loading: updateQuestionsLoader }] = useRequest({
    path: ENDPOINTS.QUESTION,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });
  const [getAllInputType, { response: inputTypeList, loading: inputTypeLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getAllActions, { response: actionList, loading: actionLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getAllParts, { response: partResponse, loading: partLoader }] = useRequest({
    path: ENDPOINTS.PARTS,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [createQuestions, { loading: createQuestionLoader }] = useRequest({
    path: ENDPOINTS.QUESTION,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [getDataTypes, { response: dataTypeList, loading: dataTypeLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getImageUrl, { response: imageUploaderResponse }] = useRequest({
    isFormData: true,
    successToast: true,
    path: ENDPOINTS.IMAGE_UPLOAD,
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
  const isChild = data?.isChild || isChildQuestion;
  const onFinish = (values: any) => {
    const variables: any = {
      templateId: id,
      questionType: questionType?.value,
      questionInputType: inputType?.value,
      questionAction: actionType?.value,
      questionDataType: values?.dataType,
      question: values?.questions,
      required: isRequired ? 1 : 0,
      nextQuestion: values?.nextQuestion,
      captureImage: isImageCaptured ? 1 : 0,
      linkInventory: isLinkInventory ? 1 : 0,
      part: values?.part,
      order: values?.orderNo ? Number(values?.orderNo) : 1,
      defaultValue: values?.defaultValue,
      instructions: values?.instructions,
      isStep: !data ? 1 : 0,
      refrenceImage: imageUploaderResponse?.data?.file[0]?.path,
    };
    if (isChild) {
      variables.parentQuestionId = data ? data?.attributes?.parentQuestionId || data?._id : "";
      variables.qId = data ? data?.attributes?.qId : "";
      variables.optionId = data ? data?._id : "";
    }
    if (data?.qId) {
      delete variables.optionId;
    }
    if (isEdit) {
      console.log(variables);
      delete variables.isStep;
      delete variables.optionId;
      updateQuestion({
        id: data?._id,
        //  childData?._id,
        variables,
        onCompleted: () => {
          setIsSuccess(true);
          close();
        },
        onError: () => {},
      });
    } else {
      createQuestions({
        variables,
        onCompleted: () => {
          setIsSuccess(true);
          close();
        },
        onError: () => {},
      });
    }
  };
  const handleInputType = (_: any, e: any) => {
    setInputType(e);
    form.setFieldsValue({
      action: "",
      dataType: "",
    });
    setActionType(null);
  };
  const handleRequired = (value: boolean) => {
    setIsRequired(value);
  };
  const handleImageCapture = (value: boolean) => {
    setIsImageCaptured(value);
  };
  const handleLinkInventory = (value: boolean) => {
    setIsLinkInventory(value);
  };

  const handleFileChange = (file: any) => {
    setLoading(true);
    const variables = {
      file: file,
    };
    getImageUrl({
      variables,
      onCompleted: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        setPreviewImage("");
      },
    });
  };

  const fileRemove = () => {
    setPreviewImage("");
  };

  const handleActiontype = (_: any, e: any) => {
    setActionType(e);
    console.log(form.getFieldValue("type"));
  };
  const handleQuestionType = (_: any, e: any) => {
    setQuestionType(e);
  };
  useEffect(() => {
    if (data && isEdit) {
      setQuestionType({ value: data?.questionType });
      setPreviewImage(data?.refrenceImage || "");
      setInputType({ value: data?.questionInputType });
      setIsRequired(data?.required);
      setIsImageCaptured(data?.captureImage);
      setIsLinkInventory(data?.linkInventory ? true : false);
    }
    getAllQuestionType({
      id: "Question Type",
      onCompleted: () => {
        if (data && isEdit) {
          form.setFieldsValue({
            type: data?.questionType,
          });
        } else {
          form.setFieldsValue({
            type: "",
          });
        }
      },
      onError: () => {},
    });
    getAllInputType({
      id: "Input Type",
      onCompleted: () => {
        if (data && isEdit) {
          form.setFieldsValue({
            inputType: data?.questionInputType,
          });
        } else {
          form.setFieldsValue({
            inputType: "",
          });
        }
      },
      onError: () => {},
    });
  }, []);

  useEffect(() => {
    if (inputType?.value === "5nzvtjE3F") {
      getAllActions({
        id: "Question Action",
        onCompleted: () => {
          if (data && isEdit) {
            form.setFieldsValue({
              action: data?.questionAction,
            });
          } else {
            form.setFieldsValue({
              action: "",
            });
          }
        },
        onError: () => {},
      });
      getDataTypes({
        id: "Data Type",
        onCompleted: () => {
          if (data && isEdit) {
            form.setFieldsValue({
              dataType: data?.questionDataType,
            });
          } else {
            form.setFieldsValue({
              dataType: "",
            });
          }
        },
        onError: () => {},
      });
    }
  }, [inputType]);
  useEffect(() => {
    if (isLinkInventory) {
      const params = {
        type: 1,
      };
      getAllParts({
        params,
        onCompleted: () => {
          if (data && isEdit) {
            form.setFieldsValue({
              part: data?.part,
            });
          } else {
            form.setFieldsValue({
              part: "",
            });
          }
        },
        onError: () => {},
      });
    }
  }, [isLinkInventory]);
  useEffect(() => {
    if (actionType?.value === "GcsWp2qKl") {
      getExistingQuestions({
        id: id,
        questionId: data?._id,
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

  let questionTypeOptions: any = [];
  if (questionTypeList) {
    questionTypeOptions = questionTypeList?.data?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.codeName,
      };
    });
    questionTypeOptions.unshift({ label: "Please Select Type", value: "" });
  }

  let inputTypeOptions: any = [];
  if (inputTypeList) {
    inputTypeOptions = inputTypeList?.data?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.codeName,
      };
    });
    inputTypeOptions.unshift({ label: "Please Select Input Type", value: "" });
  }

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

  let dataTypeOptions: any = [];
  if (dataTypeList) {
    dataTypeOptions = dataTypeList?.data?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.codeName,
      };
    });
    dataTypeOptions.unshift({ label: "Please Select Data Type", value: "" });
  }
  let partOptions: any = [];
  if (partResponse) {
    partOptions = partResponse?.data?.records?.map((item: any) => {
      return {
        value: item?._id,
        label: item?.part,
      };
    });
    partOptions.unshift({ label: "Please Select Part", value: "" });
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
  return (
    <ModalWidth width="900px">
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <MainContent>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Select
                name="type"
                label="Type"
                required={true}
                onChange={(_: any, e: any) => handleQuestionType(_, e)}
                requiredMessage={RequiredMessages.TYPE}
                loading={questionTypeLoader}
                options={questionTypeOptions}
              />
            </Col>
            <Col span={12}>
              <Select
                name="inputType"
                label="Input Type"
                loading={inputTypeLoader}
                requiredMessage={RequiredMessages.INPUTTYPE}
                onChange={(_: any, e: any) => handleInputType(_, e)}
                required={true}
                options={inputTypeOptions}
              />
            </Col>
            {inputType?.value === "5nzvtjE3F" && (
              <>
                <Col span={12}>
                  <Select
                    name="action"
                    label="Action"
                    required={true}
                    loading={actionLoader}
                    onChange={(_: any, e: any) => handleActiontype(_, e)}
                    requiredMessage={RequiredMessages.ACTION}
                    options={actionOptions}
                  />
                </Col>
                {questionType?.value !== "nfPQXiBJY" ? (
                  <Col span={12}>
                    <Select
                      name="dataType"
                      label="Data Type"
                      loading={dataTypeLoader}
                      requiredMessage={RequiredMessages.DATATYPE}
                      required={true}
                      options={dataTypeOptions}
                    />
                  </Col>
                ) : (
                  ""
                )}
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
              </>
            )}
            <Col span={24}>
              <Input
                name="questions"
                label="Question"
                initialValue={isEdit ? data?.title : ""}
                requiredMessage={RequiredMessages.QUESTIONS}
                required={true}
                placeholder={t("question") || "Question"}
              />
            </Col>
            <Col span={!isChild ? 12 : 24}>
              <Input
                name="defaultValue"
                label="Default Value"
                initialValue={isEdit ? data?.defaultValue : ""}
                placeholder="Default Value"
              />
            </Col>
            {!isChild ? (
              <Col span={12}>
                <Input
                  name="orderNo"
                  initialValue={isEdit ? data?.order?.toString() : ""}
                  type="number"
                  required={true}
                  requiredMessage={RequiredMessages.ORDER}
                  label={t("orderNo") || "Order No"}
                  placeholder={t("orderNo") || "Order No"}
                />
              </Col>
            ) : (
              ""
            )}
            <Col span={24}>
              <Form.Item
                name="instructions"
                label="Reference Instructions"
                initialValue={isEdit ? data?.instructions : ""}
              >
                <TextArea placeholder="Reference Instructions" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Refrence Image">
                {!previewImage ? (
                  <DropFileInput
                    onFileChange={(file) => handleFileChange(file)}
                    imageShow={setPreviewImage}
                  />
                ) : loading ? (
                  <FileInputWrapper>
                    <Flex direction="column" Justify="center" height="100%">
                      <Label>Uploading....</Label>
                      <Spin indicator={<LoadingOutlined />} />
                    </Flex>
                  </FileInputWrapper>
                ) : (
                  <FileItem>
                    <FileItemImage style={{ width: "300px" }} src={previewImage} alt="" />
                    <DeleteIcon onClick={() => fileRemove()}>
                      <Image src={CloseOutlined} />
                    </DeleteIcon>
                  </FileItem>
                )}
              </Form.Item>
            </Col>

            <Col span={14}>
              <Row>
                <Col span={8}>
                  <Label>Required</Label>
                  <Toggle onChange={handleRequired} checked={isRequired} />
                </Col>
                <Col span={8}>
                  <Label>Capture Image</Label>
                  <Toggle onChange={handleImageCapture} checked={isImageCaptured} />
                </Col>
                <Col span={8}>
                  {!isChild ? (
                    <>
                      <Flex gap="30px">
                        <div>
                          <Label>Link Inventory</Label>
                          <Toggle onChange={handleLinkInventory} checked={isLinkInventory} />
                        </div>
                      </Flex>
                    </>
                  ) : (
                    ""
                  )}
                </Col>
                {!isChild && isLinkInventory && (
                  <Col span={24}>
                    <Spacer />
                    <Select
                      name="part"
                      label="Parts"
                      placeholder={t("part")}
                      loading={partLoader}
                      options={partOptions}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </MainContent>
        <Row>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                <Button
                  disabled={loading}
                  text={isEdit ? t("update") : t("submit")}
                  type="submit"
                  loading={createQuestionLoader || updateQuestionsLoader}
                />
              </ModalFooter>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWidth>
  );
};

export default QuestionsModal;

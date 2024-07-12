/* eslint-disable */
import { Col, Form, Row, Spin } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  CopyOutlined,
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Select from "components/elements/Select";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  Flex,
  Spacer,
} from "components/SharedStyles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import { useUrlQuery } from "utils/url";
import Loader, { LoaderMain } from "components/elements/Loader";

const QuestionHeader = styled(Flex)`
  align-items: center;
  min-height: 50px;
  background: #00588b;
  color: #fff;
  justify-content: space-between;
  padding: 5px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
  width: max-content;
  min-width: 100%;

  p {
    margin: 0;
  }
  .anticon {
    color: #00588b;
    background-color: #fff;
    padding: 7px;
    border-radius: 8px;
    font-size: 17px;
    width: 47px;
    justify-content: center;
    box-shadow: 0 0 8px #00000057 inset;
  }
`;
const MainQuestion = styled.div``;
const ExpandIcon = styled.div`
  transition: all 0.5s;
  &.open {
    .anticon {
      transition: all 0.5s;
      transform: rotate(0deg);
    }
  }
  .anticon {
    color: #fff;
    background-color: transparent;
    padding: 0px;
    border-radius: initial;
    font-size: 16px;
    transition: all 0.5s;
    transform: rotate(90deg);
    box-shadow: none;
    width: 30px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
  cursor: pointer;
`;

const AccordionExampleNested = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [data, setData] = useState<any>([]);
  const [openQuestionModal, setOpenQuestionModal] = useState<boolean>(false);
  const [template, setTemplate] = useState<any>("");
  const [openCloneModal, setOpenCloneModal] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<any>(false);
  const [optionsModal, setOptionsModal] = useState<boolean>(false);
  const [openDeleteOptionModal, setOpenDeleteOptionModal] = useState<boolean>(false);
  const [isQuestionEdit, setIsQuestionEdit] = useState<boolean>(false);
  const [isOptionAdd, setIsOptionAdd] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const query = useUrlQuery();
  const templateId = query.get("id");
  const toggleFolder = (item: any) => {
    if (item?.options?.length) {
      item.isOpen = !item.isOpen;
      setData([...data]);
    }
  };
  const [getCloned, { loading: cloneLoader }] = useRequest({
    path: ENDPOINTS.CLONE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteQuestion, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.QUESTION,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });
  const [deleteOption, { loading: deleteOptionLoader }] = useRequest({
    path: ENDPOINTS.DELETE_OPTION,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });
  const [getAllTemplate, { response: templateList, loading: templateloader }] = useRequest({
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getQuestionList, { response: questionResponse, loading: questionaireLoader }] = useRequest(
    {
      path: ENDPOINTS.CREATE_QUESTION,
      errorToast: true,
      method: HTTP_METHODS.GET,
    },
  );

  const addQuestion = () => {
    setEditRecord("");
    setOpenQuestionModal(true);
    setIsQuestionEdit(false);
  };
  const addChildQuestion = (item: any) => {
    setOpenQuestionModal(true);
    setEditRecord(item);
    setIsQuestionEdit(false);
  };
  const handleTemplates = (_: any, e: any) => {
    setTemplate(e);
  };

  const deleteOptions = () => {
    deleteOption({
      id: editRecord?.attributes?.qId,
      questionId: editRecord?._id,
      onCompleted: () => {
        setIsSuccess(true);
        setOpenDeleteOptionModal(false);
      },
      onError: () => {},
    });
  };
  const deleteRecords = () => {
    deleteQuestion({
      id: editRecord?._id,
      onCompleted: () => {
        setIsSuccess(true);
        setOpenConfirmDeleteModal(false);
      },
      onError: () => {},
    });
  };
  const handleDeleteOption = (item: any) => {
    setEditRecord(item);
    setOpenDeleteOptionModal(true);
  };
  const IsCloneQuestion = (item: any) => {
    setEditRecord(item);
    setOpenCloneModal(true);
  };
  const clonedQuestion = () => {
    getCloned({
      id: editRecord?._id,
      onCompleted: () => {
        setIsSuccess(true);
        setOpenCloneModal(false);
      },
      onError: () => {},
    });
  };

  const editOptionButton = (item: any) => {
    return (
      <Actions onClick={() => handeEditOptions(item)}>
        <EditOutlined title="Edit Options" />
      </Actions>
    );
  };
  const editQuestionButton = (item: any) => {
    return (
      <Actions onClick={() => handleEditQuestions(item)}>
        <EditOutlined title="Edit Question" />
      </Actions>
    );
  };
  const addOptionButton = (item: any) => {
    return (
      <Actions onClick={() => handeAddOptions(item)}>
        <PlusOutlined title="Add Options" />
      </Actions>
    );
  };
  const addQuestionButton = (item: any) => {
    return (
      <Actions
        onClick={() => {
          setIsNewQuestion(true);
          addChildQuestion(item);
        }}
      >
        <FileAddOutlined title="Add Question" />
      </Actions>
    );
  };
  const deleteQuestionButton = (item: any) => {
    return (
      <Actions onClick={() => handleDeleteQuestion(item)}>
        <DeleteOutlined title="Delete Question" />
      </Actions>
    );
  };
  const deleteOptionButton = (item: any) => {
    return (
      <Actions onClick={() => handleDeleteOption(item)}>
        <DeleteOutlined title="Delete Option" />
      </Actions>
    );
  };
  const cloneButton = (item: any) => {
    return (
      <Actions onClick={() => IsCloneQuestion(item)}>
        <CopyOutlined title="Clone" />
      </Actions>
    );
  };

  useEffect(() => {
    if (templateId) {
      setTemplate({ id: templateId });
    }
    const params = {
      type: 1,
    };
    getAllTemplate({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);
  useEffect(() => {
    if (template?.value || template?.id) {
      getQuestionList({
        id: template.id,
        onCompleted: (data: any) => {
          setData(data?.questions);
        },
        onError: () => {},
      });
    }
    setIsNewQuestion(false);
    setIsSuccess(false);
    setEditRecord(null);
  }, [template, isSuccess]);

  let templateOptions: any = [];

  if (templateList) {
    templateOptions = templateList?.data?.records?.map((item: any) => {
      if (templateId === item?._id) {
        form.setFieldsValue({
          templateType: item?.name,
        });
      }
      return {
        id: item?._id,
        value: item?.name,
      };
    });
    templateOptions.unshift({ label: "Please Select Template", value: "" });
  }
  const handleEditQuestions = (data: any) => {
    setIsQuestionEdit(true);
    setEditRecord(data);
    setOpenQuestionModal(true);
  };
  const handleDeleteQuestion = (data: any) => {
    setEditRecord(data);
    setOpenConfirmDeleteModal(true);
  };
  const handeAddOptions = (data: any) => {
    setEditRecord(data);
    setIsOptionAdd(false);
    setOptionsModal(true);
  };
  const handeEditOptions = (data: any) => {
    setEditRecord(data);
    setIsOptionAdd(true);
    setOptionsModal(true);
  };

  const getOptions = (item: any) => {
    if (item?.options?.length) {
      console.log(item?.options?.length, "item?.options?.length");

      item?.options?.map((info: any) => {
        info.attributes = {
          qId: item?.qId,
          parentQuestionId: item?._id,
        };
      });
    }

    if (item?.qId) {
      if (
        (item?.questionTypeName === "Decision" && item?.questionInputTypeName === "Single") ||
        (item?.questionTypeName === "Decision" && item?.questionInputTypeName === "Multi") ||
        (item?.questionTypeName === "Input" && item?.questionInputTypeName === "Multi")
      ) {
        //(for decision and single || for decision and multi || for input and multi)
        if (item?.isChild) {
          return [editQuestionButton(item), deleteQuestionButton(item), addOptionButton(item)];
        } else {
          return [
            editQuestionButton(item),
            deleteQuestionButton(item),
            addOptionButton(item),
            cloneButton(item),
          ];
        }
      } else if (item?.questionTypeName === "Input" && item?.questionInputTypeName === "Single") {
        // ( for input and single)
        if (item?.questionActionName === "Go to next question" && !item?.options?.length) {
          if (item?.isChild) {
            return [editQuestionButton(item), deleteQuestionButton(item), addQuestionButton(item)];
          } else {
            return [
              editQuestionButton(item),
              deleteQuestionButton(item),
              addQuestionButton(item),
              cloneButton(item),
            ];
          }
        } else {
          if (item?.isChild) {
            return [editQuestionButton(item), deleteQuestionButton(item)];
          } else {
            return [editQuestionButton(item), deleteQuestionButton(item), cloneButton(item)];
          }
        }
      } else if (
        item?.questionTypeName === "Label" &&
        (item?.questionInputTypeName === "Single" || item?.questionInputTypeName === "Multi")
      ) {
        //for label and single or multiple
        if (item?.questionActionName === "Go to next question" && !item?.options?.length) {
          if (item?.isChild) {
            return [editQuestionButton(item), deleteQuestionButton(item), addQuestionButton(item)];
          } else {
            [
              editQuestionButton(item),
              deleteQuestionButton(item),
              addQuestionButton(item),
              cloneButton(item),
            ];
          }
        } else {
          if (item?.isChild) {
            return [editQuestionButton(item), deleteQuestionButton(item), addOptionButton(item)];
          } else {
            return [
              editQuestionButton(item),
              deleteQuestionButton(item),
              addOptionButton(item),
              cloneButton(item),
            ];
          }
        }
      }
    } else {
      if (item?.questionActionName === "Go to next question" && !item?.options?.length) {
        return [editOptionButton(item), deleteOptionButton(item), , addQuestionButton(item)];
      } else {
        return [editOptionButton(item), deleteOptionButton(item)];
      }
    }
  };

  return (
    <>
      <>
        <Form layout="vertical" form={form} onFinish={addQuestion}>
          <BreadcrumbContainer>
            <Breadcrumb separator=">">
              <ActiveBreadcrumbItem>Questions</ActiveBreadcrumbItem>
            </Breadcrumb>
            <Button
              onClick={() => form.submit()}
              disabled={questionaireLoader}
              type="submit"
              icon={!questionaireLoader ? <PlusOutlined /> : <LoadingOutlined />}
              text={
                questionResponse?.data?.questions?.length
                  ? "Add Next Step Question"
                  : "New Question"
              }
            />
          </BreadcrumbContainer>
          <Row>
            <Col span={8}>
              <Select
                options={templateOptions}
                loading={templateloader}
                initialValue={""}
                requiredMessage={RequiredMessages.TEMPLATETYPE}
                onChange={(_: any, e: any) => handleTemplates(_, e)}
                name="templateType"
                label={t("selectTemplate") || "Select Template"}
                required={true}
                placeholder={t("pleaseSelect") || "Please Select"}
              />
              <Spacer height="25px" />
            </Col>
          </Row>
        </Form>
        {!questionaireLoader ? (
          data?.map((item: any, index: number) => {
            return (
              <>
                {
                  <RecursiveComponent
                    getOptions={getOptions}
                    children={[item]}
                    questionIndex={index}
                    toggleFolder={toggleFolder}
                  />
                }
              </>
            );
          })
        ) : (
          <Flex Align="center" Justify="center" height="200px">
            <Spin />
          </Flex>
        )}
      </>

      <BaseModal
        title={!isQuestionEdit ? "Add Questions" : "Edit Questions"}
        open={openQuestionModal}
        id={template?.id}
        isChildQuestion={isNewQuestion}
        setIsSuccess={setIsSuccess}
        setOpen={setOpenQuestionModal}
        data={editRecord}
        isEdit={isQuestionEdit}
        modalType={ModalList.Questions}
      />
      <BaseModal
        title={!isOptionAdd ? "Add Options" : "Edit Options"}
        open={optionsModal}
        setOpen={setOptionsModal}
        setIsSuccess={setIsSuccess}
        data={editRecord}
        id={template?.id}
        isEdit={isOptionAdd}
        modalType={ModalList.AddOptions}
      />
      <BaseModal
        title="Delete Question"
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        modalType={ModalList.IsConfirm}
        loading={deleteLoader}
        onConfirm={deleteRecords}
      />
      <BaseModal
        title="Delete Option"
        open={openDeleteOptionModal}
        setOpen={setOpenDeleteOptionModal}
        modalType={ModalList.IsConfirm}
        loading={deleteOptionLoader}
        onConfirm={deleteOptions}
      />
      <BaseModal
        title={t("Clone")}
        header="Are you sure, You want to take Clone?"
        open={openCloneModal}
        setOpen={setOpenCloneModal}
        modalType={ModalList.IsConfirm}
        loading={cloneLoader}
        onConfirm={clonedQuestion}
      />
    </>
  );
};

const RecursiveComponent = ({ children, toggleFolder, getOptions, questionIndex }: any) => {
  return (
    <MainQuestion>
      {children?.map((item: any) => {
        return (
          <div style={{ marginLeft: "40px" }}>
            <div>
              {item?.options?.length ? (
                <>
                  <QuestionHeader>
                    <ExpandIcon
                      className={item.isOpen ? "" : "open"}
                      onClick={() => toggleFolder(item)}
                    >
                      <RightOutlined />
                      <span style={{ marginRight: "10px" }}>
                        {!item?.isChild ? `Q${questionIndex + 1}` : ""}{" "}
                      </span>
                      {item.title}
                    </ExpandIcon>
                    {}
                    <div style={{ display: "flex" }}>{getOptions(item)}</div>
                  </QuestionHeader>
                  {item?.options && item?.isOpen && (
                    <>
                      <RecursiveComponent
                        children={item?.options || []}
                        toggleFolder={toggleFolder}
                        getOptions={getOptions}
                      />
                    </>
                  )}
                </>
              ) : (
                <QuestionHeader>
                  <p onClick={() => toggleFolder(item)} style={{ width: "200px" }}>
                    <span style={{ marginRight: "10px" }}>
                      {" "}
                      {!item?.isChild ? `Q${questionIndex + 1}` : ""}
                    </span>{" "}
                    {item.title}
                  </p>
                  <div style={{ display: "flex" }}>{getOptions(item)}</div>
                </QuestionHeader>
              )}
            </div>
          </div>
        );
      })}
    </MainQuestion>
  );
};

export default AccordionExampleNested;

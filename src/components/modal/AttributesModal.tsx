import { Col, Row, Form } from "antd";
import { CloseOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BaseModal, MainContent, ModalList, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import Button from "components/elements/Button";
// import { Flex, Spacer } from "components/SharedStyles";
import { useTranslation } from "react-i18next";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { IconWrapper } from "features/global-code/GlobalCode";
// import { delay } from "utils/Delay";
import ENDPOINTS from "api/endpoints/Endpoints";
import Table from "components/table/Table";
import Toggle from "components/elements/Toggle";
import styled from "styled-components";
import { Flex } from "components/SharedStyles";
import Colors from "styles/Colors";

const ErrorMessage = styled.div`
  color: ${Colors.Red};
  position: absolute;
  bottom: -23px;
`;
const AddOption = styled(Flex)`
  .ant-form-item-label & {
    height: 0;
  }
  .anticon-plus {
    padding: 8px;
    background: #00588b;
    color: #fff;
    border-radius: 50%;
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

const Options = styled.div`
  box-shadow: 0 0 10px #0000002a;
  width: max-content;
  padding: 6px 10px;
  font-size: 16px;
  height: max-content;
  font-weight: 900;
  position: relative;
  min-width: 55px;
  text-align: center;
  border-radius: 8px;

  .anticon-close {
    position: absolute;
    top: -7px;
    right: -9px;
    background: #00588b;
    color: #fff;
    font-size: 13px;
    padding: 3px;
    border-radius: 50%;
  }
`;

const AttributeModalFooter = styled(Flex)`
  padding: 10px 10px 20px;
  border-bottom: 1px solid ${Colors.Grey};
  width: 100%;
`;

const AttributesModal = ({ data, type }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  // const [page, setPage] = useState<number>(1);
  const [refreshResponse, setRefreshResponse] = useState<boolean>(false);
  const [inputData, setInputData] = useState<any>({
    value: "",
    error: false,
  });
  const [dataType, setDataType] = useState<any>("");
  const [editRecord, setEditRecord] = useState<any>(null);
  // const [editAttributeRecord, setEditAttributeRecord] = useState<any>(null);
  // const [searchValue, setSearchValue] = useState<any>("");
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
  const [enterText, setEnterText] = useState<any>([]);
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [attributeType, setAttributeType] = useState<any>("");
  // const [sort, setSort] = useState<any>({
  //   sortBy: "attributeType",
  //   sortType: "desc",
  // });
  const [getAttributesType, { response: attributesTypeList, loading: attributeTypesLoader }] =
    useRequest({
      path: ENDPOINTS.PARENT_GLOBAL_CODE,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });
  const [gettAllAttributes, { response: attributesList, loading: attributesLoader }] = useRequest({
    path: ENDPOINTS.ATTRIBUTE_MODALS,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [getDataTypes, { response: dataTypeList, loading: dataTypeLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [createAttributes, { loading: createAttributesLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.ATTRIBUTE_MODALS,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [updateAttributes, { loading: updateAttributesLoader }] = useRequest({
    path: ENDPOINTS.ATTRIBUTE_MODALS,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });
  const [deleteAttributes, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.ATTRIBUTE_MODALS,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });
  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };
  // const handleChange = (pagination: any, _: any, sorter: any) => {
  //   setPage(pagination.current);
  //   if (Object.keys(sorter).length) {
  //     setSort({
  //       sortBy: sorter.field,
  //       sortType: sorter.order === "ascend" ? "asc" : "desc",
  //     });
  //   }
  // };
  const handleAttributeType = (_: any, e: any) => {
    setAttributeType(e);
  };
  const handleDataType = (_: any, e: any) => {
    setDataType(e);
  };
  const getRequiredStatus = (value: boolean) => {
    setIsRequired(value);
  };
  const addEnterText = () => {
    const text = inputData?.value;
    if (text) {
      setEnterText((old: any) => [...old, text]);
      setInputData("");
      form.setFieldsValue({
        textType: "",
      });
    } else {
      setInputData((old: any) => ({
        ...old,
        error: true,
      }));
    }
  };
  const deleteText = (id: number) => {
    const filteredText = enterText?.filter((_: any, index: number) => index !== id);
    setEnterText(filteredText);
  };
  const deleteRecords = () => {
    const params = {
      attributeModule: type,
      attributeModuleId: data?._id,
    };
    deleteAttributes({
      params,
      id: editRecord?._id,
      onCompleted: () => {
        // if (page > 1 && attributesList?.data?.records?.length === 1) {
        //   setPage(page - 1);
        // } else {
        setRefreshResponse(true);
        // }
        setOpenConfirmDeleteModal(false);
      },
      onError: () => {},
    });
  };
  const handleToggleButton = async (checked: boolean, record: any) => {
    const variables = {
      required: checked ? 1 : 0,
      attributeModule: type,
      attributeModuleId: data?._id,
    };
    updateAttributes({
      variables,
      id: record?._id,
      onCompleted: () => {
        form.resetFields();
        setRefreshResponse(true);
      },
      onError: () => {},
    });
  };
  const handleActions = (record: any) => {
    setAttributeType({ value: record?.attributeTypeName, id: record?.attributeType });
    setDataType({ value: record?.dataTypeName, id: record?.dataType });
    form.setFieldsValue({
      attributeName: record?.attributeName,
      orderNo: record?.orderNo.toString(),
      attributeType: record?.attributeName,
      dataType: record?.dataTypeName,
    });
    setEnterText(record?.options);
    setIsRequired(record?.required);
    setEditRecord(record);
    // setEditAttributeRecord(record);
  };

  const columns = [
    {
      title: t("attributes"),
      dataIndex: "attributeName",
      // sorter: true,
    },
    {
      title: t("attributeType"),
      dataIndex: "attributeTypeName",
      // sorter: true,
    },
    {
      title: t("dataType"),
      dataIndex: "dataTypeName",
      // sorter: true,
    },
    {
      title: t("required"),
      dataIndex: "required",
      render: (required: any, record: any) => (
        <>
          {
            <Toggle
              checked={required}
              onChange={(value: boolean) => handleToggleButton(value, record)}
            />
          }
        </>
      ),
      // sorter: true,
    },
    {
      title: t("orderNo"),
      dataIndex: "orderNo",
      // sorter: true,
    },
    {
      title: t("actions"),
      dataIndex: "action",
      render: (_: any, record: any) => (
        <>
          <IconWrapper>
            <EditOutlined onClick={() => handleActions(record)} title="Edit" />
            <DeleteOutlined onClick={() => handleDeleteAction(record)} title="Delete" />
          </IconWrapper>
        </>
      ),
    },
  ];
  const onFinish = (values: any) => {
    const variables: any = {
      attributeName: values?.attributeName,
      orderNo: Number(values?.orderNo) || null,
      attributeType: attributeType?.id || "",
      dataType: dataType?.id || "",
      options: enterText,
      attributeModule: type,
      required: isRequired ? 1 : 0,
    };
    if (editRecord) {
      variables.attributeModuleId = data?._id;
      updateAttributes({
        variables,
        id: editRecord?._id,
        onCompleted: () => {
          setEditRecord("");
          form.resetFields();
          setEnterText([]);
          setAttributeType("");
          setDataType("");
          setRefreshResponse(true);
        },
        onError: () => {},
      });
    } else {
      createAttributes({
        id: data?._id,
        variables,
        onCompleted: () => {
          form.resetFields();
          setEditRecord("");
          setAttributeType("");
          setDataType("");
          setEnterText([]);
          setRefreshResponse(true);
        },
        onError: () => {},
      });
    }
  };
  const handleText = (e: any) => {
    const value = e.target.value;
    setInputData({
      value: value,
      error: !value ? true : false,
    });
  };
  // const handleSearch = (event: any) => {
  //   setSearchValue(event.target.value);
  //   setPage(1);
  // };
  // const search = delay(handleSearch);
  useEffect(() => {
    const params = {
      // page: page,
      // perPage: Pagination.PAGESIZE,
      // sortBy: sort.sortBy,
      // sortType: sort.sortType,
      attributeModule: type,
    };
    // if (searchValue) {
    //   params.search = searchValue;
    // }
    gettAllAttributes({
      params,
      id: data?._id,
      onCompleted: () => {},
      onError: () => {},
    });
    setRefreshResponse(false);
  }, [refreshResponse]);

  useEffect(() => {
    getAttributesType({
      id: "hECQsZbCq",
      onCompleted: () => {},
      onError: () => {},
    });
    getDataTypes({
      id: "dovEydnKI",
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);
  let attributeOptions: any = [];
  if (attributesTypeList) {
    attributeOptions = attributesTypeList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.codeName,
      };
    });
    attributeOptions.unshift({ label: "Please Select Attribute Type", value: "" });
  }
  let dataTypeOptions: any = [];

  if (dataTypeList) {
    dataTypeOptions = dataTypeList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.codeName,
      };
    });
    dataTypeOptions.unshift({ label: "Please Select Data Type", value: "" });
  }

  return (
    <>
      <ModalWidth width="900px">
        <MainContent>
          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input
                  name="attributeName"
                  label={t("attributes") || "Attribute"}
                  requiredMessage={RequiredMessages.ATTRIBUTE}
                  required={true}
                  placeholder={t("attributes") || "Attribute"}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="orderNo"
                  type="number"
                  label={t("orderNo") || "Order No"}
                  placeholder={t("orderNo") || "Order No"}
                />
              </Col>
              <Col span={12}>
                <Select
                  name="attributeType"
                  value={attributeType?.value}
                  defaultValue=""
                  loading={attributeTypesLoader}
                  label={t("attributeType") || "Attribute Type"}
                  onChange={(_: any, e: any) => handleAttributeType(_, e)}
                  // placeholder={t("pleaseSelectAttributeType") || "Please Select Attribute Type"}
                  options={attributeOptions}
                />
              </Col>
              <Col span={9}>
                <Select
                  name="dataType"
                  value={dataType?.value}
                  defaultValue=""
                  onChange={(_: any, e: any) => handleDataType(_, e)}
                  label={t("dataType") || "Data Type"}
                  // placeholder="Please Select"
                  loading={dataTypeLoader}
                  options={dataTypeOptions}
                />
              </Col>
              <Col span={3}>
                <Form.Item
                  name="required"
                  label={t("required") || "Required"}
                  initialValue={data?.isChecked}
                >
                  <Toggle
                    onChange={getRequiredStatus}
                    checked={isRequired}
                    style={{ paddingLeft: "10px" }}
                  />
                </Form.Item>
              </Col>
              {attributeType?.value?.length ? (
                <>
                  <Col span={13}>
                    <AddOption Align="end" style={{ position: "relative" }}>
                      <Input placeholder="Enter Text" name="textType" onChange={handleText} />
                      <PlusOutlined onClick={addEnterText} />
                      {inputData?.error && (
                        <ErrorMessage>{RequiredMessages?.ENTERTEXT}</ErrorMessage>
                      )}
                    </AddOption>
                  </Col>
                  <Col span={24}>
                    <Flex gap="20px">
                      {enterText?.length
                        ? enterText?.map((item: string, index: number) => {
                            return (
                              <>
                                <Options>
                                  {item}
                                  <CloseOutlined onClick={() => deleteText(index)} />
                                </Options>
                              </>
                            );
                          })
                        : ""}
                    </Flex>
                  </Col>
                </>
              ) : (
                ""
              )}
              <Col span={24}>
                <Form.Item>
                  <AttributeModalFooter Justify="end" gap="10px">
                    <Button variant={"default"} text={t("clear")} type="reset" />
                    <Button
                      text={editRecord ? t("update") : t("submit")}
                      loading={createAttributesLoader}
                      type="submit"
                    />
                  </AttributeModalFooter>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          {/* <Row>
            <Col span={10} offset={14}>
              <Flex>
                <Input
                  placeholder={t("enterTextToSearch") || "Enter text to search"}
                  onChange={search}
                />
              </Flex>
              <Spacer />
            </Col>
          </Row> */}
          <Col span={24}>
            <Table
              dataSource={attributesList?.data?.attributes}
              columns={columns}
              loading={attributesLoader || updateAttributesLoader}
              // onChange={handleChange}
              // sortDirections={["descend", "ascend", "descend"]}
              showSorterTooltip={false}
              // pagination={{
              //   current: page,
              //   total: attributesList?.data?.pagination?.total,
              // }}
            />
          </Col>
        </MainContent>
      </ModalWidth>
      <BaseModal
        title={t("delete")}
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        modalType={ModalList.IsConfirm}
        loading={deleteLoader}
        onConfirm={deleteRecords}
      />
    </>
  );
};

export default AttributesModal;

import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Table, { Pagination } from "components/table/Table";
import { BreadcrumbContainer, BreadcrumbItem, Flex } from "components/SharedStyles";
import { useState, useEffect } from "react";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { delay } from "utils/Delay";
import Toggle from "components/elements/Toggle";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";

const Stages = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [stagesModalOpen, setStagesModalOpen] = useState<boolean>(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "stageTitle",
    sortType: "desc",
  });

  const [getAllStages, { response: stageResponse, loading: stageLoader }] = useRequest({
    path: ENDPOINTS.STAGE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [updateStage, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.STAGE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteStage, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.STAGE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });

  const handleActions = (record: any) => {
    setEditRecord(record);
    setStagesModalOpen(true);
  };

  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };

  const handleChange = (pagination: any, _: any, sorter: any) => {
    setPage(pagination.current);
    if (Object.keys(sorter).length) {
      setSort({
        sortBy: sorter.field,
        sortType: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };

  const handleToggleButton = async (checked: boolean, record: any) => {
    const variables = {
      stageTitle: record?.stageTitle,
      description: record?.description,
      status: checked ? 1 : 0,
    };
    updateStage({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const search = delay(handleSearch);
  useEffect(() => {
    const params: any = {
      page: page,
      perPage: Pagination.PAGESIZE,
      sortBy: sort.sortBy,
      sortType: sort.sortType,
    };
    if (searchValue) {
      params.search = searchValue;
    }
    getAllStages({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const deleteRecords = () => {
    deleteStage({
      variables: editRecord,
      id: editRecord?._id,
      onCompleted: () => {
        if (page > 1 && stageResponse?.data?.records?.length === 1) {
          setPage(page - 1);
        } else {
          setIsSuccess(true);
        }
        setOpenConfirmDeleteModal(false);
      },
      onError: () => {},
    });
  };

  const columns = [
    {
      title: t("stage"),
      dataIndex: "stageTitle",
      sorter: true,
    },
    {
      title: t("description"),
      dataIndex: "description",
      sorter: true,
    },
    {
      title: t("status"),
      dataIndex: "status",
      sorter: true,
      render: (status: number, record: any) => (
        <>
          {
            <Toggle
              checked={status == 1 ? true : false}
              onChange={(value: boolean) => handleToggleButton(value, record)}
            />
          }
        </>
      ),
    },
    {
      title: t("actions"),
      render: (_: any, record: any) => (
        <>
          <IconWrapper gap="5px">
            <EditOutlined onClick={() => handleActions(record)} title="Edit" />
            <DeleteOutlined title="Delete" onClick={() => handleDeleteAction(record)} />
          </IconWrapper>
        </>
      ),
    },
  ];

  const addStages = () => {
    setEditRecord("");
    setStagesModalOpen(true);
  };

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
          <BreadcrumbItem>{t("stage")}</BreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addStages} />
        </Flex>
      </BreadcrumbContainer>
      {/* <Row>
        <Col span={10} offset={14}>
          <Flex>
            <Input
              placeholder={t("enterTextToSearch") || "Enter text to search"}
              onChange={search}
              suffix={<SearchOutlined />}
            />
            <Button text={t("add")} icon={<PlusOutlined />} onClick={addStages} />
          </Flex>
          <Spacer />
        </Col>
      </Row> */}
      <Table
        columns={columns}
        dataSource={stageResponse?.data?.records}
        onChange={handleChange}
        loading={stageLoader || updateLoader}
        sortDirections={["descend", "ascend", "descend"]}
        showSorterTooltip={false}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: stageResponse?.data?.pagination?.total,
          hideOnSinglePage: true,
        }}
      />
      <BaseModal
        title={editRecord ? t("editJobStages") : t("addJobStages")}
        open={stagesModalOpen}
        setIsSuccess={setIsSuccess}
        setOpen={setStagesModalOpen}
        modalType={ModalList.Stages}
        data={editRecord}
      />
      <BaseModal
        title="Attributes"
        open={isAttributeModalOpen}
        setOpen={setIsAttributeModalOpen}
        modalType={ModalList.Attributes}
        data={editRecord}
      />
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

export default Stages;

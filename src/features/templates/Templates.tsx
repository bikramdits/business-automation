import { Col, Row } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CopyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import {
  ActiveBreadcrumbItem,
  AttributeIcon,
  Breadcrumb,
  BreadcrumbContainer,
  Flex,
} from "components/SharedStyles";
import Table, { Pagination } from "components/table/Table";
import { useEffect, useState } from "react";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { delay } from "utils/Delay";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [editRecord, setEditRecord] = useState<any>();
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openCloneModal, setOpenCloneModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "machines",
    sortType: "desc",
  });
  const navigate = useNavigate();

  const [getAllTemplate, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  console.log("listResponse", listResponse);

  const [updateTemplate, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteTemplate, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.TEMPLATE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });

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

    getAllTemplate({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };

  const handleCloneAction = (record: any) => {
    setEditRecord(record);
    setOpenCloneModal(true);
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
      ...record,
      status: checked ? 1 : 0,
    };
    updateTemplate({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  const handleUsers = (record: any) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  const addTemplateDetails = () => {
    setEditRecord("");
    setIsModalOpen(true);
  };

  const deleteRecords = () => {
    deleteTemplate({
      variables: editRecord,
      id: editRecord?._id,
      onCompleted: () => {
        if (page > 1 && listResponse?.data?.records?.length === 1) {
          setPage(page - 1);
        } else {
          setIsSuccess(true);
        }
        setOpenConfirmDeleteModal(false);
      },
      onError: () => {},
    });
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const search = delay(handleSearch);
  const addQuestions = (item: any) => {
    if (item?.status) {
      navigate(`/questions?id=${item?._id}`);
    }
  };
  const columns = [
    {
      title: t("jobStage"),
      dataIndex: "jobStagesName",
      sorter: true,
    },
    {
      title: t("templateCode"),
      dataIndex: "code",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("templateName"),
      dataIndex: "name",
      sorter: true,
    },
    {
      title: t("machineType"),
      dataIndex: "machineTypeName",
      sorter: true,
    },
    {
      title: t("machineName"),
      dataIndex: "machineName",
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
              checked={status}
              onChange={(value: boolean) => handleToggleButton(value, record)}
            />
          }
        </>
      ),
    },
    {
      title: t("actions"),
      ellipsis: true,
      render: (_: any, record: any) => {
        return (
          <>
            <IconWrapper>
              <EditOutlined title="Edit" onClick={() => handleUsers(record)} />
              <DeleteOutlined title="Delete" onClick={() => handleDeleteAction(record)} />
              <CopyOutlined title="Clone" onClick={() => handleCloneAction(record)} />
              <AttributeIcon
                className={!record?.status ? "fadedBtn" : ""}
                title="Add Questions"
                onClick={() => addQuestions(record)}
              >
                <PlusOutlined />
                <span>{t("questions")}</span>
              </AttributeIcon>
            </IconWrapper>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <BreadcrumbContainer>
            <Breadcrumb separator=">">
              <ActiveBreadcrumbItem>{t("templateManagement")}</ActiveBreadcrumbItem>
            </Breadcrumb>
            <Flex minWidth="430px">
              <Input
                placeholder={t("enterTextToSearch") || "Enter text to search"}
                onChange={search}
                suffix={<SearchOutlined />}
              />
              <Button text={t("add")} icon={<PlusOutlined />} onClick={addTemplateDetails} />
            </Flex>
          </BreadcrumbContainer>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={listResponse?.data?.records}
            onChange={handleChange}
            loading={listLoader || updateLoader}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            pagination={{
              defaultCurrent: 1,
              current: page,
              total: listResponse?.data?.pagination?.total,
              hideOnSinglePage: true,
            }}
          />
        </Col>
      </Row>
      <BaseModal
        title={editRecord ? t("editTemplates") : t("addTemplates")}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.Templates}
        data={editRecord}
        setIsSuccess={setIsSuccess}
      />

      <BaseModal
        title={t("cloneTemplate")}
        open={openCloneModal}
        setOpen={setOpenCloneModal}
        modalType={ModalList.CloneTemplate}
        data={editRecord}
        setIsSuccess={setIsSuccess}
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

export default Templates;

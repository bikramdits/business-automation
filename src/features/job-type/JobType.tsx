import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Button from "components/elements/Button";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Table, { Pagination } from "components/table/Table";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import { IconWrapper } from "features/global-code/GlobalCode";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { delay } from "utils/Delay";
import { format } from "utils/Date";
import { useTranslation } from "react-i18next";

const JobType = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllJobTypes, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.JOB_TYPES,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [updateJobType, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.JOB_TYPES,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteJobType, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.JOB_TYPES,
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

    getAllJobTypes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const handleActions = (record: any) => {
    setEditRecord(record);
    setIsModalOpen(true);
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
      jobType: record?.jobType,
      description: record?.description,
      status: checked ? 1 : 0,
    };
    updateJobType({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  const deleteRecords = () => {
    deleteJobType({
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

  const columns = [
    {
      title: t("jobTypes"),
      dataIndex: "jobType",
      sorter: true,
    },
    {
      title: t("description"),
      dataIndex: "description",
      sorter: true,
      ellipsis: true,
      // width: 80,
    },
    {
      title: t("createdAt"),
      dataIndex: "createdAt",
      defaultSortOrder: "descend",
      sorter: true,
      render: (createdAt: any) => <>{format(createdAt)}</>,
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
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <>
          <IconWrapper>
            <EditOutlined onClick={() => handleActions(record)} title="Edit" />
            <DeleteOutlined title="Delete" onClick={() => handleDeleteAction(record)} />
          </IconWrapper>
        </>
      ),
    },
  ];
  const addJobType = () => {
    setEditRecord("");
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("jobType")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button
            text={t("add")}
            height="38px"
            icon={<PlusOutlined />}
            onClick={() => addJobType()}
          />
        </Flex>
      </BreadcrumbContainer>

      <Table
        columns={columns}
        dataSource={listResponse?.data?.records}
        onChange={handleChange}
        loading={listLoader || updateLoader}
        sortDirections={["descend", "ascend", "descend"]}
        showSorterTooltip={false}
        pagination={{
          current: page,
          total: listResponse?.data?.pagination?.total,
        }}
      />

      <BaseModal
        title={editRecord ? t("editJobTypes") : t("addNewJobType")}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.JobType}
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

export default JobType;

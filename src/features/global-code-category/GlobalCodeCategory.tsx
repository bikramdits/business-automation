import { useEffect, useState } from "react";
import Input from "components/elements/Input";
import { Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import { format } from "../../utils/Date";
import Table, { Pagination } from "components/table/Table";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { delay } from "utils/Delay";
import Toggle from "components/elements/Toggle";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";

const GlobalCodeCategory = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllCategoryCodes, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [updateCategoryCodes, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });
  const [deleteCategoryCodes, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });

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
      status: checked ? 1 : 0,
      categoryName: record?.categoryName,
      description: record?.description,
    };
    updateCategoryCodes({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  const handleActions = (record: any) => {
    setisModalOpen(true);
    setEditRecord(record);
  };
  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };

  const columns = [
    {
      title: t("categoryName"),
      dataIndex: "categoryName",
      sorter: true,
    },
    {
      title: t("description"),
      dataIndex: "description",
      sorter: true,
    },
    {
      title: t("createdAt"),
      dataIndex: "createdAt",
      sorter: true,
      defaultSortOrder: "descend",
      render: (createdAt: any) => <>{format(createdAt)}</>,
    },
    {
      title: t("status"),
      dataIndex: "status",
      sorter: true,
      render: (status: number, record: any) => (
        <Toggle
          checked={status == 1 ? true : false}
          onChange={(value: boolean) => handleToggleButton(value, record)}
        />
      ),
    },
    {
      title: t("actions"),
      dataIndex: "action",
      render: (_: any, record: any) => (
        <>
          <IconWrapper>
            <EditOutlined onClick={() => handleActions(record)} /> {"   "}
            <DeleteOutlined onClick={() => handleDeleteAction(record)} />
          </IconWrapper>
        </>
      ),
    },
  ];

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    setPage(1);
  };
  const search = delay(handleSearch);

  const deleteRecords = () => {
    deleteCategoryCodes({
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
  const addGlobalCodeCategory = () => {
    setisModalOpen(true);
    setEditRecord("");
  };
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

    getAllCategoryCodes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem>{t("templateManagement")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("globalCodeCategory")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addGlobalCodeCategory} />
        </Flex>
      </BreadcrumbContainer>
      <Row>
        <Col span={24}>
          <Table
            dataSource={listResponse?.data?.records}
            columns={columns}
            onChange={handleChange}
            loading={listLoader || updateLoader}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            pagination={{
              current: page,
              total: listResponse?.data?.pagination?.total,
            }}
          />
        </Col>
      </Row>
      <BaseModal
        title={editRecord ? t("editGlobalCodeCategory") : t("addGlobalCodeCategory")}
        open={isModalOpen}
        setOpen={setisModalOpen}
        modalType={ModalList.GlobalCategoryCode}
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

export default GlobalCodeCategory;

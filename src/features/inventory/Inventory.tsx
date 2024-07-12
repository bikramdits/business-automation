import { Breadcrumb, Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Button from "components/elements/Button";
import { useEffect, useState } from "react";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Table, { Pagination } from "components/table/Table";
import {
  ActiveBreadcrumbItem,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import { format } from "../../utils/Date";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { delay } from "utils/Delay";

const Inventory = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllInventory, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.INVENTORY,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [updateInventory] = useRequest({
    path: ENDPOINTS.INVENTORY,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteInventory, { loading: inventoryLoader }] = useRequest({
    path: ENDPOINTS.INVENTORY,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });

  const handleActions = (record: any) => {
    setEditRecord(record);
    setisModalOpen(true);
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
    updateInventory({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };

  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };

  const deleteRecords = () => {
    deleteInventory({
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
    getAllInventory({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const columns: any = [
    {
      title: t("stockCode"),
      dataIndex: "stockCode",
      sorter: (a: any, b: any) => a.stockCode - b.stockCode,
    },
    {
      title: t("stockName"),
      dataIndex: "stockName",
      sorter: (a: any, b: any) => a.stockName - b.stockName,
    },
    {
      title: t("part"),
      dataIndex: "part",
      sorter: (a: any, b: any) => a.part - b.part,
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
      ellipsis: true,
      render: (_: any, record: any) => (
        <>
          <IconWrapper>
            <EditOutlined onClick={() => handleActions(record)} />
            <DeleteOutlined onClick={() => handleDeleteAction(record)} />
          </IconWrapper>
        </>
      ),
    },
  ];
  const addInventory = () => {
    setEditRecord("");
    setisModalOpen(true);
  };

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem>{t("home")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("inventory")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addInventory} />
        </Flex>
      </BreadcrumbContainer>

      <Row>
        <Col span={24}>
          <Table
            dataSource={listResponse?.data?.records}
            columns={columns}
            onChange={handleChange}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            loading={listLoader}
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
        title={editRecord ? t("editInventory") : t("addInventory")}
        open={isModalOpen}
        setOpen={setisModalOpen}
        modalType={ModalList.Inventory}
        data={editRecord}
        setIsSuccess={setIsSuccess}
      />
      <BaseModal
        title={t("delete")}
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        modalType={ModalList.IsConfirm}
        loading={inventoryLoader}
        onConfirm={deleteRecords}
      />
    </>
  );
};

export default Inventory;

import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ApiOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Table, { Pagination } from "components/table/Table";
import {
  ActiveBreadcrumbItem,
  AttributeIcon,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import { delay } from "utils/Delay";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import { format } from "utils/Date";
import ENDPOINTS from "api/endpoints/Endpoints";

const Machines = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isMachinesModalOpen, setIsMachinesModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });
  const [getAllMachines, { response: machineList, loading: machinesLoader }] = useRequest({
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [updateMachine, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });
  const [deleteMachine, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.MACHINES,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });

  const handleActions = (record: any) => {
    setEditRecord(record);
    setIsMachinesModalOpen(true);
  };
  const handleAttributes = (record: any) => {
    setEditRecord(record);
    setIsAttributeModalOpen(true);
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
  const handleDeleteAction = (record: any) => {
    setEditRecord(record);
    setOpenConfirmDeleteModal(true);
  };
  const deleteRecords = () => {
    deleteMachine({
      id: editRecord?._id,
      onCompleted: () => {
        if (page > 1 && machineList?.data?.records?.length === 1) {
          setPage(page - 1);
        } else {
          setIsSuccess(true);
        }
        setOpenConfirmDeleteModal(false);
      },
      onError: () => {},
    });
  };

  const handleToggleButton = async (checked: boolean, record: any) => {
    const variables = {
      ...record,
      status: checked ? 1 : 0,
    };
    updateMachine({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };
  const columns = [
    {
      title: t("machine"),
      dataIndex: "machineName",
      sorter: true,
    },
    {
      title: t("machineTypes"),
      dataIndex: "machineType",
      // sorter: true,
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
      render: (status: any, record: any) => (
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
          <IconWrapper>
            <EditOutlined onClick={() => handleActions(record)} title="Edit" />
            <DeleteOutlined title="Delete" onClick={() => handleDeleteAction(record)} />
            <AttributeIcon onClick={() => handleAttributes(record)}>
              <ApiOutlined />
              <span>{record?.attributesCount || 0}</span>
            </AttributeIcon>
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
  const addMachines = () => {
    setEditRecord("");
    setIsMachinesModalOpen(true);
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

    getAllMachines({
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
          <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("machines")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addMachines} />
        </Flex>
      </BreadcrumbContainer>
      <Row>
        <Col span={24}>
          <Table
            dataSource={machineList?.data?.records}
            columns={columns}
            loading={machinesLoader || updateLoader}
            onChange={handleChange}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            pagination={{
              total: machineList?.data?.pagination?.total,
              hideOnSinglePage: true,
            }}
          />
        </Col>
      </Row>
      <BaseModal
        title={editRecord ? t("editMachine") : t("addMachine")}
        open={isMachinesModalOpen}
        setOpen={setIsMachinesModalOpen}
        modalType={ModalList.Machines}
        data={editRecord}
        setIsSuccess={setIsSuccess}
      />
      <BaseModal
        title={t("attributes")}
        open={isAttributeModalOpen}
        setOpen={setIsAttributeModalOpen}
        modalType={ModalList.Attributes}
        data={editRecord}
        type="machines"
        onClose={() => setIsSuccess(true)}
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

export default Machines;

import {
  EditOutlined,
  DeleteOutlined,
  ApiOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Table, { Pagination } from "components/table/Table";
import {
  ActiveBreadcrumbItem,
  AttributeIcon,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import { useEffect, useState } from "react";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { delay } from "utils/Delay";
import { format } from "utils/Date";
import Toggle from "components/elements/Toggle";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";

const Segments = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState<boolean>(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllSegment, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  console.log("listResponse", listResponse);

  const [updateSegment, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.SEGMENT,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const [deleteSegment, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.SEGMENT,
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

    getAllSegment({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const handleActions = (record: any) => {
    setEditRecord(record);
    setIsSegmentModalOpen(true);
  };
  const handleAttributes = (record: any) => {
    setEditRecord(record);
    setIsAttributeModalOpen(true);
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
      status: checked ? 1 : 0,
      machinesId: record?.id,
      segment: record?.segment,
      parentSegmentId: record?.id,
      description: record?.description,
    };
    updateSegment({
      id: record?._id,
      variables,
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => {},
    });
  };
  const addSegmentDetails = () => {
    setEditRecord("");
    setIsSegmentModalOpen(true);
  };

  const deleteRecords = () => {
    deleteSegment({
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
      title: t("machine"),
      dataIndex: "machines",
      // sorter: true,
    },
    {
      title: t("segments"),
      dataIndex: "segment",
      sorter: true,
    },
    {
      title: t("parentSegments"),
      dataIndex: "parentSegment",
      // sorter: true,
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
              checked={status}
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
          <IconWrapper Justify="center" gap="5px">
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

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("segments")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addSegmentDetails} />
        </Flex>
      </BreadcrumbContainer>
      <Row>
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
        title={editRecord ? t("editSegments") : t("addSegments")}
        open={isSegmentModalOpen}
        setOpen={setIsSegmentModalOpen}
        modalType={ModalList.Segments}
        data={editRecord}
        setIsSuccess={setIsSuccess}
      />
      <BaseModal
        title={t("attributes")}
        open={isAttributeModalOpen}
        setOpen={setIsAttributeModalOpen}
        modalType={ModalList.Attributes}
        data={editRecord}
        onClose={() => setIsSuccess(true)}
        type="segment"
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

export default Segments;

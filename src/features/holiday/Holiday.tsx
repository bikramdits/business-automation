import { Col, Row } from "antd";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import {
  Breadcrumb,
  Flex,
  ActiveBreadcrumbItem,
  BreadcrumbContainer,
  BreadcrumbItem,
} from "components/SharedStyles";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Table, { Pagination } from "components/table/Table";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { delay } from "utils/Delay";
import { format } from "utils/Date";

export const TableWrapper = styled.div``;

// const fakejson = [
//   {
//     occassion: "Fest",
//     date: "12/12/2022",
//     description: "Reference site about Lorem Ipsum, giving information on its origins",
//   },
//   {
//     occassion: "Fest 2",
//     date: "02/02/2012",
//     description: "Reference information on its origins ",
//   },
// ];
const Holiday = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "date",
    sortType: "desc",
  });

  const [getAllHoliday, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.HOLIDAY,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  // const [updateHoliday, { loading: updateLoader }] = useRequest({
  //   path: ENDPOINTS.HOLIDAY,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.PUT,
  // });

  const [deleteHoliday, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.HOLIDAY,
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

    getAllHoliday({
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

  const deleteRecords = () => {
    deleteHoliday({
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
      title: t("ocassion"),
      dataIndex: "occassion",
      sorter: true,
    },
    {
      title: t("date"),
      dataIndex: "date",
      sorter: true,
      defaultSortOrder: "descend",
      render: (date: any) => <>{format(date)}</>,
    },
    {
      title: t("description"),
      dataIndex: "description",
      sorter: true,
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <>
          <IconWrapper>
            <EditOutlined title="Edit" onClick={() => handleActions(record)} />
            <DeleteOutlined title="Delete" onClick={() => handleDeleteAction(record)} />
          </IconWrapper>
        </>
      ),
    },
  ];

  const addHoliday = () => {
    setEditRecord("");
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("BECHolidays")} </BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("addAHoliday")} </ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={() => addHoliday()} />
        </Flex>
      </BreadcrumbContainer>

      <TableWrapper>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={listResponse?.data?.records}
              onChange={handleChange}
              loading={listLoader}
              sortDirections={["descend", "ascend", "descend"]}
              showSorterTooltip={false}
              pagination={{
                current: page,
                total: listResponse?.data?.pagination?.total,
              }}
            />
          </Col>
        </Row>
      </TableWrapper>

      <BaseModal
        title={editRecord ? t("editAHoliday") : t("addAHoliday")}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.Holiday}
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

export default Holiday;

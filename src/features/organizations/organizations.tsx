import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import { BreadcrumbContainer, BreadcrumbItem, Flex } from "components/SharedStyles";
import Table, { Pagination } from "components/table/Table";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useEffect, useState } from "react";
// import { format } from "utils/Date";
import { delay } from "utils/Delay";
import { useTranslation } from "react-i18next";

const Organization = () => {
  const { t } = useTranslation();
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllOrganizations, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.ORGANIZATIONS,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  //   const [updateOrganizations, { loading: updateLoader }] = useRequest({
  //     path: ENDPOINTS.ORGANIZATIONS,
  //     errorToast: true,
  //     successToast: true,
  //     method: HTTP_METHODS.PUT,
  //   });

  //   const [deleteOrganizations, { loading: deleteLoader }] = useRequest({
  //     path: ENDPOINTS.ORGANIZATIONS,
  //     errorToast: true,
  //     successToast: true,
  //     method: HTTP_METHODS.DELETE,
  //   });

  const handleActions = (record: any) => {
    setEditRecord(record);
    setIsOrganizationModalOpen(true);
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

  const addOrganizations = () => {
    setEditRecord("");
    setIsOrganizationModalOpen(true);
  };

  //   const deleteRecords = () => {
  //     deleteOrganizations({
  //       variables: editRecord,
  //       id: editRecord?._id,
  //       onCompleted: () => {
  //         if (page > 1 && listResponse?.data?.records?.length === 1) {
  //           setPage(page - 1);
  //           //   const addOrganizations = () => {
  //           //     setEditRecord("");
  //           //     setIsOrganizationModalOpen(true);
  //           //   };
  //         }
  //       },
  //     });
  //   };

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
    getAllOrganizations({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
    setIsSuccess(false);
  }, [page, sort, searchValue, isSuccess]);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      sorter: true,
      // width: "200",
    },
    {
      title: "Email",
      dataIndex: "organizationemail",
      sorter: true,
      // width: "200",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      sorter: true,
      // width: "200",
    },
    // {
    //   title: "City",
    //   dataIndex: "city",
    //   sorter: true,
    // },
    // {
    //   title: "State",
    //   dataIndex: "state",
    //   sorter: true,
    // },
    // {
    //   title: "City",
    //   dataIndex: "city",
    //   sorter: true,
    // },
    // {
    //   title: "State",
    //   dataIndex: "state",
    //   sorter: true,
    // },
    // {
    //   title: "Country",
    //   dataIndex: "country",
    //   sorter: true,
    // },
    // {
    //   title: "Zipcode",
    //   dataIndex: "zipcode",
    //   sorter: true,
    // },
    //   title: "Country",
    //   dataIndex: "country",
    //   sorter: true,
    // },
    // {
    //   title: "Zipcode",
    //   dataIndex: "zipcode",
    //   sorter: true,
    // },
    {
      title: t("actions"),
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

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          {/* <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem> */}
          <BreadcrumbItem>{"Organizations"}</BreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} icon={<PlusOutlined />} onClick={addOrganizations} />
        </Flex>
      </BreadcrumbContainer>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            loading={listLoader}
            dataSource={listResponse?.data?.records}
            onChange={handleChange}
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
        title={editRecord ? t("editOrganizations") : "Add Organizations"}
        open={isOrganizationModalOpen}
        setOpen={setIsOrganizationModalOpen}
        modalType={ModalList.Organizations}
        data={editRecord}
        setIsSuccess={setIsSuccess}
      />

      <BaseModal
        title={t("delete")}
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        modalType={ModalList.IsConfirm}
        // loading={deleteLoader}
        // onConfirm={deleteRecords}
      />
    </>
  );
};

export default Organization;

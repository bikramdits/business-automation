import { Col, Row } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Table from "components/table/Table";
import {
  Badge,
  InactiveBadge,
  Flex,
  BreadcrumbContainer,
  Breadcrumb,
  ActiveBreadcrumbItem,
} from "components/SharedStyles";
import Input from "components/elements/Input";
import Button from "components/elements/Button";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import { format } from "../../utils/Date";

const fakeJson = [
  {
    userName: "AmeerAdmin",
    firstName: "Ameer",
    lastName: "	Supervisor",
    position: "Administrator",
    userType: "Electrical",
    createdOn: "	17/08/2019",
    status: true,
  },
  {
    userName: "AmeerAdmin",
    firstName: "Ameer",
    lastName: "	Supervisor",
    position: "Administrator",
    userType: "Electrical",
    createdOn: "	17/08/2019",
    status: true,
  },
  {
    userName: "Faisal Technician",
    firstName: "Faisal",
    lastName: "	Technician",
    position: "Technician",
    userType: "Electrical",
    createdOn: "	04/01/2023",
    status: false,
  },
  {
    userName: "AmeerAdmin",
    firstName: "Ameer",
    lastName: "	Supervisor",
    position: "Administrator",
    userType: "Electrical",
    createdOn: "	17/08/2019",

    status: true,
  },
  {
    userName: "Faisal Technician",
    firstName: "Faisal",
    lastName: "	Technician",
    position: "Technician",
    userType: "Electrical",
    createdOn: "	04/01/2023",
    status: false,
  },
];

const Users = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [editRecord, setEditRecord] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [stagesModalOpen, setStagesModalOpen] = useState<boolean>(false);
  // const [isAttributeModalOpen, setIsAttributeModalOpen] = useState<boolean>(false);
  // const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  // const [page, setPage] = useState<number>(1);
  // const [searchValue, setSearchValue] = useState<any>("");
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [sort, setSort] = useState<any>({
  //   sortBy: "stageTitle",
  //   sortType: "desc",
  // });

  const handleChange = (pagination: any) => {
    setPage(pagination.current);
  };
  const handleUsers = (record: any) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  // const [getAllUsers, { response: userResponse, loading: userLoader }] = useRequest({
  //   path: ENDPOINTS.USER,
  //   errorToast: true,
  //   method: HTTP_METHODS.GET,
  // });

  // const [updateUsers, { loading: updateUserLoader }] = useRequest({
  //   path: ENDPOINTS.USER,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.PUT,
  // });

  // const [deleteUsers, { loading: deleteUserLoader }] = useRequest({
  //   path: ENDPOINTS.USER,
  //   errorToast: true,
  //   successToast: true,
  //   method: HTTP_METHODS.DELETE,
  // });

  // const handleToggleButton = async (checked: boolean, record: any) => {
  // const variables = {
  //   userName: record?.userName,
  //   password: record?.password,
  //   firstName: record?.firstName,
  //   lastName: record?.lastName,
  //   email: record?.email,
  //   position: record?.position,
  //   userType: record?.userType,
  //   roles: record?.roles,
  //   status: isChecked ? 1 : 0,
  // };

  //   updateUsers({
  //     id: record?._id,
  //     variables,
  //     onCompleted: () => {
  //       setIsSuccess(true);
  //     },
  //     onError: () => {},
  //   });
  // };

  // const handleDeleteAction = (record: any) => {
  //   setEditRecord(record);
  //   setOpenConfirmDeleteModal(true);
  // };

  const columns = [
    {
      title: t("userName"),
      dataIndex: "userName",
      sorter: true,
    },
    {
      title: t("firstName"),
      dataIndex: "firstName",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("lastName"),
      dataIndex: "lastName",
      sorter: true,
    },
    {
      title: t("position"),
      dataIndex: "position",
      sorter: true,
    },
    {
      title: t("userType"),
      dataIndex: "userType",
      sorter: true,
    },
    {
      title: t("createdOn"),
      dataIndex: "createdOn",
      defaultSortOrder: "descend",
      sorter: true,
      render: (createdAt: any) => <>{format(createdAt)}</>,
    },
    {
      title: t("status"),
      dataIndex: "status",
      sorter: true,
      render: (status: boolean) => (
        <>{status ? <Badge>Active</Badge> : <InactiveBadge>Inactive</InactiveBadge>}</>
        //  render: (status: number, record: any)
        //      <Toggle checked={status == 1 ? true : false}
        //       onChange={(value: boolean) => handleToggleButton(value, record)}
        //     />
      ),
    },
    {
      title: t("actions"),
      ellipsis: true,
      render: (_: any, record: any) => {
        return (
          <>
            <IconWrapper>
              <EditOutlined onClick={() => handleUsers(record)} title="Edit" />
              <DeleteOutlined title="Delete" />
            </IconWrapper>
          </>
        );
      },
    },
  ];
  const addDetails = () => {
    setEditRecord("");
    setIsModalOpen(true);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <BreadcrumbContainer>
            <Breadcrumb separator=">">
              <ActiveBreadcrumbItem>{t("users")}</ActiveBreadcrumbItem>
            </Breadcrumb>
            <Flex minWidth="430px">
              <Input
                placeholder={t("enterTextToSearch") || "Enter text to search"}
                onChange={() => {}}
                suffix={<SearchOutlined />}
              />
              <Button height="38px" text={t("add")} icon={<PlusOutlined />} onClick={addDetails} />
            </Flex>
          </BreadcrumbContainer>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={fakeJson}
        onChange={handleChange}
        sortDirections={["descend", "ascend", "descend"]}
        showSorterTooltip={false}
        pagination={{
          pageSize: 10,
          current: page,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        scroll={{ x: "auto" }}
      />
      <BaseModal
        title="Add Users"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.Users}
        data={editRecord}
        // setIsSuccess={setIsSuccess}
      />

      {/* <BaseModal
        title={t("delete")}
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        modalType={ModalList.IsConfirm}
        loading={deleteLoader}
        onConfirm={deleteRecords}
      /> */}
    </>
  );
};

export default Users;

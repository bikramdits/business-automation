import { Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import { useEffect, useState } from "react";
import Table, { Pagination } from "components/table/Table";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import Colors from "styles/Colors";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import { delay } from "utils/Delay";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { useTranslation } from "react-i18next";
import { format } from "utils/Date";

export const ButtonContainer = styled.span`
  display: flex;
`;
export const IconWrapper = styled(Flex)`
  gap: 15px;
  font-size: 19px;
  /* justify-content: center; */

  .anticon {
    cursor: pointer;
    box-shadow: 0 0 10px #00000011;
    padding: 7px 15px;
    border-radius: 5px;
    background-color: ${Colors.White};
  }
  .anticon-delete {
    color: ${Colors.Danger};
  }
  .anticon-check {
    color: green;
    font-weight: bold;
    font-size: 18px;
  }
  .anticon-close {
    color: ${Colors.Danger};
    font-weight: bold;
    font-size: 18px;
  }
`;
export const CheckIcon = styled.div`
  font-size: 23px;
  color: green;
  font-weight: 900;
  cursor: pointer;
`;
export const CrossIcon = styled(CheckIcon)`
  color: ${Colors.Danger};
`;

const GlobalCode = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>("");
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const handleActions = (record: any) => {
    setEditRecord(record);
    setisModalOpen(true);
  };
  const [sort, setSort] = useState<any>({
    sortBy: "createdAt",
    sortType: "desc",
  });

  const [getAllGlobalCodes, { response: listResponse, loading: listLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });
  const [updateGlobalCodes, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });
  const [deleteGlobalCodes, { loading: deleteLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.DELETE,
  });
  const handleToggleButton = async (checked: boolean, record: any) => {
    setIsChecked(checked);
    const variables = {
      ...record,
      status: checked ? 1 : 0,
    };
    updateGlobalCodes({
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

  const columns = [
    {
      title: t("codeName"),
      dataIndex: "codeName",
      sorter: true,
    },
    {
      title: t("globalCategory"),
      dataIndex: "globalCodeCategory",
      // sorter: true,
    },
    {
      title: t("parentGlobalCode"),
      dataIndex: "parentGlobalCode",
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
          <IconWrapper Justify="center" gap="5px">
            <EditOutlined onClick={() => handleActions(record)} title="Edit" />
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
    const variables = {
      ...editRecord,
      status: isChecked ? 1 : 0,
    };
    deleteGlobalCodes({
      variables,
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
  const addGlobalCode = () => {
    setEditRecord("");
    setisModalOpen(true);
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

    getAllGlobalCodes({
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
          <BreadcrumbItem color="black">{t("templateManagement")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("globalCode")}</ActiveBreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="430px">
          <Input
            placeholder={t("enterTextToSearch") || "Enter text to search"}
            onChange={search}
            suffix={<SearchOutlined />}
          />
          <Button text={t("add")} height="38px" icon={<PlusOutlined />} onClick={addGlobalCode} />
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
              total: listResponse?.data?.pagination,
            }}
          />
        </Col>
      </Row>
      <BaseModal
        title={editRecord ? t("editGlobalCode") : t("addGlobalCode")}
        open={isModalOpen}
        setOpen={setisModalOpen}
        modalType={ModalList.GlobalCode}
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

export default GlobalCode;

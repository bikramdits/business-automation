import { Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Toggle from "components/elements/Toggle";
import { BaseModal, ModalList } from "components/modal/BaseModal";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  Flex,
} from "components/SharedStyles";
import Table from "components/table/Table";
import { useState } from "react";
import { IconWrapper } from "features/global-code/GlobalCode";
import { useTranslation } from "react-i18next";
import { format } from "../../utils/Date";

const fakeJson = [
  {
    type: "Cash",
    clientName: "Ameer",
    email: "ravi123@gmail.com",
    createdOn: "17/08/2019",
    active: true,
  },
  {
    type: "Cash",
    clientName: "Navdeep",
    email: "navdeepgarg96@gmail.com	",
    createdOn: "07/08/2009",
    active: false,
  },
];

const Clients = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [editRecord, setEditRecord] = useState<any>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleChange = (pagination: any) => {
    setPage(pagination.current);
  };
  const handleUsers = (record: any) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };
  const handleToggleButton = (value: boolean) => {
    setIsChecked(value);
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      sorter: true,
    },
    {
      title: "Cleint Name",
      dataIndex: "clientName",
      ellipsis: true,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      sorter: true,
      defaultSortOrder: "descend",
      render: (createdAt: any) => <>{format(createdAt)}</>,
    },
    {
      title: "Status",
      dataIndex: "active",
      sorter: true,
      render: (active: boolean) => (
        <Toggle onChange={handleToggleButton} isChecked={active || isChecked} />
      ),
    },
    {
      title: "Actions",
      ellipsis: true,
      render: (_: any, record: any) => {
        return (
          <>
            <IconWrapper>
              <EditOutlined
                style={{ color: "", fontSize: "20px" }}
                onClick={() => handleUsers(record)}
              />
              <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
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
              <ActiveBreadcrumbItem>Clients</ActiveBreadcrumbItem>
            </Breadcrumb>
            <Flex minWidth="430px">
              <Input
                placeholder={t("enterTextToSearch") || "Enter text to search"}
                onChange={() => {}}
                suffix={<SearchOutlined />}
              />
              <Button
                text={t("add")}
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              />
            </Flex>
          </BreadcrumbContainer>
        </Col>

        <Col span={24}>
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
              // total: tableMeta?.pageSize,
            }}
          />
        </Col>
      </Row>
      <BaseModal
        title="Clients"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.Clients}
        data={editRecord}
      />
    </>
  );
};

export default Clients;

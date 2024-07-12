// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col, Row, Form } from "antd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbContainer,
  Spacer,
  ActiveBreadcrumbItem,
} from "components/SharedStyles";
import Table from "components/table/Table";
// import { IconWrapper } from "features/global-code/GlobalCode";
import Button from "components/elements/Button";
import { useState } from "react";
import { BaseModal, ModalList } from "components/modal/BaseModal";

import Select from "components/elements/Select";
import Toggle from "components/elements/Toggle";

// const fakeJson = [
//   {
//     role: "Admin",
//     permissions: <a href="#">Assign</a>,
//   },
//   {
//     role: "Super Admin",
//     permissions: <a href="#">Assign</a>,
//   },
//   {
//     role: "Admininstration",
//     permissions: <a href="#">Assign</a>,
//   },
//   {
//     role: "Supervisor",
//     permissions: <a href="#">Assign</a>,
//   },
//   {
//     role: "Technician",
//     permissions: <a href="#">Assign</a>,
//   },
// ];

const fakeJson2 = [
  {
    module: "Machine",
    // permissions: <a href="#">Assign</a>,
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
  },
  {
    module: "Machine type",
    // permissions: <a href="#">Assign</a>,
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
  },
  {
    module: "Client",
    // permissions: <a href="#">Assign</a>,
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
  },
  {
    module: "Technician",
    // permissions: <a href="#">Assign</a>,
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
  },
  {
    module: "Parts",
    // permissions: <a href="#">Assign</a>,
    Add: "Add",
    Update: "Update",
    Delete: "Delete",
    View: "View",
  },
];

const roleOptions = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super-Admin",
    label: "Super-Admin",
  },
  {
    value: "Administrator",
    label: "Administrator",
  },
  {
    value: "Manager",
    label: "Manager",
  },
];

// const userOptions = [
//   {
//     value: "Faisal AL Asmar",
//     label: "Faisal AL Asmar",
//   },
//   {
//     value: "Faisal Admin",
//     label: "Faisal Admin",
//   },
//   {
//     value: "Faisal New Tech",
//     label: "Faisal New Tech",
//   },
//   {
//     value: "Ad ul Faisal",
//     label: "Ad ul Faisal",
//   },
//   {
//     value: "Din E Alam",
//     label: "Din E Alam",
//   },
// ];

const RolesAndPermissions: React.FC = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPermisssionModalOpen, setIsPermisssionModalOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChange = (pagination: any) => {
    setPage(pagination.current);
  };

  const handleToggleButton = (val: any) => {
    setIsChecked(val);
  };
  const columns2 = [
    {
      title: "Module",
      dataIndex: "module",
    },
    {
      title: "Add",
      dataIndex: "Add",
      key: "Add",
      render: (active: boolean) => (
        <>
          <Toggle
            isChecked={active || isChecked}
            onChange={(value: boolean) => handleToggleButton(value)}
          />
        </>
      ),
    },
    {
      title: "Update",
      dataIndex: "Update",
      key: "Update",
      render: (active: boolean) => (
        <>
          <Toggle
            isChecked={active || isChecked}
            onChange={(value: boolean) => handleToggleButton(value)}
          />
        </>
      ),
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
      render: (active: boolean) => (
        <>
          <Toggle
            isChecked={active || isChecked}
            onChange={(value: boolean) => handleToggleButton(value)}
          />
        </>
      ),
    },
    {
      title: "View",
      dataIndex: "View",
      key: "View",
      render: (active: boolean) => (
        <>
          <Toggle
            isChecked={active || isChecked}
            onChange={(value: boolean) => handleToggleButton(value)}
          />
        </>
      ),
    },
  ];

  // const columns = [
  //   {
  //     title: "Roles",
  //     dataIndex: "role",
  //   },
  //   {
  //     title: "Permissions",
  //     dataIndex: "active",
  //     ellipsis: true,
  //     render: () => (
  //       <>
  //         <a href="#" onClick={() => setIsPermisssionModalOpen(true)}>
  //           Assign
  //         </a>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Actions",
  //     ellipsis: true,
  //     render: (_: any) => {
  //       return (
  //         <>
  //           <IconWrapper>
  //             <EditOutlined
  //               style={{ color: "", fontSize: "20px" }}
  //               onClick={() => setIsModalOpen(true)}
  //             />
  //             <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
  //           </IconWrapper>
  //         </>
  //       );
  //     },
  //   },
  // ];

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">Home</BreadcrumbItem>
          <ActiveBreadcrumbItem>Roles and Permissions</ActiveBreadcrumbItem>
          {/* <ActiveBreadcrumbItem>Roles and Permissions</ActiveBreadcrumbItem> */}
        </Breadcrumb>
        <Button text="Add New Role" onClick={() => setIsModalOpen(true)} />
      </BreadcrumbContainer>

      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={[10, 22]}>
          <Col span={12}>
            <Select
              options={roleOptions}
              name="Select Roles"
              label={"Select Roles"}
              required={true}
              placeholder={"Select Roles"}
              // onChange={onChangeJobCode}
            />
          </Col>
          {/* <Col span={8}>
            <Select
              options={userOptions}
              name="Select Users"
              label={"Select Users"}
              required={true}
              placeholder={"Select Users"}
              // onChange={onChangeJobCode}
            />
          </Col> */}
        </Row>
      </Form>

      <Spacer />
      {/* <Row gutter={[4, 20]}>
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
            }}
          />
        </Col>
      </Row> */}

      <Row gutter={[4, 20]}>
        <Col span={24}>
          <Table
            columns={columns2}
            dataSource={fakeJson2}
            onChange={handleChange}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            pagination={{
              pageSize: 10,
              current: page,
              showSizeChanger: false,
            }}
          />
        </Col>
      </Row>

      <BaseModal
        title="Manage Roles"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalType={ModalList.RolesAndPermissions}
      />
      <BaseModal
        title="Manage Permissions"
        open={isPermisssionModalOpen}
        setOpen={setIsPermisssionModalOpen}
        modalType={ModalList.AssignRolesAndPermissions}
      />
    </>
  );
};

export default RolesAndPermissions;

import { Col, Form, Row } from "antd";
// Checkbox
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import Button from "components/elements/Button";
import { useTranslation } from "react-i18next";
import Toggle from "components/elements/Toggle";
import Select from "components/elements/Select";
import { useState } from "react";
import Table from "components/table/Table";
import { Spacer } from "components/SharedStyles";

const permissionOptions = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super Admin",
    label: "Super Admin",
  },
  {
    value: "Administration",
    label: "Administration",
  },
  {
    value: "Supervisor",
    label: "Supervisor",
  },
  {
    value: "Technician",
    label: "Technician",
  },
];

const ManageRolesAndPermisionModal = ({ close, data }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [managePermisions, setManagePermisions] = useState<boolean>(false);
  //   const [allActions, setAllActions] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [addPermisions, setAddPermisions] = useState("");
  //   const [addValue, setAddValue] = useState<boolean>(false);
  //   const [add, setAdd] = useState("");
  //   const [edit, setEdit] = useState("");
  //   const [deleted, setDeleted] = useState("");

  const handleToggleButton = (val: any, rec: any) => {
    setIsChecked(val);
    setAddPermisions(rec);
    console.log(addPermisions);
  };

  const fakeJson = [
    {
      // selectAll: "selectAll",
      permisions: "Dashboard",
      assign: "assign",
      action: [{ add: false, edit: false, delete: false }],
    },
    {
      // selectAll: "selectAll",
      permisions: "Manages",
      assign: "assign",
      action: [{ add: true, edit: true, delete: true }],
    },
  ];
  const actionsData = fakeJson?.map((rec: any) => rec?.action);
  console.log("actionsData", actionsData);
  const columns = [
    {
      title: "Permisions",
      dataIndex: "permisions",
      key: "permisions",
    },
    {
      title: "Assign",
      dataIndex: "assign",
      key: "assign",
      render: (active: boolean, record: any) => (
        <>
          <Toggle
            isChecked={active || isChecked}
            onChange={(value: boolean) => handleToggleButton(value, record)}
          />
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      children: [
        {
          title: "Add",
          dataIndex: <CheckOutlined />,
          key: "add",
          render: () => (
            <>
              <CheckOutlined />
            </>
          ),
        },
        {
          title: "Edit",
          dataIndex: <CloseOutlined />,
          key: "edit",
          render: () => (
            <>
              <CloseOutlined />
            </>
          ),
        },
        {
          title: "Delete",
          dataIndex: <CloseOutlined />,
          key: "delete",
          render: () => (
            <>
              <CloseOutlined />
            </>
          ),
        },
      ],
    },
  ];

  const onChangePermissions = () => {
    setManagePermisions(true);
  };
  return (
    <>
      <ModalWidth width="900px">
        <Form form={form} layout="vertical" autoComplete="off">
          <MainContent>
            <Row>
              <Col span={24}>
                <Select
                  options={permissionOptions}
                  initialValue={data?.machines}
                  name="Roles"
                  label={"Roles"}
                  required={true}
                  placeholder="Please Select Role"
                  onChange={onChangePermissions}
                />
              </Col>
            </Row>
          </MainContent>
          <MainContent>
            <Row>
              <Spacer />
              <Spacer />
              <Spacer />
              <Spacer />
              {managePermisions && (
                <Col span={24}>
                  <Table
                    dataSource={fakeJson}
                    columns={columns}
                    sortDirections={["descend", "ascend", "descend"]}
                    showSorterTooltip={false}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: false,
                      hideOnSinglePage: true,
                    }}
                  />
                </Col>
              )}
              <Col span={24}>
                <Form.Item>
                  <ModalFooter Justify="end" gap="10px">
                    <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                    <Button text={t("submit")} type="submit" />
                  </ModalFooter>
                </Form.Item>
              </Col>
            </Row>
          </MainContent>
        </Form>
      </ModalWidth>
    </>
  );
};

export default ManageRolesAndPermisionModal;

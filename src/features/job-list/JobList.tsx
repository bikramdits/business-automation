import { Breadcrumb, Col, Form, Row, DatePicker, DatePickerProps } from "antd";
import { PlusOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import {
  ActiveBreadcrumbItem,
  BreadcrumbContainer,
  Drawer,
  DrawerContent,
  DrawerFooter,
  Flex,
  Spacer,
} from "components/SharedStyles";
import Table from "components/table/Table";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Select from "components/elements/Select";
import Toggle from "components/elements/Toggle";
// import Colors from "styles/Colors";

const JobList = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const fakeJson = [
    {
      jobCode: "Asd124",
      stage: "Stage 1",
      jobType: "In House",
      machineType: "Final Test 3-Phase Motor",
      machine: "Final Test - Induction Motor",
      clientName: "Adams Abgill",
      staff: "Faisal Admin",
    },
    {
      jobCode: "S2g34",
      stage: "Stage 1",
      jobType: "On Site",
      machineType: "ABC - 3-Phase Motor",
      machine: "ABC - Induction Motor",
      clientName: "John Doe",
      staff: "Faisal Supervisor",
    },
  ];

  const StageOptions = [
    {
      id: 1,
      value: "Stage 1",
    },
    {
      id: 2,
      value: "Stage 2",
    },
    {
      id: 3,
      value: "Stage 3",
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: t("jobCode"),
      dataIndex: "jobCode",
      sorter: true,
    },
    {
      title: t("stage"),
      dataIndex: "stage",
      sorter: true,
    },
    {
      title: t("jobType"),
      dataIndex: "jobType",
      sorter: true,
    },
    {
      title: t("machineType"),
      dataIndex: "machineType",
      sorter: true,
    },
    {
      title: t("machine"),
      dataIndex: "machine",
      sorter: true,
    },
    {
      title: t("clientName"),
      dataIndex: "clientName",
      sorter: true,
    },
    {
      title: t("staff"),
      dataIndex: "staff",
      sorter: true,
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <BreadcrumbContainer>
            <Breadcrumb separator=">">
              <ActiveBreadcrumbItem>Job List</ActiveBreadcrumbItem>
            </Breadcrumb>
            {/* <Flex minWidth="430px"> */}
            {/* <Flex>
              <Button
                text={t("add")}
                icon={<PlusOutlined />}
                // onClick={() => setIsModalOpen(true)}
              />
            </Flex> */}
          </BreadcrumbContainer>
        </Col>
        <Col span={10}>
          <Flex Justify="start">
            <Input
              placeholder={t("enterTextToSearch") || "Enter text to search"}
              onChange={() => {}}
              suffix={<SearchOutlined />}
            />
            <Button onClick={showDrawer} text="Filters" icon={<FilterOutlined />} />
          </Flex>
          <Spacer />
          <Drawer
            title="Filters"
            placement="right"
            className="drawerCustom"
            onClose={onClose}
            open={open}
          >
            <Form layout="vertical">
              <DrawerContent>
                <Row gutter={[16, 16]}>
                  <Col sm={12} xl={8}>
                    <Select
                      name="Stage"
                      label="Stage"
                      placeholder="Please Select Stage"
                      options={StageOptions}
                    />
                  </Col>
                  <Col sm={12} xl={8}>
                    <Select
                      name="jobType"
                      label="Job Type"
                      placeholder="Please Select Job Type"
                      options={StageOptions}
                    />
                  </Col>
                  <Col xs={12} xl={8}>
                    <Select
                      name="machineType"
                      label="Machine Type"
                      placeholder="Please Select Machine Type"
                      options={StageOptions}
                    />
                  </Col>
                  <Col xs={12} xl={8}>
                    <Select
                      name="assignTo"
                      label="Assign to"
                      placeholder="Please Select Assign to"
                      options={StageOptions}
                    />
                  </Col>
                  <Col xs={12} xl={8}>
                    <Select
                      name="clientName"
                      label="Client Name"
                      placeholder="Please Select Client Name"
                      options={StageOptions}
                    />
                  </Col>
                  <Col sm={12} xl={8}>
                    <Form.Item label="Start date">
                      <DatePicker onChange={onChange} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xl={8}>
                    <Form.Item label="End Date">
                      <DatePicker onChange={onChange} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xl={4}>
                    <Form.Item label="Completed Jobs">
                      <Toggle />
                    </Form.Item>
                  </Col>
                </Row>
              </DrawerContent>
              <DrawerFooter Justify="end">
                <Button variant="default" text="clear" onClick={onClose} />
                <Button text="Apply filter" />
              </DrawerFooter>
            </Form>
          </Drawer>
        </Col>
        <Col sm={14}>
          <Flex Justify="end" width="100%">
            <Button
              text={t("add")}
              icon={<PlusOutlined />}
              // onClick={() => setIsModalOpen(true)}
            />
          </Flex>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={fakeJson}
            sortDirections={["descend", "ascend", "descend"]}
            showSorterTooltip={false}
            pagination={{
              pageSize: 10,
              current: 1,
              showSizeChanger: false,
              // total: tableMeta?.pageSize,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default JobList;

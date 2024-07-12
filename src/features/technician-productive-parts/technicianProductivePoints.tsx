import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col, Row, Form, DatePicker, Table } from "antd";
import { useTranslation } from "react-i18next";
import {
  BreadcrumbContainer,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Spacer,
} from "components/SharedStyles";
import styled from "styled-components";
import Button from "components/elements/Button";
import Select from "components/elements/Select";
import Input from "components/elements/Input";
import TextArea from "components/elements/Textarea";
import Colors from "styles/Colors";
import { IconWrapper } from "features/global-code/GlobalCode";

const technicianOptions = [
  {
    value: "Faisal AL Asmar",
    label: "Faisal AL Asmar",
  },
  {
    value: "Faisal Admin",
    label: "Faisal Admin",
  },
  {
    value: "Faisal New Tech",
    label: "Faisal New Tech",
  },
  {
    value: "Ad ul Faisal",
    label: "Ad ul Faisal",
  },
  {
    value: "Din E Alam",
    label: "Din E Alam",
  },
];

const jobOptions = [
  {
    value: "J-462784004",
    label: "J-462784004",
  },
  {
    value: "J-1623643440",
    label: "J-1623643440",
  },
  {
    value: "J-1567893008",
    label: "J-1567893008",
  },
  {
    value: "J-2007529931",
    label: "J-2007529931",
  },
  {
    value: "J-2007529881",
    label: "J-2007529881",
  },
  {
    value: "J-2007520001",
    label: "J-2007520001",
  },
];

// const Wrapper = styled(Flex)`
//   gap: 0;
//   width: 100%;
//   height: 100%;
//   border: 1px solid ${Colors.Grey};
//   //   border-top-width: 0;
//   align-items: center;
// `;

const Section = styled(Flex)<{ width?: string; borderWidth?: string }>`
  width: ${(props) => props.width || "100%"};
  padding: 0px 30px;
  text-align: center;
  color: ${Colors.White};
  border-right-width: 0px;
  border-width: ${(props) => props.borderWidth || ""};
  &:last-of-type {
    border-right-width: 1px;
  }
  .ant-form-item {DatePicker
    width: 100%;
    .ant-picker {
      width: 100%;
    }
  }
`;

const fakeJson = [
  {
    Technician: "Dashboard",
    JobCode: "J-213789",
    BonusPoints: 22,
    Description: "Description for dashboard",
    CreatedOn: "31/01/2023 02:47 PM",
    Actions: "Actions",
  },
  {
    Technician: "Manages",
    JobCode: "J-213390",
    BonusPoints: 20,
    Description: "Description for manages",
    CreatedOn: "29/01/2023 12:33 PM",
    Actions: "Actions",
  },
];

const TechnicianProductivePoints = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [techCode, setTechCode] = useState<boolean>(false);
  const [jobCode, setJobCode] = useState<boolean>(false);
  const [techGrid, setTechGrid] = useState<boolean>(false);
  useState<object>({});

  const onChangeTechnician = () => {
    setTechCode(true);
    console.log(techCode);
  };

  const onChangeJobs = () => {
    setJobCode(true);
    console.log(jobCode);
  };

  const onExpandTechnicianGrid = () => {
    setTechGrid(true);
    console.log(techGrid);
  };
  const columns = [
    {
      title: t("technician"),
      dataIndex: "Technician",
      key: "Technician",
    },
    {
      title: t("jobCode"),
      dataIndex: "JobCode",
      key: "JobCode",
    },
    {
      title: t("bonusPoints"),
      dataIndex: "BonusPoints",
      key: "BonusPoints",
    },
    {
      title: t("description"),
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: t("createdOn"),
      dataIndex: "CreatedOn",
      key: "CreatedOn",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      render: (_: any) => {
        return (
          <>
            <IconWrapper>
              <EditOutlined style={{ color: "", fontSize: "20px" }} />
              <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
            </IconWrapper>
          </>
        );
      },
      // children: [
      //   {
      //     title: "Add",
      //     dataIndex: <CheckOutlined />,
      //     key: "add",
      //     render: () => (
      //       <>
      //         <CheckOutlined />
      //       </>
      //     ),
      //   },
      //   {
      //     title: "Edit",
      //     dataIndex: <CloseOutlined />,
      //     key: "edit",
      //     render: () => (
      //       <>
      //         <CloseOutlined />
      //       </>
      //     ),
      //   },
      //   {
      //     title: "Delete",
      //     dataIndex: <CloseOutlined />,
      //     key: "delete",
      //     render: () => (
      //       <>
      //         <CloseOutlined />
      //       </>
      //     ),
      //   },
      // ],
    },
  ];

  return (
    <>
      <BreadcrumbContainer>
        <Row>
          <Col>
            <Breadcrumb separator=">">
              <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
              <BreadcrumbItem>{t("technicianProductivePoints")}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </BreadcrumbContainer>
      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item>
              <Select
                options={technicianOptions}
                name="technicianName"
                label={t("technicianName") || "Technician Name"}
                required={true}
                placeholder={t("selectTechnician") || "Select Technician"}
                onChange={onChangeTechnician}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                options={jobOptions}
                name="jobs"
                label={t("jobs") || "jobs"}
                required={true}
                placeholder={t("selectJobs")}
                onChange={onChangeJobs}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item>
              <Input
                type="number"
                label={t("bonusPoints") || "Bonus Points"}
                placeholder={t("bonusPoints")}
                value="0"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("description")}>
              <TextArea name="description" placeholder={t("description")} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={20}></Col>
          <Col span={4}>
            <Section Justify="space-around" Align="center" gap="10px">
              <Button text={t("cancel")} />
              <Button text={t("save")} />
            </Section>
          </Col>
        </Row>
      </Form>
      <Spacer />
      <Form form={form} layout="vertical" autoComplete="off">
        <Section Justify="space-around" Align="center" gap="10px">
          <Col span={8}>
            <Form.Item>
              <Select
                options={technicianOptions}
                name="technician"
                label={t("technicianName") || "Technician Name"}
                required={true}
                placeholder={t("selectTechnician")}
                onChange={onChangeTechnician}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t("from")}>
              <DatePicker placeholder={t("startDate") || "Start Date"} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t("to")}>
              <DatePicker placeholder={t("endDate") || "End Date"} />
            </Form.Item>
          </Col>
        </Section>
        <Section Justify="right" Align="center" gap="40px">
          <Button text={t("applyFilter")} onClick={onExpandTechnicianGrid} />
        </Section>
        <Section Justify="right" Align="center" gap="40px">
          <Col span={21}></Col>
          <Col span={3}>
            <Input label="" placeholder="" value="Total Bonus Points 0" />
          </Col>
        </Section>
      </Form>
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
    </>
  );
};

export default TechnicianProductivePoints;

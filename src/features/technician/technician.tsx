import React, { useState } from "react";
import { Col, Row, Form, DatePicker, Card } from "antd";
import styled from "styled-components";
import Button from "components/elements/Button";
import Select from "components/elements/Select";
import { PlusOutlined, MinusOutlined, CaretDownOutlined } from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
  Spacer,
} from "components/SharedStyles";
import { MainContent } from "components/modal/BaseModal";
import Colors from "styles/Colors";

const Wrapper = styled(Flex)`
  gap: 0;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Grey};
  //   border-top-width: 0;
  align-items: center;
`;

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
  .ant-form-item {
    width: 100%;
    .ant-picker {
      width: 100%;
    }
  }
`;

const IconContainer = styled.div`
  width: 40px;
  text-align: center;
  background-color: ${Colors.Primary};
  margin: 25px 0 0 60px;
  color: white;
  font-size: 24px;
`;

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

const Drop1 = [
  {
    value: "AS 400 2023",
    label: "AS 400 2023",
  },
  {
    value: "ABC 3-Phase motor",
    label: "ABC 3-Phase motor",
  },
  {
    value: "Machine Type 1",
    label: "Machine Type 1",
  },
  {
    value: "Machine Type 2",
    label: "Machine Type 2",
  },
  {
    value: "Machine Type Test",
    label: "Machine Type Test",
  },
];

const Drop2 = [
  {
    value: "ABC Induction Motor",
    label: "ABC Induction Motor",
  },
  {
    value: "Magnetic Machine",
    label: "Magnetic Machine",
  },
  {
    value: "Machine Type2",
    label: "Machine Type2",
  },
  {
    value: "On Machine Test",
    label: "On Machine Test",
  },
  {
    value: "Final Test",
    label: "Final Test",
  },
];

const Drop3 = [
  {
    value: "ABC Complete Motor",
    label: "ABC Complete Motor",
  },
  {
    value: "ABC Stator Only",
    label: "ABC Stator Only",
  },
  {
    value: "ABC Induction Only",
    label: "ABC Induction Only",
  },
  {
    value: "Magnetic Motor",
    label: "Magnetic Motor",
  },
  {
    value: "ABC Rotor Only",
    label: "ABC Rotor Only",
  },
];

const Drop4 = [
  {
    value: "Work Procedure 1",
    label: "Work Procedure 1",
  },
  {
    value: "Work Procedure 2",
    label: "Work Procedure 2",
  },
  {
    value: "Work Procedure 3",
    label: "Work Procedure 3",
  },
  {
    value: "Work Procedure 4",
    label: "Work Procedure 4",
  },
  {
    value: "Work Procedure 5",
    label: "Work Procedure 5",
  },
];

const Technician = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useState<object>({});
  const [techCode, setTechCode] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [collapseFirst, setCollapseFirst] = useState<boolean>(false);
  const [collapseSecond, setCollapseSecond] = useState<boolean>(false);
  const [collapseThird, setCollapseThird] = useState<boolean>(false);
  const [collapseFourth, setCollapseFourth] = useState<boolean>(false);
  const [collapseCharts, setCollapseCharts] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const openApexCharts = () => {
    if (collapseCharts === false) {
      setCollapseCharts(true);
    } else {
      setCollapseCharts(false);
    }
  };

  const series = [
    {
      name: "Desktops",
      data: [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  ];

  const newSeries = [
    {
      name: "Desktops",
      data: [1, 2],
    },
  ];

  const nextSeries = [
    {
      name: "Desktops",
      data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    },
  ];
  const newOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Jan"],
    },
    // yaxis: {
    //   categories: [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0],
    // },
  };

  const nextOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Node. 2023", "Next JS", "React JS", "Mongo", "SQL", "PHP", "Server"],
    },
    // yaxis: {
    //   categories: [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0],
    // },
  };

  const opt = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
  };

  const onChangeTechnician = () => {
    setTechCode(true);
    console.log(techCode);
  };

  const onCheckExpand = () => {
    setExpanded(true);
  };

  const onContentFirst = () => {
    if (collapseFirst === false) {
      setCollapseFirst(true);
    } else {
      setCollapseFirst(false);
    }
  };

  const onContentSecond = () => {
    if (collapseSecond === false) {
      setCollapseSecond(true);
    } else {
      setCollapseSecond(false);
    }
  };

  const onContentThird = () => {
    if (collapseThird === false) {
      setCollapseThird(true);
    } else {
      setCollapseThird(false);
    }
  };

  const onContentFourth = () => {
    if (collapseFourth === false) {
      setCollapseFourth(true);
    } else {
      setCollapseFourth(false);
    }
  };

  const printPage = () => {
    window.print();
  };

  return (
    <>
      <BreadcrumbContainer>
        <Row>
          <Col>
            <Breadcrumb separator=">">
              <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
              <BreadcrumbItem>{t("technician")}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </BreadcrumbContainer>
      <Form form={form} layout="vertical" autoComplete="off">
        <Row>
          <Col span={22}>
            <Form.Item></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button text={t("print")} onClick={printPage} />
            </Form.Item>
          </Col>
        </Row>
        <MainContent>
          <Wrapper>
            <Section Justify="space-around" Align="center" gap="10px">
              <Col span={7}>
                <Form.Item>
                  <Select
                    options={technicianOptions}
                    name="technician"
                    label={t("chooseTechnician") || "Choose Technician"}
                    required={true}
                    placeholder={t("selectTechnician")}
                    onChange={onChangeTechnician}
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label={t("startDate")}>
                  <DatePicker placeholder={t("startDate") || "Start Date"} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label={t("endDate")}>
                  <DatePicker placeholder={t("endDate") || "End Date"} />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item>
                  <Spacer />
                  <IconContainer onClick={() => (filter ? setFilter(false) : setFilter(true))}>
                    <CaretDownOutlined onClick={onCheckExpand} />
                  </IconContainer>
                </Form.Item>
              </Col>
            </Section>
          </Wrapper>
          <Wrapper>
            {expanded && (
              <>
                <Section Justify="space-around" Align="center" gap="10px">
                  <Form.Item>
                    <Select
                      options={Drop1}
                      name="machineType"
                      label={t("machineType") || "Machine Type"}
                      required={true}
                      placeholder={t("pleaseSelectMachineType")}
                      onChange={onChangeTechnician}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      options={Drop2}
                      name="machine"
                      label={t("machine") || "Machine"}
                      required={true}
                      placeholder={t("pleaseSelectMachine")}
                      onChange={onChangeTechnician}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      options={Drop3}
                      name="segment"
                      label={t("segment") || "Segment"}
                      required={true}
                      placeholder={t("pleaseSelectSegment")}
                      onChange={onChangeTechnician}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      options={Drop4}
                      name="subSegment"
                      label={t("subSegment") || "Sub Segment"}
                      required={true}
                      placeholder={t("pleaseSelectSubSegment")}
                      onChange={onChangeTechnician}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Spacer />
                    <Flex Justify="end">
                      <Button text={t("applyFilter")} onClick={openApexCharts} />
                    </Flex>
                  </Form.Item>
                </Section>
              </>
            )}
          </Wrapper>
          {collapseCharts && (
            <Row>
              <Col span={12}>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title={t("machinesWorkedOn")}
                  extra={
                    <a href="#" onClick={onContentFirst}>
                      {collapseFirst === true ? <MinusOutlined /> : <PlusOutlined />}
                    </a>
                  }
                >
                  {collapseFirst ? (
                    <ReactApexChart
                      options={newOptions as any}
                      series={series}
                      type="line"
                      height={350}
                    />
                  ) : (
                    ""
                  )}
                </Card>
              </Col>
              <Spacer />
              <Col span={12}>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title={t("hoursSpent")}
                  extra={
                    <a href="#" onClick={onContentSecond}>
                      {collapseSecond === true ? <MinusOutlined /> : <PlusOutlined />}
                    </a>
                  }
                >
                  {/* {collapseSecond ? "Inner Card Content 2" : ""} */}
                  {collapseSecond ? (
                    <ReactApexChart
                      options={newOptions as any}
                      series={series}
                      type="line"
                      height={350}
                    />
                  ) : (
                    ""
                  )}
                </Card>
              </Col>
            </Row>
          )}
          {collapseCharts && (
            <Row>
              <Col span={12}>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title={t("clientFeedback")}
                  extra={
                    <a href="#" onClick={onContentThird}>
                      {collapseThird === true ? <MinusOutlined /> : <PlusOutlined />}
                    </a>
                  }
                >
                  {collapseThird ? (
                    <ReactApexChart
                      options={opt as any}
                      series={newSeries}
                      type="line"
                      height={350}
                    />
                  ) : (
                    ""
                  )}
                </Card>
              </Col>
              <Spacer />
              <Col span={12}>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title={t("jobs")}
                  extra={
                    <a href="#" onClick={onContentFourth}>
                      {collapseFourth === true ? <MinusOutlined /> : <PlusOutlined />}
                    </a>
                  }
                >
                  {collapseFourth ? (
                    <ReactApexChart
                      options={nextOptions as any}
                      series={nextSeries}
                      type="bar"
                      height={350}
                    />
                  ) : (
                    ""
                  )}
                </Card>
              </Col>
            </Row>
          )}
        </MainContent>
      </Form>
    </>
  );
};

export default Technician;

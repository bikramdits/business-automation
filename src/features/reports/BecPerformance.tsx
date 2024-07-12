import { Card, Col, Form, Row } from "antd";
import DatePicker from "components/date-picker/DatePicker";
import { CaretDownOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  ActiveBreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
  Spacer,
} from "components/SharedStyles";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "styles/Colors";
import Select from "components/elements/Select";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import Button from "components/elements/Button";
import ReactApexChart from "react-apexcharts";

const ContentFirst = styled.div`
  border: 1px solid ${Colors.Grey};
  width: 100%;
  padding: 10px 10px;
  font-size: 16px;
  box-shadow: 0 0 10px #0000001a;
  border-radius: 8px;
`;

const IconContainer = styled.div`
  width: 40px;
  text-align: center;
  background-color: #008bd5;
  margin: 25px 0 0 60px;
  color: white;
  font-size: 24px;
`;

const BecPerformance = () => {
  const [machineType, setMachineType] = useState<any>();
  const [machines, setMachines] = useState<any>();
  const [segment, setSegment] = useState<any>();
  const [subSegment, setSubSegment] = useState<any>();
  const [filter, setFilter] = useState<boolean>(false);

  const handleMachineType = (_: any, e: any) => {
    console.log(e);
    setMachineType(e);
  };

  const getMachineName = (_: any, e: any) => {
    console.log(e);
    setMachines(e);
  };

  const handleSegment = (_: any, e: any) => {
    console.log(e);
    setSegment(e);
  };

  const handleSubSegment = (value: any, e: any) => {
    console.log(e);
    setSubSegment(e);
  };

  console.log(segment);
  console.log(subSegment);

  const [getAllMachinesTypes, { response: machineTypeList, loading: machineTypeLoader }] =
    useRequest({
      path: ENDPOINTS.MACHINE_TYPES,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });

  const [getAllMachines, { response: machineList, loader: machineListLoader }] = useRequest({
    path: ENDPOINTS.GET_MACHINES_BY_MACHINE_TYPE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getSegment, { response: segmentList, loading: segmentLoader }] = useRequest({
    path: ENDPOINTS.PARENT_SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const [getSubSegment, { response: subSegmentList, loading: subSegmentLoader }] = useRequest({
    path: ENDPOINTS.SUB_SEGMENT,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const machineTypeOptions =
    machineTypeList?.data?.records?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.machineType,
      };
    }) || [];
  machineTypeOptions.unshift({ label: "Please Select Machine type", value: "" });

  const machineOptions =
    machineList?.data?.map((item: any) => {
      return { id: item?._id, value: item?.machineName };
    }) || [];
  machineOptions.unshift({ label: "Please Select", value: "" });

  useEffect(() => {
    const params = {
      type: 1,
    };
    getAllMachinesTypes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);

  const segementOptions =
    segmentList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.segment,
      };
    }) || [];
  segementOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });

  const subSegementOptions =
    subSegmentList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.segment,
      };
    }) || [];
  subSegementOptions.unshift({
    label: "Please Select the Parent Code",
    value: "",
  });

  useEffect(() => {
    if (machineType) {
      getAllMachines({
        id: machineType?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [machineType]);

  useEffect(() => {
    if (machines) {
      getSegment({
        id: machines?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [machines]);

  useEffect(() => {
    if (segment) {
      getSubSegment({
        id: segment?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [segment]);

  const [content1, setContent1] = useState<boolean>(true);
  const [content2, setContent2] = useState<boolean>(true);
  const [content3, setContent3] = useState<boolean>(true);
  const [content4, setContent4] = useState<boolean>(true);
  const [content5, setContent5] = useState<boolean>(true);
  const [content6, setContent6] = useState<boolean>(true);

  const genExtra1 = () => (
    <>
      {content1 ? (
        <MinusOutlined onClick={() => setContent1(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent1(true)} />
      )}
    </>
  );

  const genExtra2 = () => (
    <>
      {content2 ? (
        <MinusOutlined onClick={() => setContent2(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent2(true)} />
      )}
    </>
  );

  const genExtra3 = () => (
    <>
      {content3 ? (
        <MinusOutlined onClick={() => setContent3(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent3(true)} />
      )}
    </>
  );

  const genExtra4 = () => (
    <>
      {content4 ? (
        <MinusOutlined onClick={() => setContent4(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent4(true)} />
      )}
    </>
  );

  const genExtra5 = () => (
    <>
      {content4 ? (
        <MinusOutlined onClick={() => setContent5(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent5(true)} />
      )}
    </>
  );

  const genExtra6 = () => (
    <>
      {content4 ? (
        <MinusOutlined onClick={() => setContent6(false)} />
      ) : (
        <PlusOutlined onClick={() => setContent6(true)} />
      )}
    </>
  );

  const series1 = [
    {
      name: "Desktops",
      data: [0, 6],
    },
  ];

  const ApexOptions1 = {
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
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Dec", "Jan"],
    },
  };

  const series2 = [
    {
      name: "Desktops",
      data: [0, 0, 0, 0, 0],
    },
  ];

  const ApexOptions2 = {
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      //   curve: "straight",
      colors: ["#fff"],
      width: 0.2,
    },
    title: {
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Faisal Technician",
        "Rakesh Kumar",
        "Bikram Thakur",
        "Sanjeev Kumar",
        "Faisal Admin",
      ],
    },
  };

  const series3 = [
    {
      name: "Desktops",
      data: [0, 0, 0, 0, 0],
    },
  ];

  const ApexOptions3 = {
    chart: {
      height: 350,
      type: "bar",
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
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: {
      categories: ["1", "2", "3", "4", "5"],
    },
  };

  const series4 = [
    {
      name: "Desktops",
      data: [0, 0],
    },
  ];

  const ApexOptions4 = {
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
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Dec", "Jan"],
    },
  };

  const series5 = [
    {
      name: "Desktops",
      data: [0, 0],
    },
  ];

  const ApexOptions5 = {
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
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Dec", "Jan"],
    },
  };

  const series6 = [
    {
      name: "Desktops",
      data: [1, 5, 0],
      //   data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
    },
  ];

  const ApexOptions6 = {
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
      //   text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Completed", "In Progress", "Haulted"],
      //   categories: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  };

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("reports")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("becPerformance")}</ActiveBreadcrumbItem>
        </Breadcrumb>
      </BreadcrumbContainer>

      <Form layout="vertical" autoComplete="off">
        <ContentFirst>
          <Row gutter={[16, 16]}>
            <Col span={7}>
              <DatePicker label="From" />
            </Col>
            <Col span={7}>
              <DatePicker label="To" />
            </Col>
            <Col span={7} offset={3}>
              <IconContainer onClick={() => (filter ? setFilter(false) : setFilter(true))}>
                <CaretDownOutlined />
              </IconContainer>
            </Col>
            {filter ? (
              <>
                <Col span={7}>
                  <Select
                    name="machineType"
                    label="Machine Type"
                    placeholder="Please Select Machine Type"
                    options={machineTypeOptions}
                    loading={machineTypeLoader}
                    onChange={(value: any, e: any) => handleMachineType(value, e)}
                  />
                </Col>
                <Col span={6}>
                  <Select
                    name="machine"
                    label="Machine"
                    placeholder="Please Select Machine"
                    options={machineOptions}
                    loading={machineListLoader}
                    onChange={(value: any, e: any) => getMachineName(value, e)}
                  />
                </Col>
                <Col span={5}>
                  <Select
                    name="segment"
                    label="Segment"
                    placeholder="Please Select Segment"
                    options={segementOptions}
                    loading={segmentLoader}
                    onChange={(value: any, e: any) => handleSegment(value, e)}
                  />
                </Col>
                <Col span={5}>
                  <Select
                    name="subSegment"
                    label="Sub Segment"
                    placeholder="Please Select Sub Segment"
                    options={subSegementOptions}
                    loading={subSegmentLoader}
                    onChange={(value: any, e: any) => handleSubSegment(value, e)}
                  />
                </Col>
                <Col offset={20}>
                  <Flex Align="end">
                    <Button
                      text="Apply Filters"
                      height="38px"
                      // onClick={() => addJobType()}
                    />
                  </Flex>
                </Col>
              </>
            ) : (
              ""
            )}
          </Row>
        </ContentFirst>
      </Form>
      <Spacer />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Equipments" bordered={true} extra={genExtra1()}>
            {content1 ? (
              <ReactApexChart
                options={ApexOptions1 as any}
                series={series1}
                type="line"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Top Five Performers (Based on working hours)"
            bordered={true}
            extra={genExtra2()}
          >
            {content2 ? (
              <ReactApexChart
                options={ApexOptions2 as any}
                series={series2}
                type="bar"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
      <Spacer />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Client Feedback" bordered={true} extra={genExtra3()}>
            {content3 ? (
              <ReactApexChart
                options={ApexOptions3 as any}
                series={series3}
                type="bar"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Productivity Trends" bordered={true} extra={genExtra4()}>
            {content4 ? (
              <ReactApexChart
                options={ApexOptions4 as any}
                series={series4}
                type="line"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Time Spent" bordered={true} extra={genExtra5()}>
            {content5 ? (
              <ReactApexChart
                options={ApexOptions5 as any}
                series={series5}
                type="line"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Jobs Bifurcation" bordered={true} extra={genExtra6()}>
            {content6 ? (
              <ReactApexChart
                options={ApexOptions6 as any}
                series={series6}
                type="line"
                height={350}
              />
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BecPerformance;

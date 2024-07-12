import { Breadcrumb, Col, Form, Row, Badge, Menu, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import DatePicker from "components/date-picker/DatePicker";
import Select from "components/elements/Select";
import {
  ActiveBreadcrumbItem,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
  Spacer,
} from "components/SharedStyles";
import styled from "styled-components";
import Colors from "styles/Colors";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import { useEffect, useState } from "react";
import { t } from "i18next";
import Button from "components/elements/Button";
import Table from "components/table/Table";

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

const options = [
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
];

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const JobHours = () => {
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

  const expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>More</a>
            </Dropdown>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("reports")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("jobHours")}</ActiveBreadcrumbItem>
        </Breadcrumb>{" "}
      </BreadcrumbContainer>

      <Form layout="vertical" autoComplete="off">
        <ContentFirst>
          <Row gutter={[16, 16]}>
            <Col span={7}>
              <Select
                options={options}
                name="Select Job Code"
                label="Job Code"
                placeholder="Please Select Job Code"
                //   onChange={onChangeJobCode}
              />
            </Col>
            <Col span={7}>
              <DatePicker label="From" />
            </Col>
            <Col span={7}>
              <DatePicker label="To" />
            </Col>
            <Col span={3}>
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
        <Spacer />
        <ContentFirst>
          <Table columns={columns} dataSource={data} expandedRowRender={expandedRowRender} />
        </ContentFirst>
      </Form>
    </>
  );
};

export default JobHours;

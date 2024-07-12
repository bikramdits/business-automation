import { Breadcrumb, Col, Form, Row, Space } from "antd";
import Button from "components/elements/Button";
import CheckBox from "components/elements/CheckBox";
import Select from "components/elements/Select";
import {
  ActiveBreadcrumbItem,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
} from "components/SharedStyles";
import { t } from "i18next";
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "styles/Colors";

const ContentFirst = styled.div`
  border: 1px solid ${Colors.Grey};
  width: 100%;
  padding: 10px 10px;
  font-size: 16px;
  box-shadow: 0 0 10px #0000001a;
  border-radius: 8px;
  margin: 0 0 20px 0px;
`;

export const Label = styled.h4`
  font-size: 14;
  font-weight: 600;
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

const JobDetails = () => {
  const [jobCode, setJobCode] = useState<any>();
  const [isEquipmentIdentification, setIsEquipmentIdentification] = useState<boolean>(false);
  const [isEquipmentInspection, setIsEquipmentInspection] = useState<boolean>(false);
  const [isScopeOfWork, setIsScopeOfWork] = useState<boolean>(false);
  const [isWorkProcedure, setIsWorkProcedure] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isPackageAndDelivery, setIsPackageAndDelivery] = useState<boolean>(false);
  const [isJobActivity, setIsJobActivity] = useState<boolean>(false);
  const handleCheckbox1 = (e: any) => {
    setIsEquipmentIdentification(e.target.checked);
    console.log("check", e.target.checked);
  };
  const handleCheckbox2 = (e: any) => {
    setIsEquipmentInspection(e.target.checked);
    console.log("check", e.target.checked);
  };

  const handleCheckbox3 = (e: any) => {
    setIsScopeOfWork(e.target.checked);
    console.log("check", e.target.checked);
  };

  const handleCheckbox4 = (e: any) => {
    setIsWorkProcedure(e.target.checked);
    console.log("check", e.target.checked);
  };

  const handleCheckbox5 = (e: any) => {
    setIsTesting(e.target.checked);
    console.log("check", e.target.checked);
  };

  const handleCheckbox6 = (e: any) => {
    setIsPackageAndDelivery(e.target.checked);
    console.log("check", e.target.checked);
  };

  const handleCheckbox7 = (e: any) => {
    setIsJobActivity(e.target.checked);
    console.log("check", e.target.checked);
  };

  const onChangeJobCode = (_: any, e: any) => {
    setJobCode(e);
  };
  console.log("jobCode", jobCode);
  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("reports")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("jobDetails")}</ActiveBreadcrumbItem>
        </Breadcrumb>
      </BreadcrumbContainer>

      <Form layout="vertical" autoComplete="off">
        <ContentFirst>
          <Label>Actions</Label>
          <Row gutter={[40, 20]}>
            <Col span={5}>
              <CheckBox
                name="equipment"
                onChange={handleCheckbox1}
                checked={isEquipmentIdentification}
                text="Equipment Identification"
              />
            </Col>
            <Col span={4}>
              <CheckBox
                onChange={handleCheckbox2}
                checked={isEquipmentInspection}
                text="Equipment Inspection"
              />
            </Col>
            <Col span={4}>
              <CheckBox onChange={handleCheckbox3} checked={isScopeOfWork} text="Scope of work" />
            </Col>
            <Col span={4}>
              <CheckBox
                onChange={handleCheckbox4}
                checked={isWorkProcedure}
                text="Work Procedure"
              />
            </Col>
            <Col span={3}>
              <CheckBox onChange={handleCheckbox5} checked={isTesting} text="Testing" />
            </Col>
            <Col span={4}>
              <CheckBox
                onChange={handleCheckbox6}
                checked={isPackageAndDelivery}
                text="Package and delivery"
              />
            </Col>
            <Col>
              <CheckBox onChange={handleCheckbox7} checked={isJobActivity} text="Job Activity" />
            </Col>
          </Row>
        </ContentFirst>
        <Space />
        <ContentFirst>
          <Row>
            <Col span={8}>
              <Select
                options={options}
                name="Select Job Code"
                label={t("selectJobCode") || "Select Job Code"}
                required={true}
                placeholder={t("pleaseSelectJobCode") || "Please Select Job Code"}
                onChange={(value: any, e: any) => onChangeJobCode(value, e)}
              />
            </Col>
            <Col span={3} offset={13}>
              <Flex Align="end">
                <Button
                  text="Apply Filters"
                  height="38px"
                  // onClick={() => addJobType()}
                />
              </Flex>
            </Col>
          </Row>
        </ContentFirst>
      </Form>
    </>
  );
};

export default JobDetails;

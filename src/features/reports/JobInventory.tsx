import { Col, Form, Row } from "antd";
import Button from "components/elements/Button";
import Select from "components/elements/Select";
import { Breadcrumb, BreadcrumbContainer, BreadcrumbItem, Flex } from "components/SharedStyles";
import { t } from "i18next";
import React from "react";
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

const JobInventory = () => {
  return (
    <>
      <BreadcrumbContainer>
        <Row>
          <Col>
            <Breadcrumb separator=">">
              <BreadcrumbItem color="black">{t("reports")}</BreadcrumbItem>
              <BreadcrumbItem>{t("jobInventory")}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Flex>
          <Button
            text="Print"
            height="38px"
            // icon={<PlusOutlined />}
            // onClick={() => addJobType()}
          />
        </Flex>
      </BreadcrumbContainer>

      <Form layout="vertical" autoComplete="off">
        <ContentFirst>
          <Row>
            <Col span={8}>
              <Select
                options={options}
                name="Select Job Code"
                label={t("selectJobCode") || "Select Job Code"}
                required={true}
                placeholder={t("pleaseSelectJobCode") || "Please Select Job Code"}
                //   onChange={(value: any, e: any) => onChangeJobCode(value, e)}
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

export default JobInventory;

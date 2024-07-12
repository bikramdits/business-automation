import { Form, TimePicker, Col, Row } from "antd";
import Button from "components/elements/Button";
import {
  // ActiveBreadcrumbItem,
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbContainer,
  Flex,
  Spacer,
} from "components/SharedStyles";
import styled from "styled-components";
import Colors from "styles/Colors";
import { useTranslation } from "react-i18next";

const Lunch = styled.div`
  overflow-wrap: break-word;
  width: 15px;
  margin: 10px auto;
  font-size: 20px;
  color: ${Colors.White};
  font-weight: 700;
  line-height: 32px;
  text-transform: uppercase;
`;

const MainHeader = styled(Flex)`
  gap: 0;
  background-color: ${Colors.Primary};
  padding: 10px;
  width: 50%;
  justify-content: center;
  color: ${Colors.White};
`;

const Section = styled(Flex)<{ width?: string; borderWidth?: string }>`
  width: ${(props) => props.width || "48%"};
  text-align: center;
  color: ${Colors.White};
  border-right-width: 0px;
  border-width: ${(props) => props.borderWidth || ""};
  &:last-of-type {
    border-right-width: 1px;
  }
  .ant-form-item {
    width: 45%;
    .ant-picker {
      width: 100%;
      height: 38px;
    }
  }
`;
const Wrapper = styled(Flex)`
  gap: 0;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Grey};
  border-top-width: 0;
  align-items: center;
`;

const TimeTable = () => {
  const { t } = useTranslation();
  return (
    <>
      <BreadcrumbContainer>
        <Row>
          <Col>
            <Breadcrumb separator=">">
              <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
              <BreadcrumbItem>{t("BECTimeTable")}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </BreadcrumbContainer>
      <Form layout="vertical" autoComplete="off">
        <Wrapper>
          <MainHeader>{t("firstHalf")}</MainHeader>
          <MainHeader>{t("secondHalf")}</MainHeader>
        </Wrapper>
        <Wrapper>
          <Section Justify="space-around" Align="center" gap="10px">
            <Form.Item label="Start time">
              <TimePicker placeholder={t("selectTime") || "Select Time"} />
            </Form.Item>
            <Form.Item label="End time">
              <TimePicker placeholder={t("selectTime") || "Select Time"} />
            </Form.Item>
          </Section>

          <Section width="4%" style={{ backgroundColor: Colors.Primary }}>
            <Lunch>{t("break")} </Lunch>
          </Section>
          <Section Justify="space-around" Align="center">
            <Form.Item label={t("startTime")}>
              <TimePicker placeholder={t("selectTime") || "Select Time"} />
            </Form.Item>
            <Form.Item label={t("endTime")}>
              <TimePicker placeholder={t("selectTime") || "Select Time"} />
            </Form.Item>
          </Section>
        </Wrapper>

        <Form.Item>
          <Spacer />
          <Flex Justify="end">
            <Button text={t("update")} />
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default TimeTable;

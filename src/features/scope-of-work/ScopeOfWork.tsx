import { useState } from "react";
import { Col, Row, Radio, Form } from "antd";
import { ModalFooter } from "components/modal/BaseModal";
import styled from "styled-components";
import Button from "components/elements/Button";
import Select from "components/elements/Select";
import CheckBox from "components/elements/CheckBox";
import TextArea from "components/elements/Textarea";
import Table from "components/table/Table";
import Input from "components/elements/Input";
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Flex,
  Spacer,
} from "components/SharedStyles";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Colors from "styles/Colors";

const ContentFirst = styled.div`
  border: 1px solid ${Colors.Grey};
  width: 100%;
  padding: 10px 0px;
  font-size: 16px;
  box-shadow: 0 0 10px #0000001a;
  border-radius: 8px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Content = styled(Flex)`
  padding: 5px 20px;
  align-items: center;
`;

const CheckBoxAlign = styled.div`
  padding: 0px 40px;
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

const recomendationOptions = [
  {
    value: "Good",
    label: "Good",
  },
  {
    value: "Repair",
    label: "Repair",
  },
  {
    value: "Replace",
    label: "Replace",
  },
];

const workProcedureOptions = [
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

const fakeJson = [
  {
    jobId: "139",
    isDraft: "true",
    Questions: [
      {
        QuestionId: 1879,
        optionId: 3387,
        optionText: null,
        ParentId: 0,
        ParentType: "question",
      },
      {
        QuestionId: 1879,
        optionId: 3387,
        optionText: null,
        ParentId: 0,
        ParentType: "question",
      },
      {
        QuestionId: 1881,
        optionId: 3382,
        optionText: null,
        ParentId: 0,
        ParentType: "question",
      },
      {
        QuestionId: 1881,
        optionId: 3385,
        optionText: null,
        ParentId: 0,
        ParentType: "question",
      },
      {
        QuestionId: 1882,
        optionId: 3389,
        optionText: null,
        ParentId: 0,
        ParentType: "question",
      },
    ],
    ScopeOfWork: [
      {
        QuestionId: 1879,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1881,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1893,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1882,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
    ],
    StagesToUpdate: [],
  },
];

const ScopeOfWork = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useState<object>({});
  const [jobCode, setJobCode] = useState<boolean>(false);

  const [jobDetails, setJobDetails] = useState<object>({
    jobId: 140,
    isDraft: true,
    questions: [
      { QuestionId: 1879, optionId: 3387, optionText: null, ParentId: 0, ParentType: "" },
      { QuestionId: 1879, optionId: 3387, optionText: null, ParentId: 0, ParentType: "question" },
      { QuestionId: 1881, optionId: 3382, optionText: null, ParentId: 0, ParentType: "question" },
      { QuestionId: 1881, optionId: 3385, optionText: null, ParentId: 0, ParentType: "question" },
      { QuestionId: 1882, optionId: 3389, optionText: null, ParentId: 0, ParentType: "question" },
    ],
    ScopeOfWork: [
      {
        QuestionId: 1879,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1881,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1893,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
      {
        QuestionId: 1882,
        Recommendation: "",
        ProcedureTemplate: "0",
        AccessBy: "B",
        Comment: "",
        Order: "0",
      },
    ],
    StagesToUpdate: [],
  });

  const columns = [
    {
      title: t("inspectionDetail"),
      dataIndex: "inspectionDetail",
      key: "inspectionDetail",
      render: () => (
        <>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Content>
                    <Label> 1. </Label>
                    <Spacer />
                    <Label> {t("fanKeyAvailable")} </Label>
                  </Content>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <CheckBoxAlign>
                    <CheckBox text={t("yes") || "Yes"} checked={true} />
                    <CheckBox text={t("no") || "No"} />
                  </CheckBoxAlign>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: t("recommendation"),
      dataIndex: "recommendation",
      key: "recommendation",
      render: () => (
        <>
          <Spacer />
          <Row>
            <Col span={24}>
              <Select
                options={recomendationOptions}
                name="Select Recomendation"
                placeholder={t("pleaseSelectRecommendation") || "Please Select Recomendation"}
              />
              <Select
                options={workProcedureOptions}
                name="Select Work Procedure"
                placeholder={t("pleaseSelectWorkProcedure") || "Please Select Work Procedure"}
              />
              <TextArea placeholder={t("typeTheDescriptionHere") || "Type The Description Here"} />
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: t("accessTo"),
      dataIndex: "accessTo",
      key: "accessTo",
      render: () => (
        <>
          <Spacer />
          <Row>
            <Col span={24}>
              <Radio.Group defaultValue={3}>
                <Radio value={1}>{t("technician")}</Radio>
                <Spacer />
                <Radio value={2}>{t("customer")}</Radio>
                <Spacer />
                <Radio value={3} checked={true}>
                  {t("both")}
                </Radio>
              </Radio.Group>
              <Spacer />
              <Input value={0} />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  const onChangeJobCode = () => {
    setJobCode(true);
  };

  const CreateDraft = () => {
    if (jobCode === true) {
      alert("You have draft saved for this job. Click ok to load draft");
      setJobDetails(jobDetails);
    } else {
      alert("Select a job code first");
    }
  };

  const onSubmitDetails = () => {
    if (jobCode === true) {
      toast("Details Submitted");
    } else {
      toast("Something went wrong");
    }
  };

  return (
    <>
      <BreadcrumbContainer>
        <Row>
          <Col>
            <Breadcrumb separator=">">
              <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
              <BreadcrumbItem>{t("scopeOfWork")}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </BreadcrumbContainer>
      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Select
              options={options}
              name="Select Job Code"
              label={t("selectJobCode") || "Select Job Code"}
              required={true}
              placeholder={t("pleaseSelectJobCode") || "Please Select Job Code"}
              onChange={onChangeJobCode}
            />
            <Spacer />
          </Col>
        </Row>

        {jobCode && (
          <Row>
            <Col span={24}>
              <ContentFirst>
                <Row>
                  <Col span={12}>
                    <Content>
                      <Label> {t("jobType")} :</Label> On Site
                    </Content>
                  </Col>
                  <Col span={12}>
                    <Content>
                      <Label>{t("machineType")} :</Label> ABC - 3-Phase Motor
                    </Content>
                  </Col>

                  <Col span={12}>
                    <Content>
                      <Label>{t("machine")} :</Label> ABC - Induction Motor
                    </Content>
                  </Col>
                  <Col span={12}>
                    <Content>
                      <Label>{t("jobCode")} :</Label> J-1317093648
                    </Content>
                  </Col>

                  <Col span={12}>
                    <Content>
                      <Label>{t("clients")} :</Label> Adams Abgill
                    </Content>
                  </Col>
                  <Col span={12}>
                    <Content>
                      <Label>{t("startDate")} :</Label> 05/07/2021
                    </Content>
                  </Col>

                  <Col span={12}>
                    <Content>
                      <Label>{t("stage")} :</Label> Scope of Work
                    </Content>
                    <Spacer />
                  </Col>
                  <Col span={24}>
                    <Spacer />
                  </Col>
                </Row>
                <Col span={24}>
                  <ModalFooter Justify="end" gap="10px">
                    <Button text={t("createDraft")} onClick={CreateDraft} variant="primary" />
                    <Button text={t("submit")} variant="primary" onClick={onSubmitDetails} />
                  </ModalFooter>
                </Col>
              </ContentFirst>
              <Spacer />
            </Col>
          </Row>
        )}

        {/* <Divider /> */}

        {/* <ButtonAlignment>
        <Button text="Create Draft" onClick={CreateDraft} variant="primary" background="#04aa6d" />
        <Button text={t("submit")} variant="primary" onClick={onSubmitDetails} />
      </ButtonAlignment> */}

        {jobCode && <></>}
      </Form>
      {jobCode && (
        <Table
          dataSource={fakeJson}
          columns={jobCode ? columns : ""}
          sortDirections={["descend", "ascend", "descend"]}
          showSorterTooltip={false}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
        />
      )}
    </>
  );
};

export default ScopeOfWork;

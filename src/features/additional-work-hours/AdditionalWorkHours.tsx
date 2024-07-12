import { Breadcrumb } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Table from "components/table/Table";
import { ActiveBreadcrumbItem, BreadcrumbContainer, BreadcrumbItem } from "components/SharedStyles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconWrapper } from "features/global-code/GlobalCode";

const AdditionalWorkHours = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const fakeJson = [
    {
      description: "Please allow for additional hours",
      endTime: "2021-06-24T15:57:00",
      jobCode: "J-1335122200",
      JobId: 18,
      requestedDate: "2021-06-24T00:00:00",
      requestedBy: "Parshant Dutta",
      startTime: "2021-06-24T13:29:00",
    },
    {
      description: "Please allow for additional hours",
      endTime: "2021-06-24T15:57:00",
      jobCode: "J-1335122200",
      JobId: 18,
      requestedDate: "2021-06-24T00:00:00",
      requestedBy: "Parshant Dutta",
      startTime: "2021-06-24T13:29:00",
    },
    {
      description: "Please allow for additional hours",
      endTime: "2021-06-24T15:57:00",
      jobCode: "J-1335122200",
      JobId: 18,
      requestedDate: "2021-06-24T00:00:00",
      requestedBy: "Parshant Dutta",
      startTime: "2021-06-24T13:29:00",
    },
    {
      description: "Please allow for additional hours",
      endTime: "2021-06-24T15:57:00",
      jobCode: "J-1335122200",
      JobId: 18,
      requestedDate: "2021-06-24T00:00:00",
      requestedBy: "Parshant Dutta",
      startTime: "2021-06-24T13:29:00",
    },
  ];

  const handleChange = (pagination: any) => {
    setPage(pagination.current);
  };

  const columns = [
    {
      title: t("requestedBy"),
      dataIndex: "requestedBy",
      sorter: (a: any, b: any) => a.requestedBy - b.requestedBy,
    },
    {
      title: t("jobCode"),
      dataIndex: "jobCode",
      sorter: (a: any, b: any) => a.jobCode - b.jobCode,
    },
    {
      title: t("requestedDate"),
      dataIndex: "requestedDate",
      sorter: (a: any, b: any) => a.requestedDate - b.requestedDate,
    },
    {
      title: t("startTime"),
      dataIndex: "startTime",
      sorter: (a: any, b: any) => a.startTime - b.startTime,
    },
    {
      title: t("endTime"),
      dataIndex: "endTime",
      sorter: (a: any, b: any) => a.endTime - b.endTime,
    },
    {
      title: t("description"),
      dataIndex: "description",
      sorter: (a: any, b: any) => a.description - b.description,
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      render: (_: any) => (
        <>
          <IconWrapper>
            <CheckOutlined />
            <CloseOutlined />
          </IconWrapper>
        </>
      ),
    },
  ];

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb separator=">">
          <BreadcrumbItem color="black">{t("home")}</BreadcrumbItem>
          <ActiveBreadcrumbItem>{t("additionalWorkingHours")}</ActiveBreadcrumbItem>
        </Breadcrumb>
      </BreadcrumbContainer>

      <Table
        columns={columns}
        dataSource={fakeJson}
        onChange={handleChange}
        sortDirections={["descend", "ascend", "descend"]}
        showSorterTooltip={false}
        pagination={{
          pageSize: 5,
          current: page,
          showSizeChanger: false,
          hideOnSinglePage: true,
          // total: tableMeta?.pageSize,
        }}
      />
    </>
  );
};

export default AdditionalWorkHours;

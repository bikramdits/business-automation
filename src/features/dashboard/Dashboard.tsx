import { Col, Row } from "antd";
import { Count, DashboardTiles, PageHeading, TileHeader } from "components/SharedStyles";

export const Dashboard = () => {
  return (
    <>
      <PageHeading borderWidth="0"> Dashboard </PageHeading>
      <Row gutter={[10, 10]}>
        <Col xl={{ span: 6 }} xs={{ span: 12 }}>
          <DashboardTiles>
            <TileHeader>In Progress Jobs</TileHeader>
            <Count>4</Count>
          </DashboardTiles>
        </Col>
        <Col xl={{ span: 6 }} xs={{ span: 12 }}>
          <DashboardTiles color="#00ff00">
            <TileHeader>Completed Jobs</TileHeader>
            <Count color="#00ff00">6</Count>
          </DashboardTiles>
        </Col>
        <Col xl={{ span: 6 }} xs={{ span: 12 }}>
          <DashboardTiles color="#3151e1">
            <TileHeader>Halted Jobs</TileHeader>
            <Count color="#3151e1">3</Count>
          </DashboardTiles>
        </Col>
      </Row>
    </>
  );
};

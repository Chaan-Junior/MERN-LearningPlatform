import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  background: #fff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ color }) => color};
    transition: all 0.3s ease;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);

    &:before {
      height: 12px;
    }
  }
`;

const StatisticValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 28px;
  margin-right: 12px;
`;

const PriceChart = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <StyledCard color="#3f8600">
          <StatisticValue>
            <IconWrapper>
              <ArrowUpOutlined style={{ color: "#3f8600" }} />
            </IconWrapper>
            70000
          </StatisticValue>
          <Title
            level={5}
            style={{ fontSize: 20, fontWeight: 600, color: "#555" }}
          >
            Received Payments
          </Title>
        </StyledCard>
      </Col>
      <Col span={12}>
        <StyledCard color="#cf1322">
          <StatisticValue>
            <IconWrapper>
              <ArrowDownOutlined style={{ color: "#cf1322" }} />
            </IconWrapper>
            950000
          </StatisticValue>
          <Title
            level={5}
            style={{ fontSize: 20, fontWeight: 600, color: "#555" }}
          >
            Due Payments
          </Title>
        </StyledCard>
      </Col>
    </Row>
  );
};

export default PriceChart;

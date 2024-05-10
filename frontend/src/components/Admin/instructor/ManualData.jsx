import { Card, Col, Row, Statistic } from "antd";
import { LikeOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";

const ManualData = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Card>
        <Statistic
          title="ACTIVE COURSES"
          value={20000}
          valueStyle={{ color: "#1890ff" }}
          prefix={<BookOutlined />}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Card>
        <Statistic
          title="ENROLLED STUDENTS"
          value={100000}
          valueStyle={{ color: "#52c41a" }}
          prefix={<UserOutlined />}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Card>
        <Statistic
          title="NO OF INSTRUCTORS"
          value={45000}
          valueStyle={{ color: "#f5222d" }}
          prefix={<LikeOutlined />}
        />
      </Card>
    </Col>
  </Row>
);

export default ManualData;

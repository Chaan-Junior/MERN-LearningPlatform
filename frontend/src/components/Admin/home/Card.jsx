import { Card, Col } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url("https://img.freepik.com/free-vector/confused-woman-working-laptop-cartoon-icon-illustration-people-technology-icon-concept_138676-2125.jpg?t=st=1715010964~exp=1715014564~hmac=f61099482b1e1624a80d2b1fb3def6ebf543a14f268a1b78e336394fa4ea3e45&w=740");
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span {
    margin-left: 8px;
    cursor: pointer;
    font-size: 18px;
    color: #999;
    transition: color 0.3s ease;

    &:hover {
      color: #333;
    }
  }
`;

const Cards = () => (
  <Col xs={24} sm={12} md={8} lg={6}>
    <StyledCard>
      <CardImage />
      <CardContent>
        <CardTitle>Web Development</CardTitle>
        <CardDescription>
          Basic Introduction course to Web Development
        </CardDescription>
        <CardActions>
        </CardActions>
      </CardContent>
    </StyledCard>
  </Col>
);

export default Cards;

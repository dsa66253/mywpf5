import { Carousel, Image, Row, Col } from "antd";
import campus1 from "../../assets/campus1.jpeg";
import campus2 from "../../assets/campus2.jpeg";
import campus3 from "../../assets/campus3.jpg";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <>
      <Row >
   
      <Col span={8}></Col>
        <Col span={8}>
          <Carousel autoplay>
            <div><Image  height={500} src={campus1} /></div>
            <div><Image height={500} src={campus2} /></div>
            <div><Image height={500} src={campus3} /></div>
          </Carousel>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export { Home };

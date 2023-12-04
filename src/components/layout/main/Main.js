import React from "react";
import { Layout } from "antd";
import "./Main.css";
import Container from "@material-ui/core/Container";

const Main = ({ routingData, role }) => {
  const { Content } = Layout;
  return (
    <>
      <Layout>
        <Content className="mainContainer">
          <Container maxWidth="lg"></Container>
        </Content>
      </Layout>
    </>
  );
};

export default Main;

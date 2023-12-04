import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/layout/header/Header";
import Sidebar from "../../../components/layout/sidebar/Sidebar";
import { Row, Col } from "react-bootstrap";

const Main = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              //   style={{
              //     width: "100%",
              //   }}
              //   className="d-flex gap-4"
            >
              <Sidebar />
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Main;

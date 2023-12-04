import React from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchAdmin.css";
import { Paper } from "../../components/elements";
const BranchAdmin = () => {
  return (
    <>
      <section className="SectionBranch-Admin">
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span>
              Shift<span> (Saudi Arabia - Riyadh)</span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span>Olaya Street Branch</span>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Paper></Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default BranchAdmin;

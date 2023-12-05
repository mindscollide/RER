import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchServices.css";
import { Paper, Button, Table } from "../../components/elements";
import { Switch } from "antd";

const CityBranchService = () => {
  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      shiftName: (
        <span className="table-inside-text">
          Subsequence Transaction Service Before First Registry
        </span>
      ),
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">Services</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
      align: "left",
    },

    {
      title: <span className="table-text">Branch Availability</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch />
        </span>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              City Branch Wise Service
              <span className="shift-sub-heading">
                {" "}
                (Saudi Arabia - Riyadh)
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">Olaya Street Branch</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityBranchWise-Admin-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-CityBranchWise"
                >
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text="Save"
                    className="save-btn-CityBranchWise"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text="Revert"
                    className="revert-btn-CityBranchWise"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={dataSource}
                    column={columns}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CityBranchService;

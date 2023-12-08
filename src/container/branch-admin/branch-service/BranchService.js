import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchService.css";
import { Paper, TextField, Button, Table } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const BranchService = () => {
  const { t } = useTranslation();

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
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },

    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
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
    {
      title: <span className="table-text">{t("Service-slot-minutes")}</span>,
      dataIndex: "column6",
      key: "column6",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <>
          <span style={{ display: "inline-block", width: "75px" }}>
            <TextField type={"number"} labelClass="d-none" height={"20px"} />
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="SectionBranchService-Admin">
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {t("Olaya-street-branch")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="BranchService-Admin-paper">
              <Row>
                <Col lg={12} md={12} sm={12} className="btn-col-class">
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-BranchService"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-BranchService"
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

export default BranchService;
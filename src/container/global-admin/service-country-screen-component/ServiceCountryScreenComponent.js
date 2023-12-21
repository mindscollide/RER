import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ServiceCountryScreenComponent.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const ServiceCountryScreenComponent = ({ closeServiceCountryScreen }) => {
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
      title: <span className="table-text">{t("Service-name")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch checked={true} />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "column6",
      key: "column6",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch checked={true} />
        </span>
      ),
    },
  ];

  return (
    <>
      <section className="SectionBranchService-Admin">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              <i
                className="icon-back go-back-arrow"
                onClick={closeServiceCountryScreen}
              ></i>
              {t("Country-wise-service-availability")}
              <span className="shift-sub-heading ms-2">
                {t("Saudi-arabia")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Service-Country-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-serviceCountry-screen"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-Service-Country"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-Service-Country"
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

export default ServiceCountryScreenComponent;

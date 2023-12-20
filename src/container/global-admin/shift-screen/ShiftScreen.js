import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ShiftScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const ShiftScreen = () => {
  const { t } = useTranslation();

  const dataSource = [
    {
      id: 1,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
    {
      id: 2,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
    {
      id: 3,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Country")}</span>,
      dataIndex: "Country",
      key: "Country",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("City")}</span>,
      dataIndex: "City",
      key: "City",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Branch-name")}</span>,
      dataIndex: "branchName",
      key: "branchName",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shift",
      key: "shift",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
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
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("City-wise-service-availability")}
              <span className="shift-sub-heading">
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Shift-screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Country")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      // className="Shift-screen-select"
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      // className="Shift-screen-select"
                    />
                  </span>
                </Col>
              </Row>
              <Row className="mx-auto d-flex align-items-center justify-content-center mt-3">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      // className="Shift-screen-select"
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      // className="Shift-screen-select"
                    />
                  </span>
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
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

export default ShiftScreen;

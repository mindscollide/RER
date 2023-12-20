import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const CityScreen = () => {
  const { t } = useTranslation();

  const dataSource = [
    {
      id: 1,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
    },
    {
      id: 2,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
    },
    {
      id: 3,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
      City: <span className="table-inside-text">Riyadh</span>,
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
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch />
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
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="City-Screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Country")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={2} md={2} sm={12} className="mt-3">
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

export default CityScreen;

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseEmployee.css";
import { Paper, Table, Button } from "../../../components/elements";
import Select from "react-select";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const CountryWiseEmployee = () => {
  const { t } = useTranslation();

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">Zahid</span>,
      Capacity: <span className="table-inside-text">Branch Employee</span>,
    },
    {
      id: 2,
      shiftName: <span className="table-inside-text">Ahmed</span>,
      Capacity: <span className="table-inside-text">Branch Employee</span>,
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">Rafiq</span>,
      Capacity: <span className="table-inside-text">Branch Employee</span>,
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
      title: <span className="table-text">{t("Capacity")}</span>,
      dataIndex: "Capacity",
      key: "Capacity",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Enabled")}</span>,
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
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Country-city-wise-employees")}
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
            <Paper className="CountryEmployee-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col lg={3} md={3} sm={12} />
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">{t("City")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={3} md={3} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                </Col>
                <Col lg={2} md={2} sm={12} />
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

export default CountryWiseEmployee;

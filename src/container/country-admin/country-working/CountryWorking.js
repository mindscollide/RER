import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWorking.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const CountryWorking = () => {
  const { t } = useTranslation();
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">Sunday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch defaultChecked onChange={onChange} />
        </span>
      ),
    },
    {
      id: 2,
      shiftName: <span className="table-inside-text">Monday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch defaultChecked onChange={onChange} />
        </span>
      ),
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">Tuesday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch defaultChecked onChange={onChange} />
        </span>
      ),
    },
    {
      id: 4,
      shiftName: <span className="table-inside-text">Wednesday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch defaultChecked onChange={onChange} />
        </span>
      ),
    },
    {
      id: 5,
      shiftName: <span className="table-inside-text">Thursday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch defaultChecked onChange={onChange} />
        </span>
      ),
    },
    {
      id: 6,
      shiftName: <span className="table-inside-text"> Friday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch />
        </span>
      ),
    },
    {
      id: 7,
      shiftName: <span className="table-inside-text">Saturday</span>,
      column6: (
        <span className="table-inside-text">
          <Switch />
        </span>
      ),
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Day")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },

    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "column6",
      key: "column6",
      width: "200px",
    },
  ];

  return (
    <>
      <section className="SectionBranchService-Admin">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Country-working-days")}
              <span className="shift-sub-heading ms-2">
                {t("Saudi-arabia")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Country-working-paper">
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={dataSource}
                    column={columns}
                    pagination={false}
                  />
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
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-Country-working"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-Country-working"
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

export default CountryWorking;

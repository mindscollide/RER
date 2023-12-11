import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./NationalHoliday.css";
import { Paper, Button, Table } from "../../../components/elements";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const NationalHoliday = () => {
  const { t } = useTranslation();

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">10-Aug-23</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      shiftName: <span className="table-inside-text">9-Aug-23</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">8-Aug-23</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Date")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },

    {
      title: "",
      dataIndex: "close",
      key: "close",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i className="icon-trash icon-close-style-delete"></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("National-holidays-list")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="NationalHoliday-Admin-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-NationalHoliday"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-NationalHoliday"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-NationalHoliday"
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

export default NationalHoliday;

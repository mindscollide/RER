import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryAdminMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";

const CountryAdminMain = () => {
  const { t } = useTranslation();
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      align: "left",
    },
    {
      title: <span className="table-text">{t("Start-time")}</span>,
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i className="icon-check icon-check-color"></i>
          </span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "column6",
      key: "column6",
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i className="icon-close icon-EDT-DLT-color"></i>
            <i className="icon-settings icon-EDT-DLT-color"></i>
            <i className="icon-branch icon-EDT-DLT-color"></i>
            <i className="icon-counter icon-EDT-DLT-color"></i>
            <i className="icon-user icon-EDT-DLT-color"></i>
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
              {t("City")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CountryAdmin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("City-name")}</span>
                  <TextField
                    name="Branch Name"
                    placeholder={t("Branch-admin")}
                    labelClass="d-none"
                    className="text-fiels-CountryAdmin"
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("City-name")}</span>
                  <TextField
                    name="Branch Name"
                    placeholder={t("Branch-admin")}
                    labelClass="d-none"
                    className="text-fiels-CountryAdmin"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={6} md={6} sm={6} className="mt-1">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="CountryAdmin-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-class-CountryAdmin">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-CountryAdmin"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-CountryAdmin"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
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

export default CountryAdminMain;

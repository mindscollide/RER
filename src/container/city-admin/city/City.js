import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./City.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useTranslation } from "react-i18next";

const CityAdmin = () => {
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
            <i className="icon-close icon-EDT-DLT-color"></i>
            <i className="icon-settings icon-EDT-DLT-color"></i>
            <i className="icon-repeat icon-EDT-DLT-color"></i>
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
              {t("Branch")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityAdmin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Branch-name")}</span>
                  <TextField
                    name="Branch Name"
                    placeholder={t("Branch-admin")}
                    labelClass="d-none"
                    className="text-fiels-cityAdmin"
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">
                    {t("Branch-start-time")}
                  </label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("Branch-end-time")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col lg={6} md={6} sm={6}>
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="CityAdmin-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-class-CityAdmin">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-CityAdmin"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-CityAdmin"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={dataSource}
                    column={columns}
                    pagination={false}
                    // className="table-text"
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

export default CityAdmin;

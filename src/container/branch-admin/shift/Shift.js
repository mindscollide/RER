import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Shift.css";
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
import { getAllShiftsOfBranch } from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const BranchAdmin = () => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = localStorage.getItem("i18nextLng");
  const branchesList = useSelector((state) => state.admin.branchesList);
  const [rows, setRows] = useState([]);

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  useEffect(() => {
    dispatch(getAllShiftsOfBranch(t, navigate));
  }, []);

  useEffect(() => {
    if (branchesList !== null) {
      setRows(branchesList);
    }
  }, [branchesList]);

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "shiftID",
      key: "shiftID",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: lang === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      key: lang === "en" ? "shiftNameEnglish" : "shiftNameArabic",
    },
    {
      title: <span className="table-text">{t("Start-time")}</span>,
      dataIndex: "shiftStartTime",
      key: "shiftStartTime",
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "shiftEndTime",
      key: "shiftEndTime",
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isShiftActive",
      key: "isShiftActive",
      align: "center",
      render: (text, record) => (
        <>
          {text ? (
            <span>
              <i className="icon-check icon-check-color"></i>
            </span>
          ) : (
            <span>
              <i className="icon-close icon-check-close-color"></i>
            </span>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "column6",
      key: "column6",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i className="icon-close icon-EDT-DLT-color"></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Shift")}
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
            <Paper className="Branch-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="Shift"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-Branch"
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="Shift"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-Branch"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={2} md={2} sm={2} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Branch-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>
                <Col lg={5} md={5} sm={5} className="col-for-date-timepicker">
                  <label className="text-labels">{t("Shift-start-time")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                </Col>

                <Col lg={5} md={5} sm={5} className="col-for-date-timepicker">
                  <label className="text-labels">{t("Shift-end-time")}</label>
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
                <Col lg={12} md={12} sm={12} className="btn-class-branch">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-Branch"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-Branch"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table rows={rows} column={columns} pagination={false} />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default BranchAdmin;

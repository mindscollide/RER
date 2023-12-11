import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CounterMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Loader,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { getAllCountersOfBranch } from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CounterMain = () => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = localStorage.getItem("i18nextLng");
  const local = lang === "en" ? "en-US" : "ar-SA";
  const allCountersOfBranchList = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );
  const Loading = useSelector((state) => state.Loader.Loading);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getAllCountersOfBranch(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (allCountersOfBranchList !== null) {
      setRows(allCountersOfBranchList);
    }
  }, [allCountersOfBranchList]);

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };



  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "counterID",
      key: "counterID",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: lang === "en" ? "counterNameEnglish" : "counterNameArabic",
      key: lang === "en" ? "counterNameEnglish" : "counterNameArabic",
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCounterActive",
      key: "isCounterActive",
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
              {t("Counters")}
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
            <Paper className="Counter-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="Shift"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-counterMain"
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="Shift"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-counterMain"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={6} md={6} sm={6} className="mt-2">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-col-class">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-Counter"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-Branch"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={rows}
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

export default CounterMain;

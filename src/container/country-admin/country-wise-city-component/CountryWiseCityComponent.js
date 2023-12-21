import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseCityComponent.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Switch } from "antd";

const CountryWiseCityComponent = ({ goBackButtonCountryOnclick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [rows, setRows] = useState([]);

  const onClickBackButton = () => {
    navigate("/CountryAdmin/City");
  };

  const columnsCityWise = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      width: "400px",
      dataIndex: "citySM",
      key: "citySM",

      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.citySM.serviceNameEnglish
            : record.citySM.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={text} />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={text} />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-Visit-Charges")}</span>,
      dataIndex: "homeVisit",
      key: "homeVisit",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
          />
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
              <i
                className="icon-back go-back-arrow"
                onClick={goBackButtonCountryOnclick}
              ></i>
              {t("City-wise-service-availability")}
              <span className="shift-sub-heading">
                {" "}
                {currentLanguage === "en"
                  ? "(" +
                    localStorage.getItem("countryName") +
                    " " +
                    "-" +
                    " " +
                    localStorage.getItem("cityName") +
                    ")"
                  : "(" +
                    localStorage.getItem("countryNameArabic") +
                    " " +
                    "-" +
                    " " +
                    localStorage.getItem("cityNameArabic") +
                    ")"}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Country-City-Wise-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-city-service"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-Country-City-Wise"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-Country-City-Wise"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={rows}
                    column={columnsCityWise}
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

export default CountryWiseCityComponent;

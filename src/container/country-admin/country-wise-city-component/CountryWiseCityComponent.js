import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseCityComponent.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResponseMessageAdmin,
  getCityServiceListApi,
  updateCityServiceListApi,
} from "../../../store/actions/Admin_action";
import { useNavigate } from "react-router";
import { Switch } from "antd";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const CountryWiseCityComponent = ({
  goBackButtonCountryOnclick,
  setRows,
  rows,
  columnsCityWise,
  handleRevert,
  handleSave,
  countryNotification,
  setCountryNotification,
  responseMessage,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );
  console.log(cityServiceListData, "cityServiceListData");

  //state for current language
  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCityServiceList_01")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCityServiceList_01"
            ),
            severity: "success",
          }),
          3000
        );
      }
    }
    dispatch(clearResponseMessageAdmin(null));
  }, [responseMessage]);

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
                    " -" +
                    " " +
                    localStorage.getItem("cityNameEnglish") +
                    ")"
                  : "(" +
                    localStorage.getItem("countryNameArabic") +
                    ")" +
                    "(" +
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
                    onClick={handleRevert}
                    className="revert-btn-Country-City-Wise"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={handleSave}
                    className="save-btn-Country-City-Wise"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <div className="top-background-color">
                    <Row>
                      <Col lg={6} md={6} sm={6} />
                      <Col
                        lg={6}
                        md={6}
                        sm={6}
                        className="d-flex justify-content-center"
                      >
                        <span className="table-above-header-text">
                          {t("Home-visit-settings")}
                        </span>
                      </Col>
                    </Row>
                    <Table
                      rows={rows}
                      column={columnsCityWise}
                      pagination={false}
                      className="specific-header"
                    />
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Notification
        show={countryNotification.notificationFlag}
        hide={setCountryNotification}
        message={countryNotification.notificationMessage}
        severity={countryNotification.severity}
        notificationClass={
          countryNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CountryWiseCityComponent;

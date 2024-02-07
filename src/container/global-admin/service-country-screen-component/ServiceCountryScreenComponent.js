import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ServiceCountryScreenComponent.css";
import {
  Paper,
  Table,
  Button,
  Notification,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { clearResponseMessageAdmin } from "../../../store/actions/Admin_action";
import { useDispatch } from "react-redux";

const ServiceCountryScreenComponent = ({
  closeServiceCountryScreen,
  revertServiceCountryHandler,
  ServiceCountryColumn,
  saveServiceCountryHandler,
  countryRow,
  setCountryMainNotification,
  countryMainNotification,
  responseMessage,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCountryServicesList_01")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryServicesList_01"
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
      <section className="SectionBranchService-Admin">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              <i
                className="icon-back go-back-arrow"
                onClick={closeServiceCountryScreen}
              ></i>
              {t("Country-wise-service-availability")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Service-Country-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-serviceCountry-screen"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    onClick={revertServiceCountryHandler}
                    className="revert-btn-Service-Country"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={saveServiceCountryHandler}
                    className="save-btn-Service-Country"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={countryRow}
                    column={ServiceCountryColumn}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Notification
        show={countryMainNotification.notificationFlag}
        hide={setCountryMainNotification}
        message={countryMainNotification.notificationMessage}
        severity={countryMainNotification.severity}
        notificationClass={
          countryMainNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default ServiceCountryScreenComponent;

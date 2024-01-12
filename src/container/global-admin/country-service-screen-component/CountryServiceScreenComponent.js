import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryServiceScreenComponent.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const CountryServiceScreenComponent = ({
  goBackServiceCountryButton,
  columnsWiseCountry,
  countryWiseRow,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              <i
                className="icon-back go-back-arrow"
                onClick={goBackServiceCountryButton}
              ></i>
              {t("Country-wise-service-availability")}
            </span>
          </Col>
        </Row>

        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-start ms-4 mt-3"
          >
            <span className="shift-sub-heading">
              {t("First-registry-service")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Country-Service-Screen-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-Country-Service-Screen"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-Country-Service-Screen"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-Country-Service-Screen"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={countryWiseRow}
                    column={columnsWiseCountry}
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

export default CountryServiceScreenComponent;

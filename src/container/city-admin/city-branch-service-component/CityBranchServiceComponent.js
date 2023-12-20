import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Paper, Button, Table } from "../../../components/elements";
import { useTranslation } from "react-i18next";
import "./CityBranchServiceComponent.css";

const CityBranchServiceComponent = ({
  cityBranchRows,
  setCityBranchRows,
  cityWiseColumns,
  revertHandler,
  handleSaveCityBranchWise,
  goBackButtonOnclick,
}) => {
  const { t } = useTranslation();

  console.log("cityBranchRowscityBranchRows", cityBranchRows);

  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
          <span className="shift-heading">
            <i
              className="icon-back go-back-arrow"
              onClick={goBackButtonOnclick}
            ></i>
            {t("City-branch-wise-service")}
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
          <Paper className="CityBranchWise-Admin-paper">
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="btn-col-class-CityBranchWise"
              >
                <Button
                  icon={<i className="icon-save icon-space"></i>}
                  text={t("Save")}
                  onClick={handleSaveCityBranchWise}
                  className="save-btn-CityBranchWise"
                />
                <Button
                  icon={<i className="icon-repeat icon-space"></i>}
                  text={t("Revert")}
                  onClick={revertHandler}
                  className="revert-btn-CityBranchWise"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Table
                  rows={cityBranchRows}
                  column={cityWiseColumns}
                  pagination={false}
                />
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default CityBranchServiceComponent;

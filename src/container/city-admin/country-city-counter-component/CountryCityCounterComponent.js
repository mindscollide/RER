import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "./CountryCityCounterComponent.css";

const CountryCityCounterComponent = ({
  countryCityWiseColumn,
  countryCityWiseData,
  goBackCountryCounter,
}) => {
  const { t } = useTranslation();
  const { Panel } = Collapse;

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenCountry, setIsPanelOpenCountry] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelCountry = () => {
    setIsPanelOpenCountry(!isPanelOpenCountry);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
          <span className="shift-heading">
            <i
              className="icon-back go-back-arrow"
              onClick={goBackCountryCounter}
            ></i>
            {t("Country-level-shift-and-counter-details")}
            <span className="shift-sub-heading">
              {" "}
              {t("Saudi-arabia-riyadh")}
            </span>
          </span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <Paper className="CountryCityWise-paper">
            <Row className="mx-auto d-flex align-items-center justify-content-center">
              <Col lg={4} md={4} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("City")}</label>
                  <Select isSearchable={true} className="select-dropdown-all" />
                </span>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("Branch")}</label>
                  <Select isSearchable={true} className="select-dropdown-all" />
                </span>
              </Col>
              <Col lg={2} md={2} sm={12} className="mt-3">
                <Button
                  icon={<i className="icon-search city-icon-space"></i>}
                  text={t("Search")}
                  className="Search-Icon-Btn"
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Collapse
                  bordered={false}
                  className="collapse-Country-Wise-disable-bg"
                  expandIcon={false}
                >
                  <Panel
                    header={
                      <div
                        className={`Country-Wise-collapse-bg-color ${
                          isPanelOpen ? "open" : ""
                        }`}
                        onClick={togglePanel}
                      >
                        <span className="toggle-tiles">{t("Riyadh")}</span>
                        {isPanelOpen ? (
                          <i
                            className={"icon-arrow-up Country-wise-collapse"}
                          ></i>
                        ) : (
                          <i
                            className={"icon-arrow-down Country-wise-collapse"}
                          ></i>
                        )}
                      </div>
                    }
                    key="1"
                  >
                    <Table
                      column={countryCityWiseColumn}
                      rows={countryCityWiseData}
                      pagination={false}
                      className="div-table-country-wise"
                    />
                  </Panel>
                </Collapse>
              </Col>
            </Row>

            <Row>
              <Col lg={12} md={12} sm={12}>
                <Collapse
                  bordered={false}
                  className="collapse-Country-Wise-disable-bg"
                  expandIcon={false}
                >
                  <Panel
                    header={
                      <div
                        className={`Country-Wise-collapse-bg-color ${
                          isPanelOpenCountry ? "open" : ""
                        }`}
                        onClick={togglePanelCountry}
                      >
                        <span className="toggle-tiles">{t("Dammam")}</span>
                        {isPanelOpenCountry ? (
                          <i
                            className={"icon-arrow-up Country-wise-collapse"}
                          ></i>
                        ) : (
                          <i
                            className={"icon-arrow-down Country-wise-collapse"}
                          ></i>
                        )}
                      </div>
                    }
                    key="1"
                  >
                    <Table
                      column={countryCityWiseColumn}
                      rows={countryCityWiseData}
                      pagination={false}
                      className="div-table-country-wise"
                    />
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default CountryCityCounterComponent;

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityWise.css";
import { Paper, Button, Table } from "../../components/elements";
import { Collapse } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const CountryCityWise = () => {
  const { t } = useTranslation();

  const { Panel } = Collapse;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenCountry, setIsPanelOpenCountry] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelCountry = () => {
    setIsPanelOpenCountry(!isPanelOpenCountry);
  };

  const dataSource = [
    {
      id: 1,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 3,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 4,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const columns = [
    {
      title: <span>{t("Branch-name")}</span>,
      dataIndex: "branchName",
      key: "branchName",
      width: "250px",
      align: "left",
    },
    {
      title: <span>{t("Counter-name")}</span>,
      dataIndex: "counterName",
      key: "counterName",
      align: "center",
    },
    {
      title: <span>{t("Shift")}</span>,
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: <span>{t("Service")}</span>,
      dataIndex: "service",
      key: "service",
      align: "center",
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
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
                    <label>Tag Name</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      isSearchable={true}
                      className="CountryCityWise"
                    />
                  </span>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label>Tag Name</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      isSearchable={true}
                      className="CountryCityWise"
                    />
                  </span>
                </Col>
                <Col lg={2} md={2} sm={12} className="mt-4">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Country-Wise-Icon-Btn"
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
                              className={
                                "icon-arrow-down Country-wise-collapse"
                              }
                            ></i>
                          )}
                        </div>
                      }
                      key="1"
                    >
                      <Table
                        column={columns}
                        rows={dataSource}
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
                              className={
                                "icon-arrow-down Country-wise-collapse"
                              }
                            ></i>
                          )}
                        </div>
                      }
                      key="1"
                    >
                      <Table
                        column={columns}
                        rows={dataSource}
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
      </section>
    </>
  );
};

export default CountryCityWise;

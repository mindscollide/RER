import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityWiseShift.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const CountryCityWiseShift = () => {
  const { Panel } = Collapse;
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenTwo, setIsPanelOpenTwo] = useState(false);
  const [isPanelOpenThree, setIsPanelOpenThree] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelTwo = () => {
    setIsPanelOpenTwo(!isPanelOpenTwo);
  };

  const togglePanelThree = () => {
    setIsPanelOpenThree(!isPanelOpenThree);
  };

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      shiftName: (
        <span className="table-inside-text">
          Subsequence Transaction Service Before First Registry
        </span>
      ),
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },

    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={true} disabled />
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
              {t("City-branch-wise-shifts")}
              <span className="shift-sub-heading ms-2">
                {currentLanguage === "en"
                  ? "(" + localStorage.getItem("countryName") + ")"
                  : "(" + localStorage.getItem("countryNameArabic") + ")"}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CountryCityShift-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
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

              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    className="collapse-disable-bg"
                    expandIcon={false}
                  >
                    <Panel
                      header={
                        <div
                          className={`collapse-bg-color ${
                            isPanelOpen ? "open" : ""
                          }`}
                          onClick={togglePanel}
                        >
                          <span className="toggle-tiles">{t("Name")}</span>

                          {isPanelOpen ? (
                            <i
                              className={"icon-arrow-up icon-size-of-collapse"}
                            ></i>
                          ) : (
                            <i
                              className={
                                "icon-arrow-down icon-size-of-collapse"
                              }
                            ></i>
                          )}
                        </div>
                      }
                      key="1"
                    >
                      <Row className="mb-3">
                        <Col lg={6} md={6} sm={6}>
                          <span className="toggle-insidetile-available">
                            {t("Available")}
                          </span>
                        </Col>
                        <Col
                          lg={6}
                          md={6}
                          sm={6}
                          className="d-flex justify-content-end"
                        >
                          <Switch checked={true} disabled />
                        </Col>
                      </Row>
                      <Table
                        column={columns}
                        rows={dataSource}
                        pagination={false}
                      />
                    </Panel>
                  </Collapse>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["2"]}
                    className="collapse-disable-bg"
                    expandIcon={false}
                  >
                    <Panel
                      header={
                        <div
                          className={`collapse-bg-color ${
                            isPanelOpenTwo ? "open" : ""
                          }`}
                          onClick={togglePanelTwo}
                        >
                          <span className="toggle-tiles">{t("Name")}</span>

                          {isPanelOpenTwo ? (
                            <i
                              className={"icon-arrow-up icon-size-of-collapse"}
                            ></i>
                          ) : (
                            <i
                              className={
                                "icon-arrow-down icon-size-of-collapse"
                              }
                            ></i>
                          )}
                        </div>
                      }
                      key="1"
                    >
                      <Row className="mb-3">
                        <Col lg={6} md={6} sm={6}>
                          <span className="toggle-insidetile-available">
                            {t("Available")}
                          </span>
                        </Col>
                        <Col
                          lg={6}
                          md={6}
                          sm={6}
                          className="d-flex justify-content-end"
                        >
                          <Switch checked={true} disabled />
                        </Col>
                      </Row>
                      <Table
                        column={columns}
                        rows={dataSource}
                        pagination={false}
                      />
                    </Panel>
                  </Collapse>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["3"]}
                    className="collapse-disable-bg"
                    expandIcon={false}
                  >
                    <Panel
                      header={
                        <div
                          className={`collapse-bg-color ${
                            isPanelOpenThree ? "open" : ""
                          }`}
                          onClick={togglePanelThree}
                        >
                          <span className="toggle-tiles">{t("Name")}</span>

                          {isPanelOpenThree ? (
                            <i
                              className={"icon-arrow-up icon-size-of-collapse"}
                            ></i>
                          ) : (
                            <i
                              className={
                                "icon-arrow-down icon-size-of-collapse"
                              }
                            ></i>
                          )}
                        </div>
                      }
                      key="1"
                    >
                      <Row className="mb-3">
                        <Col lg={6} md={6} sm={6}>
                          <span className="toggle-insidetile-available">
                            {t("Available")}
                          </span>
                        </Col>
                        <Col
                          lg={6}
                          md={6}
                          sm={6}
                          className="d-flex justify-content-end"
                        >
                          <Switch checked={true} disabled />
                        </Col>
                      </Row>
                      <Table
                        column={columns}
                        rows={dataSource}
                        pagination={false}
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

export default CountryCityWiseShift;

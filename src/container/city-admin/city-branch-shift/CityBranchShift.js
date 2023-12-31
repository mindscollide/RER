import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchShift.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";

const CityBranchShift = () => {
  const { Panel } = Collapse;
  const { t } = useTranslation();

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
          <Switch />
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
              {t("City-branch-wise-service")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityBranchShift-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col lg={3} md={3} sm={12} />
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">
                      {t("Branch")}
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={3} md={3} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                </Col>
                <Col lg={2} md={2} sm={12} />
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
                          <span className="toggle-tiles">
                            {t("Shift-morning")}
                          </span>

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
                          <Switch />
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
                          <span className="toggle-tiles">
                            {t("Shift-afternoon")}
                          </span>

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
                          <Switch />
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
                          <span className="toggle-tiles">
                            {t("Shift-evening")}
                          </span>

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
                          <Switch />
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

export default CityBranchShift;

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchShift.css";
import { Paper, Button, Table } from "../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const CityBranchShift = () => {
  const { Panel } = Collapse;
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
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
      align: "left",
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
              <Row>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-end"
                >
                  <label className="text-labels">{t("Branch")}</label>
                </Col>
                <Col lg={8} md={8} sm={8} />
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="CityBranchShift-col">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isSearchable={true}
                    className="citywisebranchwiseselector"
                  />
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={"Search"}
                    className="Search-Icon-Btn"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1"]}
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
                            isPanelOpen ? "open" : ""
                          }`}
                          onClick={togglePanel}
                        >
                          <span className="toggle-tiles">
                            {t("Shift-afternoon")}
                          </span>
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
                            isPanelOpen ? "open" : ""
                          }`}
                          onClick={togglePanel}
                        >
                          <span className="toggle-tiles">
                            {t("Shift-evening")}
                          </span>
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

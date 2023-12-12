import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityWiseCounter.css";
import { Paper, Button, Table } from "../../../components/elements";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const CityWiseCounter = () => {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const dataSource = [
    {
      id: 1,
      counterName: <span className="table-inside-text">Counter 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      counterName: <span className="table-inside-text">Counter 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 3,
      counterName: <span className="table-inside-text">Counter 3</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 4,
      counterName: <span className="table-inside-text">Counter 4</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 5,
      counterName: <span className="table-inside-text">Counter 5</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 6,
      counterName: <span className="table-inside-text">Counter 6</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 7,
      counterName: <span className="table-inside-text">Counter 7</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 8,
      counterName: <span className="table-inside-text">Counter 8</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 9,
      counterName: <span className="table-inside-text">Counter 9</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const columns = [
    {
      title: (
        <span className="table-inside-header-text-new">
          {t("Counter-name")}
        </span>
      ),
      dataIndex: "counterName",
      key: "counterName",
      width: "400px",
    },
    {
      title: (
        <span className="table-inside-header-text-new">{t("Service")}</span>
      ),
      dataIndex: "service",
      key: "service",
      width: "200px",
      align: "center",
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("City-branch-shift-wise-counters")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityWiseCounter-paper">
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
                      className="CityWiseCounterselector"
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
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="CitywiseCounter-div-row"
                >
                  <span>Shift 1</span>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table
                    pagination={false}
                    column={columns}
                    rows={dataSource}
                    className="div-table-counter"
                    // scroll={{ x: 500, y: 500 }}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="CitywiseCounter-div-row"
                >
                  <span>Shift 2</span>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table
                    pagination={false}
                    column={columns}
                    rows={dataSource}
                    className="div-table-counter"
                    // scroll={{ x: 500, y: 500 }}
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

export default CityWiseCounter;

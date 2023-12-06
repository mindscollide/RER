import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityWiseCounter.css";
import { Paper, Button, Table } from "../../components/elements";
import Select from "react-select";

const CityWiseCounter = () => {
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
      title: "Counter Name",
      dataIndex: "counterName",
      key: "counterName",
      width: "400px",
      align: "left",
    },
    {
      title: "Service",
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
              City Branch Shift Wise Counters
              <span className="shift-sub-heading">
                {" "}
                (Saudi Arabia - Riyadh)
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityWiseCounter-paper">
              <Row>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-end"
                >
                  <label className="text-labels">Branch</label>
                </Col>
                <Col lg={8} md={8} sm={8} />
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="CityWiseCounter-col">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isSearchable={true}
                    className="CityWiseCounterselector"
                  />
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={"Search"}
                    className="Search-Icon-Btn"
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

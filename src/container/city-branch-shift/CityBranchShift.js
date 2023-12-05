import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchShift.css";
import { Paper, Button, Table } from "../../components/elements";
import { Collapse, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Select from "react-select";
const { Panel } = Collapse;

const CityBranchShift = () => {
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

  const tableColumns = [
    {
      title: "Attribute 1",
      dataIndex: "attribute1",
      key: "attribute1",
    },
    {
      title: "Attribute 2",
      dataIndex: "attribute2",
      key: "attribute2",
    },
    {
      title: "Attribute 3",
      dataIndex: "attribute3",
      key: "attribute3",
    },
  ];

  const tableData = [
    {
      key: "1",
      attribute1: "Value 1",
      attribute2: "Value 2",
      attribute3: "Value 3",
    },
    // Add more data as needed
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              City Branch Wise Shifts
              <span className="shift-sub-heading">
                {" "}
                (Saudi Arabia - Riyadh)
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityBranchShift-paper">
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

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    className="collapse-disable-bg"
                  >
                    <Panel
                      header={
                        <div
                          className={`collapse-bg-color ${
                            isPanelOpen ? "open" : ""
                          }`}
                          onClick={togglePanel}
                        >
                          <span>
                            Title
                            <CaretRightOutlined rotate={isPanelOpen ? 90 : 0} />
                          </span>
                        </div>
                      }
                      key="1"
                    >
                      <Table
                        column={tableColumns}
                        rows={tableData}
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

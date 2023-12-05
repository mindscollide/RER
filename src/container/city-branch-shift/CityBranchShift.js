import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchShift.css";
import { Paper, Button } from "../../components/elements";
import { Collapse, Divider } from "antd";
import Select from "react-select";

const CityBranchShift = () => {
  const { Panel } = Collapse;
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
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
                    size="small"
                    expandIcon={false}
                    className="accordion-bg-color"
                  >
                    <Panel
                      showArrow={true}
                      header={<label>TBill Calculator</label>}
                      key="1"
                    ></Panel>
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

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./EmployeeMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../components/elements";
import Select from "react-select";
import { Radio } from "antd";

const EmployeeMain = () => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [branchEmployeeOption, setBranchEmployeeOption] = useState(null);

  const handleBranchEmployeeChange = (e) => {
    setBranchEmployeeOption(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
      capcity: <span className="table-inside-text">Olaya Branch</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="table-text">Name</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="table-text">Capcity</span>,
      dataIndex: "capcity",
      key: "capcity",
    },
    {
      title: <span className="table-text">Active</span>,
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <>
          <span>
            <i className="icon-check icon-check-color"></i>
          </span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "column6",
      key: "column6",
      align: "left",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i className="icon-close icon-EDT-DLT-color"></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">Employee</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Employee-Main-paper">
              <Row>
                <Col lg={4} md={4} sm={4} className="mt-3">
                  {/* <span className="text-labels"></span> */}
                  <TextField
                    name="Shift"
                    placeholder="Shift Name"
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={1} md={1} sm={1} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Counter-checkbox"
                    label={<span className="checkbox-label">Active</span>}
                  />
                </Col>
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-start mt-2"
                >
                  {/* <Checkbox
                    checked={isCheckboxSelectedTwo}
                    onChange={handleCheckboxChangeTwo}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">Branch Employee</span>
                    }
                  /> */}
                  <Radio.Group
                    onChange={handleBranchEmployeeChange}
                    value={branchEmployeeOption}
                  >
                    <Radio value="option1">Branch Employee</Radio>
                  </Radio.Group>
                </Col>
                <Col lg={2} md={2} sm={2} className="mt-3">
                  <Select />
                </Col>

                <Col lg={2} md={2} sm={2} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Counter-checkbox"
                    label={<span className="checkbox-label">Home Visit</span>}
                  />
                </Col>
                <Col lg={1} md={1} sm={1} />
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12} className="three-button-col mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={"Search"}
                    className="Search-Icon-Btn"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text="Revert"
                    className="revert-btn-CityBranchWise"
                  />
                  <Button
                    icon={<i className="icon-user-plus icon-space"></i>}
                    text="Add Employee"
                    className="Employee-Add-Btn"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={dataSource}
                    column={columns}
                    pagination={false}
                    // className="table-text"
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

export default EmployeeMain;

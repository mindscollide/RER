import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CounterMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../components/elements";

const CounterMain = () => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const dataSource = [
    {
      id: 1,
      shiftName: "Morning Shift",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
    },
    {
      id: 2,
      shiftName: "Night Shift",
      startTime: "08:00 PM",
      endTime: "04:00 AM",
    },
    {
      id: 3,
      shiftName: "Nothing",
      startTime: "08:00 PM",
      endTime: "04:00 AM",
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
    },

    {
      title: "Active",
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
      <section className="SectionCounter-Admin">
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              Counters
              <span className="shift-sub-heading">
                {" "}
                (Saudi Arabia - Riyadh)
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">Olaya Street Branch</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Counter-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span>Shift Name</span>
                  <TextField
                    name="Shift"
                    placeholder="Shift Name"
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={2} md={2} sm={2} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Counter-checkbox"
                    label={<span className="checkbox-label">Active</span>}
                  />
                </Col>

                <Col lg={4} md={4} sm={4} className="btn-col-class">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text="Add"
                    className="Add-btn-Counter"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text="Reset"
                    className="Reset-btn-Branch"
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

export default CounterMain;

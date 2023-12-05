import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchAdmin.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../components/elements";

const BranchAdmin = () => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">2</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">3</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="table-text">Shift Name</span>,
      dataIndex: "shiftName",
      key: "shiftName",
    },
    {
      title: <span className="table-text">Start Time</span>,
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: <span className="table-text">End Time</span>,
      dataIndex: "endTime",
      key: "endTime",
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
      <section className="SectionBranch-Admin">
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              Shift
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
            <Paper className="Branch-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">Shift Name</span>
                  <TextField
                    name="Shift"
                    placeholder="Shift Name"
                    labelClass="d-none"
                    className="text-fiels-Branch"
                  />
                </Col>

                <Col lg={3} md={3} sm={3}>
                  <span className="text-labels">Shift Start Time</span>
                  <TextField
                    name="Shift"
                    placeholder="Shift Start Time"
                    labelClass="d-none"
                    className="text-fiels-Branch"
                  />
                </Col>

                <Col lg={3} md={3} sm={3}>
                  <span className="text-labels">Shift End Time</span>
                  <TextField
                    name="Shift"
                    placeholder="Shift End Time"
                    labelClass="d-none"
                    className="text-fiels-Branch"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col lg={6} md={6} sm={6}>
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Branch-checkbox"
                    label={<span className="checkbox-label">Active</span>}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-class-branch">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text="Add"
                    className="Add-btn-Branch"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text="Reset"
                    className="Reset-btn-Branch"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={dataSource}
                    column={columns}
                    pagination={false}
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

export default BranchAdmin;

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityAdmin.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../components/elements";

const CityAdmin = () => {
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
      align: "left",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      align: "center",
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
            <i className="icon-counter icon-EDT-DLT-color"></i>
            <i className="icon-repeat icon-EDT-DLT-color"></i>
            <i className="icon-user icon-EDT-DLT-color"></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="SectionCityAdmin">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              Branch
              <span className="shift-sub-heading">
                {" "}
                (Saudi Arabia - Riyadh)
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityAdmin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span>Branch Name</span>
                  <TextField
                    name="Branch Name"
                    placeholder="Branch Name"
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={3} md={3} sm={3}>
                  <span>Branch Start Time</span>
                  <TextField
                    name="Branch Start Time"
                    placeholder="Branch Start Time"
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={3} md={3} sm={3}>
                  <span>Branch End Time</span>
                  <TextField
                    name="Branch End Time"
                    placeholder="Branch End Time"
                    labelClass="d-none"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col lg={6} md={6} sm={6}>
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="CityAdmin-checkbox"
                    label={
                      <span className="CityAdmin-checkbox-label">Active</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-class-CityAdmin">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text="Add"
                    className="Add-btn-CityAdmin"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text="Reset"
                    className="Reset-btn-CityAdmin"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
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

export default CityAdmin;
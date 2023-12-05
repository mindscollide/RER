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
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const CityAdmin = () => {
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
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Morning Shift</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
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
      align: "left",
    },
    {
      title: <span className="table-text">Start Time</span>,
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: <span className="table-text">End Time</span>,
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: <span className="table-text">Active</span>,
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
      <section>
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
                  <span className="text-labels">Branch Name</span>
                  <TextField
                    name="Branch Name"
                    placeholder="Branch Name"
                    labelClass="d-none"
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">Branch Start Time</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">Branch End Time</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    disableDayPicker
                    format="hh:mm A"
                    plugins={[<TimePicker hideSeconds />]}
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col lg={6} md={6} sm={6}>
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="CityAdmin-checkbox"
                    label={<span className="checkbox-label">Active</span>}
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

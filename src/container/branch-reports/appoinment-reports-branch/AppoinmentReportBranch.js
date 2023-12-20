import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./AppoinmentReportBranch.css";
import { Paper, Table, Button, TextField } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountersOfBranch,
  getAllShiftsOfBranch,
  getBranchServicesApi,
} from "../../../store/actions/Admin_action";

const AppoinmentReportBranch = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Loading = useSelector((state) => state.Loader.Loading);

  const globalShiftOptions = useSelector((state) => state.admin.branchesList);

  const globalCounterOptions = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );

  const globalBranchServicesOptions = useSelector(
    (state) => state.admin.branchServicesData
  );

  const dataSource = [
    {
      id: 1,
      visitor: <span className="table-inside-text">Huzeifah Jahangir</span>,
      mobile: <span className="table-inside-text">2356165415</span>,
      Service: <span className="table-inside-text">First Registry</span>,
      Date: <span className="table-inside-text">15-Dec-2023</span>,
      Time: <span className="table-inside-text">9:30 pm</span>,
      Email: <span className="table-inside-text">test@gmail.com</span>,
    },
    {
      id: 2,
      visitor: <span className="table-inside-text">Ahmed</span>,
      mobile: <span className="table-inside-text">2356165415</span>,
      Service: <span className="table-inside-text">First Registry</span>,
      Date: <span className="table-inside-text">14-Dec-2023</span>,
      Time: <span className="table-inside-text">9:30 pm</span>,
      Email: <span className="table-inside-text">test@gmail.com</span>,
    },
    {
      id: 3,
      visitor: <span className="table-inside-text">Qasim</span>,
      mobile: <span className="table-inside-text">2356165415</span>,
      Service: <span className="table-inside-text">Change Ownership</span>,
      Date: <span className="table-inside-text">13-Dec-2023</span>,
      Time: <span className="table-inside-text">9:30 pm</span>,
      Email: <span className="table-inside-text">test@gmail.com</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Visitor-Name")}</span>,
      dataIndex: "visitor",
      key: "visitor",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Mobile")}</span>,
      dataIndex: "mobile",
      key: "mobile",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "Service",
      key: "Service",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Date")}</span>,
      dataIndex: "Date",
      key: "Date",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Time")}</span>,
      dataIndex: "Time",
      key: "Time",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Email")}</span>,
      dataIndex: "Email",
      key: "Email",
      width: "200px",
    },
  ];

  useEffect(() => {
    dispatch(getAllShiftsOfBranch(t, navigate, Loading));
    dispatch(getAllCountersOfBranch(t, navigate, Loading));
    dispatch(getBranchServicesApi(t, navigate, Loading));
  }, []);

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch-wise-appoinment")}
              <span className="shift-sub-heading">
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Branch-Screen-paper">
              <Row>
                <Col lg={3} md={3} sm={3} />
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="d-flex justify-content-center"
                >
                  <TextField placeholder={"From Date"} />
                </Col>
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="d-flex justify-content-center"
                >
                  <TextField placeholder={"To Date"} />
                </Col>
              </Row>
              <Row className="mx-auto d-flex align-items-center justify-content-center mt-4">
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      // className="Branch-Screen-Select"
                    />
                  </span>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Shift")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"

                      // className="Branch-Screen-Select"
                    />
                  </span>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Counter")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"

                      // className="Branch-Screen-Select"
                    />
                  </span>
                </Col>
              </Row>

              <Row className="mt-4">
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

export default AppoinmentReportBranch;

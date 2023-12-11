import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchRoaster.css";
import { Paper, Button, Table } from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-multi-date-picker";
import Select from "react-select";
import BranchRoasterModal from "../../modals/branch-roaster-close-modal/BranchRoasterModal";

const BranchRoaster = () => {
  const { t } = useTranslation();

  // Branch Roaster close Modal State
  const [roasterModal, setRoasterModal] = useState(false);

  // open roaster modal on click
  const onClickOpenRoaster = () => {
    setRoasterModal(true);
  };

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">Shift 1</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      shiftName: <span className="table-inside-text">Shift 1</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">Shift 1</span>,
      Counter: <span className="table-inside-text">Counter 1</span>,
      Service: <span className="table-inside-text">First Registry</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "400px",
    },

    {
      title: <span className="table-text">{t("Counter")}</span>,
      dataIndex: "Counter",
      key: "Counter",
      width: "200px",
      align: "center",
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "Service",
      key: "Service",
      width: "200px",
      align: "center",
    },
    {
      title: "",
      dataIndex: "close",
      key: "close",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i
              className="icon-close icon-close-style"
              onClick={onClickOpenRoaster}
            ></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch-daily-roaster")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {t("Olaya-street-branch")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="BranchRoaster-Admin-paper">
              <Row>
                <Col
                  lg={3}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center"
                >
                  <Calendar
                    showOtherDays={true}
                    renderButton={(direction, handleClick) => (
                      <button
                        onClick={handleClick}
                        className="calendar-above-arrow"
                      >
                        {direction === "right" ? ">>" : "<<"}
                      </button>
                    )}
                    className="calendar-background-style"
                  />
                </Col>

                <Col lg={5} md={12} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Shift")}</label>
                    <Select />
                  </span>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className="d-flex flex-column w-100">
                        <label className="text-labels">{t("Service")}</label>
                        <Select />
                      </span>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="btn-col-class-BranchRoaster mt-4"
                    >
                      <Button
                        icon={<i className="icon-save icon-space"></i>}
                        text={t("Save")}
                        className="save-btn-BranchRoaster"
                      />
                      <Button
                        icon={<i className="icon-repeat icon-space"></i>}
                        text={t("Revert")}
                        className="revert-btn-BranchRoaster"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Counter")}</label>
                    <Select />
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
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
      {roasterModal ? (
        <BranchRoasterModal
          roasterModal={roasterModal}
          setRoasterModal={setRoasterModal}
        />
      ) : null}
    </>
  );
};

export default BranchRoaster;

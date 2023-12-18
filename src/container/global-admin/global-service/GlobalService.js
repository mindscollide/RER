import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./GlobalService.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import GlobalDeleteModal from "../../modals/global-delete-modal/GlobalDeleteModal";
import { useNavigate } from "react-router";

const GlobalService = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [isCheckboxSelectedTwo, setIsCheckboxSelectedTwo] = useState(false);
  const [isCheckboxSelectedThree, setIsCheckboxSelectedThree] = useState(false);

  const [globalModal, setGlobalModal] = useState(false);

  // open delete modal
  const openDeleteGlobalModal = () => {
    setGlobalModal(true);
  };

  //open city screen page
  const openClickCityScreen = () => {
    navigate("/GlobalAdmin/City");
  };

  //open branch screen page
  const openClickBranchScreen = () => {
    navigate("/GlobalAdmin/Branch");
  };

  //open branch Counters page
  const openClickCountersScreen = () => {
    navigate("/GlobalAdmin/Counters");
  };

  //open branch shifts page
  const openClickshiftsScreen = () => {
    navigate("/GlobalAdmin/Shifts");
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const handleCheckboxChangeTwo = (e) => {
    setIsCheckboxSelectedTwo(e.target.checked);
  };

  const handleCheckboxChangeThree = (e) => {
    setIsCheckboxSelectedThree(e.target.checked);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
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
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i className="icon-close icon-close-color"></i>
          </span>
        </>
      ),
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
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
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={openDeleteGlobalModal}
            ></i>
            <i className="icon-settings icon-EDT-DLT-color"></i>
            <i
              className="icon-location icon-EDT-DLT-color"
              onClick={openClickCityScreen}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openClickBranchScreen}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openClickCountersScreen}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openClickshiftsScreen}
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
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Service")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="GlobalService-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Service-name")}</span>
                  <TextField
                    name="Service Name"
                    placeholder={t("Service-name")}
                    labelClass="d-none"
                    className="text-fiels-GlobalService"
                  />
                </Col>
                <Col lg={6} md={6} sm={6} className="text-end">
                  <span className="text-labels">اسم الخدمة</span>
                  <TextField
                    name="Service Name"
                    placeholder={"اسم الخدمة"}
                    labelClass="d-none"
                    className="text-fiels-GlobalService-arabic"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={4} md={4} sm={4} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="GlobalService-checkbox"
                    label={
                      <span className="checkbox-label">
                        {t("Available-at-branch")}
                      </span>
                    }
                  />
                </Col>

                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-center mt-4"
                >
                  <Checkbox
                    checked={isCheckboxSelectedTwo}
                    onChange={handleCheckboxChangeTwo}
                    classNameDiv="GlobalService-checkbox"
                    label={
                      <span className="checkbox-label">
                        {t("Home-service-available")}
                      </span>
                    }
                  />
                </Col>

                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-end mt-4"
                >
                  <Checkbox
                    checked={isCheckboxSelectedThree}
                    onChange={handleCheckboxChangeThree}
                    classNameDiv="GlobalService-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>
              </Row>

              <Row className="my-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-class-GlobalService"
                >
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-GlobalService"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-GlobalService"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
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

      {globalModal ? (
        <GlobalDeleteModal
          globalModal={globalModal}
          setGlobalModal={setGlobalModal}
        />
      ) : null}
    </>
  );
};

export default GlobalService;

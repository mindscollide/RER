import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsServiceCountryScreenComponent } from "../../../store/actions/global_action";
import ServiceCountryScreenComponent from "../service-country-screen-component/ServiceCountryScreenComponent";
import { useNavigate } from "react-router";

const CountryMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  // state for country service component admin main
  const isServiceCountryComponentReducer = useSelector(
    (state) => state.global.isServiceCountryComponentReducer
  );

  //to open ServiceCountryscreen on click of button
  const openServiceCountryScreen = () => {
    dispatch(setIsServiceCountryScreenComponent(true));
  };

  // to close ServiceCountryscreen on click of goBackbutton
  const closeServiceCountryScreen = () => {
    dispatch(setIsServiceCountryScreenComponent(false));
  };

  //open city screen page in Country Main
  const openClickCityScreenInCountryMain = () => {
    navigate("/GlobalAdmin/City");
  };

  //open branch screen page in Country Main
  const openClickBranchScreenInCountryMain = () => {
    navigate("/GlobalAdmin/Branch");
  };

  //open Counters updated page in Country Main
  const openClickCountersScreenInCountryMain = () => {
    navigate("/GlobalAdmin/Counters");
  };

  //open shifts page in Country Main
  const openClickshiftsScreenInCountryMain = () => {
    navigate("/GlobalAdmin/Shifts");
  };

  //open Employee page in Country Main
  const openClickEmployeeScreenInCountryMain = () => {
    navigate("/GlobalAdmin/Employee");
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Saudi Arabia</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Bahrain</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Bahrain</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
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
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i className="icon-close icon-EDT-DLT-color"></i>
            <i
              className="icon-globe icon-EDT-DLT-color"
              onClick={openServiceCountryScreen}
            ></i>
            <i
              className="icon-location icon-EDT-DLT-color"
              onClick={openClickCityScreenInCountryMain}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openClickBranchScreenInCountryMain}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openClickCountersScreenInCountryMain}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openClickshiftsScreenInCountryMain}
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={openClickEmployeeScreenInCountryMain}
            ></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        {isServiceCountryComponentReducer === true ? (
          <>
            <ServiceCountryScreenComponent
              closeServiceCountryScreen={closeServiceCountryScreen}
            />
          </>
        ) : (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  {t("Country")}
                  <span className="shift-sub-heading">
                    {" "}
                    {t("Saudi-arabia-riyadh")}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="Country-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">{t("Country-name")}</span>
                      <TextField
                        name="Countryname"
                        placeholder={t("Country-name")}
                        labelClass="d-none"
                        className="text-fiels-Country"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="text-end">
                      <span className="text-labels">اسم الدولة</span>
                      <TextField
                        name="Countryname"
                        placeholder={"اسم الدولة"}
                        labelClass="d-none"
                        className="text-fiels-Country-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="mt-1">
                      <Checkbox
                        checked={isCheckboxSelected}
                        onChange={handleCheckboxChange}
                        classNameDiv="Country-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col lg={6} md={6} sm={6} className="btn-class-Country">
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={t("Add")}
                        className="Add-btn-Country"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        className="Reset-btn-Country"
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
          </>
        )}
      </section>
    </>
  );
};

export default CountryMain;

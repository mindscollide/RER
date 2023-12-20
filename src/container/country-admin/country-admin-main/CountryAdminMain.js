import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryAdminMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CountryAdminModal from "../../modals/country-delete-modal/CountryAdminModal";
import { updateCityServiceListApi } from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import { Switch } from "antd";

const CountryAdminMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);

  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [rows, setRows] = useState([]);

  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );

  // to open country wise city state
  const [isCountryWiseCity, setIsCountryWiseCity] = useState(false);

  // to open country wise city in onClick button
  const openCountryWiseCity = () => {
    setIsCountryWiseCity(true);
  };

  //to open country city wise branch onClick button
  const openCountryCityWiseBranch = () => {
    navigate("/CountryAdmin/Branch");
  };

  //to open country city wise counter onClick button
  const openCountryCityWiseCounter = () => {
    navigate("/CountryAdmin/Counters");
  };

  //to open country city branch wise shift onClick button
  const openCountryCityBranchShift = () => {
    navigate("/CountryAdmin/Shifts");
  };

  //to open country Wise Employee onClick button
  const openCountryWiseEmployee = () => {
    navigate("/CountryAdmin/Employee");
  };

  // state to open a modal for delete
  const [countryDeleteModal, setCountryDeleteModal] = useState(false);

  // open a delete modal
  const openDeleteModal = () => {
    setCountryDeleteModal(true);
  };

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
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
    },
    {
      title: <span className="table-text">{t("Start-time")}</span>,
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "endTime",
      key: "endTime",
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
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={openDeleteModal}
            ></i>
            <i
              className="icon-settings icon-EDT-DLT-color"
              onClick={openCountryWiseCity}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openCountryCityWiseBranch}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openCountryCityWiseCounter}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openCountryCityBranchShift}
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={openCountryWiseEmployee}
            ></i>
          </span>
        </>
      ),
    },
  ];

  // country wise city start
  const handleSwitch = (name, value, record) => {
    try {
      if (name === "homeAvailability") {
        setRows(
          rows.map((service) => {
            if (service.cityServiceID === record.cityServiceID) {
              return {
                ...service,
                homeAvailability: value,
              };
            }
            return service;
          })
        );
      } else if (name === "branchAvailability") {
        setRows(
          rows.map((service) => {
            if (service.cityServiceID === record.cityServiceID) {
              return {
                ...service,
                branchAvailability: value,
              };
            }
            return service;
          })
        );
      }
    } catch {}
  };

  const columnsCityWise = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      width: "400px",
      dataIndex: "citySM",
      key: "citySM",

      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.citySM.serviceNameEnglish
            : record.citySM.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              handleSwitch("branchAvailability", value, record)
            }
          />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              handleSwitch("homeAvailability", value, record)
            }
          />
        </span>
      ),
    },
  ];

  const handleRevert = () => {
    try {
      if (cityServiceListData !== null) {
        setRows(cityServiceListData);
      }
    } catch {}
  };

  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        BranchAvailability: item.BranchAvailability,
        CityServiceID: item.CityServiceID,
        HomeAvailability: item.HomeAvailability,
        HomeVisitCharges: item.HomeVisitCharges,
      }));
      let data = {
        CityID: Number(localStorage.getItem("cityID")),
        CityServices: newArray,
      };
      dispatch(updateCityServiceListApi(t, navigate, Loading, data));
    } catch {}
  };
  // country wise city end

  return (
    <>
      <section>
        {isCountryWiseCity === true ? (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  {t("City-wise-service-availability")}
                  <span className="shift-sub-heading">
                    {" "}
                    {currentLanguage === "en"
                      ? "(" +
                        localStorage.getItem("countryName") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityName") +
                        ")"
                      : "(" +
                        localStorage.getItem("countryNameArabic") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityNameArabic") +
                        ")"}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="Country-City-Wise-paper">
                  <Row>
                    <Col lg={12} md={12} sm={12} className="btn-col-class">
                      <Button
                        icon={<i className="icon-save icon-space"></i>}
                        text={t("Save")}
                        className="save-btn-Country-City-Wise"
                        onClick={handleSave}
                      />
                      <Button
                        icon={<i className="icon-repeat icon-space"></i>}
                        text={t("Revert")}
                        className="revert-btn-Country-City-Wise"
                        onClick={handleRevert}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        rows={rows}
                        column={columnsCityWise}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
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
                  {t("City")}
                  <span className="shift-sub-heading">
                    {" "}
                    {currentLanguage === "en"
                      ? "(" +
                        localStorage.getItem("countryName") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityName") +
                        ")"
                      : "(" +
                        localStorage.getItem("countryNameArabic") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityNameArabic") +
                        ")"}
                    {/* {t("Saudi-arabia-riyadh")} */}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CountryAdmin-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">{t("City-name")}</span>
                      <TextField
                        name="Branch Name"
                        placeholder={t("Branch-admin")}
                        labelClass="d-none"
                        className="text-fiels-CountryAdmin"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="text-end">
                      <span className="text-labels">اسم المدينة</span>
                      <TextField
                        name="Branch Name"
                        placeholder="اسم المدينة"
                        labelClass="d-none"
                        className="text-fields-CountryAdmin-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="mt-1">
                      <Checkbox
                        checked={isCheckboxSelected}
                        onChange={handleCheckboxChange}
                        classNameDiv="CountryAdmin-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col
                      lg={6}
                      md={6}
                      sm={6}
                      className="btn-class-CountryAdmin"
                    >
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={t("Add")}
                        className="Add-btn-CountryAdmin"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        className="Reset-btn-CountryAdmin"
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

        {countryDeleteModal ? (
          <CountryAdminModal
            countryDeleteModal={countryDeleteModal}
            setCountryDeleteModal={setCountryDeleteModal}
          />
        ) : null}
      </section>
    </>
  );
};

export default CountryAdminMain;

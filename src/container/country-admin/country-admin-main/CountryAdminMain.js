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
import { setIsCountryWiseCityComponent } from "../../../store/actions/global_action";
import { updateCityServiceListApi } from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import { Switch } from "antd";
import CountryWiseCityComponent from "../country-wise-city-component/CountryWiseCityComponent";

const CountryAdminMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const Loading = useSelector((state) => state.Loader.Loading);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [rows, setRows] = useState([]);

  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );

  // state for country city admin main
  const isCountryWiseCityComponentReducer = useSelector(
    (state) => state.global.isCountryWiseCityComponentReducer
  );

  // to open country wise city state
  const [isCountryWiseCity, setIsCountryWiseCity] = useState(false);

  // to open country wise city in onClick button
  const openCountryWiseCity = () => {
    dispatch(setIsCountryWiseCityComponent(true));
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

  const goBackButtonCountryOnclick = (record) => {
    dispatch(setIsCountryWiseCityComponent(false));
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Riyadh</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Taif</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
    {
      id: <span className="table-inside-text">1</span>,
      shiftName: <span className="table-inside-text">Dammam</span>,
      startTime: <span className="table-inside-text">08:00 AM</span>,
      endTime: <span className="table-inside-text">04:00 PM</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("City-name")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      align: "left",
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
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              title="Edit"
              aria-label="Edit"
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              title="Delete"
              onClick={openDeleteModal}
              aria-label="Delete"
            ></i>
            <i
              className="icon-settings icon-EDT-DLT-color"
              onClick={openCountryWiseCity}
              title="Service"
              aria-label="Service"
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openCountryCityWiseBranch}
              title="Branch"
              aria-label="Branch"
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openCountryCityWiseCounter}
              title="Counter"
              aria-label="Counter"
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openCountryCityBranchShift}
              title="Shifts"
              aria-label="Shifts"
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={openCountryWiseEmployee}
              title="Employee"
              aria-label="Employee"
            ></i>
          </span>
        </>
      ),
    },
  ];

  // country wise city end

  return (
    <>
      <section>
        {isCountryWiseCityComponentReducer === true ? (
          <>
            <CountryWiseCityComponent
              goBackButtonCountryOnclick={goBackButtonCountryOnclick}
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
                  {t("City")}
                  <span className="shift-sub-heading">
                    {" "}
                    {currentLanguage === "en"
                      ? "(" + localStorage.getItem("countryName") + ")"
                      : "(" + localStorage.getItem("countryNameArabic") + ")"}
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
                        placeholder={t("City-name")}
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

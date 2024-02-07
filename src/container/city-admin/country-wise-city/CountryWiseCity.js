import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseCity.css";
import {
  Paper,
  Table,
  Button,
  TextField,
  Notification,
} from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCityServiceListApi,
  updateCityServiceListApi,
  clearResponseMessageAdmin,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import { convertToGMT } from "../../../commen/functions/Date_time_formatter";

const CountryWiseCity = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);
  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );
  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const [rows, setRows] = useState([]);

  //state for show notifications through response
  const [countryWiseNotification, setCountryWiseNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  const columns = [
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
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-3">
          {t("Service-slot")}
        </span>
      ),
      // homeVisitCharges
      dataIndex: "homeServiceSlotDurationMinutes",
      key: "homeServiceSlotDurationMinutes",
      width: "200px",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homeServiceSlotDurationMinutes}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                30,
                360,
                "homeServiceSlotDurationMinutes"
              );
            }}
            type="number"
            min={30}
            max={360}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-2">
          {t("Advance-roaster")}
        </span>
      ),
      // homeServiceSlotDurationMinutes
      dataIndex: "homeMaximumAdvanceRoasterDays",
      key: "homeMaximumAdvanceRoasterDays",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homeMaximumAdvanceRoasterDays}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                30,
                "homeMaximumAdvanceRoasterDays"
              );
            }}
            type="number"
            min={0}
            max={30}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Prebooking-margin")}
        </span>
      ),
      dataIndex: "homePrebookingDaysMarginForCity",
      key: "homePrebookingDaysMarginForCity",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homePrebookingDaysMarginForCity}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                90,
                "homePrebookingDaysMarginForCity"
              );
            }}
            type="number"
            min={0}
            max={90}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Visit-charges")}
        </span>
      ),
      dataIndex: "homeVisitCharges",
      key: "homeVisitCharges",
      align: "center",
      width: "200px",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={Math.min(record.homeVisitCharges, 1000)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = Math.min(parseInt(inputValue, 10), 1000);
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                1000,
                "homeVisitCharges"
              );
            }}
            type="number"
            min={0}
            max={1000}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Start-time")}
        </span>
      ),
      dataIndex: "homeVisitStartTime",
      key: "homeVisitStartTime",
      align: "center",
      width: "130px",
      render: (text, record) => {
        if (
          record?.homeVisitStartTime !== null &&
          record?.homeVisitStartTime !== undefined
        ) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.homeVisitStartTime, local)}
            </span>
          );
        }
      },
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("End-time")}
        </span>
      ),
      dataIndex: "homeVisitEndTime",
      key: "homeVisitEndTime",
      align: "center",
      width: "100px",
      render: (text, record) => {
        if (
          record?.homeVisitEndTime !== null &&
          record?.homeVisitEndTime !== undefined
        ) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.homeVisitEndTime, local)}
            </span>
          );
        }
      },
    },
  ];

  // calling branch data api
  useEffect(() => {
    dispatch(getCityServiceListApi(t, navigate, Loading));
  }, []);

  // updating data in table
  useEffect(() => {
    if (cityServiceListData !== null) {
      setRows(cityServiceListData);
    } else {
      setRows([]);
    }
  }, [cityServiceListData]);

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

  const handleTextFieldChangeService = (
    value,
    rowIndex,
    min,
    max,
    columnName
  ) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setRows((prevServices) => {
        return rows.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              [columnName]: numericValue,
            };
          }
          return service;
        });
      });
    }
  };

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
        HomeServiceSlotDurationMinutes: item.HomeServiceSlotDurationMinutes,
        HomeMaximumAdvanceRoasterDays: item.HomeMaximumAdvanceRoasterDays,
        HomePrebookingDaysMarginForCity: item.HomePrebookingDaysMarginForCity,
        HomeVisitStartTime: item.HomeVisitStartTime,
        HomeVisitEndTime: item.HomeVisitEndTime,
      }));
      console.log(newArray, "newArraynewArray");
      let data = {
        CityID: Number(localStorage.getItem("cityID")),
        CityServices: newArray,
      };
      dispatch(updateCityServiceListApi(t, navigate, Loading, data));
    } catch {}
  };

  // useEffect for Country Wise Service
  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateBranchServices_01")
      ) {
        setTimeout(
          setCountryWiseNotification({
            ...countryWiseNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateBranchServices_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCityServiceList_02")
      ) {
        setTimeout(
          setCountryWiseNotification({
            ...countryWiseNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCityServiceList_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCityServiceList_03")
      ) {
        setTimeout(
          setCountryWiseNotification({
            ...countryWiseNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCityBranch_03"
            ),
            severity: "error",
          }),
          3000
        );
      }
    }
    dispatch(clearResponseMessageAdmin(null));
  }, [responseMessage]);

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
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
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center gap-1"
                >
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
                  <div className="top-background-color">
                    <Row>
                      <Col lg={6} md={6} sm={6} />
                      <Col
                        lg={6}
                        md={6}
                        sm={6}
                        className="d-flex justify-content-center"
                      >
                        <span className="table-above-header-text">
                          {t("Home-visit-settings")}
                        </span>
                      </Col>
                    </Row>
                    <Table rows={rows} column={columns} pagination={false} />
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Notification
        show={countryWiseNotification.notificationFlag}
        hide={setCountryWiseNotification}
        message={countryWiseNotification.notificationMessage}
        severity={countryWiseNotification.severity}
        notificationClass={
          countryWiseNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CountryWiseCity;

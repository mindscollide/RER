import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWorking.css";
import {
  Paper,
  Table,
  Button,
  Notification,
} from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  clearResponseMessageAdmin,
  getCountryWorkingDaysApi,
  updateWorkingDaysApi,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const CountryWorking = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const getWorkingDaysCountry = useSelector(
    (state) => state.admin.getWorkingDaysCountry
  );

  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );

  // State for table row
  const [rows, setRows] = useState([]);

  //state for show notifications through response
  const [workingNotification, setWorkingNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  // To render data in Table
  useEffect(() => {
    dispatch(getCountryWorkingDaysApi(t, navigate, loadingFlag));
  }, []);

  // To set data in rows from reducers
  useEffect(() => {
    if (getWorkingDaysCountry !== null) {
      setRows(getWorkingDaysCountry);
    } else {
      setRows([]);
    }
  }, [getWorkingDaysCountry]);

  //This is handle switch in which it will change the toggle states ON and OFF
  const handleSwitch = (name, value, record) => {
    try {
      if (name === "isWorkingDay") {
        const updatedRows = [...rows];
        const index = updatedRows.findIndex((country) => country === record);

        if (index !== -1) {
          updatedRows[index] = {
            ...updatedRows[index],
            isWorkingDay: value,
          };
          setRows(updatedRows);
        }
      }
    } catch (error) {
      console.error("Error in handleSwitch:", error);
    }
  };

  //This is the column in which data append in table from api
  const columns = [
    {
      title: <span className="table-text">{t("Day")}</span>,
      dataIndex: "countryDayOfWeek",
      key: "countryDayOfWeek",
      width: "400px",
      render: (text, record) => (
        <span>
          {record.countryDayOfWeek === 0 ? (
            <p className="table-inside-text">{t("Sunday")}</p>
          ) : record.countryDayOfWeek === 1 ? (
            // Render default content for other cases
            <p className="table-inside-text">{t("Monday")}</p>
          ) : record.countryDayOfWeek === 2 ? (
            <p className="table-inside-text">{t("Tuesday")}</p>
          ) : record.countryDayOfWeek === 3 ? (
            <p className="table-inside-text">{t("Wednesday")}</p>
          ) : record.countryDayOfWeek === 4 ? (
            <p className="table-inside-text">{t("Thursday")}</p>
          ) : record.countryDayOfWeek === 5 ? (
            <p className="table-inside-text">{t("Friday")}</p>
          ) : record.countryDayOfWeek === 6 ? (
            <p className="table-inside-text">{t("Saturday")}</p>
          ) : null}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "isWorkingDay",
      key: "isWorkingDay",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) => handleSwitch("isWorkingDay", value, record)}
          />
        </span>
      ),
    },
  ];

  // This will Revert the data when I set anything then it will convert on its initial state
  const handleRevertCountry = () => {
    try {
      if (getWorkingDaysCountry !== null) {
        setRows(getWorkingDaysCountry);
      }
    } catch {}
  };

  // This will Save the data onClick of save Button
  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        CountryDayOfWeek: item.CountryDayOfWeek,
        IsWorkingDay: item.IsWorkingDay,
      }));
      console.log(newArray, "newArraynewArray");
      let data = {
        CountryID: Number(localStorage.getItem("countryID")),
        CountryWorkingDaylist: newArray,
      };
      dispatch(updateWorkingDaysApi(t, navigate, loadingFlag, data));
    } catch {}
  };

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCountryWorkingDays_01")
      ) {
        setTimeout(
          setWorkingNotification({
            ...workingNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCountryWorkingDays_02")
      ) {
        setTimeout(
          setWorkingNotification({
            ...workingNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryWorkingDays_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCountryWorkingDays_03")
      ) {
        setTimeout(
          setWorkingNotification({
            ...workingNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryWorkingDays_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateCountryWorkingDays_04")
      ) {
        setTimeout(
          setWorkingNotification({
            ...workingNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (responseMessage === t("something_went_wrong")) {
        setTimeout(
          setWorkingNotification({
            ...workingNotification,
            notificationFlag: true,
            notificationMessage: t("something_went_wrong"),
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
              {t("Country-working-days")}
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
            <Paper className="Country-working-paper">
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table rows={rows} column={columns} pagination={false} />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center col-Country-working mt-3"
                >
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={handleSave}
                    className="save-btn-Country-working"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    onClick={handleRevertCountry}
                    className="revert-btn-Country-working"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Notification
        show={workingNotification.notificationFlag}
        hide={setWorkingNotification}
        message={workingNotification.notificationMessage}
        severity={workingNotification.severity}
        notificationClass={
          workingNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CountryWorking;

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./NationalHoliday.css";
import { Paper, Button, Table } from "../../../components/elements";
import { useTranslation } from "react-i18next";
import {
  getNationalHolidayMainApi,
  deleteNationalHolidayMainApi,
  addNationalHolidayMainApi,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-multi-date-picker";
import {
  formatDate,
  multiDatePickerDateChangIntoUTC,
} from "../../../commen/functions/Date_time_formatter";

const NationalHoliday = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const countryNationalHoliday = useSelector(
    (state) => state.admin.countryNationalHoliday
  );

  // Calculate the date one day after the current date
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  // Set the default start date in the initial state
  const [startDate, setStartDate] = useState(nextDay);
  const [endDate, setEndDate] = useState(nextDay);

  // state for table rendering
  const [rows, setRows] = useState([]);

  // for api calling
  useEffect(() => {
    dispatch(getNationalHolidayMainApi(t, navigate, loadingFlag));
  }, []);

  const columns = [
    {
      title: <span className="table-text">{t("Date")}</span>,
      dataIndex: "nationalHolidayList",
      key: "nationalHolidayList",
      width: "400px",
      render: (text, record) => (
        console.log("text", record),
        (<span className="table-inside-text">{formatDate(record, local)}</span>)
      ),
    },

    {
      title: "",
      dataIndex: "holidayRemoved",
      key: "holidayRemoved",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i
              className="icon-trash icon-close-style-delete"
              onClick={() => onDeleteIcon(record)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  // for data rendering in table
  useEffect(() => {
    if (
      countryNationalHoliday !== null &&
      Array.isArray(countryNationalHoliday)
    ) {
      setRows(countryNationalHoliday);
    } else {
      setRows([]);
    }
  }, [countryNationalHoliday]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // this is my delete function
  const onDeleteIcon = (record) => {
    let deleteData = {
      CountryID: Number(localStorage.getItem("countryID")),
      HolidayToRemove: record, // Use the record directly
    };
    dispatch(
      deleteNationalHolidayMainApi(t, navigate, loadingFlag, deleteData)
    );
  };

  //Function For Formatting Date As Required
  const convertDatesToUTC = (startDate, endDate) => {
    const formattedStartDate = multiDatePickerDateChangIntoUTC(startDate);
    const formattedEndDate = multiDatePickerDateChangIntoUTC(endDate);
    return [formattedStartDate, formattedEndDate];
  };

  //Function  For saving the Dates
  const saveDates = () => {
    if (startDate <= endDate) {
      let data = {
        CountryID: Number(localStorage.getItem("countryID")),
        HolidayListToAdd: convertDatesToUTC(startDate, endDate),
      };
      console.log(data, "HolidayListToAddHolidayListToAdd");
      dispatch(addNationalHolidayMainApi(t, navigate, loadingFlag, data));
    } else {
      alert("Start Date Should Be Less Then End Date");
    }
  };

  //handling Revert Function
  const handleRevertFunction = () => {
    setEndDate(nextDay);
    setStartDate(nextDay);
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("National-holidays-list")}
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
            <Paper className="NationalHoliday-Admin-paper">
              <Row>
                <Col lg={3} md={3} sm={3}></Col>
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("From-date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    minDate={nextDay}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </Col>
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("to-date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    minDate={nextDay}
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </Col>
                <Col lg={3} md={3} sm={3}></Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-NationalHoliday"
                >
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    onClick={handleRevertFunction}
                    className="revert-btn-NationalHoliday"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={saveDates}
                    className="save-btn-NationalHoliday"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table rows={rows} column={columns} pagination={false} />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default NationalHoliday;

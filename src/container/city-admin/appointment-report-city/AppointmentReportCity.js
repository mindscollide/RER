import React, { useEffect, useState } from "react";
import "./AppointmentReportCity.css";
import { Row, Col } from "react-bootstrap";
import { Paper, Table, Button, TextField } from "../../../components/elements";
import DatePicker from "react-multi-date-picker";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  convertToGMT,
  multiDatePickerDateChangIntoUTC,
} from "../../../commen/functions/Date_time_formatter";
import {
  getAllCountersOfBranch,
  getAllShiftsOfBranch,
  getAppointmentReportBranchAPI,
  getCityBranchListApi,
  getCityServiceListApi,
} from "../../../store/actions/Admin_action";
const AppointmentReportCity = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentLanguage = localStorage.getItem("i18nextLng");

  const Loading = useSelector((state) => state.Loader.Loading);

  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );

  const cityBranchListDataDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  const getAppointmentData = useSelector(
    (state) => state.admin.getAppointmentBranchReportData
  );

  const globalCounterOptions = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );

  const globalShiftOptions = useSelector((state) => state.admin.branchesList);

  //Appointment Report states

  const [apppointmentOptionsServices, setApppointmentOptionsServices] =
    useState([]);
  const [selectedBranhOptions, setSelectedBranhOptions] = useState(null);
  const [appointmentReportData, setAppointmentReportData] = useState([]);
  const [apppointmentOptionsCounter, setApppointmentOptionsCounter] = useState(
    []
  );
  const [apppointmentOptionsShift, setApppointmentOptionsShift] = useState([]);
  const [selectedBranchID, setSelectedBranchID] = useState(null);
  const [cityBranchOption, setCityBranchOption] = useState([]);
  const [selectedOptionsCounter, setSelectedOptionsCounter] = useState(null);
  const [selectedOptionsShift, setSelectedOptionsShift] = useState(null);
  const [selectedOptionsSerives, setSelectedOptionsSerives] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(() => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
    return futureDate;
  });

  const local = currentLanguage === "en" ? "en-US" : "ar-SA";

  const columns = [
    {
      title: <span className="table-text">{t("Visitor-Name")}</span>,
      dataIndex: "visitorName",
      key: "visitorName",
      width: "230px",
    },
    {
      title: <span className="table-text">{t("Mobile")}</span>,
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "service",
      key: "service",
      width: "200px",
      render: (text, record) => {
        console.log(record, "classNameclassName");
        return (
          <>
            <span>
              {currentLanguage === "en"
                ? record.service.serviceNameEnglish
                : record.service.serviceNameArabic}
            </span>
          </>
        );
      },
    },
    {
      title: <span className="table-text">{t("Date")}</span>,
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Time")}</span>,
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      width: "200px",
      render: (text, record) => {
        return (
          <>
            <span>{convertToGMT(record?.appointmentTime, local)}</span>
          </>
        );
      },
    },
    {
      title: <span className="table-text">{t("Email")}</span>,
      dataIndex: "email",
      key: "email",
      width: "200px",
    },

    {
      title: <span className="table-text">{t("Deed-number")}</span>,
      dataIndex: "deedNumber",
      key: "deedNumber",
      width: "200px",
      render: (text, record) => {
        return record.deedNumber === null ? (
          ""
        ) : (
          <span>{record.deedNumber}</span>
        );
      },
    },

    {
      title: <span className="table-text">{t("Service-location")}</span>,
      dataIndex: "isAtCustomerLocation",
      key: "isAtCustomerLocation",
      width: "200px",
      render: (text, record) => {
        return record.isAtCustomerLocation === false ? (
          <span>{t("Branch")}</span>
        ) : (
          <>
            <span>{t("Customer-location")}</span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getCityServiceListApi(t, navigate, Loading));
    dispatch(getCityBranchListApi(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (
      cityServiceListData !== null &&
      cityServiceListData !== undefined &&
      cityServiceListData.length !== 0
    ) {
      if (currentLanguage === "en") {
        setApppointmentOptionsServices(
          cityServiceListData.map((item) => ({
            value: item.citySM.serviceID,
            label: item.citySM.serviceNameEnglish,
          }))
        );
      } else {
        setApppointmentOptionsServices(
          cityServiceListData.map((item) => ({
            value: item.citySM.serviceID,
            label: item.citySM.serviceNameArabic,
          }))
        );
      }
    }
  }, [cityServiceListData, currentLanguage]);

  useEffect(() => {
    if (
      cityBranchListDataDropdown !== null &&
      cityBranchListDataDropdown !== undefined &&
      cityBranchListDataDropdown.length !== 0
    ) {
      if (currentLanguage === "en") {
        setCityBranchOption(
          cityBranchListDataDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setCityBranchOption(
          cityBranchListDataDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [cityBranchListDataDropdown, currentLanguage]);

  useEffect(() => {
    if (selectedBranchID !== null) {
      dispatch(getAllShiftsOfBranch(t, navigate, Loading, selectedBranchID));
      dispatch(getAllCountersOfBranch(t, navigate, Loading, selectedBranchID));
    }
  }, [selectedBranchID]);

  useEffect(() => {
    if (
      globalCounterOptions !== null &&
      globalCounterOptions !== undefined &&
      globalCounterOptions.length !== 0
    ) {
      if (currentLanguage === "en") {
        setApppointmentOptionsCounter(
          globalCounterOptions.map((item) => ({
            value: item.counterID,
            label: item.counterNameEnglish,
          }))
        );
      } else {
        setApppointmentOptionsCounter(
          globalCounterOptions.map((item) => ({
            value: item.counterID,
            label: item.counterNameArabic,
          }))
        );
      }
    }
  }, [globalCounterOptions, currentLanguage]);

  useEffect(() => {
    if (
      globalShiftOptions !== null &&
      globalShiftOptions !== undefined &&
      globalShiftOptions.length !== 0
    ) {
      if (currentLanguage === "en") {
        setApppointmentOptionsShift(
          globalShiftOptions.map((item) => ({
            value: item.shiftID,
            label: item.shiftNameEnglish,
          }))
        );
      } else {
        setApppointmentOptionsShift(
          globalShiftOptions.map((item) => ({
            value: item.shiftID,
            label: item.shiftNameArabic,
          }))
        );
      }
    }
  }, [globalShiftOptions, currentLanguage]);

  const handleServiceOnChange = (servicesSelectedOption) => {
    setSelectedOptionsSerives(servicesSelectedOption);
  };

  const handleCityBranchOptions = (branchSelectedOptions) => {
    console.log(branchSelectedOptions, "branchSelectedOptions");
    setSelectedBranhOptions(branchSelectedOptions);
    setSelectedBranchID(branchSelectedOptions.value);
  };

  const handleShiftOnChange = (shiftSelectedOption) => {
    setSelectedOptionsShift(shiftSelectedOption);
  };

  const handleCounteronChange = (counterSelectedOptions) => {
    setSelectedOptionsCounter(counterSelectedOptions);
  };

  console.log(selectedBranchID, "selectedBranchIDselectedBranchID");

  const handleStartDateChange = (date) => {
    setFromDate(date);
  };

  const handleEndDateChange = (date) => {
    setToDate(date);
  };

  //function For Search
  const handleSearchAppointment = () => {
    let data = {
      CountryID: Number(localStorage.getItem("countryID")),
      CityID: Number(localStorage.getItem("cityID")),
      BranchID: Number(selectedBranchID),
      ServiceID:
        selectedOptionsSerives && selectedOptionsSerives.value
          ? selectedOptionsSerives.value
          : 1,
      ShiftID:
        selectedOptionsShift && selectedOptionsShift.value
          ? selectedOptionsShift.value
          : 1,

      CounterID:
        selectedOptionsCounter && selectedOptionsCounter.value
          ? selectedOptionsCounter.value
          : 1,
      StartDate: multiDatePickerDateChangIntoUTC(fromDate),
      EndDate: multiDatePickerDateChangIntoUTC(toDate),
      PageNumber: 1,
      Length: 50,
    };
    console.log(data, "getAppointmentReportBranchAPI");
    dispatch(getAppointmentReportBranchAPI(data, t, navigate, Loading));
  };

  const handleResetAppointment = () => {
    setFromDate(new Date());
    setToDate(() => {
      const today = new Date();
      const futureDate = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
      return futureDate;
    });
    setSelectedOptionsShift(null);
    setSelectedOptionsCounter(null);
    setSelectedOptionsSerives(null);
    setSelectedBranhOptions(null);
  };

  useEffect(() => {
    if (
      getAppointmentData !== null &&
      getAppointmentData !== undefined &&
      getAppointmentData.length !== 0
    ) {
      setAppointmentReportData(getAppointmentData);
    } else {
      setAppointmentReportData([]);
    }
  }, [getAppointmentData]);

  return (
    <section>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
          <span className="shift-heading">
            {t("Branch-wise-appoinment")}{" "}
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
                className="col-for-date-timepicker-cityad"
              >
                <label className="text-labels">{t("From-date")}</label>
                <DatePicker
                  arrowClassName="arrowClass"
                  containerClassName="containerClassTimePicker"
                  editable={false}
                  value={fromDate}
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
                  value={toDate}
                  onChange={handleEndDateChange}
                />
              </Col>
            </Row>
            <Row className="mx-auto d-flex align-items-center justify-content-center mt-4">
              <Col lg={3} md={3} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("Service")}</label>
                  <Select
                    value={selectedOptionsSerives}
                    placeholder={t("Select-an-option")}
                    className="select-dropdown-all"
                    options={apppointmentOptionsServices}
                    isSearchable={false}
                    onChange={handleServiceOnChange}
                  />
                </span>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("Branch")}</label>
                  <Select
                    isSearchable={false}
                    value={selectedBranhOptions}
                    className="select-dropdown-all"
                    placeholder={t("Select-an-option")}
                    options={cityBranchOption}
                    onChange={handleCityBranchOptions}
                  />
                </span>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("Shift")}</label>
                  <Select
                    isSearchable={false}
                    value={selectedOptionsShift}
                    placeholder={t("Select-an-option")}
                    className="select-dropdown-all"
                    options={apppointmentOptionsShift}
                    isDisabled={selectedBranchID === null ? true : false}
                    onChange={handleShiftOnChange}
                  />
                </span>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <span className="d-flex flex-column w-100">
                  <label className="text-labels">{t("Counter")}</label>
                  <Select
                    isSearchable={false}
                    value={selectedOptionsCounter}
                    className="select-dropdown-all"
                    placeholder={t("Select-an-option")}
                    options={apppointmentOptionsCounter}
                    isDisabled={selectedBranchID === null ? true : false}
                    onChange={handleCounteronChange}
                  />
                </span>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-3"
              >
                <Button
                  icon={<i className="icon-add-circle icon-space"></i>}
                  text={t("Search")}
                  className="Add-btn-Counter"
                  onClick={handleSearchAppointment}
                />
                <Button
                  icon={<i className="icon-refresh icon-space"></i>}
                  text={t("Reset")}
                  className="Reset-btn-Counter"
                  onClick={handleResetAppointment}
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col lg={12} md={12} sm={12}>
                <Table
                  rows={appointmentReportData}
                  column={columns}
                  pagination={false}
                />
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </section>
  );
};

export default AppointmentReportCity;

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchRoaster.css";
import { Paper, Button, Table } from "../../../components/elements";
import { getCurrentDateUTC } from "../../../commen/functions/Date_time_formatter";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Calendar } from "react-multi-date-picker";
import Select from "react-select";
import BranchRoasterModal from "../../modals/branch-roaster-close-modal/BranchRoasterModal";
import {
  getSingleBranchRoasterApiFunction,
  getAllShiftsOfBranch,
  getAllCountersOfBranch,
  getBranchServicesApi,
  addBranchRoasterEntryApiFunction,
  removingBranchEntryRoasterApiFunction,
} from "../../../store/actions/Admin_action";

const BranchRoaster = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Loading = useSelector((state) => state.Loader.Loading);

  const getRoasterData = useSelector((state) => state.admin.singleDayRoaster);

  const globalShiftOptions = useSelector((state) => state.admin.branchesList);

  const globalCounterOptions = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );

  const globalBranchServicesOptions = useSelector(
    (state) => state.admin.branchServicesData
  );

  const currentLanguage = localStorage.getItem("i18nextLng");

  // Branch Roaster close Modal State
  const [roasterModal, setRoasterModal] = useState(false);

  const [singleRoasterRowData, setSingleRoasterRowData] = useState([]);

  const [optionsShift, setOptionsShift] = useState([]);
  const [selectedOptionShift, setSelectedOptionShift] = useState(null);

  const [optionsCounter, setOptionsCounter] = useState([]);
  const [selectedOptionCounter, setSelectedOptionCounter] = useState(null);

  const [optionsServices, setOptionsServices] = useState([]);
  const [selectedOptionServices, setSelectedOptionServices] = useState(null);

  //Delete Roaster Record Data
  const [deleteRoasterRecordData, setDeleteRoasterRecordData] = useState(null);

  // Usage
  const selectedDateUTC = getCurrentDateUTC();
  console.log("Selected date in UTC format (YYYYMMDD):", selectedDateUTC);

  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //   const day = currentDate.getDate().toString().padStart(2, "0");
  //   return `${year}${month}${day}`;
  // };

  const [selectedDate, setSelectedDate] = useState(selectedDateUTC);

  // open roaster modal on click
  const onClickOpenRoaster = (data) => {
    setRoasterModal(true);
    setDeleteRoasterRecordData(data);
  };

  const columns = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "shiftService",
      key: "shiftService",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.shiftService.serviceNameEnglish
            : record.shiftService.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Counter")}</span>,
      dataIndex: "branchCounterModel",
      key: "branchCounterModel",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchCounterModel.counterNameEnglish
            : record.branchCounterModel.counterNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Shift")}</span>,
      dataIndex: "branchShift",
      key: "branchShift",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchShift.shiftNameEnglish
            : record.branchShift.shiftNameArabic}
        </span>
      ),
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
              onClick={() => onClickOpenRoaster(record)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllShiftsOfBranch(t, navigate, Loading));
    dispatch(getAllCountersOfBranch(t, navigate, Loading));
    dispatch(getBranchServicesApi(t, navigate, Loading));
    dispatch(
      getSingleBranchRoasterApiFunction(t, navigate, Loading, selectedDate)
    );
  }, []);

  useEffect(() => {
    if (
      getRoasterData !== null &&
      getRoasterData !== undefined &&
      getRoasterData.length !== 0
    ) {
      setSingleRoasterRowData(getRoasterData);
    } else {
      setSingleRoasterRowData([]);
    }
  }, [getRoasterData]);

  useEffect(() => {
    if (
      globalShiftOptions !== null &&
      globalShiftOptions !== undefined &&
      globalShiftOptions.length !== 0
    ) {
      if (currentLanguage === "en") {
        setOptionsShift(
          globalShiftOptions.map((item) => ({
            value: item.shiftID,
            label: item.shiftNameEnglish,
          }))
        );
      } else {
        setOptionsShift(
          globalShiftOptions.map((item) => ({
            value: item.shiftID,
            label: item.shiftNameArabic,
          }))
        );
      }
    }
  }, [globalShiftOptions, currentLanguage]);

  useEffect(() => {
    if (
      globalCounterOptions !== null &&
      globalCounterOptions !== undefined &&
      globalCounterOptions.length !== 0
    ) {
      if (currentLanguage === "en") {
        setOptionsCounter(
          globalCounterOptions.map((item) => ({
            value: item.counterID,
            label: item.counterNameEnglish,
          }))
        );
      } else {
        setOptionsCounter(
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
      globalBranchServicesOptions !== null &&
      globalBranchServicesOptions !== undefined &&
      globalBranchServicesOptions.length !== 0
    ) {
      if (currentLanguage === "en") {
        setOptionsServices(
          globalBranchServicesOptions.map((item) => ({
            value: item.branchServiceID,
            label: item.branchService.serviceNameEnglish,
          }))
        );
      } else {
        setOptionsServices(
          globalBranchServicesOptions.map((item) => ({
            value: item.branchServiceID,
            label: item.branchService.serviceNameArabic,
          }))
        );
      }
    }
  }, [globalBranchServicesOptions, currentLanguage]);

  const handleDateChange = (date) => {
    if (date) {
      const utcDate = date
        .toDate()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      setSelectedDate(utcDate);
      dispatch(
        getSingleBranchRoasterApiFunction(t, navigate, Loading, utcDate)
      );
    }
  };

  const handleChangeShift = (selectedOptionShift) => {
    setSelectedOptionShift(selectedOptionShift);
  };

  const handleChangeCounter = (selectedOptionCounter) => {
    setSelectedOptionCounter(selectedOptionCounter);
  };

  const handleChangeServices = (selectedOptionServices) => {
    setSelectedOptionServices(selectedOptionServices);
  };

  const saveSingleRoaster = () => {
    let Data = {
      RoasterDate: selectedDate,
      BranchID: 1,
      ServiceID: selectedOptionServices.value,
      ShiftID: selectedOptionShift.value,
      CounterID: selectedOptionCounter.value,
    };
    console.log(
      "Request Data Values",
      Data,
      selectedOptionServices,
      selectedOptionShift,
      selectedOptionCounter
    );
    let currentDate = getCurrentDateUTC();
    if (Data.RoasterDate >= currentDate) {
      dispatch(
        addBranchRoasterEntryApiFunction(
          Data,
          t,
          navigate,
          Loading,
          selectedDate
        )
      );
      setSelectedOptionCounter(null);
      setSelectedOptionShift(null);
      setSelectedOptionServices(null);
    } else {
      alert("Previous Dates Cannot be selected");
    }
  };

  const revertAll = () => {
    setSelectedOptionCounter(null);
    setSelectedOptionShift(null);
    setSelectedOptionServices(null);
  };

  const deleteRoasterRecord = () => {
    console.log("Delete Record Data", deleteRoasterRecordData);
    let deleteData = {
      RoasterDate: selectedDate,
      BranchID: 1,
      ServiceID: deleteRoasterRecordData.shiftService.serviceID,
      ShiftID: deleteRoasterRecordData.branchShift.shiftID,
      CounterID: deleteRoasterRecordData.branchCounterModel.counterID,
    };
    console.log("Delete Record Data", deleteData);
    dispatch(
      removingBranchEntryRoasterApiFunction(
        t,
        navigate,
        Loading,
        deleteData,
        selectedDate
      )
    );
    setRoasterModal(false);
  };

  const cancelDeleteRecord = () => {
    setRoasterModal(false);
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch-daily-roaster")}
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
                    " - " +
                    localStorage.getItem("cityNameArabic") +
                    ")"}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {currentLanguage === "en"
                ? localStorage.getItem("branchName")
                : localStorage.getItem("branchNameArabic")}
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
                    onChange={handleDateChange}
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
                    <Select
                      value={selectedOptionShift}
                      onChange={handleChangeShift}
                      options={optionsShift}
                      isSearchable={false}
                    />
                  </span>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className="d-flex flex-column w-100">
                        <label className="text-labels">{t("Service")}</label>
                        <Select
                          value={selectedOptionServices}
                          onChange={handleChangeServices}
                          options={optionsServices}
                          isSearchable={false}
                        />
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
                        onClick={saveSingleRoaster}
                      />
                      <Button
                        icon={<i className="icon-repeat icon-space"></i>}
                        text={t("Revert")}
                        className="revert-btn-BranchRoaster"
                        onClick={revertAll}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Counter")}</label>
                    <Select
                      value={selectedOptionCounter}
                      onChange={handleChangeCounter}
                      options={optionsCounter}
                      isSearchable={false}
                    />
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={singleRoasterRowData}
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
          onYesModalHandler={deleteRoasterRecord}
          onNoModalHandler={cancelDeleteRecord}
        />
      ) : null}
    </>
  );
};

export default BranchRoaster;

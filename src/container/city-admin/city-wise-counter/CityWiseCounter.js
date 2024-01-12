import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityWiseCounter.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getBranchShiftCounterClear,
  getBranchShiftCounterMainApi,
  getCityBranchListApi,
} from "../../../store/actions/Admin_action";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useLocation } from "react-router-dom";
import { getCurrentDateUTC } from "../../../commen/functions/Date_time_formatter";

const CityWiseCounter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const { Panel } = Collapse;
  const searchParams = new URLSearchParams(location.search);
  const urldBranchID = searchParams.get("branchId");
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const getBranchShiftWiseCounter = useSelector(
    (state) => state.admin.getBranchShiftWiseCounter
  );

  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  // row state for city shift counter Api
  const [cityCounterRow, setCityCounterRow] = useState([]);
  const [bscModelState, setBscModelState] = useState([]);

  //toggle State
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // states for city wise counter in dropdown
  const [cityWiseCounter, setCityWiseCounter] = useState([]);
  const [cityWiseCounterValue, setCityWiseCounterValue] = useState(null);

  // Get current date
  const [roasterDate, setRoasterDate] = useState(new Date());
  const callApi = async () => {
    await dispatch(getCityBranchListApi(t, navigate, loadingFlag));
    let newData = {
      RoasterDate: getCurrentDateUTC(roasterDate),
      BranchID:
        urldBranchID !== null && urldBranchID !== undefined
          ? Number(urldBranchID)
          : 0,
    };
    await dispatch(
      getBranchShiftCounterMainApi(t, navigate, loadingFlag, newData)
    );
  };
  // get branch Shift Counter Api table and select calling
  useEffect(() => {
    callApi();
    return () => {
      localStorage.removeItem("branchID");
      dispatch(getBranchShiftCounterClear());
      setCityCounterRow([]);
      setCityWiseCounter([]);
      setCityWiseCounterValue([]);
      setRoasterDate(new Date());
    };
  }, []);

  // updating data in table
  useEffect(() => {
    if (getBranchShiftWiseCounter !== null) {
      setCityCounterRow(getBranchShiftWiseCounter);
      const extractedBscsModel = getBranchShiftWiseCounter
        .map((bscData) => bscData.bscsModel)
        .flat();
      setBscModelState(extractedBscsModel);
    } else {
      setCityCounterRow([]);
      setBscModelState([]);
    }
  }, [getBranchShiftWiseCounter]);

  // for showing value in dropdown
  useEffect(() => {
    if (
      cityShiftsBranchDropdown !== null &&
      cityShiftsBranchDropdown !== undefined &&
      cityShiftsBranchDropdown.length !== 0
    ) {
      if (currentLanguage === "en") {
        setCityWiseCounter(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setCityWiseCounter(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [cityShiftsBranchDropdown, currentLanguage]);

  // It will show by default first selected value in dropdown
  useEffect(() => {
    if (cityWiseCounter.length > 0) {
      setCityWiseCounterValue(cityWiseCounter[0]);
    }
  }, [cityWiseCounter]);

  // onchange handler for branch dropdown
  const onChangeBranchHandler = (cityWiseCounterValue) => {
    setCityWiseCounterValue(cityWiseCounterValue);
  };

  useEffect(() => {
    if (urldBranchID != null && cityWiseCounter.length > 0) {
      const value = cityWiseCounter.find(
        (branch) => branch.value === Number(urldBranchID)
      );
      if (value) {
        setCityWiseCounterValue(value);
      } else {
        console.log("location Branch with ID 3 not found");
      }
    }
  }, [cityWiseCounter]);

  const handleSearch = async () => {
    let newData = {
      RoasterDate: getCurrentDateUTC(roasterDate),
      BranchID: Number(cityWiseCounterValue.value),
    };
    await dispatch(
      getBranchShiftCounterMainApi(t, navigate, loadingFlag, newData)
    );
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const columns = [
    {
      title: <span className="table-text">{t("Counter-services")}</span>,
      dataIndex: "counterNameEnglish",
      key: "counterNameEnglish",
      width: "50%",
      render: (text, record) => {
        return (
          <>
            <span className="table-inside-text">
              {currentLanguage === "en"
                ? record.branchCounterModel.counterNameEnglish
                : record.branchCounterModel.counterNameArabic}
            </span>
          </>
        );
      },
    },
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "serviceNameEnglish",
      key: "serviceNameEnglish",
      width: "50%",
      render: (text, record) => {
        return (
          <>
            <span className="table-inside-text">
              {currentLanguage === "en"
                ? record.shiftService.serviceNameEnglish
                : record.shiftService.serviceNameArabic}
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("City-branch-shift-wise-counters")}
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
            <Paper className="CityWiseCounter-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col
                  lg={5}
                  md={5}
                  sm={12}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("Date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    value={roasterDate}
                    onChange={(value) => setRoasterDate(value)}
                  />
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">
                      {t("Branch")}
                    </label>
                    <Select
                      options={cityWiseCounter}
                      value={cityWiseCounterValue}
                      onChange={onChangeBranchHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={2} md={2} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={handleSearch}
                  />
                </Col>
              </Row>
              {cityCounterRow.length > 0
                ? cityCounterRow.map((data, index) => {
                    return (
                      <>
                        <Row className="mt-3">
                          <Col lg={12} md={12} sm={12}>
                            <Collapse
                              bordered={false}
                              className="collapse-disable-bg"
                              expandIcon={false}
                              defaultActiveKey={["1"]}
                            >
                              <Panel
                                header={
                                  <div
                                    className={`collapse-bg-color ${
                                      isPanelOpen ? "open" : ""
                                    }`}
                                    onClick={togglePanel}
                                  >
                                    <span className="toggle-tiles">
                                      {currentLanguage === "en"
                                        ? data.branchShift.shiftNameEnglish
                                        : data.branchShift.shiftNameArabic}
                                    </span>

                                    {isPanelOpen ? (
                                      <i
                                        className={
                                          "icon-arrow-up icon-size-of-collapse"
                                        }
                                      ></i>
                                    ) : (
                                      <i
                                        className={
                                          "icon-arrow-down icon-size-of-collapse"
                                        }
                                      ></i>
                                    )}
                                  </div>
                                }
                                key="1"
                              >
                                <Table
                                  column={columns}
                                  rows={bscModelState}
                                  pagination={false}
                                />
                              </Panel>
                            </Collapse>
                          </Col>
                        </Row>
                      </>
                    );
                  })
                : null}
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CityWiseCounter;

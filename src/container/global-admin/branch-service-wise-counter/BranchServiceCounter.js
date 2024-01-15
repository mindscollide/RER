import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchServiceCounter.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import {
  getCountryListMainApi,
  getCountryCitiesApi,
  getCityBranchListApi,
  getGlobalServiceMainApi,
  getAllBranchShiftCounterMainApi,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { multiDatePickerDateChangIntoUTC } from "../../../commen/functions/Date_time_formatter";

const BranchServiceCounter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryID = Number(searchParams.get("countryID"));
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");
  // To get Country List in dropdown
  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  //To get City List in City Dropdown
  const cityList = useSelector((state) => state.admin.cityList);

  //To get Branch List in Branch Dropdown
  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );

  // get All Branch Shift Counter Data from reducer
  const getAllBranchShiftCounterData = useSelector(
    (state) => state.admin.getAllBranchShiftCounterData
  );

  const { Panel } = Collapse;
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenCountry, setIsPanelOpenCountry] = useState(false);

  //Date state
  const [counterDateSelector, setCounterDateSelector] = useState(new Date());

  //States for Storing Country Drop down
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState({
    value: 1,
    label: "",
  });

  //States for storing City Dropdown
  const [cityOptionsEnglish, setcityOptionsEnglish] = useState([]);
  const [cityOptionsArabic, setCityOptionsArabic] = useState([]);
  const [cityOptionsValue, setCityOptionsValue] = useState(null);

  //States for storing Branch Dropdown
  const [branchOptionsEnglish, setBranchOptionsEnglish] = useState([]);
  const [branchOptionsArabic, setBranchOptionsArabic] = useState([]);
  const [branchOptionsValue, setBranchOptionsValue] = useState(null);

  //States for storing Services Dropdown
  const [servicesOptionsEnglish, setServicesOptionsEnglish] = useState([]);
  const [servicesOptionsArabic, setServicesOptionsArabic] = useState([]);
  const [servicesOptionsValue, setServicesOptionsValue] = useState(null);

  // state for row to set data in table
  const [rows, setRows] = useState([]);

  const callApi = () => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
    dispatch(
      getCountryCitiesApi(t, navigate, loadingFlag, 1, countryOptionValue.value)
    );
  };

  useEffect(() => {
    callApi();
  }, []);

  // useEffect to get data of getAllBranchShiftCounter from reducer
  useEffect(() => {
    if (
      getAllBranchShiftCounterData !== null &&
      getAllBranchShiftCounterData !== undefined &&
      Array.isArray(getAllBranchShiftCounterData)
    ) {
      setRows(getAllBranchShiftCounterData);
    } else {
      setRows([]);
    }
  }, [getAllBranchShiftCounterData]);

  // useEffect to show countries in country dropdown
  useEffect(() => {
    try {
      if (getCountryListData && Object.keys(getCountryListData).length > 0) {
        setCountryOptionEnglish(
          getCountryListData.map((item) => ({
            value: item.countryID,
            label: item.countryNameEnglish,
          }))
        );
        setCountryOptionArabic(
          getCountryListData.map((item) => ({
            value: item.countryID,
            label: item.countryNameArabic,
          }))
        );

        let data;
        if (currentLanguage === "en") {
          if (
            countryID !== null &&
            countryID !== undefined &&
            countryID !== 0
          ) {
            const foundCountry = getCountryListData.find(
              (country) => country.countryID === countryID
            );

            console.log(foundCountry, "foundCountry");

            if (foundCountry) {
              console.log(foundCountry, "datadatadata");
              data = {
                value: foundCountry.countryID,
                label: foundCountry.countryNameEnglish,
              };
            } else {
              data = {
                value: countryID,
                label: t("No Country Found"),
              };
            }
          } else {
            data = {
              value: getCountryListData[0].countryID,
              label: getCountryListData[0].countryNameEnglish,
            };
          }
          setCountryOptionValue(data);
        } else {
          if (
            countryID !== null &&
            countryID !== undefined &&
            countryID !== 0
          ) {
            const foundCity = getCountryListData.find(
              (country) => country.country === countryID
            );
            if (foundCity) {
              data = {
                value: foundCity.countryID,
                label: foundCity.countryNameArabic, // Change to Arabic name if available
              };
            } else {
              data = {
                value: countryID,
                label: t("No Country Found"),
              };
            }
          } else {
            data = {
              value: getCountryListData[0].countryID,
              label: getCountryListData[0].countryNameArabic, // Change to Arabic name for the first country in the list
            };
          }
          setCountryOptionValue(data);
        }
      } else {
        setCountryOptionEnglish([]);
        setCountryOptionArabic([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
  }, [getCountryListData, currentLanguage]);

  // useEffect to show cities in city dropdown data
  useEffect(() => {
    try {
      if (cityList !== null && Object.keys(cityList).length > 0) {
        setcityOptionsEnglish(
          cityList.cities.map((item) => ({
            value: item.cityID,
            label: item.cityNameEnglish,
          }))
        );
        setCityOptionsArabic(
          cityList.cities.map((item) => ({
            value: item.cityID,
            label: item.cityNameArabic,
          }))
        );
      } else {
        setcityOptionsEnglish([]);
        setCityOptionsArabic([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerrorerror");
    }
  }, [cityList, currentLanguage]);

  // useEffect to show Branches in Branch dropdown data
  useEffect(() => {
    if (cityShiftsBranchDropdown && cityShiftsBranchDropdown.length !== 0) {
      if (currentLanguage === "en") {
        setBranchOptionsEnglish(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setBranchOptionsArabic(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [cityShiftsBranchDropdown, currentLanguage]);

  // show Services in Services dropdown
  useEffect(() => {
    if (getGlobalServiceData !== null && Array.isArray(getGlobalServiceData)) {
      setServicesOptionsEnglish(
        getGlobalServiceData.map((item) => ({
          value: item.serviceID,
          label: item.serviceNameEnglish,
        }))
      );
      setServicesOptionsArabic(
        getGlobalServiceData.map((item) => ({
          value: item.serviceID,
          label: item.serviceNameArabic,
        }))
      );
    } else {
      setCountryOptionEnglish([]);
      setCountryOptionArabic([]);
    }
  }, [getGlobalServiceData, currentLanguage]);

  //onChange handler of country dropdown
  const onChangeCountryHandler = (countryValue) => {
    setCountryOptionValue({
      value: countryValue.value,
      label: countryValue.label,
    });
    dispatch(
      getCountryCitiesApi(t, navigate, loadingFlag, 1, countryValue.value)
    );
  };

  //onChange handler of City dropdown
  const onChangeCitysHandler = (cityValue) => {
    setCityOptionsValue(cityValue.value);
    dispatch(getCityBranchListApi(t, navigate, loadingFlag, cityValue.value));
  };

  //onChange handler of Branch dropdown
  const onChangeBranchHandler = (branchValue) => {
    setBranchOptionsValue(branchValue.value);
  };

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue(serviceValue.value);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelCountry = () => {
    setIsPanelOpenCountry(!isPanelOpenCountry);
  };

  //onChange handle Date Selector

  const counterHandleDateSelector = (dateObj) => {
    setCounterDateSelector(dateObj);
  };

  const searchHanlderForCounter = () => {
    let data = {
      CountryID: Number(countryOptionValue.value),
      ServiceID: Number(servicesOptionsValue),
      CityID: Number(cityOptionsValue),
      BranchID: Number(branchOptionsValue),
      RoasterDate: multiDatePickerDateChangIntoUTC(counterDateSelector),
    };
    dispatch(getAllBranchShiftCounterMainApi(t, navigate, loadingFlag, data));
  };

  const dataSource = [
    {
      id: 1,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 3,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 4,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const columns = [
    {
      title: (
        <span className="table-inside-header-text-new">{t("Branch-name")}</span>
      ),
      dataIndex: "branchNameEnglish",
      key: "branchNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          <span>
            {currentLanguage === "en"
              ? record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.branch.branchNameEnglish
              : record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.branch.branchNameArabic}
          </span>
        </span>
      ),
    },
    {
      title: (
        <span className="table-inside-header-text-new">
          {t("Counter-name")}
        </span>
      ),
      dataIndex: "counterNameEnglish",
      key: "counterNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          <span>
            {currentLanguage === "en"
              ? record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.counter.counterNameEnglish
              : record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.counter.counterNameArabic}
          </span>
        </span>
      ),
    },
    {
      title: <span className="table-inside-header-text-new">{t("Shift")}</span>,
      dataIndex: "shiftNameEnglish",
      key: "shiftNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          <span>
            {currentLanguage === "en"
              ? record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.shift.shiftNameEnglish
              : record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.shift.shiftNameArabic}
          </span>
        </span>
      ),
    },
    {
      title: (
        <span className="table-inside-header-text-new">{t("Service")}</span>
      ),
      dataIndex: "serviceNameEnglish",
      key: "serviceNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          <span>
            {currentLanguage === "en"
              ? record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.service.serviceNameEnglish
              : record.cityBranchShiftServiceCounterObject
                  .branchShiftServiceCounterObject.service.serviceNameArabic}
          </span>
        </span>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch-service-wise-counter")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="BranchServiceCounter-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Country")}</label>
                    <Select
                      options={
                        currentLanguage === "en"
                          ? countryOptionEnglish
                          : countryOptionArabic
                      }
                      value={countryOptionValue}
                      onChange={onChangeCountryHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      isDisabled={countryOptionValue === null ? true : false}
                      options={
                        currentLanguage === "en"
                          ? cityOptionsEnglish
                          : cityOptionsArabic
                      }
                      onChange={onChangeCitysHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
              </Row>
              <Row className="mx-auto d-flex align-items-center justify-content-center mt-2">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      options={
                        currentLanguage === "en"
                          ? branchOptionsEnglish
                          : branchOptionsArabic
                      }
                      isDisabled={cityOptionsValue === null ? true : false}
                      onChange={onChangeBranchHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      options={
                        currentLanguage === "en"
                          ? servicesOptionsEnglish
                          : servicesOptionsArabic
                      }
                      onChange={onChangeServicesHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={6} md={6} sm={12} className="datesection">
                  <div className="col-for-date-timepicker-cityad">
                    <label className="text-labels">{t("Date")}</label>
                    <DatePicker
                      arrowClassName="arrowClass"
                      containerClassName="containerClassTimePicker"
                      editable={false}
                      value={counterDateSelector}
                      onChange={counterHandleDateSelector}
                    />
                  </div>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="d-flex justify-content-end buttonalignment mt-3"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    onClick={searchHanlderForCounter}
                    className="Search-Icon-Btn"
                  />
                </Col>
              </Row>

              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-start ms-3 mt-3"
                >
                  {getAllBranchShiftCounterData !== null &&
                    getAllBranchShiftCounterData.map((data, index) => (
                      <>
                        <label
                          className="collapse-top-heading"
                          key={index.countryID}
                        >
                          {currentLanguage === "en"
                            ? data.countryObject.countryNameEnglish
                            : data.countryObject.countryNameArabic}
                        </label>
                      </>
                    ))}
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  {getAllBranchShiftCounterData !== null &&
                    getAllBranchShiftCounterData.map((data, index) => (
                      <>
                        <Collapse
                          bordered={false}
                          className="BranchServiceCounter-disable-bg"
                          expandIcon={false}
                          key={index}
                        >
                          <>
                            {data.cityBranchShiftServiceCounterObject.map(
                              (cityData, cityIndex) => (
                                <>
                                  <Panel
                                    header={
                                      <div
                                        className={`BranchServiceCounter-bg-color ${
                                          isPanelOpen ? "open" : ""
                                        }`}
                                        onClick={togglePanel}
                                        key={cityIndex}
                                      >
                                        <span className="toggle-tiles">
                                          {currentLanguage === "en"
                                            ? cityData.city.cityNameEnglish
                                            : cityData.city.cityNameArabic}
                                          {/* {t("Riyadh")} */}
                                        </span>
                                        {isPanelOpen ? (
                                          <i
                                            className={
                                              "icon-arrow-up BranchServiceCounter-collapse"
                                            }
                                          ></i>
                                        ) : (
                                          <i
                                            className={
                                              "icon-arrow-down BranchServiceCounter-collapse"
                                            }
                                          ></i>
                                        )}
                                      </div>
                                    }
                                    key="1"
                                  >
                                    <Table
                                      column={columns}
                                      rows={
                                        cityData.branchShiftServiceCounterObject
                                      }
                                      pagination={false}
                                      className="div-table-BranchServiceCounter"
                                    />
                                  </Panel>
                                </>
                              )
                            )}
                          </>
                        </Collapse>
                      </>
                    ))}
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default BranchServiceCounter;

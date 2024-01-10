import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ShiftScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-multi-date-picker";
import {
  getAllBranchShiftWiseServicesMainApi,
  getCityBranchListApi,
  getCountryCitiesApi,
  getCountryListMainApi,
  getGlobalServiceMainApi,
} from "../../../store/actions/Admin_action";
import { multiDatePickerDateChangIntoUTC } from "../../../commen/functions/Date_time_formatter";

const ShiftScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryID = Number(searchParams.get("countryID"));
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");
  const flag = localStorage.getItem("selectedKeys");

  // To get Country List in dropdown
  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );

  //To get City List
  const cityList = useSelector((state) => state.admin.cityList);

  //To get Branch List
  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  //To get Branch Wise Shift Services
  const BranchWiseShiftServices = useSelector(
    (state) => state.admin.citybranchShiftServicesListData
  );

  //States for Storing Country Drop down
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState(null);

  //States for storing Services Dropdown
  const [servicesOptionsEnglish, setServicesOptionsEnglish] = useState([]);
  const [servicesOptionsArabic, setServicesOptionsArabic] = useState([]);
  const [servicesOptionsValue, setServicesOptionsValue] = useState(null);

  //States for storing City Dropdown
  const [cityOptionsEnglish, setcityOptionsEnglish] = useState([]);
  const [cityOptionsArabic, setCityOptionsArabic] = useState([]);
  const [cityOptionsValue, setCityOptionsValue] = useState(null);

  //States for storing Branch Dropdown
  const [branchOptionsEnglish, setBranchOptionsEnglish] = useState([]);
  const [branchOptionsArabic, setBranchOptionsArabic] = useState([]);
  const [branchOptionsValue, setBranchOptionsValue] = useState(null);

  //table data state
  const [rows, setRows] = useState([]);

  //Date state
  const [dateSelector, setDateSelector] = useState(new Date());

  const callApi = () => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
  };

  useEffect(() => {
    callApi();
  }, []);

  // show countries in city dropdown
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
      } else {
        setCountryOptionEnglish([]);
        setCountryOptionArabic([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
  }, [getCountryListData, currentLanguage]);

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
    setCountryOptionValue(countryValue.value);
    dispatch(
      getCountryCitiesApi(t, navigate, loadingFlag, 1, countryValue.value)
    );
  };

  // useEffect city dropdown data
  useEffect(() => {
    try {
      if (cityList !== null && Object.keys(getCountryListData).length > 0) {
        console.log(cityList, "useEffectuseEffectuseEffect");
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

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue(serviceValue.value);
  };

  //onChange handler of City dropdown
  const onChangeCitysHandler = (cityValue) => {
    setCityOptionsValue(cityValue.value);
    dispatch(getCityBranchListApi(t, navigate, loadingFlag, cityValue.value));
  };

  // useEffect Branch  dropdown data
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

  //onChange handler of Branch dropdown
  const onChangeBranchHandler = (branchValue) => {
    setBranchOptionsValue(branchValue.value);
  };

  //onChange handle Date Selector

  const handleDateSelector = (dateObj) => {
    setDateSelector(dateObj);
  };

  const handleSearchhitBranchShiftEWiseServices = () => {
    let data = {
      CountryID: Number(countryOptionValue),
      ServiceID: Number(servicesOptionsValue),
      CityID: Number(cityOptionsValue),
      BranchID: Number(branchOptionsValue),
      RoasterDate: multiDatePickerDateChangIntoUTC(dateSelector),
    };
    dispatch(
      getAllBranchShiftWiseServicesMainApi(t, navigate, loadingFlag, data)
    );
  };

  //Table Data State of All shift
  useEffect(() => {
    if (
      BranchWiseShiftServices !== null &&
      BranchWiseShiftServices.length > 0 &&
      Array.isArray(BranchWiseShiftServices)
    ) {
      console.log(
        BranchWiseShiftServices,
        "BranchWiseShiftServicesBranchWiseShiftServices"
      );
      setRows(BranchWiseShiftServices);
    } else {
      setRows([]);
    }
  }, [BranchWiseShiftServices]);

  const columns = [
    {
      title: <span className="table-text">{t("Country")}</span>,
      dataIndex: "country",
      key: "country",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.country.countryNameEnglish
            : record.country.countryNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "service",
      key: "service",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.service.serviceNameEnglish
            : record.service.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("City")}</span>,
      dataIndex: "city",
      key: "city",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.city.cityNameEnglish
            : record.city.cityNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-name")}</span>,
      dataIndex: "branch",
      key: "branch",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branch.branchNameEnglish
            : record.branch.branchNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shift",
      key: "shift",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.shift.shiftNameEnglish
            : record.shift.shiftNameArabic}
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
              {t("Branch-shift-wise-service-availability")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Shift-screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Country")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      options={
                        currentLanguage === "en"
                          ? countryOptionEnglish
                          : countryOptionArabic
                      }
                      onChange={onChangeCountryHandler}
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      isSearchable={true}
                      isDisabled={countryOptionValue === null ? true : false}
                      className="select-dropdown-all"
                      options={
                        currentLanguage === "en"
                          ? cityOptionsEnglish
                          : cityOptionsArabic
                      }
                      onChange={onChangeCitysHandler}
                    />
                  </span>
                </Col>
              </Row>
              <Row className="mx-auto d-flex align-items-center justify-content-center mt-3">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      isSearchable={true}
                      isDisabled={cityOptionsValue === null ? true : false}
                      className="select-dropdown-all"
                      options={
                        currentLanguage === "en"
                          ? branchOptionsEnglish
                          : branchOptionsArabic
                      }
                      onChange={onChangeBranchHandler}
                    />
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      options={
                        currentLanguage === "en"
                          ? servicesOptionsEnglish
                          : servicesOptionsArabic
                      }
                      onChange={onChangeServicesHandler}
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
                      value={dateSelector}
                      onChange={handleDateSelector}
                    />
                  </div>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="d-flex justify-content-end mt-3 buttonalignment"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={handleSearchhitBranchShiftEWiseServices}
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

export default ShiftScreen;

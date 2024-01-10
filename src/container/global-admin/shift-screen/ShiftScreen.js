import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ShiftScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  getCityBranchListApi,
  getCountryCitiesApi,
  getCountryListMainApi,
  getGlobalServiceMainApi,
} from "../../../store/actions/Admin_action";

const ShiftScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryID = Number(searchParams.get("countryID"));
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const searchParamsBranch = new URLSearchParams(location.search);
  const urldBranchID = searchParamsBranch.get("branchId");
  const currentLanguage = localStorage.getItem("i18nextLng");

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

  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
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

  const callApi = () => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
    dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 1, countryID));
    dispatch(getCityBranchListApi(t, navigate, loadingFlag, urldBranchID));
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

  //onChange handler of country dropdown
  const onChangeCountryHandler = (countryValue) => {
    setCountryOptionValue(countryValue.value);
  };

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue(serviceValue.value);
  };

  //onChange handler of City dropdown
  const onChangeCitysHandler = (cityValue) => {
    setCityOptionsValue(cityValue.value);
  };

  //onChange handler of Branch dropdown
  const onChangeBranchHandler = (branchValue) => {
    setBranchOptionsValue(branchValue.value);
  };

  const dataSource = [
    {
      id: 1,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
    {
      id: 2,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
    {
      id: 3,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
      City: <span className="table-inside-text">Riyadh</span>,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      shift: <span className="table-inside-text">Shift 1</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Country")}</span>,
      dataIndex: "Country",
      key: "Country",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "shiftName",
      key: "shiftName",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("City")}</span>,
      dataIndex: "City",
      key: "City",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Branch-name")}</span>,
      dataIndex: "branchName",
      key: "branchName",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: "shift",
      key: "shift",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch />
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
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
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
      </section>
    </>
  );
};

export default ShiftScreen;

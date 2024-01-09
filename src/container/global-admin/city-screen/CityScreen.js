import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCityServicesMainApi,
  getCountryListMainApi,
  getGlobalServiceMainApi,
} from "../../../store/actions/Admin_action";

const CityScreen = () => {
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

  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );

  //States for Storing Country Drop down
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState(null);

  //States for storing Services Dropdown

  const [servicesOptionsEnglish, setServicesOptionsEnglish] = useState([]);
  const [servicesOptionsArabic, setServicesOptionsArabic] = useState([]);
  const [servicesOptionsValue, setServicesOptionsValue] = useState(null);

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

  // useEffect to update data in table
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

  // useEffect(() => {
  //   let data = {
  //     CountryID: 0,
  //     ServiceID: 0,
  //   };
  //   dispatch(getAllCityServicesMainApi(t, navigate, loadingFlag, data));
  // }, []);

  //onChange handler of country dropdown
  const onChangeCountryHandler = (countryValue) => {
    console.log(countryValue, "countryValuecountryValuecountryValue");
    setCountryOptionValue(countryValue.value);
  };

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue(serviceValue.value);
  };

  //Search Button Api hit
  const handleSearchApiHit = () => {
    let data = {
      CountryID: Number(countryOptionValue),
      ServiceID: Number(servicesOptionsValue),
    };
    dispatch(getAllCityServicesMainApi(t, navigate, loadingFlag, data));
  };

  const dataSource = [
    {
      id: 1,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
    },
    {
      id: 2,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">First Registry</span>,
      City: <span className="table-inside-text">Riyadh</span>,
    },
    {
      id: 3,
      Country: <span className="table-inside-text">Saudi</span>,
      shiftName: <span className="table-inside-text">Change Ownership</span>,
      City: <span className="table-inside-text">Riyadh</span>,
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
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "column6",
      key: "column6",
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
              {t("City-wise-service-availability")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="City-Screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={4} md={4} sm={12}>
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
                <Col lg={4} md={4} sm={12}>
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
                <Col lg={2} md={2} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={handleSearchApiHit}
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

export default CityScreen;

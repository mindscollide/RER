import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./BranchScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  getAllCityBranchWiseServicesMainApi,
  getCountryCitiesApi,
  getCountryListMainApi,
  getGlobalServiceMainApi,
} from "../../../store/actions/Admin_action";

const BranchScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryID = Number(searchParams.get("countryID"));
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");
  const searchParamsCountry = new URLSearchParams(location.search);
  const CountryID = Number(searchParamsCountry.get("countryID"));

  // To get Country List in dropdown
  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );

  // get Branch  Service Data reducers
  const getCityBranchWiseData = useSelector(
    (state) => state.admin.cityBranchWiseServicesList
  );

  //To get City List
  const cityList = useSelector((state) => state.admin.cityList);

  //States for Storing Country Drop down
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState({
    value: 1,
    label: "",
  });

  //States for storing Services Dropdown
  const [servicesOptionsEnglish, setServicesOptionsEnglish] = useState([]);
  const [servicesOptionsArabic, setServicesOptionsArabic] = useState([]);
  const [servicesOptionsValue, setServicesOptionsValue] = useState(null);

  //States for storing Services Dropdown
  const [cityOptionsEnglish, setcityOptionsEnglish] = useState([]);
  const [cityOptionsArabic, setCityOptionsArabic] = useState([]);
  const [cityOptionsValue, setCityOptionsValue] = useState(null);

  //table data state
  const [rows, setRows] = useState([]);

  const callApi = () => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (CountryID !== null && CountryID !== 0) {
      dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 1, CountryID));
    } else if (countryOptionValue.value !== 0) {
      dispatch(
        getCountryCitiesApi(
          t,
          navigate,
          loadingFlag,
          1,
          countryOptionValue.value
        )
      );
    }
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

        let data;
        if (currentLanguage === "en") {
          if (
            CountryID !== null &&
            CountryID !== undefined &&
            CountryID !== 0
          ) {
            const foundCountry = getCountryListData.find(
              (country) => country.countryID === CountryID
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
                value: CountryID,
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
            CountryID !== null &&
            CountryID !== undefined &&
            CountryID !== 0
          ) {
            const foundCity = getCountryListData.find(
              (country) => country.country === CountryID
            );
            if (foundCity) {
              data = {
                value: foundCity.countryID,
                label: foundCity.countryNameArabic, // Change to Arabic name if available
              };
            } else {
              data = {
                value: CountryID,
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
    console.log(countryValue, "countryValuecountryValuecountryValue");
    setCountryOptionValue({
      value: countryValue.value,
      label: countryValue.label,
    });
    dispatch(
      getCountryCitiesApi(t, navigate, loadingFlag, 1, countryValue.value)
    );
  };

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue(serviceValue.value);
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

  //onChange handler of City dropdown
  const onChangeCitysHandler = (cityValue) => {
    setCityOptionsValue(cityValue.value);
  };

  //handle Search button hit \

  const handleSearchhit = () => {
    let data = {
      CountryID: Number(countryOptionValue.value),
      ServiceID: Number(servicesOptionsValue),
      CityID: Number(cityOptionsValue),
    };
    dispatch(
      getAllCityBranchWiseServicesMainApi(t, navigate, loadingFlag, data)
    );
  };

  // data for the table
  useEffect(() => {
    try {
      if (
        getCityBranchWiseData !== null &&
        getCityBranchWiseData.length > 0 &&
        Array.isArray(getCityBranchWiseData)
      ) {
        console.log(getCityBranchWiseData, "setRowssetRowssetRows");
        setRows(getCityBranchWiseData);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
  }, [getCityBranchWiseData]);

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
      dataIndex: "branchService",
      key: "branchService",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchService.branchService.serviceNameEnglish
            : record.branchService.branchService.serviceNameArabic}
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
      dataIndex: "branchService",
      key: "branchService",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchService.branchService.serviceNameEnglish
            : record.branchService.branchService.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Availability")}</span>,
      dataIndex: "branchService",
      key: "branchService",
      width: "200px",
      render: (text, record) => (
        <Switch
          checked={record.branchService.isServiceAvailableAtBranch}
          disabled
        />
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Branch-wise-service-availability")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Branch-Screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={6} md={6} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Country")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      value={countryOptionValue}
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

              <Row className="mx-auto d-flex align-items-center justify-content-center mt-3">
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
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="d-flex justify-content-start mt-3"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={handleSearchhit}
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

export default BranchScreen;

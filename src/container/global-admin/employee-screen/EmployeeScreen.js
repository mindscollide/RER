import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./EmployeeScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  getAllEmployeeMainApi,
  getCountryListMainApi,
  getCountryCitiesApi,
} from "../../../store/actions/Admin_action";

const EmployeeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryID = Number(searchParams.get("countryID"));
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");

  //To get Employee List
  const getEmployeeList = useSelector((state) => state.admin.getEmployeeList);

  // To get Country List in dropdown
  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  // get city list in dropdown from reducer
  const cityList = useSelector((state) => state.admin.cityList);

  // state to render data in rows
  const [rows, setRows] = useState([]);

  // state for dropdown COuntry
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState(null);

  // state for dropdown city
  const [cityOptionListEnglish, setCityOptionListEnglish] = useState([]);
  const [cityOptionListArabic, setCityOptionListArabic] = useState([]);
  const [cityOptionValue, setCityOptionValue] = useState(null);

  const callApi = () => {
    if (countryID !== null && countryID !== undefined && countryID !== 0) {
      dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
      dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 1, countryID));
    }
  };

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
      setCountryOptionEnglish([]);
      setCountryOptionArabic([]);
      setCountryOptionValue(null);
    };
  }, []);

  // useEffect to render an API
  useEffect(() => {
    let data = {
      CountryID: Number(countryID),
      CityID: Number(localStorage.getItem("cityID")),
    };
    dispatch(getAllEmployeeMainApi(t, navigate, loadingFlag, data));
  }, []);

  // useEffect to render data in rows
  useEffect(() => {
    if (getEmployeeList !== null && Array.isArray(getEmployeeList)) {
      setRows(getEmployeeList);
    } else {
      setRows([]);
    }
  }, [getEmployeeList]);

  // to show countries in city dropdown;
  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (
      getCountryListData &&
      Object.keys(getCountryListData).length > 0 &&
      cityList &&
      Object.keys(cityList).length > 0
    ) {
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

      setCityOptionListEnglish(
        cityList.cities.map((item) => ({
          value: item.cityID,
          label: item.cityNameEnglish,
        }))
      );
      setCityOptionListArabic(
        cityList.cities.map((item) => ({
          value: item.cityID,
          label: item.cityNameArabic,
        }))
      );
      let data;
      // this is use to set drope down value on page route from side bar
      if (currentLanguage === "en") {
        if (countryID !== null && countryID !== undefined && countryID !== 0) {
          const foundCity = getCountryListData.find(
            (country) => country.countryID === countryID
          );

          const foundCities = cityList.cities.find(
            (city) => city.cityID === countryID
          );
          if (foundCity) {
            data = {
              value: foundCity.countryID,
              label: foundCity.countryNameEnglish,
            };
          } else if (foundCities) {
            data = {
              value: foundCity.cityID,
              label: foundCity.cityNameEnglish,
            };
          } else {
            data = {
              value: countryID,
              label: t("Admin_AdminServiceManager_GetCountryList_02"), // Example label for when countryID is not found
            };

            data = {
              value: countryID,
              label: t("Admin_AdminServiceManager_UpdateCityBranch_03"), // Example label for when cityID is not found
            };
          }
          setCountryOptionValue(data);
        } else {
          // If countryID is null or undefined, use the first city in getCountryListData
          data = {
            value: getCountryListData[0].countryID,
            label: getCountryListData[0].countryNameEnglish,
          };
          setCountryOptionValue(data);

          data = {
            value: cityList.cities[0].cityID,
            label: cityList.cities[0].cityNameEnglish,
          };
        }
      } else {
        if (countryID !== null && countryID !== undefined && countryID !== 0) {
          const foundCity = getCountryListData.find(
            (country) => country.countryID === countryID
          );

          const foundCities = cityList.cities.find(
            (city) => city.cityID === countryID
          );
          if (foundCity) {
            data = {
              value: foundCity.cityID,
              label: foundCity.countryNameArabic,
            };
          } else if (foundCities) {
            data = {
              value: foundCity.cityID,
              label: foundCity.cityNameEnglish,
            };
          } else {
            // Handle the case where countryID is not found in getCountryListData
            // You might want to set default values or handle this scenario differently based on your requirements
            data = {
              value: countryID,
              label: t("Admin_AdminServiceManager_GetCountryList_02"), // Example label for when countryID is not found
            };

            data = {
              value: countryID,
              label: t("Admin_AdminServiceManager_UpdateCityBranch_03"), // Example label for when cityID is not found
            };
          }
        } else {
          // If countryID is null or undefined, use the first city in getCountryListData
          data = {
            value: getCountryListData[0].countryID,
            label: getCountryListData[0].countryNameArabic,
          };

          data = {
            value: cityList.cities[0].cityID,
            label: cityList.cities[0].cityNameArabic,
          };
        }
        setCountryOptionValue(data);
      }
    } else {
      setCountryOptionEnglish([]);
      setCountryOptionArabic([]);
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
    }
  }, [getCountryListData, cityList, currentLanguage]);

  //onChange handler of country dropdown
  const onChangeCountryHandler = (countryValue) => {
    setCountryOptionValue(countryValue);
  };

  //onChange handler of cities dropdown
  const onChangeCityHandler = (cityShiftOptionValue) => {
    setCityOptionValue(cityShiftOptionValue);
  };

  const columns = [
    {
      title: <span className="table-text">{t("Country")}</span>,
      dataIndex: "countryNameEnglish",
      key: "countryNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.country.countryNameEnglish
            : record.country.countryNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("City")}</span>,
      dataIndex: "cityNameEnglish",
      key: "cityNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.city.cityNameEnglish
            : record.city.cityNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Employee-name")}</span>,
      dataIndex: "employeeEnglishName",
      key: "employeeEnglishName",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.employee.employeeEnglishName
            : record.employee.employeeNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Capacity")}</span>,
      dataIndex: "Capacity",
      key: "Capacity",
      width: "200px",
    },

    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "isEmployeeActive",
      key: "isEmployeeActive",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch checked={record.employee.isEmployeeActive} />
        </span>
      ),
    },
  ];

  const handleSearch = async () => {
    if (cityOptionValue !== null && countryOptionValue !== null) {
      let newData = {
        CountryID: Number(cityOptionValue.value && countryOptionValue.value),
        CityID: Number(localStorage.getItem("cityID")),
      };
      await dispatch(getAllEmployeeMainApi(t, navigate, loadingFlag, newData));
    } else {
    }
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">{t("Employee-availability")}</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Employee-Screen-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={4} md={4} sm={12}>
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
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      options={
                        currentLanguage === "en"
                          ? cityOptionListEnglish
                          : cityOptionListArabic
                      }
                      value={cityOptionValue}
                      onChange={onChangeCityHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>

                <Col
                  lg={2}
                  md={2}
                  sm={12}
                  className="d-flex justify-content-start mt-3"
                >
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    onClick={handleSearch}
                    className="Search-Icon-Btn"
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

export default EmployeeScreen;

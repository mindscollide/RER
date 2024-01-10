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
  const countryIDLocationValue = Number(searchParams.get("countryID"));
  console.log(countryIDLocationValue, "countryIDcountryIDcountryIDcountryID");
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
  console.log(cityList);

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

  const callApi = async () => {
    if (
      countryIDLocationValue !== null &&
      countryIDLocationValue !== undefined &&
      countryIDLocationValue !== 0
    ) {
      await dispatch(
        getCountryCitiesApi(t, navigate, loadingFlag, 1, countryIDLocationValue)
      );
    }
  };

  useEffect(() => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag));
    // dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 1));
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
    const cityIDFromList = cityList?.cityID;
    let data = {
      CountryID: Number(countryIDLocationValue),
      CityID: Number(cityIDFromList || localStorage.getItem("cityID")),
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

  // to show countries in country dropdown;
  useEffect(() => {
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
      // this is use to set drope down value on page route from side bar
      if (currentLanguage === "en") {
        if (
          countryIDLocationValue !== null &&
          countryIDLocationValue !== undefined &&
          countryIDLocationValue !== 0
        ) {
          const foundCountry = getCountryListData.find(
            (country) => country.countryID === countryIDLocationValue
          );

          if (foundCountry) {
            data = {
              value: foundCountry.countryID,
              label: foundCountry.countryNameEnglish,
            };
          } else {
            data = {
              value: countryIDLocationValue,
              label: t("Admin_AdminServiceManager_GetCountryList_02"), // Example label for when countryID is not found
            };
          }
          setCountryOptionValue(data);
        } else {
          setCountryOptionValue(null);
          // If countryID is null or undefined, use the first city in getCountryListData
          data = {
            value: getCountryListData[0].countryID,
            label: getCountryListData[0].countryNameEnglish,
          };
        }
      } else {
        if (
          countryIDLocationValue !== null &&
          countryIDLocationValue !== undefined &&
          countryIDLocationValue !== 0
        ) {
          const foundCountry = getCountryListData.find(
            (country) => country.countryID === countryIDLocationValue
          );

          if (foundCountry) {
            data = {
              value: foundCountry.countryID,
              label: foundCountry.countryNameArabic,
            };
          } else {
            // Handle the case where countryID is not found in getCountryListData
            // You might want to set default values or handle this scenario differently based on your requirements
            data = {
              value: countryIDLocationValue,
              label: t("Admin_AdminServiceManager_GetCountryList_02"), // Example label for when countryID is not found
            };
          }
        } else {
          // If countryID is null or undefined, use the first city in getCountryListData
          data = {
            value: getCountryListData[0].countryID,
            label: getCountryListData[0].countryNameArabic,
          };
        }
      }
    } else {
      setCountryOptionEnglish([]);
      setCountryOptionArabic([]);
    }
  }, [getCountryListData, currentLanguage]);

  // to show country cities in city dropdown;
  useEffect(() => {
    if (
      cityList &&
      cityList.cities &&
      Object.keys(cityList.cities).length > 0
    ) {
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

      // Set the initial value for city based on cityID from URL
      const initialCity = cityList.cities.find(
        (city) =>
          city.cityID === Number(localStorage.getItem("cityID")) ||
          cityList.cities[0]
      );

      if (initialCity) {
        setCityOptionValue({
          value: initialCity.cityID,
          label:
            currentLanguage === "en"
              ? initialCity.cityNameEnglish
              : initialCity.cityNameArabic,
        });
      }
    } else {
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
    }
  }, [cityList, currentLanguage]);

  useEffect(() => {
    setCityOptionValue(null);
  }, [countryOptionValue]);

  //onChange handler of country dropdown
  const onChangeCountryHandler = async (countryValue) => {
    setCountryOptionValue(countryValue);
    await dispatch(
      getCountryCitiesApi(t, navigate, loadingFlag, 1, countryValue.value)
    );
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
      dataIndex: "employeeBelongsToBranch",
      key: "employeeBelongsToBranch",
      render: (text, record) => (
        <span>
          {record.employee.employeeBelongsToBranch === true ? (
            <span className="table-inside-text">{t("Branch-employee")}</span>
          ) : (
            <span className="table-inside-text">
              {t("Home-visit-employee")}
            </span>
          )}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "isEmployeeActive",
      key: "isEmployeeActive",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch checked={record.employee.isEmployeeActive} disabled={true} />
        </span>
      ),
    },
  ];

  //onChange handler of cities dropdown
  const onChangeCityHandler = (cityValue) => {
    setCityOptionValue(cityValue);
  };

  const handleSearch = async () => {
    if (countryOptionValue !== null && cityOptionValue !== null) {
      let newData = {
        CountryID: Number(countryOptionValue.value),
        CityID: Number(cityOptionValue.value),
      };
      await dispatch(getAllEmployeeMainApi(t, navigate, loadingFlag, newData));
    } else {
      console.log("No Data Found");
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

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseEmployee.css";
import { Paper, Table, Button } from "../../../components/elements";
import Select from "react-select";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import {
  getCityEmployeeMainApi,
  getCountryCitiesApi,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { loader_Actions } from "../../../store/actions/Loader_action";

const CountryWiseEmployee = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityID = Number(searchParams.get("cityID"));
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const cityEmployeeMain = useSelector((state) => state.admin.cityEmployeeMain);
  const cityList = useSelector((state) => state.admin.cityList);

  const [rows, setRows] = useState([]);

  // states for city branch shift in dropdown
  const [cityOptionListEnglish, setCityOptionListEnglish] = useState([]);
  const [cityOptionListArabic, setCityOptionListArabic] = useState([]);
  const [cityOptionValue, setCityOptionValue] = useState(null);

  const callApi = async () => {
    if (cityID !== null && cityID !== undefined && cityID !== 0) {
      // 2 pasiing in prop for check that we have to call getCityEmployeeMainApi all api from here on page route from side bar
      await dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 3, cityID));
    } else {
      // 2 pasiing in prop for check that we have to call getCityEmployeeMainApi all api from here on page route from side bar
      await dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 2));
    }
  };

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
      setCityOptionValue(null);
    };
  }, []);
  console.log("cityID", cityID);

  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (Object.keys(cityList).length > 0) {
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
        if (cityID !== null && cityID !== undefined && cityID !== 0) {
          const foundCity = cityList.cities.find(
            (city) => city.cityID === cityID
          );
          if (foundCity) {
            data = {
              value: foundCity.cityID,
              label: foundCity.cityNameEnglish,
            };
          } else {
            // Handle the case where cityID is not found in cityList.cities
            // You might want to set default values or handle this scenario differently based on your requirements
            data = {
              value: cityID,
              label: t("Admin_AdminServiceManager_UpdateCityBranch_03"), // Example label for when cityID is not found
            };
          }
        } else {
          // If cityID is null or undefined, use the first city in cityList.cities
          data = {
            value: cityList.cities[0].cityID,
            label: cityList.cities[0].cityNameEnglish,
          };
        }
        setCityOptionValue(data);
      } else {
        if (cityID !== null && cityID !== undefined && cityID !== 0) {
          const foundCity = cityList.cities.find(
            (city) => city.cityID === cityID
          );
          if (foundCity) {
            data = {
              value: foundCity.cityID,
              label: foundCity.cityNameArabic,
            };
          } else {
            // Handle the case where cityID is not found in cityList.cities
            // You might want to set default values or handle this scenario differently based on your requirements
            data = {
              value: cityID,
              label: t("Admin_AdminServiceManager_UpdateCityBranch_03"), // Example label for when cityID is not found
            };
          }
        } else {
          // If cityID is null or undefined, use the first city in cityList.cities
          data = {
            value: cityList.cities[0].cityID,
            label: cityList.cities[0].cityNameArabic,
          };
        }
        setCityOptionValue(data);
      }
    } else {
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
    }
  }, [cityList]);

  // updating table of city employee Main
  useEffect(() => {
    if (cityEmployeeMain !== null) {
      setRows(cityEmployeeMain);
      dispatch(loader_Actions(false));
    } else {
      setRows([]);
      dispatch(loader_Actions(false));
    }
  }, [cityEmployeeMain]);

  const columns = [
    {
      title: <span className="table-text">{t("Employee-name")}</span>,
      dataIndex: "name",
      key: "name",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.employeeEnglishName
            : record.employeeNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Capacity")}</span>,
      dataIndex: "capcity",
      key: "capcity",
      width: "200px",
    },
    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "isEmployeeActive",
      key: "isEmployeeActive",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch checked={text} disabled />
        </span>
      ),
    },
  ];

  const onChangeCityHandler = (cityShiftOptionValue) => {
    setCityOptionValue(cityShiftOptionValue);
  };

  const handleSearch = async () => {
    if (cityOptionValue != null) {
      await dispatch(
        getCityEmployeeMainApi(t, navigate, loadingFlag, cityOptionValue.value)
      );
    } else {
      // add snackbar fun here
    }
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Country-city-wise-employees")}
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {" "}
              {currentLanguage === "en"
                ? localStorage.getItem("countryName")
                : localStorage.getItem("countryNameArabic")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CountryEmployee-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col lg={3} md={3} sm={12} />
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">{t("City")}</label>
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
                <Col lg={3} md={3} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={handleSearch}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} />
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

export default CountryWiseEmployee;

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
  const searchParamsCountry = new URLSearchParams(location.search);
  const CountryID = Number(searchParamsCountry.get("countryID"));

  const searchServiceParams = new URLSearchParams(location.search);
  const serviceID = Number(searchServiceParams.get("serviceID"));

  // To get Country List in dropdown
  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );

  // get All City  Service Table  Data reducers
  const getAllCityServicesData = useSelector(
    (state) => state.admin.servicesCity
  );

  // state for render initial
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  //States for Storing Country Drop down
  const [countryOptionEnglish, setCountryOptionEnglish] = useState([]);
  const [countryOptionArabic, setCountryOptionArabic] = useState([]);
  const [countryOptionValue, setCountryOptionValue] = useState(null);

  //States for storing Services Dropdown
  const [servicesOptionsEnglish, setServicesOptionsEnglish] = useState([]);
  const [servicesOptionsArabic, setServicesOptionsArabic] = useState([]);
  const [servicesOptionsValue, setServicesOptionsValue] = useState(null);

  //States for storing Table data

  const [rows, setRows] = useState([]);

  const callApi = () => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag, countryID));
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
  };

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
    };
  }, []);

  useEffect(() => {
    // Check if serviceID exists in URL parameters
    const searchServiceParams = new URLSearchParams(location.search);
    const initialServiceID = Number(searchServiceParams.get("serviceID"));

    // If serviceID exists, perform the initial search
    if (initialServiceID) {
      // Update the state or perform any action to trigger the initial search
      setServicesOptionsValue({
        value: initialServiceID,
        label: "Service Name", // You can set a default label or update it based on the fetched data
      });

      // Call the API with the initial serviceID
      const data = {
        CountryID: Number(CountryID),
        ServiceID: initialServiceID,
      };
      dispatch(getAllCityServicesMainApi(t, navigate, loadingFlag, data));

      setCountryOptionValue(null);
      setServicesOptionsValue(null);
      setIsInitialRender(true);
    } else {
      setServicesOptionsValue(null);
      setIsInitialRender(false);
    }
  }, [location.search]);

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

  // useEffect to update service dropdown
  useEffect(() => {
    try {
      if (
        getGlobalServiceData &&
        Object.keys(getGlobalServiceData).length > 0
      ) {
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

        let data;
        if (currentLanguage === "en") {
          if (
            serviceID !== null &&
            serviceID !== undefined &&
            serviceID !== 0
          ) {
            const foundCountry = getGlobalServiceData.find(
              (country) => country.serviceID === serviceID
            );
            if (foundCountry) {
              data = {
                value: foundCountry.serviceID,
                label: foundCountry.serviceNameEnglish,
              };
              // setServicesOptionsValue(data);
            } else {
              data = {
                value: serviceID,
                label: t("No Service Found"),
              };
            }
          }
          //  else {
          //   data = {
          //     value: getGlobalServiceData[0].serviceID,
          //     label: getGlobalServiceData[0].serviceNameEnglish,
          //   };
          // }
          setServicesOptionsValue(data);
        } else {
          if (
            serviceID !== null &&
            serviceID !== undefined &&
            serviceID !== 0
          ) {
            const foundCity = getGlobalServiceData.find(
              (country) => country.serviceID === serviceID
            );
            if (foundCity) {
              data = {
                value: foundCity.serviceID,
                label: foundCity.serviceNameArabic, // Change to Arabic name if available
              };
            } else {
              data = {
                value: serviceID,
                label: t("No Service Found"),
              };
            }
          } else {
            data = {
              value: getGlobalServiceData[0].serviceID,
              label: getGlobalServiceData[0].serviceNameArabic, // Change to Arabic name for the first country in the list
            };
          }
          setServicesOptionsValue(data);
        }
      } else {
        setServicesOptionsEnglish([]);
        setServicesOptionsArabic([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
  }, [getGlobalServiceData, currentLanguage]);

  // useEffect(() => {
  //   if (getGlobalServiceData !== null && Array.isArray(getGlobalServiceData)) {
  //     setServicesOptionsEnglish(
  //       getGlobalServiceData.map((item) => ({
  //         value: item.serviceID,
  //         label: item.serviceNameEnglish,
  //       }))
  //     );
  //     setServicesOptionsArabic(
  //       getGlobalServiceData.map((item) => ({
  //         value: item.serviceID,
  //         label: item.serviceNameArabic,
  //       }))
  //     );
  //   } else {
  //     setCountryOptionEnglish([]);
  //     setCountryOptionArabic([]);
  //   }
  // }, [getGlobalServiceData, currentLanguage]);

  //onChange handler of country dropdown
  const onChangeCountryHandler = (countryValue) => {
    setCountryOptionValue({
      value: countryValue.value,
      label: countryValue.label,
    });
  };

  //onChange handler of Serivces dropdown
  const onChangeServicesHandler = (serviceValue) => {
    setServicesOptionsValue({
      value: serviceValue.value,
      label: serviceValue.label,
    });
  };

  //Search Button Api hit
  const handleSearchApiHit = () => {
    let data = {
      CountryID: Number(countryOptionValue?.value),
      ServiceID: Number(servicesOptionsValue?.value),
    };
    dispatch(getAllCityServicesMainApi(t, navigate, loadingFlag, data));
    setSearchPerformed(true);
  };

  useEffect(() => {
    try {
      if (
        getAllCityServicesData !== null &&
        getAllCityServicesData.length > 0
      ) {
        setRows(getAllCityServicesData);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.log(error, "errorerrorerrorerror");
    }
  }, [getAllCityServicesData]);

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
      dataIndex: "cityService",
      key: "cityService",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.cityService.citySM.serviceNameEnglish
            : record.cityService.citySM.serviceNameArabic}
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
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          <Switch checked={record.cityService.branchAvailability} disabled />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      width: "200px",
      render: (text, record) => (
        <span className="table-inside-text">
          <Switch checked={record.cityService.homeAvailability} disabled />
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
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Service")}</label>
                    <Select
                      isSearchable={true}
                      className="select-dropdown-all"
                      value={servicesOptionsValue}
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
                  {(isInitialRender || searchPerformed) && (
                    <Table rows={rows} column={columns} pagination={false} />
                  )}
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

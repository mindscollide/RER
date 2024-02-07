import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityWiseShift.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBranchSiftMainApi,
  getCityBranchListApi,
  getCountryCitiesApi,
} from "../../../store/actions/Admin_action";
import { multiDatePickerDateChangIntoUTC } from "../../../commen/functions/Date_time_formatter";

const CountryCityWiseShift = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityID = Number(searchParams.get("cityID"));

  const Loading = useSelector((state) => state.Loader.Loading);

  const countryCityShiftWiseSelector = useSelector(
    (state) => state.admin.cityList
  );

  const countryBranchShiftWiseSelector = useSelector(
    (state) => state.admin.cityBranchListData
  );

  const getCountryWiseShiftDataRows = useSelector(
    (state) => state.admin.getAllBranchShiftData
  );

  const { Panel } = Collapse;
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [countryCityWiseShift, setCountryCityWiseShift] = useState([]);
  const [countryBranchWiseShift, setCountryBranchWiseShift] = useState([]);
  const [roasterdate, setRoasterdate] = useState(new Date());
  const [servicesTableData, setServicesTableData] = useState({
    branchDetailModel: null,
    branchShiftServiceList: [],
  });
  const [citySelectValue, setCitySelectValue] = useState(null);
  const [cityOptionListEnglish, setCityOptionListEnglish] = useState([]);
  const [cityOptionListArabic, setCityOptionListArabic] = useState([]);

  const [branchSelectValue, setBranchSelectValue] = useState(null);
  const [branchSelectEnglish, setBranchSelectEnglish] = useState([]);
  const [branchSelectArabic, setBranchSelectArabic] = useState([]);

  const [isFirstRender, setIsFirstRender] = useState(false);
  //Country City dropdownApi

  const callApi = async () => {
    if (cityID !== null && cityID !== undefined && cityID !== 0) {
      dispatch(getCountryCitiesApi(t, navigate, Loading, 1, cityID));
    }
    setIsFirstRender(true);
  };
  useEffect(() => {
    callApi();
    return () => {
      setCitySelectValue(null);
      setBranchSelectValue(null);
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
      setBranchSelectEnglish([]);
      setBranchSelectArabic([]);
    };
  }, []);

  //Country City  Data dropdown
  useEffect(() => {
    if (
      countryCityShiftWiseSelector &&
      Object.keys(countryCityShiftWiseSelector).length > 0
    ) {
      setCityOptionListEnglish(
        countryCityShiftWiseSelector.cities.map((item) => ({
          value: item.cityID,
          label: item.cityNameEnglish,
        }))
      );
      setCityOptionListArabic(
        countryCityShiftWiseSelector.cities.map((item) => ({
          value: item.cityID,
          label: item.cityNameArabic,
        }))
      );
      let data;

      if (currentLanguage === "en") {
        if (cityID !== null && cityID !== undefined && cityID !== 0) {
          const foundCity = countryCityShiftWiseSelector.cities.find(
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
          setCitySelectValue(data);
        } else {
          // If cityID is null or undefined, use the first city in cityList.cities
          data = {
            value: countryCityShiftWiseSelector.cities[0].cityID,
            label: countryCityShiftWiseSelector.cities[0].cityNameEnglish,
          };
          setCitySelectValue(data);
        }
        setCitySelectValue(data);
      } else {
        if (cityID !== null && cityID !== undefined && cityID !== 0) {
          const foundCity = countryCityShiftWiseSelector.cities.find(
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
            value: countryCityShiftWiseSelector.cities[0].cityID,
            label: countryCityShiftWiseSelector.cities[0].cityNameArabic,
          };
        }
        setCitySelectValue(data);
      }
    } else {
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
    }
  }, [countryCityShiftWiseSelector, currentLanguage]);

  //Country City  Data dropdown OnChange
  const handleSelectCity = (selectedCityOptions) => {
    setCitySelectValue({
      ...citySelectValue,
      value: selectedCityOptions.value,
      label: selectedCityOptions.label,
    });
    // setCityselectedOption(selectedCityOptions);
    // setSelectedCityID(selectedCityOptions.value);
  };
  useEffect(() => {
    if (citySelectValue?.value !== 0 && isFirstRender) {
      dispatch(
        getCityBranchListApi(
          t,
          navigate,
          Loading,
          Number(citySelectValue?.value)
        )
      );
    }
  }, [citySelectValue]);

  //Country Branch  Data dropdown
  useEffect(() => {
    if (
      countryBranchShiftWiseSelector !== null &&
      countryBranchShiftWiseSelector !== undefined &&
      countryBranchShiftWiseSelector.length !== 0
    ) {
      // setBranchSelectValue({
      //   ...branchSelectValue,
      //   label: countryBranchShiftWiseSelector[0].branchNameEnglish,
      //   value: countryBranchShiftWiseSelector[0].branchID,
      // });

      if (currentLanguage === "en") {
        setBranchSelectEnglish(
          countryBranchShiftWiseSelector.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setBranchSelectArabic(
          countryBranchShiftWiseSelector.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [countryBranchShiftWiseSelector, currentLanguage]);

  //Country City  Data dropdown OnChange
  const handleSelectedBranch = (selectedBranchOptions) => {
    setBranchSelectValue({
      ...branchSelectValue,
      label: selectedBranchOptions.label,
      value: selectedBranchOptions.value,
    });
  };

  useEffect(() => {
    if (
      citySelectValue?.value !== 0 &&
      branchSelectValue?.value !== 0 &&
      isFirstRender
    ) {
      setIsFirstRender(false);
      let data = {
        BranchID: Number(branchSelectValue?.value),
        CityID: Number(citySelectValue?.value),
        RoasterDate: multiDatePickerDateChangIntoUTC(roasterdate),
      };
      dispatch(getAllBranchSiftMainApi(t, data, navigate, Loading));
    }
  }, [citySelectValue?.value, branchSelectValue?.value, isFirstRender]);

  const hitSearchButton = () => {
    let data = {
      BranchID: Number(branchSelectValue?.value),
      CityID: Number(citySelectValue?.value),
      RoasterDate: multiDatePickerDateChangIntoUTC(roasterdate),
    };
    dispatch(getAllBranchSiftMainApi(t, data, navigate, Loading));
  };

  // updating data in table
  useEffect(() => {
    if (getCountryWiseShiftDataRows !== null) {
      setServicesTableData({
        ...servicesTableData,
        branchDetailModel: getCountryWiseShiftDataRows.branchDetailModel,
        branchShiftServiceList:
          getCountryWiseShiftDataRows.branchShiftServiceList,
      });
    } else {
      setServicesTableData({
        ...servicesTableData,
        branchDetailModel: null,
        branchShiftServiceList: [],
      });
    }
  }, [getCountryWiseShiftDataRows]);

  //handling the toggle of the pannel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  //onChange For Roaster Date
  const handleRoasterDateChange = (date) => {
    console.log(date, "handleRoasterDateChange");
    setRoasterdate(date);
  };

  const columns = [
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "shiftServiceList",
      key: "shiftServiceList",
      width: "400px",
      render: (text, record) => {
        return (
          <span className="table-inside-text">
            {currentLanguage === "en"
              ? record.serviceNameEnglish
              : record.serviceNameArabic}
          </span>
        );
      },
    },

    {
      title: (
        <span className="table-text d-flex justify-content-center">
          {t("In-shift-availability")}
        </span>
      ),
      dataIndex: "active",
      key: "active",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={record.isServiceActive} disabled />
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
              {t("City-branch-wise-shifts")}
              <span className="shift-sub-heading ms-2">
                {currentLanguage === "en"
                  ? "(" + localStorage.getItem("countryName") + ")"
                  : "(" + localStorage.getItem("countryNameArabic") + ")"}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CountryCityShift-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col lg={3} md={3} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      onChange={handleSelectCity}
                      options={
                        currentLanguage === "en"
                          ? cityOptionListEnglish
                          : cityOptionListArabic
                      }
                      value={citySelectValue}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={handleSelectedBranch}
                      value={branchSelectValue}
                      options={
                        currentLanguage === "en"
                          ? branchSelectEnglish
                          : branchSelectArabic
                      }
                      isSearchable={true}
                      // isDisabled={selectedCityID === null ? true : false}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col
                  lg={3}
                  md={3}
                  sm={12}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("Date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    value={roasterdate}
                    onChange={handleRoasterDateChange}
                  />
                </Col>
                <Col lg={3} md={3} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                    onClick={hitSearchButton}
                  />
                </Col>
              </Row>
              {servicesTableData?.branchShiftServiceList?.length > 0 &&
                servicesTableData.branchShiftServiceList.map((data, index) => {
                  return (
                    <>
                      <Row className="mt-3">
                        <Col lg={12} md={12} sm={12}>
                          <Collapse
                            bordered={false}
                            className="collapse-disable-bg"
                            expandIcon={false}
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
                                    {data.branchShift.shiftNameEnglish}
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
                              <Row className="mb-3">
                                <Col lg={6} md={6} sm={6}>
                                  <span className="toggle-insidetile-available">
                                    {t("Available")}
                                  </span>
                                </Col>
                                <Col
                                  lg={6}
                                  md={6}
                                  sm={6}
                                  className="d-flex justify-content-end"
                                >
                                  <Switch
                                    checked={data.branchShift.isShiftActive}
                                    disabled
                                  />
                                </Col>
                              </Row>
                              <Table
                                column={columns}
                                rows={data.shiftServiceList}
                                pagination={false}
                              />
                            </Panel>
                          </Collapse>
                        </Col>
                      </Row>
                    </>
                  );
                })}
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CountryCityWiseShift;

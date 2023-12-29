import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityWiseCounter.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import {
  getCountryCitiesApi,
  getAllBranchCounterMainApi,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getCurrentDateUTC } from "../../../commen/functions/Date_time_formatter";

const CountryCityWise = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityID = Number(searchParams.get("cityID"));
  const currentLanguage = localStorage.getItem("i18nextLng");
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  // get city list in dropdown from reducer
  const cityList = useSelector((state) => state.admin.cityList);

  // get all branch counter service data from reducer
  const getAllBranchCounterData = useSelector(
    (state) => state.admin.getAllBranchCounterData
  );
  console.log(getAllBranchCounterData, "getAllBranchCounterData");

  const { Panel } = Collapse;
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Get current date
  const [roasterDate, setRoasterDate] = useState(new Date());

  // state for toggle icon render each at a time
  const [openPanel, setOpenPanel] = useState([]);

  // states for to set data in table
  const [rows, setRows] = useState([]);

  // states for city dropdown in select
  const [cityOptionListEnglish, setCityOptionListEnglish] = useState([]);
  const [cityOptionListArabic, setCityOptionListArabic] = useState([]);
  const [cityOptionValue, setCityOptionValue] = useState(null);

  const callApi = async () => {
    if (cityID !== null && cityID !== undefined && cityID !== 0) {
      // 2 pasiing in prop for check that we have to call getCityEmployeeMainApi all api from here on page route from side bar
      await dispatch(getCountryCitiesApi(t, navigate, loadingFlag, 1, cityID));
    }
  };

  // useEffect for render getAllBranchCounter Api
  useEffect(() => {
    let data = {
      RoasterDate: getCurrentDateUTC(roasterDate),
      CityID: cityID,
    };
    dispatch(getAllBranchCounterMainApi(t, navigate, loadingFlag, data));
  }, []);

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
      setCityOptionValue(null);
    };
  }, []);

  // it will show data on collapse
  useEffect(() => {
    if (getAllBranchCounterData !== null) {
      setRows(getAllBranchCounterData);
    } else {
      setRows([]);
    }
  }, [getAllBranchCounterData]);

  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (cityList && Object.keys(cityList).length > 0) {
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
          setCityOptionValue(data);
        } else {
          // If cityID is null or undefined, use the first city in cityList.cities
          data = {
            value: cityList.cities[0].cityID,
            label: cityList.cities[0].cityNameEnglish,
          };
          setCityOptionValue(data);
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
  }, [cityList, currentLanguage]);

  // Initialize the open/close state for each panel based on the data
  useEffect(() => {
    if (getAllBranchCounterData) {
      setOpenPanel(getAllBranchCounterData.map((_, index) => index === 0));
    }
  }, [getAllBranchCounterData]);

  //onChange handler of cities dropdown
  const onChangeCityHandler = (cityShiftOptionValue) => {
    setCityOptionValue(cityShiftOptionValue);
  };

  // Toggle the open/close state of the clicked panel
  const togglePanel = (index) => {
    setOpenPanel((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const columns = [
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
              ? record.bscsModel.branchCounterModel.counterNameEnglish
              : record.bscsModel.branchCounterModel.counterNameArabic}
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
              ? record.bscsModel.branchShift.shiftNameEnglish
              : record.bscsModel.branchShift.shiftNameArabic}
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
              ? record.bscsModel.shiftService.serviceNameEnglish
              : record.bscsModel.shiftService.serviceNameArabic}
          </span>
        </span>
      ),
    },
  ];

  const handleSearch = async () => {
    if (cityOptionValue != null) {
      let newData = {
        RoasterDate: getCurrentDateUTC(roasterDate),
        CityID: Number(cityOptionValue.value),
      };
      await dispatch(
        getAllBranchCounterMainApi(t, navigate, loadingFlag, newData)
      );
    } else {
    }
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Country-level-shift-and-counter-details")}
              <span className="shift-sub-heading">
                {" "}
                {currentLanguage === "en"
                  ? "(" + localStorage.getItem("countryName") + ")"
                  : "(" + localStorage.getItem("countryNameArabic") + ")"}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CountryCityWise-paper">
              <Row className="mx-auto d-flex align-items-center justify-content-center">
                <Col
                  lg={5}
                  md={5}
                  sm={12}
                  className="col-for-date-citywise-counter"
                >
                  <label className="text-labels">{t("Date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    value={roasterDate}
                    onChange={(value) => setRoasterDate(value)}
                  />
                </Col>
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
                <Col lg={2} md={2} sm={12} className="mt-3">
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
                  <Collapse
                    bordered={false}
                    className="collapse-Country-Wise-disable-bg"
                    expandIcon={() => null}
                    defaultActiveKey={[0]}
                    activeKey={openPanel.map((state, index) =>
                      state ? index.toString() : null
                    )}
                  >
                    {getAllBranchCounterData !== null &&
                      getAllBranchCounterData.map((data, index) => (
                        <>
                          {console.log(
                            getAllBranchCounterData,
                            "getAllBranchCounterData"
                          )}
                          <Panel
                            key={index.toString()}
                            header={
                              <div
                                className={`Country-Wise-collapse-bg-color ${
                                  openPanel[index] ? "open" : ""
                                }`}
                                onClick={() => togglePanel(index)}
                              >
                                <span className="toggle-tiles">
                                  {currentLanguage === "en"
                                    ? data.cityBranch.branchNameEnglish
                                    : data.cityBranch.branchNameArabic}
                                </span>
                                {openPanel[index] ? (
                                  <i
                                    className={
                                      "icon-arrow-up Country-wise-collapse"
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    className={
                                      "icon-arrow-down Country-wise-collapse"
                                    }
                                  ></i>
                                )}
                              </div>
                            }
                          >
                            <Table
                              column={columns}
                              rows={data.getAllBranchCounterData}
                              pagination={false}
                              className="div-table-country-wise"
                            />
                          </Panel>
                        </>
                      ))}
                  </Collapse>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CountryCityWise;

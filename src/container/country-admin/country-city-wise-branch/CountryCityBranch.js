import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityBranch.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  getAllBranchServiceMainApi,
  getCountryCitiesApi,
} from "../../../store/actions/Admin_action";

const CountryCityBranch = () => {
  const { Panel } = Collapse;
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
  // get all branch data from reducer in branch country admin page
  const getAllBranchServiceData = useSelector(
    (state) => state.admin.getAllBranchServiceData
  );

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

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
      setCityOptionListEnglish([]);
      setCityOptionListArabic([]);
      setCityOptionValue(null);
    };
  }, []);

  console.log(cityID, "cityIDcityID");

  const [panelOpenStates, setPanelOpenStates] = useState([]);

  // states for rows in table
  const [rows, setRows] = useState([]);

  // to dispatch city dropdown Api
  useEffect(() => {
    // get data in branch page
    let data = {
      CityID: cityID,
      CountryID: Number(localStorage.getItem("countryID")),
    };
    dispatch(getAllBranchServiceMainApi(t, navigate, loadingFlag, data));
  }, []);

  // to show cities in city dropdown;
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

  // it will show data on collapse
  useEffect(() => {
    if (getAllBranchServiceData !== null) {
      setRows(getAllBranchServiceData);
    } else {
      setRows([]);
    }
  }, [getAllBranchServiceData]);

  // Initialize the open/close state for each panel based on the data
  useEffect(() => {
    if (getAllBranchServiceData) {
      setPanelOpenStates(
        getAllBranchServiceData.map((_, index) => index === 0)
      );
    }
  }, [getAllBranchServiceData]);

  console.log(
    getAllBranchServiceData,
    "getAllBranchServiceDatagetAllBranchServiceData"
  );

  //onChange handler of cities dropdown
  const onChangeCityHandler = (cityShiftOptionValue) => {
    setCityOptionValue(cityShiftOptionValue);
  };

  // Toggle the open/close state of the clicked panel
  const togglePanel = (index) => {
    setPanelOpenStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const columns = [
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "serviceNameEnglish",
      key: "serviceNameEnglish",
      width: "80%",
      render: (text, record) => (
        <span className="table-inside-text">
          <span>
            {currentLanguage === "en"
              ? record.branchService.serviceNameEnglish
              : record.branchService.serviceNameArabic}
          </span>
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "isServiceAvailableAtBranch",
      key: "isServiceAvailableAtBranch",
      width: "20%",
      render: (text, record) => (
        <span>
          <Switch checked={record.isServiceAvailableAtBranch} disabled />
        </span>
      ),
    },
  ];

  const handleSearch = async () => {
    if (cityOptionValue != null) {
      let newData = {
        CityID: Number(cityOptionValue.value),
        CountryID: Number(localStorage.getItem("countryID")),
      };
      await dispatch(
        getAllBranchServiceMainApi(t, navigate, loadingFlag, newData)
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
              {t("City-wise-service-availability")}
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
            <Paper className="CountryCityBranch-paper">
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
                    onClick={handleSearch}
                    className="Search-Icon-Btn"
                  />
                </Col>
                <Col lg={2} md={2} sm={12} />
              </Row>

              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <Collapse
                    bordered={false}
                    className="collapse-disable-bg"
                    expandIcon={() => null}
                    defaultActiveKey={[0]}
                    activeKey={panelOpenStates.map((state, index) =>
                      state ? index.toString() : null
                    )}
                  >
                    {getAllBranchServiceData !== null &&
                      getAllBranchServiceData.map((data, index) => (
                        <>
                          <Panel
                            key={index.toString()}
                            header={
                              <div
                                className={`collapse-bg-color ${
                                  panelOpenStates[index] ? "open" : ""
                                }`}
                                onClick={() => togglePanel(index)}
                              >
                                <span className="toggle-tiles">
                                  {" "}
                                  {currentLanguage === "en"
                                    ? data.cityBranchModel.branchNameEnglish
                                    : data.cityBranchModel.branchNameArabic}
                                </span>

                                {panelOpenStates[index] ? (
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
                                  checked={data.cityBranchModel.isBranchActive}
                                  disabled
                                />
                              </Col>
                            </Row>
                            <Table
                              column={columns}
                              rows={data.branchServiceModelList}
                              // rows={rows}
                              pagination={false}
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

export default CountryCityBranch;

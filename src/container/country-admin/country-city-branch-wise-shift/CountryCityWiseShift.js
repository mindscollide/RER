import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryCityWiseShift.css";
import { Paper, Button, Table } from "../../../components/elements";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBranchSiftMainApi,
  getCityBranchListApi,
  getCountryCitiesApi,
} from "../../../store/actions/Admin_action";

const CountryCityWiseShift = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  console.log(
    getCountryWiseShiftDataRows,
    "getCountryWiseShiftDataRowsgetCountryWiseShiftDataRows"
  );

  const { Panel } = Collapse;
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [cityselectedOption, setCityselectedOption] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenTwo, setIsPanelOpenTwo] = useState(false);
  const [isPanelOpenThree, setIsPanelOpenThree] = useState(false);
  const [countryCityWiseShift, setCountryCityWiseShift] = useState([]);
  const [countryBranchWiseShift, setCountryBranchWiseShift] = useState([]);
  const [branchSelectedOptions, setBranchSelectedOptions] = useState(null);
  const [cityShiftData, setCityShiftData] = useState(null);
  console.log(cityShiftData, "cityShiftDatacityShiftData");
  const [selectedCityID, setSelectedCityID] = useState(null);
  const [selectedBranchID, setSelectedBranchID] = useState(null);
  const [servicesTableData, setServicesTableData] = useState({
    branchDetailModel: null,
    branchShiftServiceList: [],
  });
  const [citySelectValue, setCitySelectValue] = useState({
    value: 0,
    label: "",
  });
  const [branchSelectValue, setBranchSelectValue] = useState({
    value: 0,
    label: "",
  });

  //Country City dropdownApi
  useEffect(() => {
    dispatch(getCountryCitiesApi(t, navigate, Loading));
  }, []);

  //Country City  Data dropdown
  useEffect(() => {
    if (
      countryCityShiftWiseSelector !== null &&
      countryCityShiftWiseSelector !== undefined &&
      countryCityShiftWiseSelector.length !== 0
    ) {
      setCitySelectValue({
        ...citySelectValue,
        label: countryCityShiftWiseSelector.cities[0].cityNameEnglish,
        value: countryCityShiftWiseSelector.cities[0].cityID,
      });
      if (currentLanguage === "en") {
        setCountryCityWiseShift(
          countryCityShiftWiseSelector.cities.map((item) => ({
            value: item.cityID,
            label: item.cityNameEnglish,
          }))
        );
      } else {
        setCountryCityWiseShift(
          countryCityShiftWiseSelector.cities.map((item) => ({
            value: item.cityID,
            label: item.cityNameArabic,
          }))
        );
      }
    }
  }, [countryCityShiftWiseSelector, currentLanguage]);

  //Country City  Data dropdown OnChange
  const handleSelectCity = (selectedCityOptions) => {
    console.log(selectedCityOptions, "selectedCityOptionsselectedCityOptions");
    setCityselectedOption(selectedCityOptions);
    setSelectedCityID(selectedCityOptions.value);
  };
  console.log(citySelectValue, "citySelectValuecitySelectValuecitySelectValue");
  //Country Branch dropdownApi
  useEffect(() => {
    if (citySelectValue.value !== 0) {
      dispatch(
        getCityBranchListApi(
          t,
          navigate,
          Loading,
          Number(citySelectValue.value)
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
      setSelectedBranchID(countryBranchShiftWiseSelector[0].branchID);
      setBranchSelectValue({
        ...branchSelectValue,
        label: countryBranchShiftWiseSelector[0].branchNameEnglish,
        value: countryBranchShiftWiseSelector[0].branchID,
      });
      if (currentLanguage === "en") {
        setCountryBranchWiseShift(
          countryBranchShiftWiseSelector.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setCountryBranchWiseShift(
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
    setBranchSelectedOptions(selectedBranchOptions);
    setSelectedBranchID(selectedBranchOptions.value);
  };

  console.log(selectedBranchID, "selectedBranchIDselectedBranchID");

  const hitSearchButton = () => {
    let data = {
      BranchID: Number(selectedBranchID),
      CityID: Number(selectedCityID),
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

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelTwo = () => {
    setIsPanelOpenTwo(!isPanelOpenTwo);
  };

  const togglePanelThree = () => {
    setIsPanelOpenThree(!isPanelOpenThree);
  };

  const columns = [
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "shiftServiceList",
      key: "shiftServiceList",
      width: "400px",
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return <p>{record.serviceNameEnglish}</p>;
      },
    },

    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "active",
      key: "active",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={record.isServiceActive} />
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
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("City")}</label>
                    <Select
                      onChange={handleSelectCity}
                      value={{
                        value: citySelectValue.value,
                        label: citySelectValue.label,
                      }}
                      options={countryCityWiseShift}
                      isSearchable={false}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex flex-column w-100">
                    <label className="text-labels">{t("Branch")}</label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={handleSelectedBranch}
                      options={countryBranchWiseShift}
                      isSearchable={true}
                      value={{
                        value: branchSelectValue.value,
                        label: branchSelectValue.label,
                      }}
                      // isDisabled={selectedCityID === null ? true : false}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={2} md={2} sm={12} className="mt-3">
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
                  console.log(data, "getCountryWiseShiftDataRows");
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
                                  <Switch checked={true} disabled />
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

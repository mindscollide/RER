import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./City.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useTranslation } from "react-i18next";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import {
  addCityBranchApi,
  addCityBranchFail,
  deleteCityBranchFail,
  getCityBranchListApi,
  updateCityBranchApi,
  updateCityBranchFail,
  getCityBranchServiceListApi,
  updateCityBranchServiceListApi,
} from "../../../store/actions/Admin_action";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import {
  convertDateforInputUTC,
  convertToGMT,
  formatToHHMMSSUTC,
} from "../../../commen/functions/Date_time_formatter";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";
import { loader_Actions } from "../../../store/actions/Loader_action";
import { Collapse, Switch } from "antd";
import Select from "react-select";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import {
  setIsCityWiseBranchService,
  setIsCountryCityWiseCounter,
} from "../../../store/actions/global_action";

const CityAdmin = () => {
  const { t } = useTranslation();
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);
  const cityBranchListData = useSelector(
    (state) => state.admin.cityBranchListData
  );
  const addedCityBranchData = useSelector(
    (state) => state.admin.addedCityBranchData
  );
  const deletedCityBranchData = useSelector(
    (state) => state.admin.deletedCityBranchData
  );
  const updatedCityBranchData = useSelector(
    (state) => state.admin.updatedCityBranchData
  );

  // reducer for get City Branch Services
  const cityBranchWiseData = useSelector(
    (state) => state.admin.cityBranchWiseData
  );
  const isCountryCityWiseCounter = useSelector(
    (state) => state.global.isCountryCityWiseCounter
  );
  const isCityWiseBranchService = useSelector(
    (state) => state.global.isCityWiseBranchService
  );

  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rows, setRows] = useState([]);
  // rows for get city branch services
  const [cityBranchRows, setCityBranchRows] = useState(false);
  const [Branch, setBranch] = useState({
    BranchNameEnglish: "",
    BranchNameArabic: "",
    IsBranchActive: false,
    BranchStartTime: "",
    BranchEndTime: "",
    BranchID: 0,
    CityID: Number(localStorage.getItem("cityID")),
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpenCountry, setIsPanelOpenCountry] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const togglePanelCountry = () => {
    setIsPanelOpenCountry(!isPanelOpenCountry);
  };

  //language UseEffect
  useEffect(() => {
    if (currentLanguage !== undefined) {
      if (currentLanguage === "en") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_en);
      } else if (currentLanguage === "ar") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
      }
    }
  }, [currentLanguage]);

  // calling branch data api
  useEffect(() => {
    dispatch(getCityBranchListApi(t, navigate, Loading));
  }, []);

  // updating data in table
  useEffect(() => {
    if (cityBranchListData !== null) {
      setRows(cityBranchListData);
    } else {
      setRows([]);
    }
  }, [cityBranchListData]);

  useEffect(() => {
    if (cityBranchWiseData != null) {
      const firstItem = cityBranchWiseData[0];

      if (
        firstItem &&
        firstItem.branchService &&
        firstItem.branchService.serviceID
      ) {
        const serviceID = firstItem.branchService.serviceID;
        // Now you can use the 'serviceID' variable as needed
      }
    }
  }, [cityBranchWiseData]);
  // use for when new data add its add it in table row with calling get api and then get loader false and cleare its state
  useEffect(() => {
    if (addedCityBranchData !== null) {
      let prevData = [...rows];
      prevData.push(addedCityBranchData);
      setRows(prevData);
      dispatch(addCityBranchFail(""));
      dispatch(loader_Actions(false));
    }
    if (updatedCityBranchData !== null) {
      setRows(
        rows.map((branch) => {
          if (branch.branchID === updatedCityBranchData.branchID) {
            return updatedCityBranchData; // Replace with the new data if IDs match
          }
          return branch; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateCityBranchFail(""));
      dispatch(loader_Actions(false));
    }
    if (deletedCityBranchData !== null) {
      let newdata = rows.filter(
        (branch) => branch.branchID !== deletedCityBranchData
      );
      setRows(newdata);
      dispatch(deleteCityBranchFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addedCityBranchData, updatedCityBranchData, deletedCityBranchData]);

  // updating get city branch services data in table
  useEffect(() => {
    if (cityBranchWiseData !== null) {
      setCityBranchRows(cityBranchWiseData);
    } else {
      setCityBranchRows([]);
    }
  }, [cityBranchWiseData]);

  // for switch onChange on update
  const handleSwitchCityBranchWise = (name, value, record) => {
    try {
      if (name === "isServiceAvailableAtBranch") {
        setCityBranchRows(
          cityBranchRows.map((branchService) => {
            if (branchService.branchServiceID === record.branchServiceID) {
              return {
                ...branchService,
                isServiceAvailableAtBranch: value,
              };
            }
            return branchService;
          })
        );
      }
    } catch {}
  };

  const revertHandler = () => {
    try {
      if (cityBranchWiseData !== null) {
        setCityBranchRows(cityBranchWiseData);
      }
    } catch {}
  };

  const handleSaveCityBranchWise = () => {
    let serviceID =
      cityBranchWiseData && cityBranchWiseData.length > 0
        ? cityBranchWiseData[0].branchService &&
          cityBranchWiseData[0].branchService.serviceID
        : null;
    try {
      let convertedData = capitalizeKeysInArray(cityBranchRows);
      const newArray = convertedData.map((item) => ({
        BranchServiceID: item.BranchServiceID,
        ServiceID: serviceID,
        IsServiceAvailableAtBranch: item.IsServiceAvailableAtBranch,
      }));
      let newData = {
        CityID: Number(localStorage.getItem("cityID")),
        CityBranchServices: newArray,
        BranchID: 1,
      };
      dispatch(updateCityBranchServiceListApi(t, navigate, Loading, newData));
    } catch {}
  };

  //to navigate on cityWiseBranchService page by click on service Icon
  const onClickServiceIcon = () => {
    dispatch(getCityBranchServiceListApi(t, navigate, Loading));
    dispatch(setIsCityWiseBranchService(true));
  };

  //to navigate on countryCityWiseCounter  page by click on counter Icon
  const onClickCounterIcon = () => {
    dispatch(setIsCountryCityWiseCounter(true));
  };

  const goBackButtonOnclick = () => {
    dispatch(setIsCityWiseBranchService(false));
  };

  const goBackCountryCounter = () => {
    dispatch(setIsCountryCityWiseCounter(false));
  };

  //to navigate on shift page by click on service Icon
  const onClickShiftIcon = (record) => {
    localStorage.setItem("branchID", record.branchID);
    localStorage.setItem("selectedKeys", ["7"]);
    navigate("/CityAdmin/Shifts");
  };

  //to navigate on Employee page by click on service Icon
  const onClickEmployeeIcon = () => {
    localStorage.setItem("selectedKeys", ["9"]);
    navigate("/CityAdmin/Employee");
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "branchID",
      key: "branchID",
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex:
        currentLanguage === "en" ? "branchNameEnglish" : "branchNameArabic",
      key: currentLanguage === "en" ? "branchNameEnglish" : "branchNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Start-time")}</span>,
      dataIndex: "branchStartTime",
      key: "branchStartTime",
      render: (text, record) => {
        if (
          record?.branchStartTime !== null &&
          record?.branchStartTime !== null
        ) {
          return convertToGMT(record?.branchStartTime, local);
        }
      },
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "branchEndTime",
      key: "branchEndTime",
      render: (text, record) => {
        if (record?.branchEndTime !== null && record?.branchEndTime !== null) {
          return convertToGMT(record?.branchEndTime, local);
        }
      },
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isBranchActive",
      key: "isBranchActive",
      align: "center",
      render: (text, record) => (
        <>
          {text ? (
            <span>
              <i className="icon-check icon-check-color"></i>
            </span>
          ) : (
            <span>
              <i className="icon-close icon-check-close-color"></i>
            </span>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "column6",
      key: "column6",
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              onClick={() => handleEditt(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => handleEditt(record, 2)}
            ></i>
            <i
              className="icon-settings icon-EDT-DLT-color"
              onClick={() => onClickServiceIcon(record)}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={() => onClickCounterIcon(record)}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={() => onClickShiftIcon(record)}
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={() => onClickEmployeeIcon(record)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  const cityWiseColumns = [
    {
      title: <span className="table-text">{t("Services")}</span>,
      dataIndex: "branchService",
      key: "branchService",
      width: "400px",
      align: "left",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchService.serviceNameEnglish
            : record.branchService.serviceNameArabic}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "isServiceAvailableAtBranch",
      key: "isServiceAvailableAtBranch",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              handleSwitchCityBranchWise(
                "isServiceAvailableAtBranch",
                value,
                record
              )
            }
          />
        </span>
      ),
    },
  ];
  
  // data and columns for cityWiseBranchService end

  // data and columns for countryCityWiseCounter start

  const countryCityWiseData = [
    {
      id: 1,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 2,
      branchName: (
        <span className="table-inside-text">Olaya Street Branch</span>
      ),
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
    {
      id: 3,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 1</span>,
      shift: <span className="table-inside-text">Shift 1</span>,
      service: <span className="table-inside-text">First Registry</span>,
    },
    {
      id: 4,
      branchName: <span className="table-inside-text">King Fahad</span>,
      counterName: <span className="table-inside-text">Counter 2</span>,
      shift: <span className="table-inside-text">Shift 2</span>,
      service: <span className="table-inside-text">Change Ownership</span>,
    },
  ];

  const countryCityWiseColumn = [
    {
      title: (
        <span className="table-inside-header-text-new">{t("Branch-name")}</span>
      ),
      dataIndex: "branchName",
      key: "branchName",
      width: "250px",
    },
    {
      title: (
        <span className="table-inside-header-text-new">
          {t("Counter-name")}
        </span>
      ),
      dataIndex: "counterName",
      key: "counterName",
    },
    {
      title: <span className="table-inside-header-text-new">{t("Shift")}</span>,
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: (
        <span className="table-inside-header-text-new">{t("Service")}</span>
      ),
      dataIndex: "service",
      key: "service",
    },
  ];

  // data and columns for countryCityWiseCounter end

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "BranchNameEnglish") {
        setBranch({
          ...Branch,
          ["BranchNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "BranchNameArabic") {
        setBranch({
          ...Branch,
          ["BranchNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setBranch({ ...Branch, ["IsBranchActive"]: checked });
      }
    } catch {}
  };

  const handleTimeChange = (name, value) => {
    try {
      if (name === "BranchStartTime") {
        setBranch({
          ...Branch,
          ["BranchStartTime"]: value,
        });
      } else if (name === "BranchEndTime") {
        setBranch({
          ...Branch,
          ["BranchEndTime"]: value,
        });
      }
    } catch {}
  };

  const handleRest = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setBranch({
        BranchNameEnglish: "",
        BranchNameArabic: "",
        IsBranchActive: false,
        BranchStartTime: "",
        BranchEndTime: "",
        BranchID: 0,
        CityID: Number(localStorage.getItem("cityID")),
      });
    } catch {}
  };

  const handleAdd = () => {
    try {
      if (addUpdateCheckFlag) {
        if (
          Branch.BranchNameEnglish !== "" &&
          Branch.BranchNameArabic !== "" &&
          Branch.BranchStartTime !== null &&
          Branch.BranchEndTime !== null
        ) {
          let Data = {
            CityID: Number(localStorage.getItem("cityID")),
            BranchNameEnglish: Branch.BranchNameEnglish,
            BranchNameArabic: Branch.BranchNameArabic,
            IsBranchActive: Branch.IsBranchActive,
            BranchStartTime: formatToHHMMSSUTC(Branch.BranchStartTime),
            BranchEndTime: formatToHHMMSSUTC(Branch.BranchEndTime),
            BranchID: Branch.BranchID,
          };
          dispatch(
            updateCityBranchApi(
              t,
              navigate,
              Loading,
              Data,
              setBranch,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          Branch.BranchNameEnglish !== "" &&
          Branch.BranchNameArabic !== "" &&
          Branch.BranchStartTime !== null &&
          Branch.BranchEndTime !== null
        ) {
          let Data = {
            BranchNameEnglish: Branch.BranchNameEnglish,
            BranchNameArabic: Branch.BranchNameArabic,
            IsBranchActive: Branch.IsBranchActive,
            BranchStartTime: formatToHHMMSSUTC(Branch.BranchStartTime),
            BranchEndTime: formatToHHMMSSUTC(Branch.BranchEndTime),
            CityID: Number(localStorage.getItem("cityID")),
          };
          dispatch(addCityBranchApi(t, navigate, Loading, Data, setBranch));
        }
      }
    } catch {}
  };

  const handleEditt = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setBranch({
          BranchNameEnglish: value.branchNameEnglish,
          BranchNameArabic: value.branchNameArabic,
          IsBranchActive: value.isBranchActive,
          BranchStartTime: convertDateforInputUTC(value.branchStartTime),
          BranchEndTime: convertDateforInputUTC(value.branchEndTime),
          BranchID: value.branchID,
          CityID: Number(localStorage.getItem("cityID")),
        });
      } else if (flag === 2) {
        setDeleteID(value.branchID);
        setDeleteModal(true);
      }
    } catch {}
  };

  return (
    <>
      <section>
        {isCityWiseBranchService === true ? (
          <>
            <Row>
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  <i
                    className="icon-back go-back-arrow"
                    onClick={goBackButtonOnclick}
                  ></i>
                  {t("City-branch-wise-service")}
                  <span className="shift-sub-heading">
                    {" "}
                    {t("Saudi-arabia-riyadh")}
                  </span>
                </span>
              </Col>
              <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
                <span className="shift-sub-heading-right">
                  {t("Olaya-street-branch")}
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CityBranchWise-Admin-paper">
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="btn-col-class-CityBranchWise"
                    >
                      <Button
                        icon={<i className="icon-save icon-space"></i>}
                        text={t("Save")}
                        onClick={handleSaveCityBranchWise}
                        className="save-btn-CityBranchWise"
                      />
                      <Button
                        icon={<i className="icon-repeat icon-space"></i>}
                        text={t("Revert")}
                        onClick={revertHandler}
                        className="revert-btn-CityBranchWise"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        rows={cityBranchRows}
                        column={cityWiseColumns}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </>
        ) : isCountryCityWiseCounter === true ? (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  <i
                    className="icon-back go-back-arrow"
                    onClick={goBackCountryCounter}
                  ></i>
                  {t("Country-level-shift-and-counter-details")}
                  <span className="shift-sub-heading">
                    {" "}
                    {t("Saudi-arabia-riyadh")}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CountryCityWise-paper">
                  <Row className="mx-auto d-flex align-items-center justify-content-center">
                    <Col lg={4} md={4} sm={12}>
                      <span className="d-flex flex-column w-100">
                        <label className="text-labels">{t("City")}</label>
                        <Select
                          isSearchable={true}
                          className="select-dropdown-all"
                        />
                      </span>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <span className="d-flex flex-column w-100">
                        <label className="text-labels">{t("Branch")}</label>
                        <Select
                          isSearchable={true}
                          className="select-dropdown-all"
                        />
                      </span>
                    </Col>
                    <Col lg={2} md={2} sm={12} className="mt-3">
                      <Button
                        icon={<i className="icon-search city-icon-space"></i>}
                        text={t("Search")}
                        className="Search-Icon-Btn"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col lg={12} md={12} sm={12}>
                      <Collapse
                        bordered={false}
                        className="collapse-Country-Wise-disable-bg"
                        expandIcon={false}
                      >
                        <Panel
                          header={
                            <div
                              className={`Country-Wise-collapse-bg-color ${
                                isPanelOpen ? "open" : ""
                              }`}
                              onClick={togglePanel}
                            >
                              <span className="toggle-tiles">
                                {t("Riyadh")}
                              </span>
                              {isPanelOpen ? (
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
                          key="1"
                        >
                          <Table
                            column={countryCityWiseColumn}
                            rows={countryCityWiseData}
                            pagination={false}
                            className="div-table-country-wise"
                          />
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <Collapse
                        bordered={false}
                        className="collapse-Country-Wise-disable-bg"
                        expandIcon={false}
                      >
                        <Panel
                          header={
                            <div
                              className={`Country-Wise-collapse-bg-color ${
                                isPanelOpenCountry ? "open" : ""
                              }`}
                              onClick={togglePanelCountry}
                            >
                              <span className="toggle-tiles">
                                {t("Dammam")}
                              </span>
                              {isPanelOpenCountry ? (
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
                          key="1"
                        >
                          <Table
                            column={countryCityWiseColumn}
                            rows={countryCityWiseData}
                            pagination={false}
                            className="div-table-country-wise"
                          />
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  {t("Branch")}
                  <span className="shift-sub-heading">
                    {" "}
                    {currentLanguage === "en"
                      ? "(" +
                        localStorage.getItem("countryName") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityName") +
                        ")"
                      : "(" +
                        localStorage.getItem("countryNameArabic") +
                        " " +
                        "-" +
                        " " +
                        localStorage.getItem("cityNameArabic") +
                        ")"}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CityAdmin-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">{t("Branch-name")}</span>
                      <TextField
                        name="BranchNameEnglish"
                        placeholder={t("Branch-admin")}
                        labelClass="d-none"
                        className="text-fiels-cityAdmin"
                        value={Branch.BranchNameEnglish}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="text-end">
                      <span className="text-labels">اسم الفرع</span>
                      <TextField
                        name="BranchNameArabic"
                        placeholder={"اسم الفرع"}
                        labelClass="d-none"
                        className="text-fiels-cityAdmin-arabic"
                        value={Branch.BranchNameArabic}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={2} className="mt-4">
                      <Checkbox
                        checked={Branch.IsBranchActive}
                        onChange={handleChange}
                        classNameDiv="CityAdmin-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col
                      lg={5}
                      md={5}
                      sm={5}
                      className="col-for-date-timepicker-cityad"
                    >
                      <label className="text-labels">
                        {t("Branch-start-time")}
                      </label>
                      <DatePicker
                        arrowClassName="arrowClass"
                        containerClassName="containerClassTimePicker"
                        disableDayPicker
                        format="hh:mm A"
                        plugins={[<TimePicker hideSeconds />]}
                        value={Branch.BranchStartTime}
                        calendar={calendarValue}
                        locale={localValue}
                        onChange={(value) =>
                          handleTimeChange("BranchStartTime", value)
                        }
                      />
                    </Col>

                    <Col
                      lg={5}
                      md={5}
                      sm={5}
                      className="col-for-date-timepicker-cityad"
                    >
                      <label className="text-labels">
                        {t("Branch-end-time")}
                      </label>
                      <DatePicker
                        arrowClassName="arrowClass"
                        containerClassName="containerClassTimePicker"
                        disableDayPicker
                        format="hh:mm A"
                        plugins={[<TimePicker hideSeconds />]}
                        value={Branch.BranchEndTime}
                        calendar={calendarValue}
                        locale={localValue}
                        onChange={(value) =>
                          handleTimeChange("BranchEndTime", value)
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="btn-class-CityAdmin"
                    >
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={addUpdateCheckFlag ? t("Update") : t("Add")}
                        className="Add-btn-CityAdmin"
                        onClick={handleAdd}
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        className="Reset-btn-CityAdmin"
                        onClick={handleRest}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table rows={rows} column={columns} pagination={false} />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </>
        )}
      </section>
      <DeleteEmployeeModal
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        deleteID={deleteID}
        route={"CityAdminBranch"}
      />
    </>
  );
};

export default CityAdmin;

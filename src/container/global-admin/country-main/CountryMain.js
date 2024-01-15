import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsServiceCountryScreenComponent } from "../../../store/actions/global_action";
import {
  getCountryListMainApi,
  addCountryListMainApi,
  addCountyListFail,
  updateCountryListFail,
  updateCountryListMainApi,
  clearResponseMessageAdmin,
  getCountryServiceMainApi,
  updateCountryServiceMainApi,
} from "../../../store/actions/Admin_action";
import ServiceCountryScreenComponent from "../service-country-screen-component/ServiceCountryScreenComponent";
import { useNavigate } from "react-router";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import { loader_Actions } from "../../../store/actions/Loader_action";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";
import { Switch } from "antd";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const CountryMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const loadingFlag = useSelector((state) => state.Loader.Loading);

  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  const addCountryListData = useSelector(
    (state) => state.admin.addCountryListData
  );

  const updateCountryListData = useSelector(
    (state) => state.admin.updateCountryListData
  );

  // state for country service component admin main
  const isServiceCountryComponentReducer = useSelector(
    (state) => state.global.isServiceCountryComponentReducer
  );

  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );

  // to get service country screen reducer
  const countryServiceScreenList = useSelector(
    (state) => state.admin.countryServiceScreenList
  );

  // states for rows to set data in table
  const [rows, setRows] = useState([]);

  // states for Service Country Screen page to set data in table
  const [countryRow, setCountryRow] = useState([]);

  //state for show notifications through response
  const [countryMainNotification, setCountryMainNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  // flag for add and update country admin
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);

  // Add this state variable
  const [selectedCountryID, setSelectedCountryID] = useState(null);

  // delete state of modal
  const [deleteNewID, setDeleteNewID] = useState(null);
  const [deleteCountryModal, setDeleteCountryModal] = useState(false);

  // states for add new data in table row
  const [addCountryMain, setAddCountryMain] = useState({
    CountryNameEnglish: "",
    CountryNameArabic: "",
    IsCountryActive: false,
    CountryID: 0,
  });

  // useEffect to render APi
  useEffect(() => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag));
  }, []);

  // useEffect for table rendering from reducer
  useEffect(() => {
    if (getCountryListData !== null && Array.isArray(getCountryListData)) {
      setRows(getCountryListData);
    } else {
      setRows([]);
    }
  }, [getCountryListData]);

  // useEffect for table to render in Service Country Screen
  useEffect(() => {
    if (
      countryServiceScreenList !== null &&
      countryServiceScreenList !== undefined &&
      Array.isArray(countryServiceScreenList)
    ) {
      setCountryRow(countryServiceScreenList);
    } else {
      setCountryRow([]);
    }
  }, [countryServiceScreenList]);

  useEffect(() => {
    if (addCountryListData !== null) {
      let prevData = [...rows];
      prevData.push(addCountryListData);
      setRows(prevData);
      dispatch(addCountyListFail(""));
      dispatch(loader_Actions(false));
    }

    if (updateCountryListData !== null) {
      setRows(
        rows.map((country) => {
          if (country.countryID === updateCountryListData.countryID) {
            return updateCountryListData; // Replace with the new data if IDs match
          }
          return country; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateCountryListFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addCountryListData, updateCountryListData]);

  //to open ServiceCountryscreen on click of button
  const openServiceCountryScreen = async (record) => {
    localStorage.setItem("countryID", record.countryID);
    await dispatch(getCountryServiceMainApi(t, navigate, loadingFlag));
    await dispatch(setIsServiceCountryScreenComponent(true));
  };

  // to close ServiceCountryscreen on click of goBackbutton
  const closeServiceCountryScreen = () => {
    dispatch(setIsServiceCountryScreenComponent(false));
  };

  //open city screen page in Country Main
  const openClickCityScreenInCountryMain = (record) => {
    localStorage.setItem("selectedKeys", ["23"]);
    navigate(`/GlobalAdmin/City?countryID=${record}`);
  };

  //open branch screen page in Country Main
  const openClickBranchScreenInCountryMain = (record) => {
    localStorage.setItem("selectedKeys", ["24"]);
    navigate(`/GlobalAdmin/Branch?countryID=${record}`);
  };

  //open Counters updated page in Country Main
  const openClickCountersScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["27"]);
    navigate("/GlobalAdmin/Counters");
  };

  //open shifts page in Country Main
  const openClickshiftsScreenInCountryMain = (record) => {
    localStorage.setItem("selectedKeys", ["26"]);
    // localStorage.setItem("countryIDShiftRoute", record);
    navigate(`/GlobalAdmin/Shifts?countryID=${record}`);
  };

  //open Employee page in Country Main
  const openClickEmployeeScreenInCountryMain = (record) => {
    localStorage.setItem("selectedKeys", ["25"]);
    localStorage.setItem("countryID", record);
    navigate(`/GlobalAdmin/Employee?countryID=${record}`);
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "countryID",
      key: "countryID",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex: "countryNameEnglish",
      key: "countryNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.countryNameEnglish
            : record.countryNameArabic}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCountryActive",
      key: "isCountryActive",
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
      render: (text, record) => {
        console.log(record, "recordrecordrecordrecordrecord");
        return (
          <>
            <span className="icon-spaceing-dlt-edit">
              <i
                className="icon-text-edit icon-EDT-DLT-color"
                title={t("Edit")}
                aria-label={t("Edit")}
                onClick={() => handleCountryEdit(record, 1)}
              ></i>
              <i
                className="icon-close icon-EDT-DLT-color"
                title={t("Delete")}
                aria-label={t("Delete")}
                onClick={() => handleCountryEdit(record, 2)}
              ></i>
              <i
                className="icon-globe icon-EDT-DLT-color"
                title={t("Country")}
                aria-label={t("Country")}
                onClick={() => openServiceCountryScreen(record)}
              ></i>
              <i
                className="icon-location icon-EDT-DLT-color"
                title={t("City")}
                aria-label={t("City")}
                onClick={() =>
                  openClickCityScreenInCountryMain(record.countryID)
                }
              ></i>
              <i
                className="icon-branch icon-EDT-DLT-color"
                title={t("Branch")}
                aria-label={t("Branch")}
                onClick={() =>
                  openClickBranchScreenInCountryMain(record.countryID)
                }
              ></i>
              <i
                className="icon-counter icon-EDT-DLT-color"
                title={t("Counter")}
                aria-label={t("Counter")}
                onClick={openClickCountersScreenInCountryMain}
              ></i>
              <i
                className="icon-repeat icon-EDT-DLT-color"
                title={t("Shifts")}
                aria-label={t("Shifts")}
                onClick={() =>
                  openClickshiftsScreenInCountryMain(record.countryID)
                }
              ></i>
              <i
                className="icon-user icon-EDT-DLT-color"
                title={t("Employee")}
                aria-label={t("Employee")}
                onClick={() =>
                  openClickEmployeeScreenInCountryMain(record.countryID)
                }
              ></i>
            </span>
          </>
        );
      },
    },
  ];

  // handle change for toggle in Service COuntry Screen
  const onChangeHandlerForServiceCountry = (name, value, record) => {
    try {
      if (name === "branchAvailability") {
        setCountryRow(
          countryRow.map((service) => {
            if (service.countryServiceID === record.countryServiceID) {
              return {
                ...service,
                branchAvailability: value,
              };
            }
            return service;
          })
        );
      } else if (name === "homeAvailability") {
        setCountryRow(
          countryRow.map((service) => {
            if (service.countryServiceID === record.countryServiceID) {
              return {
                ...service,
                homeAvailability: value,
              };
            }
            return service;
          })
        );
      }
    } catch {}
  };

  //Revert handler for Service Country Screen
  const revertServiceCountryHandler = () => {
    try {
      if (countryServiceScreenList !== null) {
        setCountryRow(countryServiceScreenList);
      }
    } catch {}
  };

  // save Handler for service country screen
  const saveServiceCountryHandler = () => {
    try {
      let convertData = capitalizeKeysInArray(countryRow);
      const newArray = convertData.map((item) => ({
        CountryServiceID: item.CountryServiceID,
        BranchAvailability: item.BranchAvailability,
        HomeAvailability: item.HomeAvailability,
      }));

      let data = {
        CountryID: Number(localStorage.getItem("countryID")),
        CountryServices: newArray,
      };
      dispatch(updateCountryServiceMainApi(t, navigate, loadingFlag, data));
    } catch (error) {
      console.log("Error", error);
    }
  };

  // for Service Country Screen
  const ServiceCountryColumn = [
    {
      title: <span className="table-text">{t("Service-name")}</span>,
      dataIndex: "countryServices",
      key: "countryServices",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.countrySM.serviceNameEnglish
            : record.countrySM.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              onChangeHandlerForServiceCountry(
                "branchAvailability",
                value,
                record
              )
            }
          />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              onChangeHandlerForServiceCountry(
                "homeAvailability",
                value,
                record
              )
            }
          />
        </span>
      ),
    },
  ];

  //on Change handler for country Admin main
  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "CountryNameEnglish") {
        setAddCountryMain({
          ...addCountryMain,
          ["CountryNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "CountryNameArabic") {
        setAddCountryMain({
          ...addCountryMain,
          ["CountryNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setAddCountryMain({ ...addCountryMain, ["IsCountryActive"]: checked });
      }
    } catch {}
  };

  // add and edit button in country Admin Main
  const handleAddCountryMain = (countryID) => {
    try {
      if (addUpdateCheckFlag) {
        if (
          addCountryMain.CountryNameEnglish !== "" &&
          addCountryMain.CountryNameArabic !== ""
        ) {
          let Data = {
            CountryID: countryID,
            CountryNameEnglish: addCountryMain.CountryNameEnglish,
            CountryNameArabic: addCountryMain.CountryNameArabic,
            IsCountryActive: addCountryMain.IsCountryActive,
          };
          dispatch(
            updateCountryListMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setAddCountryMain,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          addCountryMain.CountryNameEnglish !== "" &&
          addCountryMain.CountryNameArabic !== ""
        ) {
          let Data = {
            CountryNameEnglish: addCountryMain.CountryNameEnglish,
            CountryNameArabic: addCountryMain.CountryNameArabic,
            IsCountryActive: addCountryMain.IsCountryActive,
          };
          dispatch(
            addCountryListMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setAddCountryMain
            )
          );
        }
      }
    } catch {}
  };

  // for reset data in textfields
  const handleReset = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setAddCountryMain({
        CountryNameEnglish: "",
        CountryNameArabic: "",
        IsCountryActive: false,
      });
    } catch {}
  };

  const handleCountryEdit = (value, flag, record) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setAddCountryMain({
          CountryID: Number(localStorage.getItem("countryID")),
          CountryNameEnglish: value.countryNameEnglish,
          CountryNameArabic: value.countryNameArabic,
          IsCountryActive: value.isCountryActive,
        });
        setSelectedCountryID(value.countryID);
      } else if (flag === 2) {
        setDeleteNewID(value.countryID);
        setDeleteCountryModal(true);
      }
    } catch {}
  };

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (responseMessage === t("Admin_AdminServiceManager_AddCountry_01")) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t("Admin_AdminServiceManager_AddCountry_01"),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddCountry_02")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t("Admin_AdminServiceManager_AddCountry_02"),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddCountry_03")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t("Admin_AdminServiceManager_AddCountry_03"),
            severity: "error",
          }),
          3000
        );
      } else if (responseMessage === t("something_went_wrong")) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t("something_went_wrong"),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountry_01")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountry_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountry_02")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountry_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountry_03")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountry_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountry_01")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteCountry_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountry_02")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteCountry_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountry_02")
      ) {
        setTimeout(
          setCountryMainNotification({
            ...countryMainNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ),
            severity: "error",
          }),
          3000
        );
      }
    }
    dispatch(clearResponseMessageAdmin(null));
  }, [responseMessage]);

  return (
    <>
      <section>
        {isServiceCountryComponentReducer === true ? (
          <>
            <ServiceCountryScreenComponent
              closeServiceCountryScreen={closeServiceCountryScreen}
              ServiceCountryColumn={ServiceCountryColumn}
              revertServiceCountryHandler={revertServiceCountryHandler}
              saveServiceCountryHandler={saveServiceCountryHandler}
              countryRow={countryRow}
            />
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
                <span className="shift-heading">{t("Country")}</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="Country-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("Country-name-english")}
                      </span>
                      <TextField
                        name="CountryNameEnglish"
                        placeholder={t("Country-name-english")}
                        labelClass="d-none"
                        value={addCountryMain.CountryNameEnglish}
                        onChange={handleChange}
                        className="text-fiels-Country"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("Country-name-arabic")}
                      </span>
                      <TextField
                        name="CountryNameArabic"
                        placeholder={t("Country-name-arabic")}
                        labelClass="d-none"
                        value={addCountryMain.CountryNameArabic}
                        onChange={handleChange}
                        className="text-fiels-Country-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="mt-1">
                      <Checkbox
                        checked={addCountryMain.IsCountryActive}
                        onChange={handleChange}
                        classNameDiv="Country-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col lg={6} md={6} sm={6} className="btn-class-Country">
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={addUpdateCheckFlag ? t("Update") : t("Add")}
                        onClick={() => handleAddCountryMain(selectedCountryID)}
                        className="Add-btn-Country"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        onClick={handleReset}
                        className="Reset-btn-Country"
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
        deleteNewID={deleteNewID}
        setDeleteCountryModal={setDeleteCountryModal}
        deleteCountryModal={deleteCountryModal}
        route={"CountryMain"}
      />

      <Notification
        show={countryMainNotification.notificationFlag}
        hide={setCountryMainNotification}
        message={countryMainNotification.notificationMessage}
        severity={countryMainNotification.severity}
        notificationClass={
          countryMainNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CountryMain;

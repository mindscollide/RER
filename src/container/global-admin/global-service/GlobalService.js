import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./GlobalService.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import GlobalDeleteModal from "../../modals/global-delete-modal/GlobalDeleteModal";
import { useNavigate } from "react-router";
import { setIsCountryServiceScreenComponent } from "../../../store/actions/global_action";
import { useDispatch, useSelector } from "react-redux";
import CountryServiceScreenComponent from "../country-service-screen-component/CountryServiceScreenComponent";
import {
  addGlobalServiceFail,
  addGlobalServiceMainApi,
  clearResponseMessageAdmin,
  getGlobalServiceMainApi,
  updateGlobalServiceFail,
  updateGlobalServiceMainApi,
} from "../../../store/actions/Admin_action";
import { loader_Actions } from "../../../store/actions/Loader_action";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";

const GlobalService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [isCheckboxSelectedTwo, setIsCheckboxSelectedTwo] = useState(false);
  const [globalModal, setGlobalModal] = useState(false);
  const [globalID, setGlobalID] = useState(null);
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  // get Global Service Data reducers
  const getGlobalServiceData = useSelector(
    (state) => state.admin.getGlobalServiceData
  );
  // add Global Service Data reducers
  const addGlobalServiceData = useSelector(
    (state) => state.admin.addGlobalServiceData
  );
  // update Global Service Data reducers
  const updateGlobalServiceData = useSelector(
    (state) => state.admin.updateGlobalServiceData
  );
  // state for country city admin main
  const isCountryServiceComponentReducer = useSelector(
    (state) => state.global.isCountryServiceComponentReducer
  );

  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );

  // state for row to updating table rows
  const [rows, setRows] = useState([]);

  //state for show notifications through response
  const [globalNotification, setGlobalNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);

  // state for add and update new data
  const [globalState, setGlobalState] = useState({
    ServiceNameEnglish: "",
    ServiceNameArabic: "",
    IsServiceActive: false,
    ServiceID: 0,
  });

  //useEffect to render Api
  useEffect(() => {
    dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
  }, []);

  // useEffect to update data in table
  useEffect(() => {
    if (getGlobalServiceData !== null && Array.isArray(getGlobalServiceData)) {
      setRows(getGlobalServiceData);
    } else {
      setRows([]);
    }
  }, [getGlobalServiceData]);

  useEffect(() => {
    if (addGlobalServiceData !== null) {
      let prevData = [...rows];
      prevData.push(addGlobalServiceData);
      setRows(prevData);
      dispatch(addGlobalServiceFail(""));
      dispatch(loader_Actions(false));
    }
    if (updateGlobalServiceData !== null) {
      setRows(
        rows.map((service) => {
          if (service.serviceID === updateGlobalServiceData.serviceID) {
            return updateGlobalServiceData; // Replace with the new data if IDs match
          }
          return service; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateGlobalServiceFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addGlobalServiceData, updateGlobalServiceData]);

  // open delete modal
  const openDeleteGlobalModal = () => {
    setGlobalModal(true);
  };

  // open service country screen component
  const openServiceCountryScreenComponent = () => {
    dispatch(setIsCountryServiceScreenComponent(true));
  };

  // close service country screen component
  const goBackServiceCountryButton = () => {
    dispatch(setIsCountryServiceScreenComponent(false));
  };

  //open city screen page
  const openClickCityScreen = () => {
    localStorage.setItem("selectedKeys", ["23"]);
    navigate("/GlobalAdmin/City");
  };

  //open branch screen page
  const openClickBranchScreen = () => {
    localStorage.setItem("selectedKeys", ["24"]);
    navigate("/GlobalAdmin/Branch");
  };

  //open branch Counters page
  const openClickCountersScreen = () => {
    localStorage.setItem("selectedKeys", ["27"]);
    navigate("/GlobalAdmin/Counters");
  };

  //open branch shifts page
  const openClickshiftsScreen = () => {
    localStorage.setItem("selectedKeys", ["26"]);
    navigate("/GlobalAdmin/Shifts");
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  const handleCheckboxChangeTwo = (e) => {
    setIsCheckboxSelectedTwo(e.target.checked);
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "serviceID",
      key: "serviceID",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex:
        currentLanguage === "en" ? "serviceNameEnglish" : "serviceNameArabic",
      key:
        currentLanguage === "en" ? "serviceNameEnglish" : "serviceNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isServiceActive",
      key: "isServiceActive",
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
              onClick={() => handleEditGlobal(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => handleEditGlobal(record, 2)}
            ></i>
            <i
              className="icon-globe icon-EDT-DLT-color"
              onClick={openServiceCountryScreenComponent}
            ></i>
            <i
              className="icon-location icon-EDT-DLT-color"
              onClick={openClickCityScreen}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openClickBranchScreen}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openClickCountersScreen}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openClickshiftsScreen}
            ></i>
          </span>
        </>
      ),
    },
  ];

  // change handler for textfield in global service page
  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "ServiceNameEnglish") {
        setGlobalState({
          ...globalState,
          ["ServiceNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "ServiceNameArabic") {
        setGlobalState({
          ...globalState,
          ["ServiceNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setGlobalState({ ...globalState, ["IsServiceActive"]: checked });
      }
    } catch {}
  };

  // add and update handler in global service page
  const addUpdateHandler = () => {
    try {
      if (addUpdateCheckFlag) {
        if (
          globalState.ServiceNameEnglish !== "" &&
          globalState.ServiceNameArabic !== ""
        ) {
          let Data = {
            ServiceID: Number(globalState.ServiceID),
            ServiceNameEnglish: globalState.ServiceNameEnglish,
            ServiceNameArabic: globalState.ServiceNameArabic,
            IsServiceActive: globalState.IsServiceActive,
          };
          dispatch(
            updateGlobalServiceMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setGlobalState,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          globalState.ServiceNameEnglish !== "" &&
          globalState.ServiceNameArabic !== ""
        ) {
          let Data = {
            ServiceNameEnglish: globalState.ServiceNameEnglish,
            ServiceNameArabic: globalState.ServiceNameArabic,
            IsServiceActive: globalState.IsServiceActive,
          };
          dispatch(
            addGlobalServiceMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setGlobalState
            )
          );
        }
      }
    } catch {}
  };

  // when click on edit Icon handler
  const handleEditGlobal = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setGlobalState({
          ServiceNameEnglish: value.serviceNameEnglish,
          ServiceNameArabic: value.serviceNameArabic,
          IsServiceActive: value.isServiceActive,
          ServiceID: Number(value.serviceID),
        });
      } else if (flag === 2) {
        setGlobalID(value.serviceID);
        setGlobalModal(true);
      }
    } catch {}
  };

  const resetHandler = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setGlobalState({
        ServiceNameEnglish: "",
        ServiceNameArabic: "",
        IsServiceActive: false,
        ServiceID: 0,
      });
    } catch {}
  };

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage === t("Admin_AdminServiceManager_AddGlobalService_01")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddGlobalService_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddGlobalService_02")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddGlobalService_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddGlobalService_03")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddGlobalService_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (responseMessage === t("something_went_wrong")) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t("something_went_wrong"),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateGlobalService_01")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateGlobalService_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateGlobalService_02")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateGlobalService_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateGlobalService_03")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateGlobalService_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteGlobalService_01")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteGlobalService_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteGlobalService_02")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteGlobalService_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteGlobalService_03")
      ) {
        setTimeout(
          setGlobalNotification({
            ...globalNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteGlobalService_03"
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
        {isCountryServiceComponentReducer === true ? (
          <>
            <CountryServiceScreenComponent
              goBackServiceCountryButton={goBackServiceCountryButton}
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
                <span className="shift-heading">
                  {t("Service")}
                  <span className="shift-sub-heading">
                    {" "}
                    {t("Saudi-arabia-riyadh")}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="GlobalService-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("Service-name-english")}
                      </span>
                      <TextField
                        name="ServiceNameEnglish"
                        value={globalState.ServiceNameEnglish}
                        onChange={handleChange}
                        placeholder={t("Service-name")}
                        labelClass="d-none"
                        className="text-fiels-GlobalService"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("Service-name-arabic")}
                      </span>
                      <TextField
                        name="ServiceNameArabic"
                        value={globalState.ServiceNameArabic}
                        onChange={handleChange}
                        placeholder={"اسم الخدمة"}
                        labelClass="d-none"
                        className="text-fiels-GlobalService-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={4} md={4} sm={4} className="mt-4">
                      <Checkbox
                        checked={isCheckboxSelected}
                        onChange={handleCheckboxChange}
                        classNameDiv="GlobalService-checkbox"
                        label={
                          <span className="checkbox-label">
                            {t("Available-at-branch")}
                          </span>
                        }
                      />
                    </Col>

                    <Col
                      lg={4}
                      md={4}
                      sm={4}
                      className="d-flex justify-content-center mt-4"
                    >
                      <Checkbox
                        checked={isCheckboxSelectedTwo}
                        onChange={handleCheckboxChangeTwo}
                        classNameDiv="GlobalService-checkbox"
                        label={
                          <span className="checkbox-label">
                            {t("Home-service-available")}
                          </span>
                        }
                      />
                    </Col>

                    <Col
                      lg={4}
                      md={4}
                      sm={4}
                      className="d-flex justify-content-end mt-4"
                    >
                      <Checkbox
                        checked={globalState.IsServiceActive}
                        onChange={handleChange}
                        classNameDiv="GlobalService-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="btn-class-GlobalService"
                    >
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={addUpdateCheckFlag ? t("Update") : t("Add")}
                        onClick={addUpdateHandler}
                        className="Add-btn-GlobalService"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        onClick={resetHandler}
                        className="Reset-btn-GlobalService"
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

      {globalModal ? (
        <GlobalDeleteModal
          globalID={globalID}
          globalModal={globalModal}
          setGlobalModal={setGlobalModal}
          route={"GlobalService"}
        />
      ) : null}

      <Notification
        show={globalNotification.notificationFlag}
        hide={setGlobalNotification}
        message={globalNotification.notificationMessage}
        severity={globalNotification.severity}
        notificationClass={
          globalNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default GlobalService;

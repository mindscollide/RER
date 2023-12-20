import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CounterMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Loader,
  Notification,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import {
  addBranchCounterApi,
  addBranchCountertFail,
  deleteBranchCounterFail,
  getAllCountersOfBranch,
  updateBranchCounterApi,
  updateBranchCounterFail,
  clearResponseMessageAdmin,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loader_Actions } from "../../../store/actions/Loader_action";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";

const CounterMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const allCountersOfBranchList = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );
  const addBranchCounterData = useSelector(
    (state) => state.admin.addBranchCounterData
  );
  const updateBranchCounterData = useSelector(
    (state) => state.admin.updateBranchCounterData
  );
  const deleteBranchCounterData = useSelector(
    (state) => state.admin.deleteBranchCounterData
  );
  //Response Message Reducer
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );
  const Loading = useSelector((state) => state.Loader.Loading);
  const [rows, setRows] = useState([]);
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newCounter, setNewCounter] = useState({
    CounterNameEnglish: "",
    CounterNameArabic: "",
    IsCounterActive: false,
    BranchID: Number(localStorage.getItem("branchID")),
    CounterID: 0,
  });
  //Notification States
  const [notification, setNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  useEffect(() => {
    dispatch(getAllCountersOfBranch(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (allCountersOfBranchList !== null) {
      setRows(allCountersOfBranchList);
    }
  }, [allCountersOfBranchList]);

  useEffect(() => {
    if (addBranchCounterData !== null) {
      let prevData = [...rows];
      prevData.push(addBranchCounterData);
      setRows(prevData);
      dispatch(addBranchCountertFail(""));
      dispatch(loader_Actions(false));
    }
    if (updateBranchCounterData !== null) {
      setRows(
        rows.map((counter) => {
          if (counter.counterID === updateBranchCounterData.counterID) {
            return updateBranchCounterData; // Replace with the new data if IDs match
          }
          return counter; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateBranchCounterFail(""));
      dispatch(loader_Actions(false));
    }
    if (deleteBranchCounterData !== null) {
      let newdata = rows.filter(
        (counter) => counter.counterID !== deleteBranchCounterData
      );
      setRows(newdata);
      dispatch(deleteBranchCounterFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addBranchCounterData, updateBranchCounterData, deleteBranchCounterData]);

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "counterID",
      key: "counterID",
      render: (text, record, index) => (
        <span className="table-inside-text">{index + 1}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex:
        currentLanguage === "en" ? "counterNameEnglish" : "counterNameArabic",
      key:
        currentLanguage === "en" ? "counterNameEnglish" : "counterNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCounterActive",
      key: "isCounterActive",
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
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              onClick={() => handleEdittShift(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => handleEdittShift(record, 2)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "CounterNameEnglish") {
        setNewCounter({
          ...newCounter,
          ["CounterNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "CounterNameArabic") {
        setNewCounter({
          ...newCounter,
          ["CounterNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setNewCounter({ ...newCounter, ["IsCounterActive"]: checked });
      }
    } catch {}
  };

  const handleAddCounter = () => {
    try {
      if (addUpdateCheckFlag) {
        if (
          newCounter.CounterNameEnglish !== "" &&
          newCounter.CounterNameArabic !== ""
        ) {
          let Data = {
            CounterID: newCounter.CounterID,
            CounterNameEnglish: newCounter.CounterNameEnglish,
            CounterNameArabic: newCounter.CounterNameArabic,
            IsCounterActive: newCounter.IsCounterActive,
            BranchID: Number(localStorage.getItem("branchID")),
          };
          dispatch(
            updateBranchCounterApi(
              t,
              navigate,
              Loading,
              Data,
              setNewCounter,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          newCounter.CounterNameEnglish !== "" &&
          newCounter.CounterNameArabic !== ""
        ) {
          let Data = {
            CounterNameEnglish: newCounter.CounterNameEnglish,
            CounterNameArabic: newCounter.CounterNameArabic,
            IsCounterActive: newCounter.IsCounterActive,
            BranchID: Number(localStorage.getItem("branchID")),
          };
          dispatch(
            addBranchCounterApi(t, navigate, Loading, Data, setNewCounter)
          );
        }
      }
    } catch {}
  };

  const handleRestCounter = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setNewCounter({
        CounterNameEnglish: "",
        CounterNameArabic: "",
        IsCounterActive: false,
        BranchID: Number(localStorage.getItem("branchID")),
        CounterID: 0,
      });
    } catch {}
  };

  const handleEdittShift = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setNewCounter({
          CounterNameEnglish: value.counterNameEnglish,
          CounterNameArabic: value.counterNameArabic,
          IsCounterActive: value.isCounterActive,
          BranchID: Number(localStorage.getItem("branchID")),
          CounterID: value.counterID,
        });
      } else if (flag === 2) {
        setDeleteID(value.counterID);
        setDeleteModal(true);
      }
    } catch {}
  };

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage === t("Admin_AdminServiceManager_AddBranchShift_01")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddBranchShift_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddBranchShift_02")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddBranchShift_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (responseMessage === t("something_went_wrong")) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t("something_went_wrong"),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateBranchCounter_01")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateBranchCounter_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateBranchCounter_02")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateBranchCounter_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_GetBranchServices_03")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetBranchServices_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteBranchCounter_01")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteBranchCounter_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteBranchCounter_02")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteBranchCounter_02"
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
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Counters")}
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
                    " - " +
                    localStorage.getItem("cityNameArabic") +
                    ")"}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {currentLanguage === "en"
                ? localStorage.getItem("branchName")
                : localStorage.getItem("branchNameArabic")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Counter-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Counter-name")}</span>
                  <TextField
                    name="CounterNameEnglish"
                    placeholder={t("Counter-name")}
                    labelClass="d-none"
                    className="text-fiels-counterMain"
                    value={newCounter.CounterNameEnglish}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="text-end">
                  <span className="text-labels">اسم العداد</span>
                  <TextField
                    name="CounterNameArabic"
                    placeholder="اسم العداد"
                    labelClass="d-none"
                    className="text-fiels-counterMain-arabic"
                    value={newCounter.CounterNameArabic}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={6} md={6} sm={6} className="mt-2">
                  <Checkbox
                    checked={newCounter.IsCounterActive}
                    onChange={handleChange}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-col-class">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={addUpdateCheckFlag ? t("Update") : t("Add")}
                    className="Add-btn-Counter"
                    onClick={handleAddCounter}
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-Counter"
                    onClick={handleRestCounter}
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
      <DeleteEmployeeModal
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        deleteID={deleteID}
        route={"BranchAdminCounterMain"}
      />
      <Notification
        show={notification.notificationFlag}
        hide={setNotification}
        message={notification.notificationMessage}
        severity={notification.severity}
        notificationClass={
          notification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CounterMain;

import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Shift.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
} from "../../../components/elements";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useTranslation } from "react-i18next";
import {
  addBranchShiftApi,
  addBranchShiftFail,
  deleteBranchShiftFail,
  getAllShiftsOfBranch,
  updateBranchShiftApi,
  updateBranchShiftFail,
  clearResponseMessageAdmin,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  convertDateforInputUTC,
  convertToGMT,
  formatToHHMMSSUTC,
} from "../../../commen/functions/Date_time_formatter";
import { loader_Actions } from "../../../store/actions/Loader_action";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";

const BranchAdmin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const branchesList = useSelector((state) => state.admin.branchesList);
  const updateBranchShiftData = useSelector(
    (state) => state.admin.updateBranchShiftData
  );
  const addBranchShiftData = useSelector(
    (state) => state.admin.addBranchShiftData
  );
  const deleteBranchShiftID = useSelector(
    (state) => state.admin.deleteBranchShiftID
  );
  //Response Message Reducer
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );
  const Loading = useSelector((state) => state.Loader.Loading);
  const [rows, setRows] = useState([]);

  //Notification States

  // if its false its means its going to add else its going to update
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newShift, setNewShift] = useState({
    ShiftNameEnglish: "",
    ShiftNameArabic: "",
    IsShiftActive: false,
    ShiftStartTime: "",
    ShiftEndTime: "",
    BranchID: Number(localStorage.getItem("branchID")),
    ShiftID: 0,
  });

  const [notification, setNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

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

  // calling  data api
  useEffect(() => {
    dispatch(getAllShiftsOfBranch(t, navigate, Loading));
    return () => {
      setRows([]);
      setNewShift({
        ShiftNameEnglish: "",
        ShiftNameArabic: "",
        IsShiftActive: false,
        ShiftStartTime: "",
        ShiftEndTime: "",
        BranchID: Number(localStorage.getItem("branchID")),
        ShiftID: 0,
      });
    };
  }, []);

  // updating data in table
  useEffect(() => {
    if (branchesList !== null) {
      setRows(branchesList);
    } else {
      setRows([]);
    }
  }, [branchesList]);

  // use for when new data add its add it in table row with calling get api and then get loader false and cleare its state
  useEffect(() => {
    if (addBranchShiftData !== null) {
      let prevData = [...rows];
      prevData.push(addBranchShiftData);
      setRows(prevData);
      dispatch(addBranchShiftFail(""));
      dispatch(loader_Actions(false));
    }
    if (updateBranchShiftData !== null) {
      setRows(
        rows.map((shift) => {
          if (shift.shiftID === updateBranchShiftData.shiftID) {
            return updateBranchShiftData; // Replace with the new data if IDs match
          }
          return shift; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateBranchShiftFail(""));
      dispatch(loader_Actions(false));
    }
    if (deleteBranchShiftID !== null) {
      let newdata = rows.filter(
        (shift) => shift.shiftID !== deleteBranchShiftID
      );
      setRows(newdata);
      dispatch(deleteBranchShiftFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addBranchShiftData, updateBranchShiftData, deleteBranchShiftID]);

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "shiftID",
      key: "shiftID",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex:
        currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      key: currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Start-time")}</span>,
      dataIndex: "shiftStartTime",
      key: "shiftStartTime",
      render: (text, record) => {
        if (
          record?.shiftStartTime !== null &&
          record?.shiftStartTime !== null
        ) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.shiftStartTime, local)}
            </span>
          );
        }
      },
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "shiftEndTime",
      key: "shiftEndTime",
      render: (text, record) => {
        if (record?.shiftEndTime !== null && record?.shiftEndTime !== null) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.shiftEndTime, local)}
            </span>
          );
        }
      },
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isShiftActive",
      key: "isShiftActive",
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
      dataIndex: "shiftID",
      key: "shiftID",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              title={t("Edit")}
              aria-label={t("Edit")}
              onClick={() => handleEdittShift(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              title={t("Delete")}
              aria-label={t("Delete")}
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
      if (name === "ShiftNameEnglish") {
        setNewShift({
          ...newShift,
          ["ShiftNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "ShiftNameArabic") {
        setNewShift({
          ...newShift,
          ["ShiftNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setNewShift({ ...newShift, ["IsShiftActive"]: checked });
      }
    } catch {}
  };

  const handleTimeChange = (name, value) => {
    try {
      if (name === "ShiftStartTime") {
        setNewShift({
          ...newShift,
          ["ShiftStartTime"]: value,
        });
      } else if (name === "ShiftEndTime") {
        setNewShift({
          ...newShift,
          ["ShiftEndTime"]: value,
        });
      }
    } catch {}
  };

  const handleAddShift = () => {
    try {
      if (addUpdateCheckFlag) {
        if (
          newShift.ShiftNameEnglish !== "" &&
          newShift.ShiftNameArabic !== "" &&
          newShift.ShiftStartTime !== null &&
          newShift.ShiftEndTime !== null
        ) {
          let Data = {
            ShiftID: newShift.ShiftID,
            ShiftNameEnglish: newShift.ShiftNameEnglish,
            ShiftNameArabic: newShift.ShiftNameArabic,
            IsShiftActive: newShift.IsShiftActive,
            ShiftStartTime: formatToHHMMSSUTC(newShift.ShiftStartTime),
            ShiftEndTime: formatToHHMMSSUTC(newShift.ShiftEndTime),
            BranchID: Number(localStorage.getItem("branchID")),
          };
          dispatch(
            updateBranchShiftApi(
              t,
              navigate,
              Loading,
              Data,
              setNewShift,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          newShift.ShiftNameEnglish !== "" &&
          newShift.ShiftNameArabic !== "" &&
          newShift.ShiftStartTime !== null &&
          newShift.ShiftEndTime !== null
        ) {
          let Data = {
            ShiftNameEnglish: newShift.ShiftNameEnglish,
            ShiftNameArabic: newShift.ShiftNameArabic,
            IsShiftActive: newShift.IsShiftActive,
            ShiftStartTime: formatToHHMMSSUTC(newShift.ShiftStartTime),
            ShiftEndTime: formatToHHMMSSUTC(newShift.ShiftEndTime),
            BranchID: Number(localStorage.getItem("branchID")),
          };
          dispatch(addBranchShiftApi(t, navigate, Loading, Data, setNewShift));
        }
      }
    } catch {}
  };

  const handleRestShift = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setNewShift({
        ShiftNameEnglish: "",
        ShiftNameArabic: "",
        IsShiftActive: false,
        ShiftStartTime: "",
        ShiftEndTime: "",
        BranchID: Number(localStorage.getItem("branchID")),
        ShiftID: 0,
      });

      console.log(newShift.ShiftEndTime, "ShiftEndTimeShiftEndTime");
    } catch {}
  };

  const handleEdittShift = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setNewShift({
          ShiftNameEnglish: value.shiftNameEnglish,
          ShiftNameArabic: value.shiftNameArabic,
          IsShiftActive: value.isShiftActive,
          ShiftStartTime: convertDateforInputUTC(value.shiftStartTime),
          ShiftEndTime: convertDateforInputUTC(value.shiftEndTime),
          BranchID: Number(localStorage.getItem("branchID")),
          ShiftID: value.shiftID,
        });
      } else if (flag === 2) {
        setDeleteID(value.shiftID);
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
        responseMessage === t("Admin_AdminServiceManager_UpdateBranchShift_01")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateBranchShift_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateBranchShift_02")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateBranchShift_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteBranchShift_01")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteBranchShift_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteBranchShift_02")
      ) {
        setTimeout(
          setNotification({
            ...notification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteBranchShift_02"
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
              {t("Shift")}
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
            <Paper className="Branch-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name-english")}</span>
                  <TextField
                    name="ShiftNameEnglish"
                    placeholder={t("Shift-name-english")}
                    labelClass="d-none"
                    className="text-fiels-Branch"
                    value={newShift.ShiftNameEnglish}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name-arabic")}</span>
                  <TextField
                    name="ShiftNameArabic"
                    placeholder={t("Shift-name-arabic")}
                    labelClass="d-none"
                    className="text-fields-Branch-arabic"
                    value={newShift.ShiftNameArabic}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={2} md={2} sm={2} className="mt-4">
                  <Checkbox
                    checked={newShift.IsShiftActive}
                    onChange={handleChange}
                    name="IsShiftActive"
                    classNameDiv="Branch-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>
                <Col lg={5} md={5} sm={5} className="col-for-date-timepicker">
                  <label className="text-labels">{t("Shift-start-time")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    value={newShift.ShiftStartTime}
                    disableDayPicker
                    format="hh:mm A"
                    calendar={calendarValue}
                    locale={localValue}
                    editable={false}
                    plugins={[<TimePicker hideSeconds />]}
                    onChange={(value) =>
                      handleTimeChange("ShiftStartTime", value)
                    }
                  />
                </Col>

                <Col lg={5} md={5} sm={5} className="col-for-date-timepicker">
                  <label className="text-labels">{t("Shift-end-time")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    value={newShift.ShiftEndTime}
                    disableDayPicker
                    format="hh:mm A"
                    calendar={calendarValue}
                    locale={localValue}
                    editable={false}
                    plugins={[<TimePicker hideSeconds />]}
                    onChange={(value) =>
                      handleTimeChange("ShiftEndTime", value)
                    }
                  />
                </Col>
              </Row>

              <Row className="my-3">
                <Col lg={12} md={12} sm={12} className="btn-class-branch">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={addUpdateCheckFlag ? t("Update") : t("Add")}
                    className="Add-btn-Branch"
                    onClick={handleAddShift}
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-Branch"
                    onClick={handleRestShift}
                  />
                </Col>
              </Row>

              <Row>
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
        route={"BranchAdminShift"}
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

export default BranchAdmin;

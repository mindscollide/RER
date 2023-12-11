import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Shift.css";
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
import {
  addBranchShiftApi,
  addBranchShiftFail,
  deleteBranchShiftFail,
  getAllShiftsOfBranch,
  updateBranchShiftApi,
  updateBranchShiftFail,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  convertDateforInputUTC,
  convertToGMT,
  convertToHHMMSSOnchange,
  formatToHHMMSSUTC,
  resolutionResultTable,
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

  const Loading = useSelector((state) => state.Loader.Loading);
  const [rows, setRows] = useState([]);
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
    BranchID: 1,
    ShiftID: 0,
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

  useEffect(() => {
    dispatch(getAllShiftsOfBranch(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (branchesList !== null) {
      setRows(branchesList);
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
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex:
        currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      key: currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
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
          return convertToGMT(record?.shiftStartTime, local);
        }
      },
    },
    {
      title: <span className="table-text">{t("End-time")}</span>,
      dataIndex: "shiftEndTime",
      key: "shiftEndTime",
      render: (text, record) => {
        if (record?.shiftEndTime !== null && record?.shiftEndTime !== null) {
          return convertToGMT(record?.shiftEndTime, local);
        }
      },
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isShiftActive",
      key: "isShiftActive",
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
      dataIndex: "shiftID",
      key: "shiftID",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              onClick={() => handleEdittShift(text, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => handleEdittShift(text, 2)}
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
            BranchID: 1,
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
            BranchID: 1,
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
        BranchID: 1,
        ShiftID: 0,
      });
    } catch {}
  };

  const findShiftById = (id) => {
    return rows.find((shift) => shift.shiftID === id);
  };

  const handleEdittShift = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        const foundShift = findShiftById(value);
        if (foundShift) {
          setNewShift({
            ShiftNameEnglish: foundShift.shiftNameEnglish,
            ShiftNameArabic: foundShift.shiftNameArabic,
            IsShiftActive: foundShift.isShiftActive,
            ShiftStartTime: convertDateforInputUTC(foundShift.shiftStartTime),
            ShiftEndTime: convertDateforInputUTC(foundShift.shiftEndTime),
            BranchID: 1,
            ShiftID: foundShift.shiftID,
          });
        }
      } else if (flag === 2) {
        setDeleteID(value);
        setDeleteModal(true);
      }
    } catch {}
  };
  console.log("Admin_AdminServiceManager_DeleteBranchShift_01", deleteModal);
  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Shift")}
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
            <Paper className="Branch-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="ShiftNameEnglish"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-Branch"
                    value={newShift.ShiftNameEnglish}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Shift-name")}</span>
                  <TextField
                    name="ShiftNameArabic"
                    placeholder={t("Shift-name")}
                    labelClass="d-none"
                    className="text-fiels-Branch"
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
    </>
  );
};

export default BranchAdmin;

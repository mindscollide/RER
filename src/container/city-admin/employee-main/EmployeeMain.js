import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./EmployeeMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import Select from "react-select";
import { Radio } from "antd";
import AddEditEmployee from "../../modals/add-edit-modal/AddEditEmployee";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";
import { useTranslation } from "react-i18next";
import {
  getCityEmployeeMainApi,
  getCityBranchListApi,
  addEditFlagModal,
  getCityEmployeeClear,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import {
  containsOnlyAlphabets,
  forNumbersOnly,
} from "../../../commen/functions/regex";

const EmployeeMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const searchParams = new URLSearchParams(location.search);
  const urldBranchID = searchParams.get("branchId");
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [branchEmployeeOption, setBranchEmployeeOption] = useState(null);
  const [branchEmployeeOptionTwo, setBranchEmployeeOptionTwo] = useState(null);
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const employeeMainBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );
  const cityEmployeeMain = useSelector((state) => state.admin.cityEmployeeMain);

  // states for employee Main in dropdown
  const [employeeMainOption, setEmployeeMainOption] = useState([]);
  const [employeeMainOptionValue, setEmployeeMainOptionValue] = useState(null);

  const [employeeIDToDelete, setEmployeeIDToDelete] = useState(null);

  // row state for city Employee Main
  const [rows, setRows] = useState([]);

  // add edit modal states
  const [addEditModal, setAddEditModal] = useState(false);

  // edit Icon click to open modal
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // states for employeeMain states
  const [employeeMainState, setEmployeeMainState] = useState({
    EmployeeEnglishName: "",
    EmployeeArabicName: "",
    EmployeeId: 0,
    EmployeeEmail: "",
    isActive: false,
    isBranchEmployee: false,
    isHomeVisit: false,
  });

  const callApi = async () => {
    await dispatch(getCityBranchListApi(t, navigate, loadingFlag));
    await dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag));
  };

  useEffect(() => {
    callApi();
    return () => {
      localStorage.removeItem("branchID");
      dispatch(getCityEmployeeClear());
      setEmployeeIDToDelete(null);
      setAddEditModal(false);
      setSelectedEmployee(null);
      setRows([]);
      setEmployeeMainOption([]);
      setEmployeeMainOptionValue([]);
      setEmployeeMainState({
        EmployeeEnglishName: "",
        EmployeeArabicName: "",
        EmployeeId: 0,
        EmployeeEmail: "",
        isActive: false,
        isBranchEmployee: false,
        isHomeVisit: false,
      });
      setIsCheckboxSelected(false);
      setBranchEmployeeOption(null);
      setBranchEmployeeOptionTwo(null);
    };
  }, []);
  
  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (employeeMainBranchDropdown && employeeMainBranchDropdown.length !== 0) {
      if (currentLanguage === "en") {
        setEmployeeMainOption(
          employeeMainBranchDropdown.map((item) => ({
            value: item.branchID, // Change this based on your shift ID or unique identifier
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setEmployeeMainOption(
          employeeMainBranchDropdown.map((item) => ({
            value: item.branchID, // Change this based on your shift ID or unique identifier
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [employeeMainBranchDropdown, currentLanguage]);

  useEffect(() => {
    if (urldBranchID != null && employeeMainOption.length > 0) {
      const value = employeeMainOption.find(
        (branch) => branch.value === Number(urldBranchID)
      );
      if (value) {
        setEmployeeMainOptionValue(value);
      } else {
        console.log("location Branch with ID 3 not found");
      }
    }
  }, [employeeMainOption]);
  // onchange handler for branch dropdown
  const onChangeEmployeeBranch = (employeeMainOptionValue) => {
    setEmployeeMainOptionValue(employeeMainOptionValue);
  };

  const handleChangeEmployeeMain = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "EmployeeEnglishName") {
        setEmployeeMainState({
          ...employeeMainState,
          ["EmployeeEnglishName"]: containsOnlyAlphabets(value),
        });
      } else if (name === "EmployeeArabicName") {
        setEmployeeMainState({
          ...employeeMainState,
          ["EmployeeArabicName"]: containsOnlyAlphabets(value),
        });
      } else if (name === "EmployeeId") {
        setEmployeeMainState({
          ...employeeMainState,
          ["EmployeeId"]: forNumbersOnly(value),
        });
      } else if (name === "EmployeeEmail") {
        setEmployeeMainState({
          ...employeeMainState,
          ["EmployeeEmail"]: value,
        });
      } else if (name === "isBranchEmployee") {
        setEmployeeMainState({
          ...employeeMainState,
          ["isBranchEmployee"]: checked,
        });
      } else if (name === "isHomeVisit") {
        setEmployeeMainState({
          ...employeeMainState,
          ["isHomeVisit"]: checked,
        });
      } else {
        setEmployeeMainState({
          ...employeeMainState,
          ["isActive"]: checked,
        });
      }
    } catch {}
  };

  // handler for eedit Icon
  const handleEditClick = (record) => {
    dispatch(addEditFlagModal(true));
    setSelectedEmployee(record);
    setAddEditModal(true);
  };

  // handler for reset Icon
  const handleResetClick = () => {
    setEmployeeMainState({
      ...employeeMainState,
      EmployeeEnglishName: "",
      EmployeeArabicName: "",
      EmployeeId: 0,
      EmployeeEmail: "",
      isActive: false,
      isBranchEmployee: false,
      isHomeVisit: false,
    });
    setBranchEmployeeOption(null);
    setBranchEmployeeOptionTwo(null);
    setEmployeeMainOptionValue(null);
  };

  //delete modal states
  const [deleteModal, setDeleteModal] = useState(false);

  // updating table of city employee Main
  useEffect(() => {
    console.log(rows);
    if (cityEmployeeMain !== null) {
      setRows(cityEmployeeMain);
    } else {
      setRows([]);
    }
  }, [cityEmployeeMain]);

  const handleBranchEmployeeChange = (e) => {
    setBranchEmployeeOption(e.target.value);
  };

  const handleBranchEmployeeChangesTwo = (e) => {
    setBranchEmployeeOptionTwo(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxSelected(e.target.checked);
  };

  // open add edit modal on Button Click
  const openAddEditMoadal = () => {
    setSelectedEmployee(null);
    dispatch(addEditFlagModal(false));
    setAddEditModal(true);
  };

  // open add delete modal on Button Click
  const openDeleteModal = (record) => {
    setEmployeeIDToDelete(record.employeeID);
    console.log(
      "employeeIDToDeleteemployeeIDToDelete",
      record,
      employeeIDToDelete
    );
    setDeleteModal(true);
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "employeeCity",
      key: "employeeCity",
      render: (text, record, index) => (
        <span className="table-inside-text">{(index + 1).toLocaleString(local)}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex: "cityEmployeeList",
      key: "name",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.employeeEnglishName
            : record.employeeNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Capcity")}</span>,
      dataIndex: "capcity",
      key: "capcity",
    },
    {
      title: <span className="table-text">{t("Email")}</span>,
      dataIndex: "employeeEmail",
      key: "employeeEmail",
      align: "center",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: <span className="table-text">{t("Employee-id")}</span>,
      dataIndex: "employeeID",
      key: "employeeID",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isEmployeeActive",
      key: "isEmployeeActive",
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
      align: "left",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              onClick={() => handleEditClick(record)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => openDeleteModal(record)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">{t("Employee")}</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Employee-Main-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Employee-name")}</span>
                  <TextField
                    name="EmployeeEnglishName"
                    value={employeeMainState.EmployeeEnglishName}
                    placeholder={t("Employee-name")}
                    onChange={handleChangeEmployeeMain}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
                <Col lg={6} md={6} sm={6} className="text-end">
                  <span className="text-labels">اسم الموظف</span>
                  <TextField
                    name="EmployeeArabicName"
                    value={employeeMainState.EmployeeArabicName}
                    onChange={handleChangeEmployeeMain}
                    placeholder="اسم الموظف"
                    labelClass="d-none"
                    className="text-fiels-employeeMain-arabic"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Employee-id")}</span>
                  <TextField
                    name="EmployeeId"
                    value={employeeMainState.EmployeeId}
                    onChange={handleChangeEmployeeMain}
                    placeholder={t("Employee-id")}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Employee-email")}</span>
                  <TextField
                    name="EmployeeEmail"
                    value={employeeMainState.EmployeeEmail}
                    onChange={handleChangeEmployeeMain}
                    placeholder={t("Employee-email")}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-center mt-4"
                >
                  <Radio.Group
                    onChange={handleBranchEmployeeChange}
                    value={branchEmployeeOption}
                  >
                    <Radio value="option1" className="checkbox-label">
                      {t("Branch-employee")}
                    </Radio>
                  </Radio.Group>
                </Col>
                <Col lg={4} md={4} sm={4} className="mt-3">
                  <Select
                    options={employeeMainOption}
                    value={employeeMainOptionValue}
                    className="select-dropdown-all"
                    isSearchable={true}
                    onChange={onChangeEmployeeBranch}
                  />
                </Col>
                <Col lg={3} md={3} sm={3} className="mt-4">
                  <Checkbox
                    checked={employeeMainState.isActive}
                    onChange={handleChangeEmployeeMain}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="d-flex justify-content-end mt-4"
                >
                  <Radio.Group
                    onChange={handleBranchEmployeeChangesTwo}
                    value={branchEmployeeOptionTwo}
                  >
                    <Radio value="option1" className="checkbox-label">
                      {t("Home-visit")}
                    </Radio>
                  </Radio.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12} className="three-button-col mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Reset")}
                    onClick={handleResetClick}
                    className="revert-btn-Employeemain"
                  />
                  <Button
                    icon={<i className="icon-user-plus icon-space"></i>}
                    text={t("Add Employee")}
                    onClick={openAddEditMoadal}
                    className="Employee-Add-Btn"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={rows}
                    column={columns}
                    pagination={false}
                    // className="table-text"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
        {addEditModal ? (
          <AddEditEmployee
            addEditModal={addEditModal}
            setAddEditModal={setAddEditModal}
            selectedEmployee={selectedEmployee}
          />
        ) : null}

        {deleteModal ? (
          <DeleteEmployeeModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            route={"EmployeeMain"}
            employeeIDToDelete={employeeIDToDelete}
          />
        ) : null}
      </section>
    </>
  );
};

export default EmployeeMain;

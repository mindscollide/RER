import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./EmployeeMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
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
  clearResponseMessageAdmin,
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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urldBranchID = searchParams.get("branchId");
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [branchEmployeeOption, setBranchEmployeeOption] = useState(null);
  const [branchEmployeeOptionTwo, setBranchEmployeeOptionTwo] = useState(null);
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const employeeMainBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );
  const cityEmployeeMain = useSelector((state) => state.admin.cityEmployeeMain);
  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
  );

  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [employeeArabic, setEmployeeArabic] = useState("");

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
  console.log(selectedEmployee, "selectedEmployeeselectedEmployee");
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

  console.log(employeeMainState, "employeeMainStateemployeeMainState");

  //delete modal states
  const [deleteModal, setDeleteModal] = useState(false);

  //state for show notifications through response
  const [employeeNotification, setEmployeeNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

  const callApi = async () => {
    await dispatch(getCityBranchListApi(t, navigate, loadingFlag));

    let newData = {
      CityID: Number(localStorage.getItem("cityID")),
    };
    await dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag, newData));
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

  // It will show by default first selected value in dropdown
  useEffect(() => {
    if (employeeMainOption.length > 0) {
      setEmployeeMainOptionValue(employeeMainOption[0]);
    }
  }, [employeeMainOption]);

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
    setSelectedEmployee(record);
    dispatch(addEditFlagModal(true));
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
    let newData = {
      CityID: Number(localStorage.getItem("cityID")),
    };
    dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag, newData));
    setBranchEmployeeOption(null);
    setBranchEmployeeOptionTwo(null);
    setEmployeeMainOptionValue(null);
  };

  // updating table of city employee Main
  useEffect(() => {
    if (cityEmployeeMain !== null) {
      setRows(cityEmployeeMain);
    } else {
      setRows([]);
    }
  }, [cityEmployeeMain]);

  const handleBranchEmployeeChange = (e) => {
    setBranchEmployeeOption(e.target.value);
    setBranchEmployeeOptionTwo(null);
  };

  const handleBranchEmployeeChangesTwo = (e) => {
    setBranchEmployeeOptionTwo(e.target.value);
    setBranchEmployeeOption(null);
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
    setDeleteModal(true);
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "employeeCity",
      key: "employeeCity",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex: "cityEmployeeList",
      key: "cityEmployeeList",
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
      dataIndex: "employeeBelongsToBranch",
      key: "employeeBelongsToBranch",
      render: (text, record) => (
        <span>
          {record.employeeBelongsToBranch === true ? (
            <span className="table-inside-text">
              {currentLanguage === "en"
                ? record.employeeBranch.branchNameEnglish
                : record.employeeBranch.branchNameArabic}
            </span>
          ) : (
            <span className="table-inside-text">{t("Home-visit")}</span>
          )}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Email")}</span>,
      dataIndex: "employeeEmail",
      key: "employeeEmail",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Employee-id")}</span>,
      dataIndex: "employeeID",
      key: "employeeID",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
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
              title={t("Edit")}
              aria-label={t("Edit")}
              onClick={() => handleEditClick(record)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              title={t("Delete")}
              aria-label={t("Delete")}
              onClick={() => openDeleteModal(record)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  const handlerSearch = () => {
    // Create a copy of the data to avoid mutating the original array
    const copyData = [...cityEmployeeMain];

    // Filter the copied data based on the search criteria
    const filteredRows = copyData.filter((employee) => {
      const englishName = employee.employeeEnglishName
        ? employee.employeeEnglishName.toLowerCase()
        : "";
      const arabicName = employee.employeeNameArabic
        ? employee.employeeNameArabic.toLowerCase()
        : "";
      const email = employee.employeeEmail
        ? employee.employeeEmail.toLowerCase()
        : "";
      const employeeId = Number(employee.employeeID);

      // Check if the employee matches the search criteria
      const englishNameMatch =
        employeeMainState.EmployeeEnglishName !== "" &&
        englishName.includes(
          employeeMainState.EmployeeEnglishName.toLowerCase()
        );
      const arabicNameMatch =
        employeeMainState.EmployeeArabicName !== "" &&
        arabicName.includes(employeeMainState.EmployeeArabicName.toLowerCase());
      const emailMatch =
        employeeMainState.EmployeeEmail !== "" &&
        email &&
        email.includes(employeeMainState.EmployeeEmail.toLowerCase()); // Check for null email
      const employeeIdMatch =
        employeeMainState.EmployeeId !== 0 &&
        Number(employeeId) === Number(employeeMainState.EmployeeId);

      // Return true if any search criteria match, or if no search criteria are provided
      return (
        englishNameMatch ||
        arabicNameMatch ||
        emailMatch ||
        employeeIdMatch ||
        (!employeeMainState.EmployeeEnglishName &&
          !employeeMainState.EmployeeArabicName &&
          !employeeMainState.EmployeeEmail &&
          !employeeMainState.EmployeeId)
      );
    });

    // Update the table rows with the filtered data
    setRows(filteredRows);
  };

  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage ===
        t("Admin_AdminServiceManager_AddNewEmployeeOfCity_01")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_AddNewEmployeeOfCity_02")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_AddNewEmployeeOfCity_03")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_03"
            ),
            severity: "error",
          }),
          3000
        );
      }
      // else if (responseMessage === t("something_went_wrong")) {
      //   setTimeout(
      //     setEmployeeNotification({
      //       ...employeeNotification,
      //       notificationFlag: true,
      //       notificationMessage: t("something_went_wrong"),
      //       severity: "error",
      //     }),
      //     3000
      //   );
      // }
      else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_01")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_02")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_03")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_04")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_01")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_02")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_03")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage ===
        t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_05")
      ) {
        setTimeout(
          setEmployeeNotification({
            ...employeeNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_05"
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
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Employee")}
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
            <Paper className="Employee-Main-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">
                    {t("Employee-name-english")}
                  </span>
                  <TextField
                    name="EmployeeEnglishName"
                    value={employeeMainState.EmployeeEnglishName}
                    placeholder={t("Employee-name-english")}
                    onChange={handleChangeEmployeeMain}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">
                    {t("Employee-name-arabic")}
                  </span>
                  <TextField
                    name="EmployeeArabicName"
                    value={employeeMainState.EmployeeArabicName}
                    // value={employeeArabic}
                    onChange={handleChangeEmployeeMain}
                    // onChange={(e) => setEmployeeArabic(e.target.value)}
                    placeholder={t("Employee-name-arabic")}
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
                  className="d-flex justify-content-start mt-4"
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
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-start mt-4"
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
                <Col lg={4} md={4} sm={4} className="mt-4">
                  <Checkbox
                    checked={employeeMainState.isActive}
                    onChange={handleChangeEmployeeMain}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12} className="three-button-col mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    onClick={handlerSearch}
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
                    text={t("Add-employee")}
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

      <Notification
        show={employeeNotification.notificationFlag}
        hide={setEmployeeNotification}
        message={employeeNotification.notificationMessage}
        severity={employeeNotification.severity}
        notificationClass={
          employeeNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default EmployeeMain;

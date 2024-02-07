import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Modal,
  Checkbox,
} from "../../../components/elements";
import { Radio } from "antd";
import Select from "react-select";
import "./AddEditEmployee.css";
import { useTranslation } from "react-i18next";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  addCityEmployeeMainApi,
  getCityBranchListApi,
  updateExistingEmployeeMainApi,
} from "../../../store/actions/Admin_action";

const AddEditEmployee = ({
  addEditModal,
  setAddEditModal,
  selectedEmployee,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");
  const addNewEmployeeData = useSelector(
    (state) => state.admin.addNewEmployeeData
  );

  const isEditFlag = useSelector((state) => state.admin.isEditEmployeeFlag);

  const employeeAddEditDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  console.log(addNewEmployeeData, "addNewEmployeeDataerrr");

  const [homeVisit, setHomeVisit] = useState(1);

  const [branchRadio, setBranchRadio] = useState(false);

  const [radioSelectValue, setRadioSelectValue] = useState(0);

  // states for employee Main in dropdown
  const [addEditEmployeeOption, setAddEditEmployeeOption] = useState([]);
  const [addEditEmployeeOptionValue, setAddEditEmployeeOptionValue] =
    useState(null);

  const [employeeMain, setEmployeeMain] = useState({
    EmployeeEnglishName: "",
    EmployeeNameArabic: "",
    EmployeeEmail: "",
    IsEmployeeActive: false,
    EmployeeBelongsToBranch: true,
    BranchID: Number(localStorage.getItem("branchID")),
    CityID: Number(localStorage.getItem("cityID")),
    employeeID: 0,
  });

  // onchange handler for branch dropdown
  const onChangeEmployeeBranch = (addEditEmployeeOption) => {
    setAddEditEmployeeOptionValue(addEditEmployeeOption);
  };

  // render dropdown value
  useEffect(() => {
    if (!selectedEmployee) {
      dispatch(getCityBranchListApi(t, navigate, loadingFlag));
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (addEditEmployeeOption) {
      setAddEditEmployeeOptionValue(addEditEmployeeOption);
    }
  }, [addEditEmployeeOption]);

  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (employeeAddEditDropdown && employeeAddEditDropdown.length !== 0) {
      if (currentLanguage === "en") {
        setAddEditEmployeeOption(
          employeeAddEditDropdown.map((item) => ({
            value: item.branchID, // Change this based on your shift ID or unique identifier
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setAddEditEmployeeOption(
          employeeAddEditDropdown.map((item) => ({
            value: item.branchID, // Change this based on your shift ID or unique identifier
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [employeeAddEditDropdown, currentLanguage]);

  // Use useEffect to update state when selectedEmployee changes
  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeMain({
        EmployeeEnglishName: selectedEmployee?.employeeEnglishName || "",
        EmployeeNameArabic: selectedEmployee?.employeeNameArabic || "",
        EmployeeEmail: selectedEmployee?.employeeEmail || "",
        IsEmployeeActive: selectedEmployee?.isEmployeeActive || false,
        EmployeeBelongsToBranch: selectedEmployee.employeeBelongsToBranch,
        BranchID: selectedEmployee.employeeBranch?.branchID || 0,
        CityID: Number(localStorage.getItem("cityID")),
        employeeID: selectedEmployee?.employeeID || 0,
      });
      setRadioSelectValue(selectedEmployee.employeeBelongsToBranch ? 1 : 2);
      const branchDetails = {
        value: selectedEmployee?.employeeBranch?.branchID || 0,
        label:
          currentLanguage === "en"
            ? selectedEmployee.employeeBranch?.branchNameEnglish || ""
            : selectedEmployee.employeeBranch?.branchNameArabic || "",
      };
      setAddEditEmployeeOptionValue(branchDetails);
    } else {
      // Clear the state when selectedEmployee is null (i.e., when opening the modal for adding)
      setEmployeeMain({
        EmployeeEnglishName: "",
        EmployeeNameArabic: "",
        EmployeeEmail: "",
        IsEmployeeActive: false,
        EmployeeBelongsToBranch: true,
        BranchID: 0,
        CityID: Number(localStorage.getItem("cityID")),
        employeeID: 0,
      });
    }
  }, [selectedEmployee]);

  const handleChangeEmployee = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "EmployeeEnglishName") {
        setEmployeeMain({
          ...employeeMain,
          ["EmployeeEnglishName"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "EmployeeNameArabic") {
        setEmployeeMain({
          ...employeeMain,
          ["EmployeeNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "EmployeeEmail") {
        setEmployeeMain({
          ...employeeMain,
          ["EmployeeEmail"]: value,
        });
      } else {
        setEmployeeMain({ ...employeeMain, ["IsEmployeeActive"]: checked });
      }
    } catch {}
  };

  const handleChangeRadio = (e) => {
    if (e.target.value === 1) {
      setEmployeeMain({
        ...employeeMain,
        EmployeeBelongsToBranch: true,
      });
    } else if (e.target.value === 2) {
      setEmployeeMain({
        ...employeeMain,
        EmployeeBelongsToBranch: false,
      });
    }
    setRadioSelectValue(e.target.value);
  };

  const onCloseAddEditModal = () => {
    setAddEditModal(false);
  };

  const onCancelModalHandler = () => {
    setAddEditModal(false);
  };

  const employeeeAddHandler = () => {
    if (
      employeeMain.EmployeeEnglishName !== "" &&
      employeeMain.EmployeeNameArabic !== "" &&
      employeeMain.EmployeeEmail !== "" &&
      employeeMain.IsEmployeeActive !== false
    ) {
      let Data = {
        EmployeeEnglishName: employeeMain.EmployeeEnglishName,
        EmployeeNameArabic: employeeMain.EmployeeNameArabic,
        EmployeeEmail: employeeMain.EmployeeEmail,
        IsEmployeeActive: employeeMain.IsEmployeeActive,
        EmployeeBelongsToBranch: true,
        BranchID: addEditEmployeeOptionValue?.value || 1,
        CityID: employeeMain.CityID,
      };
      dispatch(
        addCityEmployeeMainApi(
          t,
          navigate,
          loadingFlag,
          Data,
          setEmployeeMain,
          setAddEditModal
        )
      );
    }
  };

  const employeeeUpdateHandler = () => {
    if (
      employeeMain.EmployeeEnglishName !== "" &&
      employeeMain.EmployeeNameArabic !== "" &&
      employeeMain.EmployeeEmail !== "" &&
      employeeMain.IsEmployeeActive !== false
    ) {
      let Data = {
        EmployeeEnglishName: employeeMain.EmployeeEnglishName,
        EmployeeNameArabic: employeeMain.EmployeeNameArabic,
        EmployeeEmail: employeeMain.EmployeeEmail,
        IsEmployeeActive: employeeMain.IsEmployeeActive,
        EmployeeBelongsToBranch: true,
        BranchID: addEditEmployeeOptionValue?.value || 1,
        CityID: employeeMain.CityID,
        EmployeeID: employeeMain.employeeID,
      };
      dispatch(
        updateExistingEmployeeMainApi(
          t,
          navigate,
          loadingFlag,
          Data,
          setEmployeeMain,
          setAddEditModal
        )
      );
    }
  };

  return (
    <>
      <Modal
        show={addEditModal}
        setShow={setAddEditModal}
        className="modaldialog add-edit-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-bank-footer"
        onHide={onCloseAddEditModal}
        ModalBody={
          <>
            <Row>
              <Col>
                <label className="add-edit-heading-modal">
                  {t("Add-edit-employee")}
                </label>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <span className="text-labels">
                  {t("Employee-name-english")}
                </span>
                <TextField
                  name="EmployeeEnglishName"
                  value={employeeMain.EmployeeEnglishName}
                  onChange={handleChangeEmployee}
                  placeholder={t("Employee-name-english")}
                  labelClass="d-none"
                  className="text-fields-addEdit"
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <span className="text-labels">{t("Employee-name-arabic")}</span>
                <TextField
                  name="EmployeeNameArabic"
                  value={employeeMain.EmployeeNameArabic}
                  onChange={handleChangeEmployee}
                  placeholder={t("Employee-name-arabic")}
                  labelClass="d-none"
                  className="text-fiels-employeeMain-arabic"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6} md={6} sm={6}>
                <span className="text-labels">{t("Employee-email")}</span>
                <TextField
                  name="EmployeeEmail"
                  placeholder={t("Employee-email")}
                  value={employeeMain.EmployeeEmail}
                  onChange={handleChangeEmployee}
                  labelClass="d-none"
                  className="text-fields-addEdit"
                />
              </Col>
              {isEditFlag === true ? (
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Employee-id")}</span>
                  <>
                    <TextField
                      name="employeeID"
                      placeholder={t("Employee-id")}
                      labelClass="d-none"
                      className="text-fields-addEdit"
                      value={employeeMain.employeeID}
                    />
                  </>
                </Col>
              ) : (
                <Col lg={6} md={6} sm={6} className="mt-3">
                  <Checkbox
                    onChange={handleChangeEmployee}
                    checked={employeeMain.IsEmployeeActive}
                    classNameDiv="chechbox-align-label"
                    label={
                      <span className="branch-employee-checkbox">
                        {t("Active")}
                      </span>
                    }
                  />
                </Col>
              )}
            </Row>

            <Row className="mt-3">
              <Col lg={4} md={4} sm={4}>
                <div className="Radio-Btn-div-For-Select">
                  <Radio.Group
                    onChange={handleChangeRadio}
                    value={radioSelectValue}
                  >
                    <Radio
                      className="branch-employee-checkbox"
                      name="capacity"
                      value={1}
                    >
                      {t("Branch-employee")}
                    </Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col lg={8} md={8} sm={8} className="mt-1">
                <Select
                  placeholder="Branch Employee"
                  options={addEditEmployeeOption}
                  value={addEditEmployeeOptionValue}
                  onChange={onChangeEmployeeBranch}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className=" mt-3">
                <Radio.Group
                  onChange={handleChangeRadio}
                  value={radioSelectValue}
                >
                  <Radio
                    className="branch-employee-checkbox"
                    value={2}
                    name="capacity"
                  >
                    {t("Home-visit")}
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="add-edit-cancel-modal-btn-col"
              >
                <Button
                  text={t("Add-update")}
                  className="AddEdit-btn-Employee"
                  onClick={
                    isEditFlag === true
                      ? employeeeUpdateHandler
                      : employeeeAddHandler
                  }
                />
                <Button
                  text={t("Cancel")}
                  className="Cancel-btn-Employee"
                  onClick={onCancelModalHandler}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default AddEditEmployee;

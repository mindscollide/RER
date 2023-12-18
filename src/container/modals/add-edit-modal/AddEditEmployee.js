import React, { useState } from "react";
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
import { addCityEmployeeMainApi } from "../../../store/actions/Admin_action";

const AddEditEmployee = ({ addEditModal, setAddEditModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const addNewEmployeeData = useSelector(
    (state) => state.admin.addNewEmployeeData
  );

  const [homeVisit, setHomeVisit] = useState(null);
  const [branchEmployee, setBranchEmployee] = useState(null);
  const [isCheckbox, setIsCheckbox] = useState(false);

  const [employeeMain, setEmployeeMain] = useState({
    EmployeeEnglishName: "",
    EmployeeNameArabic: "",
    EmployeeEmail: "",
    IsEmployeeActive: true,
    EmployeeBelongsToBranch: true,
    BranchID: 0,
    CityID: Number(localStorage.getItem("cityID")),
  });

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

  const homeVisitRadioChange = (e) => {
    setHomeVisit(e.target.value);
  };

  const branchEmployeeRadioChange = (e) => {
    setBranchEmployee(e.target.value);
  };

  const onCloseAddEditModal = () => {
    setAddEditModal(false);
  };

  const onCancelModalHandler = () => {
    setAddEditModal(false);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckbox(e.target.checked);
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
        BranchID: 1,
        CityID: Number(localStorage.getItem("cityID")),
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

  return (
    <>
      <Modal
        show={addEditModal}
        setShow={setAddEditModal}
        className="modaldialog add-edit-modal"
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-bank-footer"
        // size="m"
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
                <span className="text-labels">{t("Employee-name")}</span>
                <TextField
                  name="EmployeeEnglishName"
                  value={employeeMain.EmployeeEnglishName}
                  onChange={handleChangeEmployee}
                  placeholder={t("Employee-name")}
                  labelClass="d-none"
                  className="text-fields-addEdit"
                />
              </Col>
              <Col lg={6} md={6} sm={6} className="text-end">
                <span className="text-labels">اسم الموظف</span>
                <TextField
                  name="EmployeeNameArabic"
                  value={employeeMain.EmployeeNameArabic}
                  onChange={handleChangeEmployee}
                  placeholder="اسم الموظف"
                  labelClass="d-none"
                  className="text-fields-addEdit-arabic"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6} md={6} sm={6}>
                <span className="text-labels">{t("Employee-id")}</span>
                <TextField
                  name="EmployeeName"
                  placeholder={t("Employee-id")}
                  labelClass="d-none"
                  className="text-fields-addEdit"
                />
              </Col>
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
            </Row>

            <Row className="mt-3">
              <Col lg={4} md={4} sm={4}>
                <div className="Radio-Btn-div-For-Select">
                  <Radio.Group
                    onChange={branchEmployeeRadioChange}
                    value={branchEmployee}
                  >
                    <Radio className="branch-employee-checkbox" value="option1">
                      {t("Branch-employee")}
                    </Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col lg={8} md={8} sm={8} className="mt-1">
                <Select placeholder="Branch Employee" />
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={3} sm={3} className="mt-3">
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
              <Col lg={5} md={5} sm={5} className="mt-3">
                <Radio.Group onChange={homeVisitRadioChange} value={homeVisit}>
                  <Radio value="option1" className="branch-employee-checkbox">
                    {t("Branch-employee")}
                  </Radio>
                </Radio.Group>
              </Col>

              <Col
                lg={4}
                md={4}
                sm={5}
                className="d-flex justify-content-end mt-3"
              >
                <Radio.Group onChange={homeVisitRadioChange} value={homeVisit}>
                  <Radio value="option1" className="branch-employee-checkbox">
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
                  onClick={employeeeAddHandler}
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

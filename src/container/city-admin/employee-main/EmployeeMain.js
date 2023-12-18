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
import { getCityEmployeeMainApi } from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EmployeeMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [branchEmployeeOption, setBranchEmployeeOption] = useState(null);
  const [branchEmployeeOptionTwo, setBranchEmployeeOptionTwo] = useState(null);
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const cityEmployeeMain = useSelector((state) => state.admin.cityEmployeeMain);
  console.log(cityEmployeeMain, "cityEmployeeMaincityEmployeeMain");
  const currentLanguage = localStorage.getItem("i18nextLng");

  // row state for city Employee Main
  const [rows, setRows] = useState([]);

  // add edit modal states
  const [addEditModal, setAddEditModal] = useState(false);

  //delete modal states
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag));
  }, []);

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
    setAddEditModal(true);
  };

  // open add delete modal on Button Click
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const dataSource = [
    {
      id: <span className="table-inside-text">1</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
      capcity: <span className="table-inside-text">Olaya Branch</span>,
      email: <span className="table-inside-text">ali@gmail.com</span>,
      employeeID: <span className="table-inside-text">657294745</span>,
    },
    {
      id: <span className="table-inside-text">2</span>,
      name: <span className="table-inside-text">Morning Shift</span>,
      capcity: <span className="table-inside-text">Home Visit</span>,
      email: <span className="table-inside-text">ahmed@gmail.com</span>,
      employeeID: <span className="table-inside-text">657294745</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "employeeCity",
      key: "employeeCity",
      render: (text, record, index) => <span>{index + 1}</span>,
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
      align: "center",
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
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={openDeleteModal}
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
                    name="EmployeeName"
                    placeholder={t("Employee-name")}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
                <Col lg={6} md={6} sm={6} className="text-end">
                  <span className="text-labels">اسم الموظف</span>
                  <TextField
                    name="BranchNameArabic"
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
                    name="EmployeeName"
                    placeholder={t("Employee-id")}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Employee-email")}</span>
                  <TextField
                    name="EmployeeName"
                    placeholder={t("Employee-email")}
                    labelClass="d-none"
                    className="text-fiels-employeeMain"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={4} md={4} sm={4} className="mt-4">
                  <Checkbox
                    checked={isCheckboxSelected}
                    onChange={handleCheckboxChange}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
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

                <Col
                  lg={4}
                  md={4}
                  sm={4}
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
                    text={t("Revert")}
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
          />
        ) : null}

        {deleteModal ? (
          <DeleteEmployeeModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        ) : null}
      </section>
    </>
  );
};

export default EmployeeMain;

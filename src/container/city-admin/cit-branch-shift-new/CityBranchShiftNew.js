import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityBranchShiftNew.css";
import { Paper, Table, Button } from "../../../components/elements";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Switch } from "antd";
import {
  getCityBranchListApi,
  getAllShiftsOfBranch,
} from "../../../store/actions/Admin_action";
import { useTranslation } from "react-i18next";

const CityBranchShiftNew = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);

  const currentLanguage = localStorage.getItem("i18nextLng");

  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  // reducer for table rendering
  const branchesList = useSelector((state) => state.admin.branchesList);

  console.log(branchesList, "cityShiftsBranchDropdowncityShiftsBranchDropdown");

  // state of city branch Wise shift
  const [cityShiftRows, setCityShiftRows] = useState([]);

  // states for city branch shift in dropdown
  const [cityShiftOption, setCityShiftOption] = useState([]);
  const [cityShiftOptionValue, setCityShiftOptionValue] = useState(null);

  // onchange handler for branch dropdown
  const onChangeBranchHandler = (cityShiftOptionValue) => {
    setCityShiftOptionValue(cityShiftOptionValue);
  };

  // updating data in table
  useEffect(() => {
    if (branchesList !== null) {
      setCityShiftRows(branchesList);
    } else {
      setCityShiftRows([]);
    }
  }, [branchesList]);

  // calling branch data api
  useEffect(() => {
    dispatch(getCityBranchListApi(t, navigate, Loading));
    // for table rendering api branch shift
    dispatch(getAllShiftsOfBranch(t, navigate, Loading));
  }, []);

  const dataSource = [
    {
      id: 1,
      shiftName: <span className="table-inside-text">shift 1</span>,
    },
    {
      id: 2,
      shiftName: <span className="table-inside-text">shift 2</span>,
    },
    {
      id: 3,
      shiftName: <span className="table-inside-text">shift 3</span>,
    },
  ];

  const columns = [
    {
      title: <span className="table-text">{t("Shifts")}</span>,
      dataIndex:
        currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      key: currentLanguage === "en" ? "shiftNameEnglish" : "shiftNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },

    {
      title: <span className="table-text">{t("Availability")}</span>,
      dataIndex: "isShiftActive",
      key: "isShiftActive",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span>
          <Switch checked={text} />
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (
      cityShiftsBranchDropdown !== null &&
      cityShiftsBranchDropdown !== undefined &&
      cityShiftsBranchDropdown.length !== 0
    ) {
      if (currentLanguage === "en") {
        setCityShiftOption(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setCityShiftOption(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [cityShiftsBranchDropdown, currentLanguage]);

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("City-branch-wise-shifts")}
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
            <Paper className="CityBranchShiftNew-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col lg={3} md={3} sm={12} />
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">
                      {t("Branch")}
                    </label>
                    <Select
                      options={cityShiftOption}
                      value={cityShiftOptionValue}
                      onChange={onChangeBranchHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={3} md={3} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                </Col>
                <Col lg={2} md={2} sm={12} />
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    rows={cityShiftRows}
                    column={columns}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CityBranchShiftNew;

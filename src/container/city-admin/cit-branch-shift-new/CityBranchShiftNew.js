import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  getAllShiftsOfBranchCleare,
} from "../../../store/actions/Admin_action";
import { useTranslation } from "react-i18next";

const CityBranchShiftNew = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const urldBranchID = searchParams.get("branchId");
  const Loading = useSelector((state) => state.Loader.Loading);

  const currentLanguage = localStorage.getItem("i18nextLng");

  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  // reducer for table rendering
  const branchesList = useSelector((state) => state.admin.branchesList);

  // state of city branch Wise shift
  const [cityShiftRows, setCityShiftRows] = useState([]);

  // states for city branch shift in dropdown
  const [cityShiftOption, setCityShiftOption] = useState([]);
  const [cityShiftOptionValue, setCityShiftOptionValue] = useState(null);

  const callApi = async () => {
    await dispatch(getCityBranchListApi(t, navigate, Loading));
    // for table rendering api branch shift
    await dispatch(getAllShiftsOfBranch(t, navigate, Loading, urldBranchID));
  };
  // calling branch data api
  useEffect(() => {
    callApi();
    return () => {
      localStorage.removeItem("branchID");
      dispatch(getAllShiftsOfBranchCleare());
      setCityShiftRows([]);
      setCityShiftOption([]);
      setCityShiftOptionValue([]);
    };
  }, []);

  useEffect(() => {
    // Update cityShiftOption with the correct structure based on your data
    if (cityShiftsBranchDropdown && cityShiftsBranchDropdown.length !== 0) {
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

  // It will show by default first selected value in dropdown
  useEffect(() => {
    if (cityShiftOption.length > 0) {
      setCityShiftOptionValue(cityShiftOption[0]);
    }
  }, [cityShiftOption]);

  // updating data in table
  useEffect(() => {
    if (branchesList !== null) {
      setCityShiftRows(branchesList);
    } else {
      setCityShiftRows([]);
    }
  }, [branchesList]);

  // this will show the selected branch name in dropdown
  useEffect(() => {
    if (urldBranchID != null && cityShiftOption.length > 0) {
      const value = cityShiftOption.find(
        (branch) => branch.value === Number(urldBranchID)
      );
      if (value) {
        setCityShiftOptionValue(value);
      } else {
        console.log("location Branch with ID 3 not found");
      }
    }
  }, [cityShiftOption]);

  // onchange handler for branch dropdown
  const onChangeBranchHandler = (cityShiftOptionValue) => {
    setCityShiftOptionValue(cityShiftOptionValue);
  };
  const handleSearch = async () => {
    await dispatch(
      getAllShiftsOfBranch(t, navigate, Loading, cityShiftOptionValue.value)
    );
  };

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
                    onClick={handleSearch}
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

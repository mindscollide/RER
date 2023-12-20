import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CityWiseCounter.css";
import { Paper, Button, Table } from "../../../components/elements";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getBranchShiftCounterMainApi,
  getCityBranchListApi,
} from "../../../store/actions/Admin_action";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useLocation } from "react-router";
import { getCurrentDateUTC } from "../../../commen/functions/Date_time_formatter";

const CityWiseCounter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const getBranchShiftWiseCounter = useSelector(
    (state) => state.admin.getBranchShiftWiseCounter
  );

  const cityShiftsBranchDropdown = useSelector(
    (state) => state.admin.cityBranchListData
  );

  const currentLanguage = localStorage.getItem("i18nextLng");

  // row state for city shift counter Api
  const [cityCounterRow, setCityCounterRow] = useState([]);
  // state for shift heading
  const [selectedBranchShift, setSelectedBranchShift] = useState(null);

  // states for city wise counter in dropdown
  const [cityWiseCounter, setCityWiseCounter] = useState([]);
  const [cityWiseCounterValue, setCityWiseCounterValue] = useState(null);

  // Get current date
  const [roasterDate, setRoasterDate] = useState(new Date());

  // get branch Shift Counter Api table and select calling
  useEffect(() => {
    dispatch(getCityBranchListApi(t, navigate, loadingFlag));

    let newData = {
      RoasterDate: getCurrentDateUTC(roasterDate),
    };
    dispatch(getBranchShiftCounterMainApi(t, navigate, loadingFlag, newData));
  }, []);

  // updating data in table
  useEffect(() => {
    if (getBranchShiftWiseCounter !== null) {
      setCityCounterRow(getBranchShiftWiseCounter);
      setSelectedBranchShift(
        getBranchShiftWiseCounter[0]?.bscModel[0]?.branchShift
      );
    } else {
      setCityCounterRow([]);
      setSelectedBranchShift(null);
    }
  }, [getBranchShiftWiseCounter]);

  // for showing value in dropdown
  useEffect(() => {
    if (
      cityShiftsBranchDropdown !== null &&
      cityShiftsBranchDropdown !== undefined &&
      cityShiftsBranchDropdown.length !== 0
    ) {
      if (currentLanguage === "en") {
        setCityWiseCounter(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameEnglish,
          }))
        );
      } else {
        setCityWiseCounter(
          cityShiftsBranchDropdown.map((item) => ({
            value: item.branchID,
            label: item.branchNameArabic,
          }))
        );
      }
    }
  }, [cityShiftsBranchDropdown, currentLanguage]);

  // onchange handler for branch dropdown
  const onChangeBranchHandler = (cityWiseCounterValue) => {
    setCityWiseCounterValue(cityWiseCounterValue);
  };

  // Get selectedShift from location.state
  const selectedShift =
    location && location.state && location.state.selectedShift
      ? location.state.selectedShift
      : null;

  // this will show the selected branch name in dropdown
  useEffect(() => {
    if (selectedShift) {
      setCityWiseCounterValue(selectedShift);
    }
  }, [selectedShift]);

  const columns = [
    {
      title: (
        <span className="table-inside-header-text-new">
          {t("Counter-name")}
        </span>
      ),
      dataIndex: "bscsModel",
      key: "counterName",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.branchCounterModel.counterNameEnglish
            : record.branchCounterModel.counterNameArabic}
        </span>
      ),
    },
    {
      title: (
        <span className="table-inside-header-text-new">{t("Service")}</span>
      ),
      dataIndex: "bscsModel",
      key: "serviceName",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.shiftService.serviceNameEnglish
            : record.shiftService.serviceNameArabic}
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
              {t("City-branch-shift-wise-counters")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="CityWiseCounter-paper">
              <Row className="mx-auto ms-5 d-flex align-items-center justify-content-center">
                <Col
                  lg={5}
                  md={5}
                  sm={12}
                  className="col-for-date-timepicker-cityad"
                >
                  <label className="text-labels">{t("Date")}</label>
                  <DatePicker
                    arrowClassName="arrowClass"
                    containerClassName="containerClassTimePicker"
                    editable={false}
                    value={roasterDate}
                    onChange={(value) => setRoasterDate(value)}
                  />
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <span className="d-flex justify-content-center text-left flex-column ">
                    <label className="text-labels text-left">
                      {t("Branch")}
                    </label>
                    <Select
                      options={cityWiseCounter}
                      value={cityWiseCounterValue}
                      onChange={onChangeBranchHandler}
                      isSearchable={true}
                      className="select-dropdown-all"
                    />
                  </span>
                </Col>
                <Col lg={2} md={2} sm={12} className="mt-3">
                  <Button
                    icon={<i className="icon-search city-icon-space"></i>}
                    text={t("Search")}
                    className="Search-Icon-Btn"
                  />
                </Col>
              </Row>
              <Row></Row>

              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="CitywiseCounter-div-row"
                >
                  <span>
                    {selectedBranchShift
                      ? selectedBranchShift.shiftNameEnglish
                      : ""}
                  </span>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table
                    pagination={false}
                    column={columns}
                    rows={cityCounterRow}
                    className="div-table-counter"
                    // scroll={{ x: 500, y: 500 }}
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

export default CityWiseCounter;

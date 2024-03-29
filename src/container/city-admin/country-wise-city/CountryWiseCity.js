import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWiseCity.css";
import { Paper, Table, Button, TextField } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCityServiceListApi,
  updateCityServiceListApi,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const CountryWiseCity = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.Loader.Loading);
  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const [rows, setRows] = useState([]);

  const columns = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      width: "400px",
      dataIndex: "citySM",
      key: "citySM",

      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.citySM.serviceNameEnglish
            : record.citySM.serviceNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              handleSwitch("branchAvailability", value, record)
            }
          />
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Home-availability")}</span>,
      dataIndex: "homeAvailability",
      key: "homeAvailability",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) =>
              handleSwitch("homeAvailability", value, record)
            }
          />
        </span>
      ),
    },
    {
      title: (
        <span className="table-text">{t("Home-visit-charges-(Riyal)")}</span>
      ),
      dataIndex: "homeVisitCharges",
      key: "homeVisitCharges",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <>
          <span className="For-table-textfield">
            <TextField
              labelClass="d-none"
              className="for-inside-table-textfiel"
              value={text}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericInput = inputValue.replace(/[^0-9]/g, "");
                handleTextFieldChangeService(numericInput, rowIndex, 50, 1000);
              }}
              type="number"
              min={50}
              max={1000}
            />
          </span>
        </>
      ),
    },
  ];

  // calling branch data api
  useEffect(() => {
    dispatch(getCityServiceListApi(t, navigate, Loading));
  }, []);

  // updating data in table
  useEffect(() => {
    if (cityServiceListData !== null) {
      setRows(cityServiceListData);
    } else {
      setRows([]);
    }
  }, [cityServiceListData]);

  const handleSwitch = (name, value, record) => {
    try {
      if (name === "homeAvailability") {
        setRows(
          rows.map((service) => {
            if (service.cityServiceID === record.cityServiceID) {
              return {
                ...service,
                homeAvailability: value,
              };
            }
            return service;
          })
        );
      } else if (name === "branchAvailability") {
        setRows(
          rows.map((service) => {
            if (service.cityServiceID === record.cityServiceID) {
              return {
                ...service,
                branchAvailability: value,
              };
            }
            return service;
          })
        );
      }
    } catch {}
  };

  const handleTextFieldChangeService = (value, rowIndex, min, max) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setRows((prevServices) => {
        return rows.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              homeVisitCharges: numericValue,
            };
          }
          return service;
        });
      });
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid input. Please enter a value between 10 and 100.");
    }
  };

  const handleRevert = () => {
    try {
      if (cityServiceListData !== null) {
        setRows(cityServiceListData);
      }
    } catch {}
  };

  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        BranchAvailability: item.BranchAvailability,
        CityServiceID: item.CityServiceID,
        HomeAvailability: item.HomeAvailability,
        HomeVisitCharges: item.HomeVisitCharges,
      }));
      console.log(newArray, "newArraynewArray");
      let data = {
        CityID: Number(localStorage.getItem("cityID")),
        CityServices: newArray,
      };
      dispatch(updateCityServiceListApi(t, navigate, Loading, data));
    } catch {}
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("City-wise-service-availability")}
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
            <Paper className="Country-City-Wise-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center gap-1"
                >
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-Country-City-Wise"
                    onClick={handleSave}
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-Country-City-Wise"
                    onClick={handleRevert}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table rows={rows} column={columns} pagination={false} />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CountryWiseCity;

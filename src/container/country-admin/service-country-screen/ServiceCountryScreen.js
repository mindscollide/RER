import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ServiceCountryScreen.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCountryServiceMainApi,
  updateCountryServiceMainApi,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const ServiceCountryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const currentLanguage = localStorage.getItem("i18nextLng");

  // reducers for getcountryservice screen List
  const countryServiceScreenList = useSelector(
    (state) => state.admin.countryServiceScreenList
  );

  // state for to get data from reducers in table
  const [rows, setRows] = useState([]);

  // useEffect to call get API of countryServiceScreen
  useEffect(() => {
    dispatch(getCountryServiceMainApi(t, navigate, loadingFlag));
  }, []);

  // calling reducer in useEffect
  useEffect(() => {
    if (countryServiceScreenList !== null) {
      setRows(countryServiceScreenList);
    } else {
      setRows([]);
    }
  }, [countryServiceScreenList]);

  // columns for country service screen page
  const columns = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      dataIndex: "countrySM",
      key: "countrySM",
      width: "400px",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.countrySM.serviceNameEnglish
            : record.countrySM.serviceNameArabic}
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
  ];

  //To update the handler for switch
  const handleSwitch = (name, value, record) => {
    try {
      if (name === "branchAvailability") {
        setRows(
          rows.map((service) => {
            if (service.countryServiceID === record.countryServiceID) {
              return {
                ...service,
                branchAvailability: value,
              };
            }
            return service;
          })
        );
      } else if (name === "homeAvailability") {
        setRows(
          rows.map((service) => {
            if (service.countryServiceID === record.countryServiceID) {
              return {
                ...service,
                homeAvailability: value,
              };
            }
            return service;
          })
        );
      }
    } catch {}
  };

  //To save updated data save handler
  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        CountryServiceID: item.CountryServiceID,
        BranchAvailability: item.BranchAvailability,
        HomeAvailability: item.HomeAvailability,
      }));
      let data = {
        CountryID: Number(localStorage.getItem("countryID")),
        CountryServices: newArray,
      };
      dispatch(updateCountryServiceMainApi(t, navigate, loadingFlag, data));
    } catch {}
  };

  // To Revert the updated data into initial data revert handler
  const revertHandler = () => {
    try {
      if (countryServiceScreenList !== null) {
        setRows(countryServiceScreenList);
      }
    } catch {}
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Service-wise-country-availability")}
              <span className="shift-sub-heading">
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Service-Country-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-serviceScreen"
                >
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={handleSave}
                    className="save-btn-Service-Country"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    onClick={revertHandler}
                    className="revert-btn-Service-Country"
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

export default ServiceCountryScreen;

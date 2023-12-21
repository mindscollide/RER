import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryWorking.css";
import { Paper, Table, Button } from "../../../components/elements";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCountryWorkingDaysApi,
  updateWorkingDaysApi,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";

const CountryWorking = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const getWorkingDaysCountry = useSelector(
    (state) => state.admin.getWorkingDaysCountry
  );

  // State for table row
  const [rows, setRows] = useState([]);

  // To render data in Table
  useEffect(() => {
    dispatch(getCountryWorkingDaysApi(t, navigate, loadingFlag));
  }, []);

  // To set data in rows from reducers
  useEffect(() => {
    if (getWorkingDaysCountry !== null) {
      setRows(getWorkingDaysCountry);
    } else {
      setRows([]);
    }
  }, [getWorkingDaysCountry]);

  //This is handle switch in which it will change the toggle states ON and OFF
  const handleSwitch = (name, value, record) => {
    try {
      if (name === "isWorkingDay") {
        const updatedRows = [...rows];
        const index = updatedRows.findIndex((country) => country === record);

        if (index !== -1) {
          updatedRows[index] = {
            ...updatedRows[index],
            isWorkingDay: value,
          };
          setRows(updatedRows);
        }
      }
    } catch (error) {
      console.error("Error in handleSwitch:", error);
    }
  };

  //This is the column in which data append in table from api
  const columns = [
    {
      title: <span className="table-text">{t("Day")}</span>,
      dataIndex: "countryDayOfWeek",
      key: "countryDayOfWeek",
      width: "400px",
      render: (text, record) => (
        <span>
          {record.countryDayOfWeek === 0 ? (
            <p className="table-inside-text">{t("Sunday")}</p>
          ) : record.countryDayOfWeek === 1 ? (
            // Render default content for other cases
            <p className="table-inside-text">{t("Monday")}</p>
          ) : record.countryDayOfWeek === 2 ? (
            <p className="table-inside-text">{t("Tuesday")}</p>
          ) : record.countryDayOfWeek === 3 ? (
            <p className="table-inside-text">{t("Wednesday")}</p>
          ) : record.countryDayOfWeek === 4 ? (
            <p className="table-inside-text">{t("Thursday")}</p>
          ) : record.countryDayOfWeek === 5 ? (
            <p className="table-inside-text">{t("Friday")}</p>
          ) : record.countryDayOfWeek === 6 ? (
            <p className="table-inside-text">{t("Saturday")}</p>
          ) : null}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Enabled")}</span>,
      dataIndex: "isWorkingDay",
      key: "isWorkingDay",
      width: "200px",
      render: (text, record) => (
        <span>
          <Switch
            checked={text}
            onChange={(value) => handleSwitch("isWorkingDay", value, record)}
          />
        </span>
      ),
    },
  ];

  // This will Revert the data when I set anything then it will convert on its initial state
  const handleRevertCountry = () => {
    try {
      if (getWorkingDaysCountry !== null) {
        setRows(getWorkingDaysCountry);
      }
    } catch {}
  };

  // This will Save the data onClick of save Button
  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        CountryDayOfWeek: item.CountryDayOfWeek,
        IsWorkingDay: item.IsWorkingDay,
      }));
      console.log(newArray, "newArraynewArray");
      let data = {
        CountryID: Number(localStorage.getItem("countryID")),
        CountryWorkingDaylist: newArray,
      };
      dispatch(updateWorkingDaysApi(t, navigate, loadingFlag, data));
    } catch {}
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Country-working-days")}
              <span className="shift-sub-heading ms-2">
                {t("Saudi-arabia")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Country-working-paper">
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table rows={rows} column={columns} pagination={false} />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center col-Country-working mt-3"
                >
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    onClick={handleSave}
                    className="save-btn-Country-working"
                  />
                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    onClick={handleRevertCountry}
                    className="revert-btn-Country-working"
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

export default CountryWorking;
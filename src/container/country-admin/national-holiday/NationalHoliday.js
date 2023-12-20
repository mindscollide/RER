import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./NationalHoliday.css";
import { Paper, Button, Table } from "../../../components/elements";
import { useTranslation } from "react-i18next";
import {
  getNationalHolidayMainApi,
  deleteNationalHolidayMainApi,
} from "../../../store/actions/Admin_action";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { formatDate } from "../../../commen/functions/Date_time_formatter";

const NationalHoliday = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingFlag = useSelector((state) => state.Loader.Loading);
  const countryNationalHoliday = useSelector(
    (state) => state.admin.countryNationalHoliday
  );
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  const deleteCountryNational = useSelector(
    (state) => state.admin.deleteCountryNational
  );

  // state for table rendering
  const [rows, setRows] = useState([]);

  // for api calling
  useEffect(() => {
    dispatch(getNationalHolidayMainApi(t, navigate, loadingFlag));
  }, []);

  // for data rendering in table
  useEffect(() => {
    if (
      countryNationalHoliday !== null &&
      Array.isArray(countryNationalHoliday)
    ) {
      setRows(countryNationalHoliday);
    } else {
      setRows([]);
    }
  }, [countryNationalHoliday]);

  const onDeleteIcon = (record) => {
    const { nationalHolidayList } = record;
    let newDate = JSON.stringify(nationalHolidayList);
    let deleteData = {
      CountryID: Number(localStorage.getItem("countryID")),
      HolidayToRemove: newDate,
    };
    dispatch(
      deleteNationalHolidayMainApi(t, navigate, loadingFlag, deleteData)
    );
  };

  const columns = [
    {
      title: <span className="table-text">{t("Date")}</span>,
      dataIndex: "nationalHolidayList",
      key: "nationalHolidayList",
      width: "400px",
      render: (text, record) =>
        // console.log("text", record),
        <span className="table-inside-text">{formatDate(record)}</span>
    },

    {
      title: "",
      dataIndex: "holidayRemoved",
      key: "holidayRemoved",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <>
          <span>
            <i
              className="icon-trash icon-close-style-delete"
              onClick={() => onDeleteIcon(record)}
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
            <span className="shift-heading">
              {t("National-holidays-list")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="NationalHoliday-Admin-paper">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="btn-col-class-NationalHoliday"
                >
                  <DatePicker value={values} onChange={setValues} range />

                  <Button
                    icon={<i className="icon-repeat icon-space"></i>}
                    text={t("Revert")}
                    className="revert-btn-NationalHoliday"
                  />
                  <Button
                    icon={<i className="icon-save icon-space"></i>}
                    text={t("Save")}
                    className="save-btn-NationalHoliday"
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

export default NationalHoliday;

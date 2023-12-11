import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CounterMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Loader,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import {
  addBranchCounterApi,
  addBranchCountertFail,
  getAllCountersOfBranch,
} from "../../../store/actions/Admin_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loader_Actions } from "../../../store/actions/Loader_action";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";

const CounterMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = localStorage.getItem("i18nextLng");
  const allCountersOfBranchList = useSelector(
    (state) => state.admin.allCountersOfBranchList
  );
  const addBranchCounterData = useSelector(
    (state) => state.admin.addBranchCounterData
  );
  const Loading = useSelector((state) => state.Loader.Loading);
  const [rows, setRows] = useState([]);
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);
  const [newCounter, setNewCounter] = useState({
    CounterNameEnglish: "",
    CounterNameArabic: "",
    IsCounterActive: false,
    BranchID: 1,
    CounterID: 0,
  });
  useEffect(() => {
    dispatch(getAllCountersOfBranch(t, navigate, Loading));
  }, []);

  useEffect(() => {
    if (allCountersOfBranchList !== null) {
      setRows(allCountersOfBranchList);
    }
  }, [allCountersOfBranchList]);

  useEffect(() => {
    if (addBranchCounterData !== null) {
      let prevData = [...rows];
      prevData.push(addBranchCounterData);
      setRows(prevData);
      dispatch(addBranchCountertFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addBranchCounterData]);

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "counterID",
      key: "counterID",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },
    {
      title: <span className="table-text">{t("Shift-name")}</span>,
      dataIndex: lang === "en" ? "counterNameEnglish" : "counterNameArabic",
      key: lang === "en" ? "counterNameEnglish" : "counterNameArabic",
      render: (text, record) => (
        <span className="table-inside-text">{text}</span>
      ),
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCounterActive",
      key: "isCounterActive",
      align: "center",
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
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i className="icon-text-edit icon-EDT-DLT-color"></i>
            <i className="icon-close icon-EDT-DLT-color"></i>
          </span>
        </>
      ),
    },
  ];

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "CounterNameEnglish") {
        setNewCounter({
          ...newCounter,
          ["CounterNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "CounterNameArabic") {
        setNewCounter({
          ...newCounter,
          ["CounterNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setNewCounter({ ...newCounter, ["IsCounterActive"]: checked });
      }
    } catch {}
  };

  const handleAddCounter = () => {
    try {
      if (addUpdateCheckFlag) {
      } else {
        if (
          newCounter.CounterNameEnglish !== "" &&
          newCounter.CounterNameArabic !== ""
        ) {
          let Data = {
            CounterNameEnglish: newCounter.CounterNameEnglish,
            CounterNameArabic: newCounter.CounterNameArabic,
            IsCounterActive: newCounter.IsCounterActive,
            BranchID: 1,
          };
          dispatch(
            addBranchCounterApi(t, navigate, Loading, Data, setNewCounter)
          );
        }
      }
    } catch {}
  };
  const handleRestCounter = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setNewCounter({
        CounterNameEnglish: "",
        CounterNameArabic: "",
        IsCounterActive: false,
        BranchID: 1,
        CounterID: 0,
      });
    } catch {}
  };

  return (
    <>
      <section>
        <Row>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-start">
            <span className="shift-heading">
              {t("Counters")}
              <span className="shift-sub-heading">
                {" "}
                {t("Saudi-arabia-riyadh")}
              </span>
            </span>
          </Col>
          <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
            <span className="shift-sub-heading-right">
              {t("Olaya-street-branch")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Counter-Admin-paper">
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Counter-name")}</span>
                  <TextField
                    name="CounterNameEnglish"
                    placeholder={t("Counter-name")}
                    labelClass="d-none"
                    className="text-fiels-counterMain"
                    value={newCounter.CounterNameEnglish}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <span className="text-labels">{t("Counter-name")}</span>
                  <TextField
                    name="CounterNameArabic"
                    placeholder={t("Counter-name")}
                    labelClass="d-none"
                    className="text-fiels-counterMain"
                    value={newCounter.CounterNameArabic}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={6} md={6} sm={6} className="mt-2">
                  <Checkbox
                    checked={newCounter.IsCounterActive}
                    onChange={handleChange}
                    classNameDiv="Counter-checkbox"
                    label={
                      <span className="checkbox-label">{t("Active")}</span>
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={6} className="btn-col-class">
                  <Button
                    icon={<i className="icon-add-circle icon-space"></i>}
                    text={t("Add")}
                    className="Add-btn-Counter"
                    onClick={handleAddCounter}
                  />
                  <Button
                    icon={<i className="icon-refresh icon-space"></i>}
                    text={t("Reset")}
                    className="Reset-btn-Branch"
                    onClick={handleRestCounter}
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

export default CounterMain;

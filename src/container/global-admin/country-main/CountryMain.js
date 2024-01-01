import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsServiceCountryScreenComponent } from "../../../store/actions/global_action";
import {
  getCountryListMainApi,
  addCountryListMainApi,
  addCountyListFail,
  updateCountryListFail,
  updateCountryListMainApi,
} from "../../../store/actions/Admin_action";
import ServiceCountryScreenComponent from "../service-country-screen-component/ServiceCountryScreenComponent";
import { useNavigate } from "react-router";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import { loader_Actions } from "../../../store/actions/Loader_action";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";

const CountryMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const loadingFlag = useSelector((state) => state.Loader.Loading);

  const getCountryListData = useSelector(
    (state) => state.admin.getCountryListData
  );

  const addCountryListData = useSelector(
    (state) => state.admin.addCountryListData
  );

  const updateCountryListData = useSelector(
    (state) => state.admin.updateCountryListData
  );

  // state for country service component admin main
  const isServiceCountryComponentReducer = useSelector(
    (state) => state.global.isServiceCountryComponentReducer
  );

  // states for rows to set data in table
  const [rows, setRows] = useState([]);

  // flag for add and update country admin
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);

  // Add this state variable
  const [selectedCountryID, setSelectedCountryID] = useState(null);

  // delete state of modal
  const [deleteNewID, setDeleteNewID] = useState(null);
  const [deleteCountryModal, setDeleteCountryModal] = useState(false);

  // states for add new data in table row
  const [addCountryMain, setAddCountryMain] = useState({
    CountryNameEnglish: "",
    CountryNameArabic: "",
    IsCountryActive: false,
    CountryID: 0,
  });

  // useEffect to render APi
  useEffect(() => {
    dispatch(getCountryListMainApi(t, navigate, loadingFlag));
  }, []);

  // useEffect for table rendering from reducer
  useEffect(() => {
    if (getCountryListData !== null && Array.isArray(getCountryListData)) {
      setRows(getCountryListData);
    } else {
      setRows([]);
    }
  }, [getCountryListData]);

  useEffect(() => {
    if (addCountryListData !== null) {
      let prevData = [...rows];
      prevData.push(addCountryListData);
      setRows(prevData);
      dispatch(addCountyListFail(""));
      dispatch(loader_Actions(false));
    }

    if (updateCountryListData !== null) {
      setRows(
        rows.map((country) => {
          if (country.countryID === updateCountryListData.countryID) {
            return updateCountryListData; // Replace with the new data if IDs match
          }
          return country; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateCountryListFail(""));
      dispatch(loader_Actions(false));
    }
  }, [addCountryListData, updateCountryListData]);

  //to open ServiceCountryscreen on click of button
  const openServiceCountryScreen = () => {
    dispatch(setIsServiceCountryScreenComponent(true));
  };

  // to close ServiceCountryscreen on click of goBackbutton
  const closeServiceCountryScreen = () => {
    dispatch(setIsServiceCountryScreenComponent(false));
  };

  //open city screen page in Country Main
  const openClickCityScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["23"]);
    navigate("/GlobalAdmin/City");
  };

  //open branch screen page in Country Main
  const openClickBranchScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["24"]);
    navigate("/GlobalAdmin/Branch");
  };

  //open Counters updated page in Country Main
  const openClickCountersScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["27"]);
    navigate("/GlobalAdmin/Counters");
  };

  //open shifts page in Country Main
  const openClickshiftsScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["26"]);
    navigate("/GlobalAdmin/Shifts");
  };

  //open Employee page in Country Main
  const openClickEmployeeScreenInCountryMain = () => {
    localStorage.setItem("selectedKeys", ["25"]);
    navigate("/GlobalAdmin/Employee");
  };

  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Name")}</span>,
      dataIndex: "countryNameEnglish",
      key: "countryNameEnglish",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.countryNameEnglish
            : record.countryNameArabic}
        </span>
      ),
    },

    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCountryActive",
      key: "isCountryActive",
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
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              onClick={() => handleCountryEdit(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              onClick={() => handleCountryEdit(record, 2)}
            ></i>
            <i
              className="icon-globe icon-EDT-DLT-color"
              onClick={openServiceCountryScreen}
            ></i>
            <i
              className="icon-location icon-EDT-DLT-color"
              onClick={openClickCityScreenInCountryMain}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openClickBranchScreenInCountryMain}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openClickCountersScreenInCountryMain}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openClickshiftsScreenInCountryMain}
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={openClickEmployeeScreenInCountryMain}
            ></i>
          </span>
        </>
      ),
    },
  ];

  //on Change handler for country Admin main
  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "CountryNameEnglish") {
        setAddCountryMain({
          ...addCountryMain,
          ["CountryNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "CountryNameArabic") {
        setAddCountryMain({
          ...addCountryMain,
          ["CountryNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setAddCountryMain({ ...addCountryMain, ["IsCountryActive"]: checked });
      }
    } catch {}
  };

  // add and edit button in country Admin Main
  const handleAddCountryMain = (countryID) => {
    try {
      if (addUpdateCheckFlag) {
        if (
          addCountryMain.CountryNameEnglish !== "" &&
          addCountryMain.CountryNameArabic !== ""
        ) {
          let Data = {
            CountryID: countryID,
            CountryNameEnglish: addCountryMain.CountryNameEnglish,
            CountryNameArabic: addCountryMain.CountryNameArabic,
            IsCountryActive: addCountryMain.IsCountryActive,
          };
          dispatch(
            updateCountryListMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setAddCountryMain,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          addCountryMain.CountryNameEnglish !== "" &&
          addCountryMain.CountryNameArabic !== ""
        ) {
          let Data = {
            CountryNameEnglish: addCountryMain.CountryNameEnglish,
            CountryNameArabic: addCountryMain.CountryNameArabic,
            IsCountryActive: addCountryMain.IsCountryActive,
          };
          dispatch(
            addCountryListMainApi(
              t,
              navigate,
              loadingFlag,
              Data,
              setAddCountryMain
            )
          );
        }
      }
    } catch {}
  };

  // for reset data in textfields
  const handleReset = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setAddCountryMain({
        CountryNameEnglish: "",
        CountryNameArabic: "",
        IsCountryActive: false,
      });
    } catch {}
  };

  const handleCountryEdit = (value, flag, record) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setAddCountryMain({
          CountryID: Number(localStorage.getItem("countryID")),
          CountryNameEnglish: value.countryNameEnglish,
          CountryNameArabic: value.countryNameArabic,
          IsCountryActive: value.isCountryActive,
        });
        setSelectedCountryID(value.countryID);
      } else if (flag === 2) {
        setDeleteNewID(value.countryID);
        setDeleteCountryModal(true);
      }
    } catch {}
  };

  return (
    <>
      <section>
        {isServiceCountryComponentReducer === true ? (
          <>
            <ServiceCountryScreenComponent
              closeServiceCountryScreen={closeServiceCountryScreen}
            />
          </>
        ) : (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start"
              >
                <span className="shift-heading">
                  {t("Country")}
                  <span className="shift-sub-heading">
                    {" "}
                    {t("Saudi-arabia-riyadh")}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="Country-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">{t("Country-name")}</span>
                      <TextField
                        name="CountryNameEnglish"
                        placeholder={t("Country-name")}
                        labelClass="d-none"
                        value={addCountryMain.CountryNameEnglish}
                        onChange={handleChange}
                        className="text-fiels-Country"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="text-end">
                      <span className="text-labels">اسم الدولة</span>
                      <TextField
                        name="CountryNameArabic"
                        placeholder={"اسم الدولة"}
                        labelClass="d-none"
                        value={addCountryMain.CountryNameArabic}
                        onChange={handleChange}
                        className="text-fiels-Country-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="mt-1">
                      <Checkbox
                        checked={addCountryMain.IsCountryActive}
                        onChange={handleChange}
                        classNameDiv="Country-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col lg={6} md={6} sm={6} className="btn-class-Country">
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={addUpdateCheckFlag ? t("Update") : t("Add")}
                        onClick={() => handleAddCountryMain(selectedCountryID)}
                        className="Add-btn-Country"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        text={t("Reset")}
                        onClick={handleReset}
                        className="Reset-btn-Country"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table rows={rows} column={columns} pagination={false} />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </>
        )}
      </section>

      <DeleteEmployeeModal
        deleteNewID={deleteNewID}
        setDeleteCountryModal={setDeleteCountryModal}
        deleteCountryModal={deleteCountryModal}
        route={"CountryMain"}
      />
    </>
  );
};

export default CountryMain;

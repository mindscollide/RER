import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryAdminMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
} from "../../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CountryAdminModal from "../../modals/country-delete-modal/CountryAdminModal";
import { setIsCountryWiseCityComponent } from "../../../store/actions/global_action";
import {
  getCityServiceListApi,
  getCountryCitiesApi,
  updateCityServiceListApi,
  addCountryAdminMainApi,
  addCountryAdminFail,
  updateCountryAdminMainApi,
  updateCountryAdminFail,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import { Switch } from "antd";
import CountryWiseCityComponent from "../country-wise-city-component/CountryWiseCityComponent";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import { loader_Actions } from "../../../store/actions/Loader_action";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";

const CountryAdminMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = localStorage.getItem("i18nextLng");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";
  const Loading = useSelector((state) => state.Loader.Loading);
  const cityList = useSelector((state) => state.admin.cityList);
  // reducers for countrywiseCityComponent
  const cityServiceListData = useSelector(
    (state) => state.admin.cityServiceListData
  );
  // reducers for addCountry admin main api
  const countryAdminMainData = useSelector(
    (state) => state.admin.countryAdminMainData
  );

  // reducers for updateCountry admin main api
  const updateCountryAdmin = useSelector(
    (state) => state.admin.updateCountryAdmin
  );

  // flag for add and update country admin
  const [addUpdateCheckFlag, setAddUpdateCheckFlag] = useState(false);

  // delete state of modal
  const [deleteNewID, setDeleteNewID] = useState(null);
  const [deleteCountryModal, setDeleteCountryModal] = useState(false);

  // state for add new data in row
  const [addCountry, setAddCountry] = useState({
    CountryID: Number(localStorage.getItem("countryID")),
    CityNameEnglish: "",
    CityNameArabic: "",
    IsCityActive: false,
    CityID: 0,
  });

  // state to open a modal for delete
  const [countryDeleteModal, setCountryDeleteModal] = useState(false);
  const [rows, setRows] = useState([]);

  // state for country city admin main
  const isCountryWiseCityComponentReducer = useSelector(
    (state) => state.global.isCountryWiseCityComponentReducer
  );

  const callApi = async () => {
    // 1 pasiing in prop for check that we have to call getCityEmployeeMainApi all api from here on page route from side bar
    await dispatch(getCountryCitiesApi(t, navigate, Loading, 1));
  };

  useEffect(() => {
    callApi();
    return () => {
      setRows([]);
      // setCityOptionListEnglish([]);
      // setCityOptionListArabic([]);
      // setCityOptionValue(null);
    };
  }, []);

  useEffect(() => {
    if (countryAdminMainData !== null) {
      let prevData = [...rows];
      prevData.push(countryAdminMainData);
      setRows(prevData);
      dispatch(addCountryAdminFail(""));
      dispatch(loader_Actions(false));
    }

    if (updateCountryAdmin !== null) {
      setRows(
        rows.map((city) => {
          if (city.cityID === updateCountryAdmin.cityID) {
            return updateCountryAdmin; // Replace with the new data if IDs match
          }
          return city; // Keep the existing shift if IDs don't match
        })
      );
      dispatch(updateCountryAdminFail(""));
      dispatch(loader_Actions(false));
    }
  }, [countryAdminMainData, updateCountryAdmin]);

  //useEffect To set data in rows from reducers in table countrywiseCityComponent
  useEffect(() => {
    if (cityServiceListData !== null) {
      setRows(cityServiceListData);
    } else {
      setRows([]);
    }
  }, [cityServiceListData]);

  // updating table of city employee Main
  useEffect(() => {
    if (Object.keys(cityList).length > 0) {
      setRows(cityList?.cities);
    } else {
      setRows([]);
    }
  }, [cityList]);

  //on Change handler for country Admin main
  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      let checked = e.target.checked;
      if (name === "CityNameEnglish") {
        setAddCountry({
          ...addCountry,
          ["CityNameEnglish"]: regexOnlyForNumberNCharacters(value),
        });
      } else if (name === "CityNameArabic") {
        setAddCountry({
          ...addCountry,
          ["CityNameArabic"]: regexOnlyForNumberNCharacters(value),
        });
      } else {
        setAddCountry({ ...addCountry, ["IsCityActive"]: checked });
      }
    } catch {}
  };

  // add and edit button in country Admin Main
  const handleAddShift = () => {
    try {
      if (addUpdateCheckFlag) {
        if (
          addCountry.CityNameEnglish !== "" &&
          addCountry.CityNameArabic !== ""
        ) {
          let Data = {
            CountryID: Number(localStorage.getItem("countryID")),
            CityNameEnglish: addCountry.CityNameEnglish,
            CityNameArabic: addCountry.CityNameArabic,
            CityID: addCountry.CityID,
            IsCityActive: addCountry.IsCityActive,
          };
          dispatch(
            updateCountryAdminMainApi(
              t,
              navigate,
              Loading,
              Data,
              setAddCountry,
              setAddUpdateCheckFlag
            )
          );
        }
      } else {
        if (
          addCountry.CityNameEnglish !== "" &&
          addCountry.CityNameArabic !== ""
        ) {
          let Data = {
            CountryID: Number(localStorage.getItem("countryID")),
            CityNameEnglish: addCountry.CityNameEnglish,
            CityNameArabic: addCountry.CityNameArabic,
            CityID: addCountry.CityID,
            IsCityActive: addCountry.IsCityActive,
          };
          dispatch(
            addCountryAdminMainApi(t, navigate, Loading, Data, setAddCountry)
          );
        }
      }
    } catch {}
  };

  // for reset data in textfields
  const handleResetCountry = () => {
    try {
      if (addUpdateCheckFlag) {
        setAddUpdateCheckFlag(false);
      }
      setAddCountry({
        CountryID: Number(localStorage.getItem("countryID")),
        CityNameEnglish: "",
        CityNameArabic: "",
        CityID: 0,
        IsCityActive: false,
      });
    } catch {}
  };

  const handleCountryEdit = (value, flag) => {
    try {
      if (flag === 1) {
        setAddUpdateCheckFlag(true);
        setAddCountry({
          CountryID: Number(localStorage.getItem("countryID")),
          CityNameEnglish: value.cityNameEnglish,
          CityNameArabic: value.cityNameArabic,
          CityID: value.cityID,
          IsCityActive: value.isCityActive,
        });
      } else if (flag === 2) {
        setDeleteNewID(value.cityID);
        setDeleteCountryModal(true);
      }
    } catch {}
  };

  // this column is for country admin main
  const columns = [
    {
      title: <span className="table-text">#</span>,
      dataIndex: "cityID",
      key: "cityID",
      render: (text, record, index) => (
        <span className="table-inside-text">
          {(index + 1).toLocaleString(local)}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("City-name")}</span>,
      dataIndex: "cityNameEnglish",
      key: "cityNameEnglish",
      align: "left",
      render: (text, record) => (
        <span className="table-inside-text">
          {currentLanguage === "en"
            ? record.cityNameEnglish
            : record.cityNameArabic}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Active")}</span>,
      dataIndex: "isCityActive",
      key: "isCityActive",
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
      dataIndex: "cityID",
      key: "cityID",
      align: "center",
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              title="Edit"
              aria-label="Edit"
              onClick={() => handleCountryEdit(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              title="Delete"
              onClick={() => handleCountryEdit(record, 2)}
              aria-label="Delete"
            ></i>
            <i
              className="icon-settings icon-EDT-DLT-color"
              onClick={() => openCountryWiseCity(record)}
              title="Service"
              aria-label="Service"
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={openCountryCityWiseBranch}
              title="Branch"
              aria-label="Branch"
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={openCountryCityWiseCounter}
              title="Counter"
              aria-label="Counter"
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={openCountryCityBranchShift}
              title="Shifts"
              aria-label="Shifts"
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={() => openCountryWiseEmployee(text)}
              title="Employee"
              aria-label="Employee"
            ></i>
          </span>
        </>
      ),
    },
  ];

  // to open country wise city in onClick button
  const openCountryWiseCity = (record) => {
    localStorage.setItem("cityID", record.cityID);
    dispatch(getCityServiceListApi(t, navigate, Loading));
    dispatch(setIsCountryWiseCityComponent(true));
  };

  //to open country city wise branch onClick button
  const openCountryCityWiseBranch = () => {
    localStorage.setItem("selectedKeys", ["14"]);
    navigate("/CountryAdmin/Branch");
  };

  //to open country city wise counter onClick button
  const openCountryCityWiseCounter = () => {
    localStorage.setItem("selectedKeys", ["16"]);
    navigate("/CountryAdmin/Counters");
  };

  //to open country city branch wise shift onClick button
  const openCountryCityBranchShift = () => {
    localStorage.setItem("selectedKeys", ["15"]);
    navigate("/CountryAdmin/Shifts");
  };

  //to open country Wise Employee onClick button
  const openCountryWiseEmployee = (record) => {
    localStorage.setItem("selectedKeys", ["17"]);
    localStorage.setItem("branchID", record);
    navigate(`/CountryAdmin/Employee?cityID=${record}`);
  };

  // open a delete modal
  const openDeleteModal = () => {
    setCountryDeleteModal(true);
  };

  const goBackButtonCountryOnclick = (record) => {
    localStorage.removeItem("cityID", record.cityID);
    dispatch(setIsCountryWiseCityComponent(false));
  };

  // coulumn for countrywiseCityComponent
  const columnsCityWise = [
    {
      title: <span className="table-text">{t("Service")}</span>,
      width: "400px",
      dataIndex: "citySM",
      key: "citySM",
      render: (text, record) => (
        <span className="table-inside-text">
          {record.citySM
            ? currentLanguage === "en"
              ? record.citySM.serviceNameEnglish
              : record.citySM.serviceNameArabic
            : ""}
        </span>
      ),
    },
    {
      title: <span className="table-text">{t("Branch-availability")}</span>,
      dataIndex: "branchAvailability",
      key: "branchAvailability",
      width: "200px",
      align: "center",
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
      align: "center",
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
        <span className="table-text text-center">{t("Service-slot")}</span>
      ),
      dataIndex: "homeVisitCharges",
      key: "homeVisitCharges",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homeVisitCharges}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(numericInput, rowIndex, 50, 1000);
            }}
            type="number"
            min={50}
            max={1000}
          />
        </div>
      ),
    },
    {
      title: <span className="table-text">{t("Advance-roaster")}</span>,
      dataIndex: "homeServiceSlotDurationMinutes",
      key: "homeServiceSlotDurationMinutes",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={text}
            type="number"
            min={50}
            max={1000}
          />
        </div>
      ),
    },
    {
      title: <span className="table-text">{t("Prebooking-margin")}</span>,
      dataIndex: "homeMaximumAdvanceRoasterDays",
      key: "homeMaximumAdvanceRoasterDays",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={text}
            type="number"
            min={50}
            max={1000}
          />
        </div>
      ),
    },
    {
      title: <span className="table-text">{t("Visit-charges")}</span>,
      dataIndex: "homePrebookingDaysMarginForCity",
      key: "homePrebookingDaysMarginForCity",
      align: "center",
      width: "200px",

      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={text}
            type="number"
            min={50}
            max={1000}
          />
        </div>
      ),
    },
  ];

  //This is handler TextField for columns countrywiseCityComponent
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

  //handler for switch to change their state countrywiseCityComponent
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

  // state for revert the data into original state countrywiseCityComponent
  const handleRevert = () => {
    try {
      if (cityServiceListData !== null) {
        setRows(cityServiceListData);
      }
    } catch {}
  };

  // this will change the data when we hit the save button countrywiseCityComponent
  const handleSave = () => {
    try {
      let convertedData = capitalizeKeysInArray(rows);
      const newArray = convertedData.map((item) => ({
        BranchAvailability: item.BranchAvailability,
        CityServiceID: item.CityServiceID,
        HomeAvailability: item.HomeAvailability,
        HomeVisitCharges: item.HomeVisitCharges,
        HomeServiceSlotDurationMinutes: item.HomeServiceSlotDurationMinutes,
        HomeMaximumAdvanceRoasterDays: item.HomeMaximumAdvanceRoasterDays,
        HomePrebookingDaysMarginForCity: item.HomePrebookingDaysMarginForCity,
      }));
      console.log(newArray, "newArraynewArray");
      let data = {
        CityID: Number(localStorage.getItem("cityID")),
        CityServices: newArray,
      };
      dispatch(updateCityServiceListApi(t, navigate, Loading, data));
    } catch {}
  };

  // country wise city end

  return (
    <>
      <section>
        {isCountryWiseCityComponentReducer === true ? (
          <>
            <CountryWiseCityComponent
              setRows={setRows}
              rows={rows}
              goBackButtonCountryOnclick={goBackButtonCountryOnclick}
              columnsCityWise={columnsCityWise}
              handleRevert={handleRevert}
              handleSave={handleSave}
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
                  {t("City")}
                  <span className="shift-sub-heading">
                    {" "}
                    {currentLanguage === "en"
                      ? "(" + localStorage.getItem("countryName") + ")"
                      : "(" + localStorage.getItem("countryNameArabic") + ")"}
                    {/* {t("Saudi-arabia-riyadh")} */}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CountryAdmin-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">{t("City-name")}</span>
                      <TextField
                        name="CityNameEnglish"
                        value={addCountry.CityNameEnglish}
                        placeholder={t("City-name")}
                        onChange={handleChange}
                        labelClass="d-none"
                        className="text-fiels-CountryAdmin"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="text-end">
                      <span className="text-labels">اسم المدينة</span>
                      <TextField
                        name="CityNameArabic"
                        value={addCountry.CityNameArabic}
                        placeholder="اسم المدينة"
                        onChange={handleChange}
                        labelClass="d-none"
                        className="text-fields-CountryAdmin-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="mt-1">
                      <Checkbox
                        checked={addCountry.IsCityActive}
                        onChange={handleChange}
                        classNameDiv="CountryAdmin-checkbox"
                        label={
                          <span className="checkbox-label">{t("Active")}</span>
                        }
                      />
                    </Col>

                    <Col
                      lg={6}
                      md={6}
                      sm={6}
                      className="btn-class-CountryAdmin"
                    >
                      <Button
                        icon={<i className="icon-add-circle icon-space"></i>}
                        text={addUpdateCheckFlag ? t("Update") : t("Add")}
                        onClick={handleAddShift}
                        className="Add-btn-CountryAdmin"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-space"></i>}
                        onClick={handleResetCountry}
                        text={t("Reset")}
                        className="Reset-btn-CountryAdmin"
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
        route={"CountryAdminDelete"}
      />
    </>
  );
};

export default CountryAdminMain;

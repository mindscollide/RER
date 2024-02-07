import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./CountryAdminMain.css";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  Table,
  Notification,
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
  getCityServiceListFail,
  clearResponseMessageAdmin,
} from "../../../store/actions/Admin_action";
import { capitalizeKeysInArray } from "../../../commen/functions/utils.js";
import { Switch } from "antd";
import CountryWiseCityComponent from "../country-wise-city-component/CountryWiseCityComponent";
import { regexOnlyForNumberNCharacters } from "../../../commen/functions/regex";
import { loader_Actions } from "../../../store/actions/Loader_action";
import DeleteEmployeeModal from "../../modals/delete-employee-modal/DeleteEmplyeeModal";
import { convertToGMT } from "../../../commen/functions/Date_time_formatter";

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

  // reducer for response message
  const responseMessage = useSelector(
    (state) => state.admin.admin_ResponseMessage
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

  const [rows, setRows] = useState([]);

  //state for show notifications through response
  const [countryNotification, setCountryNotification] = useState({
    notificationFlag: false,
    notificationMessage: null,
    severity: "none",
  });

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
    if (cityList && Object.keys(cityList).length > 0) {
      setRows(cityList.cities);
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
      render: (text, record) => (
        <>
          <span className="icon-spaceing-dlt-edit">
            <i
              className="icon-text-edit icon-EDT-DLT-color"
              title={t("Edit")}
              aria-label={t("Edit")}
              onClick={() => handleCountryEdit(record, 1)}
            ></i>
            <i
              className="icon-close icon-EDT-DLT-color"
              title={t("Delete")}
              aria-label={t("Delete")}
              onClick={() => handleCountryEdit(record, 2)}
            ></i>
            <i
              className="icon-settings icon-EDT-DLT-color"
              onClick={() => openCountryWiseCity(record)}
              title={t("Service")}
              aria-label={t("Service")}
            ></i>
            <i
              className="icon-branch icon-EDT-DLT-color"
              onClick={() => openCountryCityWiseBranch(text)}
              title={t("Branch")}
              aria-label={t("Branch")}
            ></i>
            <i
              className="icon-counter icon-EDT-DLT-color"
              onClick={() => openCountryCityWiseCounter(text)}
              title={t("Counter")}
              aria-label={t("Counter")}
            ></i>
            <i
              className="icon-repeat icon-EDT-DLT-color"
              onClick={() => openCountryCityBranchShift(text)}
              title={t("Shifts")}
              aria-label={t("Shifts")}
            ></i>
            <i
              className="icon-user icon-EDT-DLT-color"
              onClick={() => openCountryWiseEmployee(text)}
              title={t("Employee")}
              aria-label={t("Employee")}
            ></i>
          </span>
        </>
      ),
    },
  ];

  // to open country wise city in onClick button
  const openCountryWiseCity = (record) => {
    localStorage.setItem("cityNameEnglish", record.cityNameEnglish);
    localStorage.setItem("cityNameArabic", record.cityNameArabic);
    localStorage.setItem("cityID", record.cityID);
    dispatch(getCityServiceListApi(t, navigate, Loading));
    dispatch(setIsCountryWiseCityComponent(true));
  };

  //to open country city wise branch onClick button
  const openCountryCityWiseBranch = (record) => {
    localStorage.setItem("selectedKeys", ["14"]);
    localStorage.setItem("branchID", record);
    navigate(`/CountryAdmin/Branch?cityID=${record}`);
  };

  //to open country city wise counter onClick button
  const openCountryCityWiseCounter = (record) => {
    localStorage.setItem("selectedKeys", ["16"]);
    localStorage.setItem("branchID", record);
    navigate(`/CountryAdmin/Counters?cityID=${record}`);
  };

  //to open country city branch wise shift onClick button
  const openCountryCityBranchShift = (record) => {
    localStorage.setItem("cityID", record);
    localStorage.setItem("selectedKeys", ["15"]);
    navigate(`/CountryAdmin/Shifts?cityID=${record}`);
  };

  //to open country Wise Employee onClick button
  const openCountryWiseEmployee = (record) => {
    localStorage.setItem("selectedKeys", ["17"]);
    localStorage.setItem("branchID", record);
    navigate(`/CountryAdmin/Employee?cityID=${record}`);
  };

  const goBackButtonCountryOnclick = async (record) => {
    localStorage.removeItem("cityID", record.cityID);
    dispatch(setIsCountryWiseCityComponent(false));
    dispatch(getCityServiceListFail(""));
    await dispatch(getCountryCitiesApi(t, navigate, Loading));
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
      width: "250px",
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
      width: "250px",
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
        <span className="d-flex justify-content-center table-text text-center me-3">
          {t("Service-slot")}
        </span>
      ),
      // homeVisitCharges
      dataIndex: "homeServiceSlotDurationMinutes",
      key: "homeServiceSlotDurationMinutes",
      width: "200px",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homeServiceSlotDurationMinutes}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                30,
                360,
                "homeServiceSlotDurationMinutes"
              );
            }}
            type="number"
            min={30}
            max={360}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-2">
          {t("Advance-roaster")}
        </span>
      ),
      // homeServiceSlotDurationMinutes
      dataIndex: "homeMaximumAdvanceRoasterDays",
      key: "homeMaximumAdvanceRoasterDays",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homeMaximumAdvanceRoasterDays}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                30,
                "homeMaximumAdvanceRoasterDays"
              );
            }}
            type="number"
            min={0}
            max={30}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Prebooking-margin")}
        </span>
      ),
      dataIndex: "homePrebookingDaysMarginForCity",
      key: "homePrebookingDaysMarginForCity",
      width: "200px",
      align: "center",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-3">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={record.homePrebookingDaysMarginForCity}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = inputValue.replace(/[^0-9]/g, "");
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                90,
                "homePrebookingDaysMarginForCity"
              );
            }}
            type="number"
            min={0}
            max={90}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Visit-charges")}
        </span>
      ),
      dataIndex: "homeVisitCharges",
      key: "homeVisitCharges",
      align: "center",
      width: "200px",
      render: (text, record, rowIndex) => (
        <div className="d-flex flex-column gap-2 ms-2">
          <TextField
            className="for-inside-table-textfields"
            labelClass="d-none"
            value={Math.min(record.homeVisitCharges, 1000)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericInput = Math.min(parseInt(inputValue, 10), 1000);
              handleTextFieldChangeService(
                numericInput,
                rowIndex,
                0,
                1000,
                "homeVisitCharges"
              );
            }}
            type="number"
            min={0}
            max={1000}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("Start-time")}
        </span>
      ),
      dataIndex: "homeVisitStartTime",
      key: "homeVisitStartTime",
      align: "center",
      width: "130px",
      render: (text, record) => {
        if (
          record?.homeVisitStartTime !== null &&
          record?.homeVisitStartTime !== undefined
        ) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.homeVisitStartTime, local)}
            </span>
          );
        }
      },
    },
    {
      title: (
        <span className="d-flex justify-content-center table-text text-center me-4">
          {t("End-time")}
        </span>
      ),
      dataIndex: "homeVisitEndTime",
      key: "homeVisitEndTime",
      align: "center",
      width: "100px",
      render: (text, record) => {
        if (
          record?.homeVisitEndTime !== null &&
          record?.homeVisitEndTime !== undefined
        ) {
          return (
            <span className="table-inside-text">
              {convertToGMT(record?.homeVisitEndTime, local)}
            </span>
          );
        }
      },
    },
  ];

  //This is handler TextField for columns countrywiseCityComponent
  const handleTextFieldChangeService = (
    value,
    rowIndex,
    min,
    max,
    columnName
  ) => {
    // Validate the input range
    const numericValue = Number(value);
    if (numericValue >= min && numericValue <= max) {
      setRows((prevServices) => {
        return rows.map((service, index) => {
          if (index === rowIndex) {
            return {
              ...service,
              [columnName]: numericValue,
            };
          }
          return service;
        });
      });
    }
  };

  // This is handler TextField for columns

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

  // useEffect to show response messages in snackbar
  useEffect(() => {
    if (
      responseMessage !== null &&
      responseMessage !== undefined &&
      responseMessage !== ""
    ) {
      if (
        responseMessage === t("Admin_AdminServiceManager_AddCountryCity_01")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddCountryCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddCountryCity_02")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_AddCountryCity_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_AddCountryCity_03")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (responseMessage === t("something_went_wrong")) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t("something_went_wrong"),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountryCity_01")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountryCity_02")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryCity_02"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountryCity_03")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryCity_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountryCity_04")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCountryCity_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_UpdateCountryCity_05")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountryCity_01")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteCountryCity_01"
            ),
            severity: "success",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountryCity_02")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_UpdateCityBranch_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountryCity_03")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteCountryCity_03"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountryCity_04")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ),
            severity: "error",
          }),
          3000
        );
      } else if (
        responseMessage === t("Admin_AdminServiceManager_DeleteCountryCity_06")
      ) {
        setTimeout(
          setCountryNotification({
            ...countryNotification,
            notificationFlag: true,
            notificationMessage: t(
              "Admin_AdminServiceManager_DeleteCountryCity_06"
            ),
            severity: "error",
          }),
          3000
        );
      }
    }
    dispatch(clearResponseMessageAdmin(null));
  }, [responseMessage]);

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
              countryNotification={countryNotification}
              setCountryNotification={setCountryNotification}
              responseMessage={responseMessage}
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
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="CountryAdmin-paper">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("City-name-english")}
                      </span>
                      <TextField
                        name="CityNameEnglish"
                        value={addCountry.CityNameEnglish}
                        placeholder={t("City-name-english")}
                        onChange={handleChange}
                        labelClass="d-none"
                        className="text-fiels-CountryAdmin"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className="text-labels">
                        {t("City-name-arabic")}
                      </span>
                      <TextField
                        name="CityNameArabic"
                        value={addCountry.CityNameArabic}
                        placeholder={t("City-name-arabic")}
                        onChange={handleChange}
                        labelClass="d-none"
                        className="text-fields-CountryAdmin-arabic"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={5} md={5} sm={5} className="mt-1">
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
                      lg={7}
                      md={7}
                      sm={7}
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

      <Notification
        show={countryNotification.notificationFlag}
        hide={setCountryNotification}
        message={countryNotification.notificationMessage}
        severity={countryNotification.severity}
        notificationClass={
          countryNotification.severity === "error"
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default CountryAdminMain;

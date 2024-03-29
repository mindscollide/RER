import * as actions from "../action_types";
import axios from "axios";
import { loader_Actions } from "./Loader_action";
import {
  addBranchCounter,
  addBranchShift,
  allCountersOfBranch,
  allShiftsOfBranch,
  deleteBranchShift,
  lastSelectedLanguage,
  systemSupportedLanguage,
  updateBranchShift,
  updateLastSelectedLanguage,
  addBranchRoasterEntry,
  getSingleDayBranchRoaster,
  removeBranchRoasterEntry,
  getBranchServices,
  //Commented Because Using Update All
  // updateBranchServices,
  updateAllBranchServices,
  updateBranchCounter,
  deleteBranchCounter,
  // ===================================CITY ADMIN==========================================//
  getCityBranchList,
  addCityBranch,
  deleteCityBranch,
  updateCityBranch,
  getCityServiceList,
  updateCityServiceList,
  getCityBranchServices,
  updateCityBranchService,
  getBranchShiftWiseCounter,
  getCityEmployee,
  addNewEmployeeCity,
  updateExistingEmployeeCity,
  deleteExistingEmployeeCity,
  getCountryNationalHoliday,
  addCountryNationalHoliday,
  deleteCountryNationalHoliday,
  getAllBranchServices,
  getAppointmentBranchReport,
  getCountryWorkingDays,
  updateCountryWorkingDays,
  getCountryCities,
  getAppointmentCityReport,
  addCountryCity,
  updateCountryCity,
  deleteCountryCity,
  getCountryServiceScreen,
  updateCountryServiceScreen,
  getAllBranchServiceCity,
  getAllBranchShiftServiceCity,
  getAllBranchCounterServiceCity,
  getCountryList,
  addCountryList,
  updateCountryList,
  deleteCountryList,
  getGlobalServiceList,
  addGlobalServiceList,
  updateGlobalServiceList,
  deleteGlobalServiceList,
  getAllEmployeeList,
  getAllCityServices,
  getAllCityBranchWiseServices,
  getAllCityBranchShiftWiseServices,
  getAllCityBranchShiftCounterServices,
  getServiceWiseCountryList,
} from "../../commen/apis/Api_config";
import { adminURL } from "../../commen/apis/Api_ends_points";
import moment from "moment";

//Clear Response Message
const clearResponseMessageAdmin = (message) => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_ADMIN,
    message: message,
  };
};

// this is for cleare states
const AdminCleareState = () => {
  return {
    type: actions.ADMIN_CLEARE_STATE,
  };
};

//Get System Supported Language Api
const getSystemSupportedLanguageSuccess = (response, message) => {
  return {
    type: actions.GET_SYSTEM_SUPPORTED_LANGUAGE_SUCCESS,
    response: response,
    message: message,
  };
};

const getSystemSupportedLanguageFail = (message) => {
  return {
    type: actions.GET_SYSTEM_SUPPORTED_LANGUAGE_FAIL,
    message: message,
  };
};

// t, navigate, route these 3 props should always be pass from any where its called
const getSystemSupportedLanguage = (t, i18n, navigate, route, data) => {
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", systemSupportedLanguage.RequestMethod);
    await axios({
      method: "post",
      url: adminURL,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSystemSupportedLanguage_01"
            ) {
              await dispatch(
                getSystemSupportedLanguageSuccess(
                  response.data.responseResult.systemSupportedLanguages,
                  t("Admin_AdminServiceManager_GetSystemSupportedLanguage_01")
                )
              );
              localStorage.setItem(
                "languageData",
                JSON.stringify(
                  response.data.responseResult.systemSupportedLanguages
                )
              );
              //   this check is for which routes its comming from
              if (route === "login") {
                await dispatch(loader_Actions(false));
              } else {
                await dispatch(
                  getLastSelectedLanguage(t, i18n, navigate, data)
                );
              }
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSystemSupportedLanguage_02"
            ) {
              await dispatch(
                getSystemSupportedLanguageFail(
                  t("Admin_AdminServiceManager_GetSystemSupportedLanguage_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSystemSupportedLanguage_03"
            ) {
              await dispatch(
                getSystemSupportedLanguageFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(
                getSystemSupportedLanguageFail(t("something_went_wrong"))
              );
            }
          } else {
            await dispatch(
              getSystemSupportedLanguageFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getSystemSupportedLanguageFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getSystemSupportedLanguageFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get  System Supported Language Api
const getLastSelectedLanguageSuccess = (response, message) => {
  return {
    type: actions.GET_LAST_SELECTED_LANGUAGE_SUCCESS,
    response: response,
    message: message,
  };
};

const getLastSelectedLanguageFail = (message) => {
  return {
    type: actions.GET_LAST_SELECTED_LANGUAGE_FAIL,
    message: message,
  };
};

const getLastSelectedLanguage = (t, i18n, navigate, data) => {
  return async (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", lastSelectedLanguage.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetLastSelectedLanguage_01"
            ) {
              localStorage.setItem("i18nextLngFlag", true);
              localStorage.setItem(
                "i18nextLng",
                response.data.responseResult.userSelectedLanguage
                  .systemSupportedLanguageID === 1
                  ? "en"
                  : "ar"
              );

              setTimeout(() => {
                i18n.changeLanguage(
                  response.data.responseResult.userSelectedLanguage
                    .systemSupportedLanguageID === 1
                    ? "en"
                    : "ar"
                );
              }, 100);

              document.body.dir =
                response.data.responseResult.userSelectedLanguage
                  .systemSupportedLanguageID === 1
                  ? "ltr"
                  : "rtl";

              moment.locale(
                response.data.responseResult.userSelectedLanguage
                  .systemSupportedLanguageID === 1
                  ? "en"
                  : "ar"
              );

              await dispatch(
                getLastSelectedLanguageSuccess(
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetLastSelectedLanguage_02"
            ) {
              await dispatch(
                getLastSelectedLanguageFail(
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetLastSelectedLanguage_03"
            ) {
              await dispatch(
                getLastSelectedLanguageFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              getLastSelectedLanguageFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getLastSelectedLanguageFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Set Last Selected Language Api
const setLastSelectedLanguageSuccess = (message) => {
  return {
    type: actions.SET_LAST_SELECTED_LANGUAGE_SUCCESS,
    message: message,
  };
};

const setLastSelectedLanguageFail = (message) => {
  return {
    type: actions.SET_LAST_SELECTED_LANGUAGE_FAIL,
    message: message,
  };
};

const setLastSelectedLanguage = (
  t,
  i18n,
  navigate,
  data,
  setSelectedLanguage
) => {
  return async (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", updateLastSelectedLanguage.RequestMethod);
    form.append("RequestData", JSON.stringify(data));

    await axios({
      method: "post",
      url: adminURL,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_SetLastSelectedLanguage_01"
            ) {
              await dispatch(
                setLastSelectedLanguageSuccess(
                  t("Admin_AdminServiceManager_SetLastSelectedLanguage_01")
                )
              );
              setSelectedLanguage({
                languageTitle:
                  data.SystemSupportedLanguageID === 2
                    ? "Ã˜Â¹Ã˜Â±Ã˜Â¨Ã™â€°"
                    : "English",
                systemSupportedLanguageID: data.SystemSupportedLanguageID,
                code: data.SystemSupportedLanguageID === 2 ? "ar" : "en",
              });
              const newLanguage =
                data.SystemSupportedLanguageID === 2 ? "ar" : "en";
              // Change the language using i18next instance directly
              setTimeout(() => {
                i18n.changeLanguage(newLanguage);
              }, 100);
              console.log("i18nextLng", newLanguage);
              localStorage.setItem("i18nextLng", newLanguage);
              moment.locale(newLanguage);
              // Set document direction based on the selected language
              document.body.dir =
                data.SystemSupportedLanguageID === 2 ? "rtl" : "ltr";
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_SetLastSelectedLanguage_02"
            ) {
              await dispatch(
                setLastSelectedLanguageFail(
                  t("Admin_AdminServiceManager_SetLastSelectedLanguage_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_SetLastSelectedLanguage_03"
            ) {
              await dispatch(
                setLastSelectedLanguageSuccess(
                  t("Admin_AdminServiceManager_SetLastSelectedLanguage_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_SetLastSelectedLanguage_04"
            ) {
              await dispatch(
                setLastSelectedLanguageFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(setLastSelectedLanguageFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              setLastSelectedLanguageFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            setLastSelectedLanguageFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(setLastSelectedLanguageFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get All Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const getAllShiftsOfBranchSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_SHIFTS_OF_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllShiftsOfBranchFail = (message) => {
  return {
    type: actions.GET_ALL_SHIFTS_OF_BRANCH_FAIL,
    message: message,
  };
};
const getAllShiftsOfBranchCleare = (message) => {
  return {
    type: actions.GET_ALL_SHIFTS_OF_BRANCH_CLEARE,
    message: message,
  };
};
const getAllShiftsOfBranch = (t, navigate, loadingFlag, id) => {
  let data = {};
  if (id !== undefined && id !== null) {
    data = { BranchID: Number(id) };
  } else {
    data = { BranchID: Number(localStorage.getItem("branchID")) };
  }
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", allShiftsOfBranch.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(getAllShiftsOfBranch(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllShiftsOfBranch_01"
            ) {
              await dispatch(
                getAllShiftsOfBranchSuccess(
                  response.data.responseResult.shiftModelList,
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllShiftsOfBranch_02"
            ) {
              await dispatch(
                getAllShiftsOfBranchFail(
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllShiftsOfBranch_03"
            ) {
              await dispatch(
                getAllShiftsOfBranchFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllShiftsOfBranchFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllShiftsOfBranchFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get All Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const allCountersOfBranchSuccess = (response, message) => {
  return {
    type: actions.ALL_COUNTERS_OF_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const allCountersOfBranchFail = (message) => {
  return {
    type: actions.ALL_COUNTERS_OF_BRANCH_FAIL,
    message: message,
  };
};

const getAllCountersOfBranch = (t, navigate, loadingFlag, id) => {
  let data = {};
  if (id !== undefined && id !== null) {
    data = { BranchID: Number(id) };
  } else {
    data = { BranchID: Number(localStorage.getItem("branchID")) };
  }
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", allCountersOfBranch.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(getAllCountersOfBranch(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCountersOfBranch_01"
            ) {
              await dispatch(
                allCountersOfBranchSuccess(
                  response.data.responseResult.counterModelList,
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCountersOfBranch_02"
            ) {
              await dispatch(
                allCountersOfBranchFail(
                  t("Admin_AdminServiceManager_GetLastSelectedLanguage_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCountersOfBranch_03"
            ) {
              await dispatch(
                allCountersOfBranchFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(allCountersOfBranchFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(allCountersOfBranchFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(allCountersOfBranchFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(allCountersOfBranchFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get Add Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const addBranchShiftSuccess = (response, message) => {
  return {
    type: actions.ADD_BRANCH_SHIFT_SUCCESS,
    response: response,
    message: message,
  };
};

const addBranchShiftFail = (message) => {
  return {
    type: actions.ADD_BRANCH_SHIFT_FAIL,
    message: message,
  };
};

const addBranchShiftApi = (t, navigate, loadingFlag, data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addBranchShift.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addBranchShiftApi(t, navigate, loadingFlag, data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchShift_01"
            ) {
              setState({
                ShiftNameEnglish: "",
                ShiftNameArabic: "",
                IsShiftActive: false,
                ShiftStartTime: "",
                ShiftEndTime: "",
                BranchID: Number(localStorage.getItem("branchID")),
                shiftID: 0,
              });
              await dispatch(
                addBranchShiftSuccess(
                  response.data.responseResult.newShift,
                  t("Admin_AdminServiceManager_AddBranchShift_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchShift_02"
            ) {
              await dispatch(
                addBranchShiftFail(
                  t("Admin_AdminServiceManager_AddBranchShift_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchShift_03"
            ) {
              await dispatch(addBranchShiftFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addBranchShiftFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addBranchShiftFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addBranchShiftFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addBranchShiftFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get UPDAT Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const updateBranchShiftSuccess = (response, message) => {
  return {
    type: actions.UPDAT_EBRANCH_SHIFT_SUCCESS,
    response: response,
    message: message,
  };
};

const updateBranchShiftFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_SHIFT_FAIL,
    message: message,
  };
};

const updateBranchShiftApi = (
  t,
  navigate,
  loadingFlag,
  data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateBranchShift.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              updateBranchShiftApi(t, navigate, loadingFlag, data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchShift_01"
            ) {
              setState({
                ShiftNameEnglish: "",
                ShiftNameArabic: "",
                IsShiftActive: false,
                ShiftStartTime: "",
                ShiftEndTime: "",
                BranchID: Number(localStorage.getItem("branchID")),
                shiftID: 0,
              });
              setCheckFlag(false);
              await dispatch(
                updateBranchShiftSuccess(
                  response.data.responseResult.updatedShift,
                  t("Admin_AdminServiceManager_UpdateBranchShift_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchShift_02"
            ) {
              await dispatch(
                updateBranchShiftFail(
                  t("Admin_AdminServiceManager_UpdateBranchShift_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchShift_03"
            ) {
              await dispatch(
                updateBranchShiftFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateBranchShiftFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateBranchShiftFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateBranchShiftFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateBranchShiftFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get UPDAT Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const deleteBranchShifttSuccess = (response, message) => {
  return {
    type: actions.DELETE_BRANCH_SHIFT_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteBranchShiftFail = (message) => {
  return {
    type: actions.DELETE_BRANCH_SHIFT_FAIL,
    message: message,
  };
};

const deleteBranchShiftApi = (t, navigate, loadingFlag, data, setModalFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteBranchShift.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              deleteBranchShiftApi(t, navigate, loadingFlag, data, setModalFlag)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchShift_01"
            ) {
              setModalFlag(false);
              await dispatch(
                deleteBranchShifttSuccess(
                  response.data.responseResult.deletedShiftID,
                  t("Admin_AdminServiceManager_DeleteBranchShift_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchShift_02"
            ) {
              await dispatch(
                deleteBranchShiftFail(
                  t("Admin_AdminServiceManager_DeleteBranchShift_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchShift_03"
            ) {
              await dispatch(
                deleteBranchShiftFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchShift_04"
            ) {
              await dispatch(addCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchShift_05"
            ) {
              await dispatch(
                addCountryAdminFail(
                  t("Admin_AdminServiceManager_DeleteBranchShift_05")
                )
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(deleteBranchShiftFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteBranchShiftFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteBranchShiftFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get Add Branch Counter Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
const addBranchCounterSuccess = (response, message) => {
  return {
    type: actions.ADD_BRANCH_COUNTER_SUCCESS,
    response: response,
    message: message,
  };
};

const addBranchCountertFail = (message) => {
  return {
    type: actions.ADD_BRANCH_COUNTERT_FAIL,
    message: message,
  };
};

const addBranchCounterApi = (t, navigate, loadingFlag, data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addBranchCounter.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addBranchCounterApi(t, navigate, loadingFlag, data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchCounter_01"
            ) {
              setState({
                CounterNameEnglish: "",
                CounterNameArabic: "",
                IsCounterActive: false,
                BranchID: Number(localStorage.getItem("branchID")),
                CounterID: 0,
              });
              await dispatch(
                addBranchCounterSuccess(
                  response.data.responseResult.newCounter,
                  t("Admin_AdminServiceManager_AddBranchShift_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchCounter_02"
            ) {
              await dispatch(
                addBranchCountertFail(
                  t("Admin_AdminServiceManager_AddBranchShift_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchCounter_03"
            ) {
              await dispatch(addBranchCountertFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addBranchCountertFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addBranchCountertFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addBranchCountertFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addBranchCountertFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// this is for cleare states
const addBrandRoasterEntrySuccess = (response, message) => {
  return {
    type: actions.ADD_BRANCH_ROASTER_ENTRY_SUCCESS,
    response: response,
    message: message,
  };
};

const addBrandRoasterEntryFailed = (message) => {
  return {
    type: actions.ADD_BRANCH_ROASTER_ENTRY_FAILED,
    message: message,
  };
};

//API function for Add branch Roaster Entry
const addBranchRoasterEntryApiFunction = (
  data,
  t,
  navigate,
  loadingFlag,
  selectedDate
) => {
  // let data = { BranchID: 1 };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addBranchRoasterEntry.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addBranchRoasterEntryApiFunction(
                data,
                t,
                navigate,
                loadingFlag,
                selectedDate
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_01"
            ) {
              await dispatch(
                addBrandRoasterEntrySuccess(
                  response.data.responseResult.counterModelList,
                  t("Admin_AdminServiceManager_AddBranchRoasterEntry_01")
                )
              );
              await dispatch(loader_Actions(false));
              dispatch(
                getSingleBranchRoasterApiFunction(
                  t,
                  navigate,
                  true,
                  selectedDate
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_02"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(
                  t("Admin_AdminServiceManager_AddBranchRoasterEntry_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_03"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(
                  t("Admin_AdminServiceManager_AddBranchRoasterEntry_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_04"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(
                  t("Admin_AdminServiceManager_AddBranchRoasterEntry_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_05"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_06"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addBrandRoasterEntryFailed(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              addBrandRoasterEntryFailed(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addBrandRoasterEntryFailed(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addBrandRoasterEntryFailed(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

const getSingleBranchRoasterSuccess = (response, message) => {
  return {
    type: actions.GET_SINGLE_DAY_BRANCH_ROASTER_SUCCESS,
    response: response,
    message: message,
  };
};

const getSingleBranchRoasterFailed = (message) => {
  return {
    type: actions.GET_SINGLE_DAY_BRANCH_ROASTER_FAILED,
    message: message,
  };
};

//API function for Get Single branch Roaster
const getSingleBranchRoasterApiFunction = (
  t,
  navigate,
  loadingFlag,
  selectedData
) => {
  let data = { BranchID: 1, RoasterDate: selectedData };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getSingleDayBranchRoaster.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              getSingleBranchRoasterApiFunction(
                t,
                navigate,
                loadingFlag,
                selectedData
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSingleDayBranchRoaster_01"
            ) {
              await dispatch(
                getSingleBranchRoasterSuccess(
                  response.data.responseResult.roasterList,
                  t("Admin_AdminServiceManager_GetSingleDayBranchRoaster_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSingleDayBranchRoaster_02"
            ) {
              await dispatch(
                getSingleBranchRoasterFailed(
                  t("Admin_AdminServiceManager_GetSingleDayBranchRoaster_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSingleDayBranchRoaster_03"
            ) {
              await dispatch(
                getSingleBranchRoasterFailed(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSingleDayBranchRoaster_04"
            ) {
              await dispatch(
                getSingleBranchRoasterFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addBrandRoasterEntryFailed(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              getSingleBranchRoasterFailed(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getSingleBranchRoasterFailed(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getSingleBranchRoasterFailed(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

const removeBranchEntryRoasterSuccess = (response, message) => {
  return {
    type: actions.REMOVE_BRANCH_ROASTER_ENTRY_SUCCESS,
    response: response,
    message: message,
  };
};

const removeBranchEntryRoasterFailed = (message) => {
  return {
    type: actions.REMOVE_BRANCH_ROASTER_ENTRY_FAILED,
    message: message,
  };
};

//API function for Removing Branch Entry Roaster
const removingBranchEntryRoasterApiFunction = (
  t,
  navigate,
  loadingFlag,
  data,
  selectedDate
) => {
  // let data = { BranchID: 1 };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", removeBranchRoasterEntry.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              removingBranchEntryRoasterApiFunction(
                t,
                navigate,
                loadingFlag,
                data,
                selectedDate
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_01"
            ) {
              await dispatch(
                removeBranchEntryRoasterSuccess(
                  response.data.responseResult.counterModelList,
                  t("Admin_AdminServiceManager_RemoveBranchRoasterEntry_01")
                )
              );
              await dispatch(loader_Actions(false));
              dispatch(
                getSingleBranchRoasterApiFunction(
                  t,
                  navigate,
                  loadingFlag,
                  selectedDate
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_02"
            ) {
              await dispatch(
                removeBranchEntryRoasterFailed(
                  t("Admin_AdminServiceManager_RemoveBranchRoasterEntry_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_03"
            ) {
              await dispatch(
                removeBranchEntryRoasterFailed(
                  t("Admin_AdminServiceManager_RemoveBranchRoasterEntry_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_04"
            ) {
              await dispatch(
                removeBranchEntryRoasterFailed(
                  t("Admin_AdminServiceManager_RemoveBranchRoasterEntry_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_05"
            ) {
              await dispatch(
                removeBranchEntryRoasterFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(
                removeBranchEntryRoasterFailed(t("something_went_wrong"))
              );
            }
          } else {
            await dispatch(
              removeBranchEntryRoasterFailed(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            removeBranchEntryRoasterFailed(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(removeBranchEntryRoasterFailed(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get Branch Services
const getBranchServicesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCH_SERVICES_SUCCESS,
    response: response,
    message: message,
  };
};

const getBranchServicesFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCH_SERVICES_FAIL,
    message: message,
  };
};

const getBranchServicesApi = (t, navigate, loadingFlag) => {
  let data = { BranchID: Number(localStorage.getItem("branchID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getBranchServices.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(getBranchServicesApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_01"
            ) {
              await dispatch(
                getBranchServicesSuccess(
                  response.data.responseResult.branchServiceModelList,
                  t("Admin_AdminServiceManager_GetBranchServices_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_02"
            ) {
              await dispatch(
                getBranchServicesFail(
                  t("Admin_AdminServiceManager_GetBranchServices_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_03"
            ) {
              await dispatch(
                getBranchServicesFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_04"
            ) {
              await dispatch(getBranchServicesFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(getBranchServicesFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getBranchServicesFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Update Branch Services (Commented because update all is being used and not sequential api)
// const updateBranchServicesSuccess = (response, message) => {
//   return {
//     type: actions.UPDATE_BRANCH_SERVICES_SUCCESS,
//     response: response,
//     message: message,
//   };
// };

// const updateBranchServicesFail = (message) => {
//   return {
//     type: actions.UPDATE_BRANCH_SERVICES_FAIL,
//     message: message,
//   };
// };

// const updateBranchServicesApi = (t, navigate, loadingFlag, data) => {
//   return async (dispatch) => {
//     if (!loadingFlag) {
//       dispatch(loader_Actions(true));
//     }
//     let form = new FormData();
//     form.append("RequestMethod", updateBranchServices.RequestMethod);
//     form.append("RequestData", JSON.stringify(data));
//     await axios({
//       method: "post",
//       url: adminURL,
//       data: form,
//       headers: {
//        _token : JSON.parse(localStorage.getItem("token"))
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           if (response.data.responseCode === 417) {
//             // await dispatch(RefreshToken(navigate, t))
//             dispatch(updateBranchServicesApi(t, navigate, loadingFlag, data));
//           } else if (response.data.responseResult.isExecuted === true) {
//             if (
//               response.data.responseResult.responseMessage ===
//               "Admin_AdminServiceManager_UpdateBranchServices_01"
//             ) {
//               await dispatch(
//                 updateBranchServicesSuccess(
//                   response.data.responseResult.branchServiceModelList,
//                   t("Admin_AdminServiceManager_UpdateBranchServices_01")
//                 )
//               );
//               // await dispatch(loader_Actions(false));
//             } else if (
//               response.data.responseResult.responseMessage ===
//               "Admin_AdminServiceManager_UpdateBranchServices_02"
//             ) {
//               await dispatch(
//                 updateBranchServicesFail(
//                   t("Admin_AdminServiceManager_UpdateBranchServices_02")
//                 )
//               );
//               // await dispatch(loader_Actions(false));
//             } else if (
//               response.data.responseResult.responseMessage ===
//               "Admin_AdminServiceManager_UpdateBranchServices_03"
//             ) {
//               await dispatch(
//                 updateBranchServicesFail(
//                   t("Admin_AdminServiceManager_GetBranchServices_03")
//                 )
//               );
//               // await dispatch(loader_Actions(false));
//             } else if (
//               response.data.responseResult.responseMessage ===
//               "Admin_AdminServiceManager_GetBranchServices_04"
//             ) {
//               await dispatch(
//                 updateBranchServicesFail(t("something_went_wrong"))
//               );
//               // await dispatch(loader_Actions(false));
//             } else {
//               dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
//             }
//           } else {
//             await dispatch(updateBranchServicesFail(t("something_went_wrong")));
//             // await dispatch(loader_Actions(false));
//           }
//         } else {
//           await dispatch(updateBranchServicesFail(t("something_went_wrong")));
//           // await dispatch(loader_Actions(false));
//         }
//       })
//       .catch((response) => {
//         dispatch(updateBranchServicesFail(t("something_went_wrong")));
//         // dispatch(loader_Actions(false));
//       });
//   };
// };

//Update All Branch Services

const updateAllBranchServicesSuccess = (response, message) => {
  return {
    type: actions.UPDATE_ALL_BRANCH_SERVICES_SUCCESS,
    response: response,
    message: message,
  };
};

const updateAllBranchServicesFail = (message) => {
  return {
    type: actions.UPDATE_ALL_BRANCH_SERVICES_FAIL,
    message: message,
  };
};

const updateAllBranchServicesApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateAllBranchServices.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              updateAllBranchServicesApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_01"
            ) {
              await dispatch(
                updateAllBranchServicesSuccess(
                  response.data.responseResult.listOfBranchServices,
                  t("Admin_AdminServiceManager_UpdateBranchServices_01")
                )
              );
              await dispatch(getBranchServicesApi(t, navigate, loadingFlag));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_02"
            ) {
              await dispatch(
                updateAllBranchServicesFail(
                  t("Admin_AdminServiceManager_UpdateBranchServices_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_03"
            ) {
              await dispatch(
                updateAllBranchServicesFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_04"
            ) {
              await dispatch(
                updateAllBranchServicesFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              updateAllBranchServicesFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            updateAllBranchServicesFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateAllBranchServicesFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Update Branch Counter
const updateBranchCounterSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_COUNTER_SUCCESS,
    response: response,
    message: message,
  };
};

const updateBranchCounterFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_COUNTER_FAILED,
    message: message,
  };
};

const updateBranchCounterApi = (
  t,
  navigate,
  loadingFlag,
  data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateBranchCounter.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              updateBranchCounterApi(
                t,
                navigate,
                loadingFlag,
                data,
                setState,
                setCheckFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchCounter_01"
            ) {
              await setState({
                CounterNameEnglish: "",
                CounterNameArabic: "",
                IsCounterActive: false,
                BranchID: Number(localStorage.getItem("branchID")),
                CounterID: 0,
              });
              await setCheckFlag(false);
              await dispatch(
                updateBranchCounterSuccess(
                  response.data.responseResult.updatedCounter,
                  t("Admin_AdminServiceManager_UpdateBranchCounter_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchCounter_02"
            ) {
              await dispatch(
                updateBranchCounterFail(
                  t("Admin_AdminServiceManager_UpdateBranchCounter_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchCounter_03"
            ) {
              await dispatch(
                updateBranchCounterFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchCounter_04"
            ) {
              await dispatch(
                updateBranchCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateBranchCounterFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(updateBranchCounterFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateBranchCounterFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateBranchCounterFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Delete Branch Counter

const deleteBranchCounterSuccess = (response, message) => {
  return {
    type: actions.DELETE_BRANCH_COUNTER_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteBranchCounterFail = (message) => {
  return {
    type: actions.DELETE_BRANCH_COUNTER_FAILED,
    message: message,
  };
};

const deleteBranchCounterApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setModalFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteBranchCounter.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              deleteBranchCounterApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setModalFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_01"
            ) {
              setModalFlag(false);
              await dispatch(
                deleteBranchCounterSuccess(
                  response.data.responseResult.deletedCounterID,
                  t("Admin_AdminServiceManager_DeleteBranchCounter_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_02"
            ) {
              await dispatch(
                deleteBranchCounterFail(
                  t("Admin_AdminServiceManager_DeleteBranchCounter_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_03"
            ) {
              await dispatch(
                deleteBranchCounterFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_04"
            ) {
              await dispatch(
                deleteBranchCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_05"
            ) {
              await dispatch(
                deleteBranchCounterFail(
                  t("Admin_AdminServiceManager_DeleteBranchCounter_05")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteBranchCounterFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(deleteBranchCounterFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteBranchCounterFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteBranchCounterFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// ===================================CITY ADMIN==========================================//

//Get All GET CITY BRANCH LIST Api for(City Admin for listing down existing branches in city)
const getCityBranchListSuccess = (response, message) => {
  return {
    type: actions.GET_CITY_BRANCH_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getCityBranchListFail = (message) => {
  return {
    type: actions.GET_CITY_BRANCH_LIST_FAIL,
    message: message,
  };
};

const getCityBranchListApi = (t, navigate, loadingFlag, id) => {
  let data = {};
  if (id !== undefined && id !== null) {
    data = { CityID: Number(id) };
  } else {
    data = { CityID: Number(localStorage.getItem("cityID")) };
  }
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCityBranchList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(getCityBranchListApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchList_01"
            ) {
              await dispatch(
                getCityBranchListSuccess(
                  response.data.responseResult.branchModels,
                  t("Admin_AdminServiceManager_GetCityBranchList_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchList_02"
            ) {
              await dispatch(
                getCityBranchListFail(
                  t("Admin_AdminServiceManager_GetCityBranchList_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchList_03"
            ) {
              await dispatch(getCityBranchListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getCityBranchListFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(getCityBranchListFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCityBranchListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCityBranchListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get add City Branch Api for(City Admin for adding new branch in the city)
const addCityBranchSuccess = (response, message) => {
  return {
    type: actions.ADD_CITY_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const addCityBranchFail = (message) => {
  return {
    type: actions.ADD_CITY_BRANCH_FAIL,
    message: message,
  };
};

const addCityBranchApi = (t, navigate, loadingFlag, data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addCityBranch.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addCityBranchApi(t, navigate, loadingFlag, data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCityBranch_01"
            ) {
              setState({
                BranchNameEnglish: "",
                BranchNameArabic: "",
                IsBranchActive: false,
                BranchStartTime: "",
                BranchEndTime: "",
                BranchID: 0,
                CityID: Number(localStorage.getItem("cityID")),
              });
              await dispatch(
                addCityBranchSuccess(
                  response.data.responseResult.branchAddUpdate,
                  t("Admin_AdminServiceManager_AddCityBranch_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCityBranch_02"
            ) {
              await dispatch(
                addCityBranchFail(
                  t("Admin_AdminServiceManager_AddCityBranch_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCityBranch_03"
            ) {
              await dispatch(addCityBranchFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addCityBranchFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addCityBranchFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addCityBranchFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addCityBranchFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//for delete City Branch Api (City Admin for deleting existing branch in the city)
const deleteCityBranchSuccess = (response, message) => {
  return {
    type: actions.DELETE_CITY_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteCityBranchFail = (message) => {
  return {
    type: actions.DELETE_CITY_BRANCH_FAIL,
    message: message,
  };
};

const deleteCityBranchApi = (t, navigate, loadingFlag, data, setModalFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteCityBranch.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              deleteCityBranchApi(t, navigate, loadingFlag, data, setModalFlag)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCityBranch_01"
            ) {
              setModalFlag(false);
              await dispatch(
                deleteCityBranchSuccess(
                  response.data.responseResult.branchAddUpdate.branchID,
                  t("Admin_AdminServiceManager_DeleteCityBranch_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCityBranch_02"
            ) {
              await dispatch(
                deleteCityBranchFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCityBranch_03"
            ) {
              await dispatch(
                deleteCityBranchFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCityBranch_04"
            ) {
              await dispatch(addCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCityBranch_05"
            ) {
              await dispatch(
                addCountryAdminFail(
                  t("Admin_AdminServiceManager_DeleteCityBranch_05")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteCityBranchFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(deleteCityBranchFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteCityBranchFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteCityBranchFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//for UPDAT Shifts Of Branch Api (City Admin for update existing branch in the city)
const updateCityBranchSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CITY_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const updateCityBranchFail = (message) => {
  return {
    type: actions.UPDATE_CITY_BRANCH_FAIL,
    message: message,
  };
};

const updateCityBranchApi = (
  t,
  navigate,
  loadingFlag,
  data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCityBranch.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              updateCityBranchApi(t, navigate, loadingFlag, data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityBranch_01"
            ) {
              setState({
                BranchNameEnglish: "",
                BranchNameArabic: "",
                IsBranchActive: false,
                BranchStartTime: "",
                BranchEndTime: "",
                BranchID: 0,
                CityID: Number(localStorage.getItem("cityID")),
              });
              setCheckFlag(false);
              await dispatch(
                updateCityBranchSuccess(
                  response.data.responseResult.branchAddUpdate,
                  t("Admin_AdminServiceManager_UpdateCityBranch_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityBranch_02"
            ) {
              await dispatch(
                updateCityBranchFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityBranch_03"
            ) {
              await dispatch(
                updateCityBranchFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateCityBranchFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateCityBranchFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateCityBranchFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCityBranchFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get  Country Wise City for listing down existing services in city
const getCityServiceListSuccess = (response, message) => {
  return {
    type: actions.GET_CITY_SERVICE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getCityServiceListFail = (message) => {
  return {
    type: actions.GET_CITY_SERVICE_LIST_FAIL,
    message: message,
  };
};

const getCityServiceListApi = (t, navigate, loadingFlag) => {
  let data = { CityID: Number(localStorage.getItem("cityID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCityServiceList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(getCityServiceListApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityServiceList_01"
            ) {
              await dispatch(
                getCityServiceListSuccess(
                  response.data.responseResult.cityServices,
                  t("Admin_AdminServiceManager_GetCityServiceList_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityServiceList_02"
            ) {
              await dispatch(
                getCityServiceListFail(
                  t("Admin_AdminServiceManager_GetCityServiceList_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityServiceList_03"
            ) {
              await dispatch(
                getCityServiceListFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityServiceList_04"
            ) {
              await dispatch(getCityServiceListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(getCityServiceListFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCityServiceListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCityServiceListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Country Wise City for updating all existing services in a city in a single request
const updateCityServiceListSuccess = (message) => {
  return {
    type: actions.UPDATE_CITY_SERVICE_LIST_SUCCESS,
    message: message,
  };
};

const updateCityServiceListFail = (message) => {
  return {
    type: actions.UPDATE_CITY_SERVICE_LIST_FAIL,
    message: message,
  };
};

const updateCityServiceListApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCityServiceList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(updateCityServiceListApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_01"
            ) {
              await dispatch(
                updateCityServiceListSuccess(
                  t("Admin_AdminServiceManager_UpdateBranchServices_01")
                )
              );
              await dispatch(getCityServiceListApi(t, navigate, loadingFlag));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_02"
            ) {
              await dispatch(
                updateCityServiceListFail(
                  t("Admin_AdminServiceManager_UpdateCityServiceList_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_03"
            ) {
              await dispatch(
                updateCityServiceListFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_04"
            ) {
              await dispatch(
                updateCityServiceListFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateCityServiceListFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              updateCityServiceListFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateCityServiceListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCityServiceListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// GET CITY BRANCH SERVICE MAIN API START
const getCityBranchServiceSuccess = (response, message) => {
  return {
    type: actions.GET_CITY_BRANCH_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const getCityBranchServiceFail = (message) => {
  return {
    type: actions.GET_CITY_BRANCH_SERVICE_FAIL,
    message: message,
  };
};

const getCityBranchServiceListApi = (t, navigate, loadingFlag) => {
  let data = {
    CityID: Number(localStorage.getItem("cityID")),
    BranchID: Number(localStorage.getItem("branchID")),
  };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCityBranchServices.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getCityBranchServiceListApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchServices_01"
            ) {
              await dispatch(
                getCityBranchServiceSuccess(
                  response.data.responseResult.branchServiceModelList,
                  t("Admin_AdminServiceManager_GetCityBranchServices_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchServices_02"
            ) {
              await dispatch(
                getCityBranchServiceFail(
                  t("Admin_AdminServiceManager_GetCityBranchServices_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_03"
            ) {
              await dispatch(
                getCityBranchServiceFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityBranchServices_04"
            ) {
              await dispatch(
                getCityBranchServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getLastSelectedLanguageFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getCityBranchServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCityBranchServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCityBranchServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// GET CITY BRANCH SERVICE MAIN API END

// UPDATE CITY BRANCH SERVICE MAIN API START
const updateCityBranchServiceSuccess = (message) => {
  return {
    type: actions.UPDATE_CITY_BRANCH_SERVICE_SUCCESS,
    message: message,
  };
};

const updateCityBranchServiceFail = (message) => {
  return {
    type: actions.UPDATE_CITY_BRANCH_SERVICE_FAIL,
    message: message,
  };
};

const updateCityBranchServiceListApi = (t, navigate, loadingFlag, newData) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCityBranchService.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              updateCityBranchServiceListApi(t, navigate, loadingFlag, newData)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityBranchServices_01"
            ) {
              await dispatch(
                updateCityBranchServiceSuccess(
                  t("Admin_AdminServiceManager_UpdateBranchServices_01")
                )
              );
              await dispatch(
                getCityBranchServiceListApi(t, navigate, loadingFlag)
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityBranchServices_02"
            ) {
              await dispatch(
                updateCityBranchServiceFail(
                  t("Admin_AdminServiceManager_UpdateCityBranchServices_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_03"
            ) {
              await dispatch(
                updateCityBranchServiceFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCityServiceList_04"
            ) {
              await dispatch(
                updateCityBranchServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateCityBranchServiceFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              updateCityBranchServiceFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            updateCityBranchServiceFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCityBranchServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// UPDATE CITY BRANCH SERVICE MAIN API END

// GET BRANCH SHIFT WISE COUNTER API START
const getBranchShiftCounterSuccess = (response, message) => {
  return {
    type: actions.GET_BRANCH_SHIFT_COUNTER_SUCCESS,
    response: response,
    message: message,
  };
};

const getBranchShiftCounterFail = (message) => {
  return {
    type: actions.GET_BRANCH_SHIFT_COUNTER_FAIL,
    message: message,
  };
};

const getBranchShiftCounterClear = (message) => {
  return {
    type: actions.GET_BRANCH_SHIFT_COUNTER_CLEAR,
    message: message,
  };
};

const getBranchShiftCounterMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getBranchShiftWiseCounter.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getBranchShiftCounterMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchShiftWiseCounter_01"
            ) {
              await dispatch(
                getBranchShiftCounterSuccess(
                  response.data.responseResult.bscModel,
                  t("Admin_AdminServiceManager_GetBranchShiftWiseCounter_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchShiftWiseCounter_02"
            ) {
              await dispatch(
                getBranchShiftCounterFail(
                  t("Admin_AdminServiceManager_GetBranchShiftWiseCounter_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchShiftWiseCounter_03"
            ) {
              await dispatch(
                getBranchShiftCounterFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchShiftWiseCounter_04"
            ) {
              await dispatch(
                getBranchShiftCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getBranchShiftCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getBranchShiftCounterFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getBranchShiftCounterFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getBranchShiftCounterFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// GET BRANCH SHIFT WISE COUNTER API END

// GET CITY EMPLOYEE MAIN API START
const getCityEmployeeSuccess = (response, message) => {
  return {
    type: actions.GET_CITY_EMPLOYEE_SUCCESS,
    response: response,
    message: message,
  };
};

const getCityEmployeeFail = (message) => {
  return {
    type: actions.GET_CITY_EMPLOYEE_FAIL,
    message: message,
  };
};
const getCityEmployeeClear = (message) => {
  return {
    type: actions.GET_CITY_EMPLOYEE_CLEAR,
    message: message,
  };
};
const getCityEmployeeMainApi = (t, navigate, loadingFlag, value) => {
  let data;
  if (value !== null && value !== undefined) {
    data = { CityID: Number(value) };
  } else {
    data = { CityID: Number(localStorage.getItem("cityID")) };
  }

  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCityEmployee.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag, value));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityEmployees_01"
            ) {
              await dispatch(
                getCityEmployeeSuccess(
                  response.data.responseResult.cityEmployeeList,
                  t("Admin_AdminServiceManager_GetCityEmployees_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityEmployees_02"
            ) {
              await dispatch(
                getCityEmployeeFail(
                  t("Admin_AdminServiceManager_GetCityEmployees_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityEmployees_03"
            ) {
              await dispatch(
                getCityEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCityEmployees_04"
            ) {
              await dispatch(getCityEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getCityEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getCityEmployeeFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCityEmployeeFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCityEmployeeFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// GET CITY EMPLOYEE MAIN API END

// ADD NEW EMPLOYEE CITY MAIN API START

const addNewEmployeeSuccess = (response, message) => {
  return {
    type: actions.ADD_NEW_EMPLOYEE_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const addNewEmployeeFail = (message) => {
  return {
    type: actions.ADD_NEW_EMPLOYEE_CITY_FAIL,
    message: message,
  };
};

const addCityEmployeeMainApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setEmployeeMain,
  setAddEditModal
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addNewEmployeeCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              addCityEmployeeMainApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setEmployeeMain,
                setAddEditModal
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_01"
            ) {
              setEmployeeMain({
                EmployeeEnglishName: "",
                EmployeeNameArabic: "",
                EmployeeEmail: "",
                IsEmployeeActive: true,
                EmployeeBelongsToBranch: true,
                BranchID: 0,
                CityID: Number(localStorage.getItem("cityID")),
              });

              await setAddEditModal(false);
              await dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag));
              await dispatch(
                addNewEmployeeSuccess(
                  response.data.responseResult.employeeAddedUpdated,
                  t("Admin_AdminServiceManager_AddNewEmployeeOfCity_01")
                )
              );
              localStorage.setItem(
                "branchID",
                response.data.responseResult.employeeAddedUpdated.employeeBranch
                  .branchID
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_02"
            ) {
              await dispatch(
                addNewEmployeeFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_03"
            ) {
              await dispatch(
                addNewEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddNewEmployeeOfCity_04"
            ) {
              await dispatch(addNewEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addNewEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(addNewEmployeeFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addNewEmployeeFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addNewEmployeeFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// ADD NEW EMPLOYEE CITY MAIN API END

// UPDATE Existing EMPLOYEE CITY MAIN API START
const updateExistingEmployeeSuccess = (response, message) => {
  return {
    type: actions.UPDATE_EXISTING_EMPLOYEE_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const updateExistingEmployeeFail = (message) => {
  return {
    type: actions.UPDATE_EXISTING_EMPLOYEE_CITY_FAIL,
    message: message,
  };
};

const updateExistingEmployeeMainApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setEmployeeMain,
  setAddEditModal
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateExistingEmployeeCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              updateExistingEmployeeMainApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setEmployeeMain,
                setAddEditModal
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_01"
            ) {
              setAddEditModal(false);
              await dispatch(
                updateExistingEmployeeSuccess(
                  t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_01")
                )
              );
              dispatch(getCityEmployeeMainApi(t, navigate, loadingFlag));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_02"
            ) {
              await dispatch(
                updateExistingEmployeeFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_03"
            ) {
              await dispatch(
                updateExistingEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_04"
            ) {
              await dispatch(
                updateExistingEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_05"
            ) {
              await dispatch(
                updateExistingEmployeeFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                updateExistingEmployeeFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              updateExistingEmployeeFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateExistingEmployeeFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateExistingEmployeeFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

const addEditFlagModal = (response) => {
  return {
    type: actions.ADD_EDIT_MODAL_EMPLOYEE,
    response: response,
  };
};

// UPDATE Existing EMPLOYEE CITY MAIN API END

// DELETE EXISTING EMPLOYEE CITY MAIN API START
const deleteExistingEmployeeSuccess = (response, message) => {
  return {
    type: actions.DELETE_EXISTING_EMPLOYEE_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteExistingEmployeeFail = (message) => {
  return {
    type: actions.DELETE_EXISTING_EMPLOYEE_CITY_FAIL,
    message: message,
  };
};

const deleteExistingEmployeeMainApi = (
  t,
  navigate,
  Loading,
  data,
  setModalFlag
) => {
  return async (dispatch) => {
    if (!Loading) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteExistingEmployeeCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              deleteExistingEmployeeMainApi(
                t,
                navigate,
                Loading,
                data,
                setModalFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_01"
            ) {
              await setModalFlag(false);
              dispatch(getCityEmployeeMainApi(t, navigate, Loading));
              await dispatch(
                deleteExistingEmployeeSuccess(
                  response.data.responseResult.employeeAddedUpdated,
                  t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_02"
            ) {
              await dispatch(
                deleteExistingEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateExistingEmployeeOfCity_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_03"
            ) {
              await dispatch(
                deleteExistingEmployeeFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_04"
            ) {
              dispatch(deleteExistingEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_05"
            ) {
              await dispatch(
                deleteExistingEmployeeFail(
                  t("Admin_AdminServiceManager_DeleteExistingEmployeeOfCity_05")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteExistingEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              deleteExistingEmployeeFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteExistingEmployeeFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteExistingEmployeeFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//GET APPOINTMENT CITY

const getAppointmentCityReportSuccess = (response, message) => {
  return {
    type: actions.GET_APPOINTMENT_BRANCH_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};

const getAppointmentCityReportFail = (message) => {
  return {
    type: actions.GET_APPOINTMENT_BRANCH_REPORT_FAIL,
    message: message,
  };
};

const getAppointmentReportCityAPI = (data, t, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAppointmentCityReport.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAppointmentReportCityAPI(data, t, navigate, loadingFlag)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportCityAdmin_01"
            ) {
              await dispatch(
                getAppointmentCityReportSuccess(
                  response.data.responseResult.appointmentList,
                  t(
                    "Admin_AdminServiceManager_GetAppointmentReportCityAdmin_01"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportCityAdmin_02"
            ) {
              await dispatch(
                getAppointmentCityReportFail(
                  t(
                    "Admin_AdminServiceManager_GetAppointmentReportCityAdmin_02"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_03"
            ) {
              await dispatch(
                getAppointmentCityReportFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(getAppointmentCityReportFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getAppointmentCityReportFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getAppointmentCityReportFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAppointmentCityReportFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// ===================================CITY ADMIN==========================================//

// ===================================COUNTRY ADMIN START==========================================//

// DELETE EXISTING EMPLOYEE CITY MAIN API END

// GET NATIONAL HOLIDAY COUNTRY CITY MAIN API START
const getNationalHolidaySuccess = (response, message) => {
  return {
    type: actions.GET_NATIONAL_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

const getNationalHolidayFail = (message) => {
  return {
    type: actions.GET_NATIONAL_HOLIDAY_FAIL,
    message: message,
  };
};

const getNationalHolidayMainApi = (t, navigate, loadingFlag) => {
  let data = { CountryID: Number(localStorage.getItem("countryID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCountryNationalHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getNationalHolidayMainApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryNationalHoliday_01"
            ) {
              await dispatch(
                getNationalHolidaySuccess(
                  response.data.responseResult.nationalHolidayList,
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryNationalHoliday_02"
            ) {
              await dispatch(
                getNationalHolidayFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryNationalHoliday_03"
            ) {
              await dispatch(
                getNationalHolidayFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryNationalHoliday_04"
            ) {
              await dispatch(
                getNationalHolidayFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryNationalHoliday_05"
            ) {
              await dispatch(getNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getNationalHolidayFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getNationalHolidayFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getNationalHolidayFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// GET NATIONAL HOLIDAY COUNTRY CITY MAIN API END

// ADD NATIONAL HOLIDAY COUNTRYCOUNTRY ADMIN MAIN API START
const addNationalHolidaySuccess = (response, message) => {
  return {
    type: actions.ADD_NATIONAL_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

const addNationalHolidayFail = (message) => {
  return {
    type: actions.ADD_NATIONAL_HOLIDAY_FAIL,
    message: message,
  };
};

const addNationalHolidayMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addCountryNationalHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(addNationalHolidayMainApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryNationalHoliday_01"
            ) {
              await dispatch(
                addNationalHolidaySuccess(
                  response.data.responseResult.country,
                  t("Admin_AdminServiceManager_AddCountryNationalHoliday_01")
                )
              );
              await dispatch(
                getNationalHolidayMainApi(t, navigate, loadingFlag)
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryNationalHoliday_02"
            ) {
              await dispatch(
                addNationalHolidayFail(
                  t("Admin_AdminServiceManager_AddCountryNationalHoliday_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryNationalHoliday_03"
            ) {
              await dispatch(
                addNationalHolidayFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryNationalHoliday_04"
            ) {
              await dispatch(addNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(addNationalHolidayFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addNationalHolidayFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addNationalHolidayFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// ADD NATIONAL HOLIDAY COUNTRY COUNTRY ADMIN MAIN API END

// DELETE NATIONAL HOLIDAY COUNTRY COUNTRY ADMIN MAIN API START
const deleteNationalHolidaySuccess = (response, message) => {
  return {
    type: actions.DELETE_NATIONAL_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteNationalHolidayFail = (message) => {
  return {
    type: actions.DELETE_NATIONAL_HOLIDAY_FAIL,
    message: message,
  };
};

const deleteNationalHolidayMainApi = (t, navigate, loadingFlag, deleteData) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteCountryNationalHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(deleteData));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              deleteNationalHolidayMainApi(t, navigate, loadingFlag, deleteData)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryNationalHoliday_01"
            ) {
              await dispatch(
                deleteNationalHolidaySuccess(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_DeleteCountryNationalHoliday_01")
                )
              );
              await dispatch(
                getNationalHolidayMainApi(t, navigate, loadingFlag)
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryNationalHoliday_02"
            ) {
              await dispatch(
                deleteNationalHolidayFail(
                  t("Admin_AdminServiceManager_DeleteCountryNationalHoliday_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryNationalHoliday_03"
            ) {
              await dispatch(
                deleteNationalHolidayFail(
                  t("Admin_AdminServiceManager_DeleteCountryNationalHoliday_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryNationalHoliday_04"
            ) {
              await dispatch(
                deleteNationalHolidayFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryNationalHoliday_05"
            ) {
              dispatch(deleteNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteNationalHolidayFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              deleteNationalHolidayFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteNationalHolidayFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteNationalHolidayFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// DELETE NATIONAL HOLIDAY COUNTRY COUNTRY ADMIN MAIN API END

// ===================================COUNTRY ADMIN END==========================================//

//GET APPOINTMENT REPORT BRANCH

const getAppointmentBranchReportSuccess = (response, message) => {
  return {
    type: actions.GET_APPOINTMENT_BRANCH_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};

const getAppointmentBranchReportFail = (message) => {
  return {
    type: actions.GET_APPOINTMENT_BRANCH_REPORT_FAIL,
    message: message,
  };
};

const getAppointmentReportBranchAPI = (data, t, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAppointmentBranchReport.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAppointmentReportBranchAPI(data, t, navigate, loadingFlag)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_01"
            ) {
              await dispatch(
                getAppointmentBranchReportSuccess(
                  response.data.responseResult.appointmentList,
                  t(
                    "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_01"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_02"
            ) {
              await dispatch(
                getAppointmentBranchReportFail(
                  t(
                    "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_02"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAppointmentReportBranchAdmin_03"
            ) {
              await dispatch(
                getAppointmentBranchReportFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(
                getAppointmentBranchReportFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getAppointmentBranchReportFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getAppointmentBranchReportFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAppointmentBranchReportFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// Get country working days in country admin main api start
const getWorkingDaysSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTRY_WORKING_DAYS_SUCCESS,
    response: response,
    message: message,
  };
};

const getWorkingDaysFail = (message) => {
  return {
    type: actions.GET_COUNTRY_WORKING_DAYS_FAIL,
    message: message,
  };
};

const getCountryWorkingDaysApi = (t, navigate, loadingFlag) => {
  let data = { CountryID: Number(localStorage.getItem("countryID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCountryWorkingDays.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getCountryWorkingDaysApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryWorkingDays_01"
            ) {
              await dispatch(
                getWorkingDaysSuccess(
                  response.data.responseResult.countryWorkingDaylist,
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryWorkingDays_02"
            ) {
              await dispatch(
                getWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryWorkingDays_03"
            ) {
              await dispatch(
                getWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryWorkingDays_04"
            ) {
              await dispatch(
                getWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryWorkingDays_05"
            ) {
              await dispatch(getWorkingDaysFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getWorkingDaysFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getWorkingDaysFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getWorkingDaysFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getWorkingDaysFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// Get country working days in country admin main api End

// Update country working days in country admin main api start
const updateWorkingDaysSuccess = (response, message) => {
  return {
    type: actions.UPDATE_COUNTRY_WORKING_DAYS_SUCCESS,
    response: response,
    message: message,
  };
};

const updateWorkingDaysFail = (message) => {
  return {
    type: actions.UPDATE_COUNTRY_WORKING_DAYS_FAIL,
    message: message,
  };
};
const updateWorkingDaysApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCountryWorkingDays.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(updateWorkingDaysApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_01"
            ) {
              await dispatch(
                updateWorkingDaysSuccess(
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_01")
                )
              );
              dispatch(getCountryWorkingDaysApi(t, navigate, loadingFlag));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_02"
            ) {
              await dispatch(
                updateWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_03"
            ) {
              await dispatch(
                updateWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryWorkingDays_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_04"
            ) {
              await dispatch(
                updateWorkingDaysFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryWorkingDays_05"
            ) {
              await dispatch(updateWorkingDaysFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateWorkingDaysFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateWorkingDaysFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateWorkingDaysFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateWorkingDaysFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// Get Country Cities CITY using in drope down of city in employess API
const getCountryCitiesApiSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTRY_CITIES_API_SUCCESS,
    response: response,
    message: message,
  };
};

const getCountryCitiesApiFail = (message) => {
  return {
    type: actions.GET_COUNTRY_CITIES_API_FAIL,
    message: message,
  };
};

// apiCallFlag on which page and from which route its call so we call api on that responce
// cityID is calling for that we pass it in request from city page to route it into employes
const getCountryCitiesApi = (t, navigate, loadingFlag, apiCallFlag, cityID) => {
  let data = {};
  if (cityID !== undefined && cityID !== null) {
    data = { CountryID: Number(cityID) };
  } else {
    data = { CountryID: Number(localStorage.getItem("countryID")) };
  }
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCountryCities.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getCountryCitiesApi(t, navigate, loadingFlag, apiCallFlag, cityID)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryCities_01"
            ) {
              await dispatch(
                getCountryCitiesApiSuccess(
                  response.data.responseResult,
                  t("Admin_AdminServiceManager_GetCountryCities_01")
                )
              );
              if (apiCallFlag === 2) {
                await dispatch(
                  getCityEmployeeMainApi(
                    t,
                    navigate,
                    loadingFlag,
                    response.data.responseResult?.cities[0]?.cityID
                  )
                );
              } else if (apiCallFlag === 3) {
                await dispatch(
                  getCityEmployeeMainApi(t, navigate, loadingFlag, cityID)
                );
              } else if (apiCallFlag === 1) {
                await dispatch(loader_Actions(false));
              }
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryCities_02"
            ) {
              await dispatch(
                getCountryCitiesApiFail(
                  t("Admin_AdminServiceManager_GetCountryCities_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryCities_03"
            ) {
              await dispatch(
                getCountryCitiesApiFail(
                  t("Admin_AdminServiceManager_GetCountryCities_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryCities_04"
            ) {
              await dispatch(
                getCountryCitiesApiFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryCities_05"
            ) {
              await dispatch(
                getCountryCitiesApiFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getCountryCitiesApiFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getCountryCitiesApiFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCountryCitiesApiFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCountryCitiesApiFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// Update country working days in country admin main api End

// add country admin in country admin main page
const addCountryAdminSuccess = (response, message) => {
  return {
    type: actions.ADD_COUNTRY_ADMIN_SUCCESS,
    response: response,
    message: message,
  };
};

const addCountryAdminFail = (message) => {
  return {
    type: actions.ADD_COUNTRY_ADMIN_FAIL,
    message: message,
  };
};

const addCountryAdminMainApi = (t, navigate, loadingFlag, Data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addCountryCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addCountryAdminMainApi(t, navigate, loadingFlag, Data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryCity_01"
            ) {
              setState({
                CountryID: Number(localStorage.getItem("countryID")),
                CityNameEnglish: "",
                CityNameArabic: "",
                CityID: 0,
                IsCityActive: false,
              });
              await dispatch(
                addCountryAdminSuccess(
                  response.data.responseResult.city,
                  t("Admin_AdminServiceManager_AddCountryCity_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryCity_02"
            ) {
              await dispatch(
                addCountryAdminFail(
                  t("Admin_AdminServiceManager_AddCountryCity_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryCity_03"
            ) {
              await dispatch(
                addCountryAdminFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountryCity_04"
            ) {
              await dispatch(addCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addCountryAdminFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addCountryAdminFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addCountryAdminFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addCountryAdminFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// add country admin main end

//update country Admin Main page Start
const updateCountryAdminSuccess = (response, message) => {
  return {
    type: actions.UPDATE_COUNTRY_ADMIN_SUCCESS,
    response: response,
    message: message,
  };
};

const updateCountryAdminFail = (message) => {
  return {
    type: actions.UPDATE_COUNTRY_ADMIN_FAIL,
    message: message,
  };
};

const updateCountryAdminMainApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCountryCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              updateCountryAdminMainApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setState,
                setCheckFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_01"
            ) {
              setState({
                CountryID: Number(localStorage.getItem("countryID")),
                CityNameEnglish: "",
                CityNameArabic: "",
                CityID: 0,
                IsCityActive: false,
              });
              setCheckFlag(false);
              await dispatch(
                updateCountryAdminSuccess(
                  response.data.responseResult.city,
                  t("Admin_AdminServiceManager_UpdateCountryCity_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_02"
            ) {
              await dispatch(
                updateCountryAdminFail(
                  t("Admin_AdminServiceManager_UpdateCountryCity_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_03"
            ) {
              await dispatch(
                updateCountryAdminFail(
                  t("Admin_AdminServiceManager_UpdateCountryCity_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_04"
            ) {
              await dispatch(
                updateCountryAdminFail(
                  t("Admin_AdminServiceManager_UpdateCountryCity_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_05"
            ) {
              await dispatch(
                updateCountryAdminFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryCity_06"
            ) {
              dispatch(updateCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateCountryAdminFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateCountryAdminFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCountryAdminFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//Update country Admin Main page End

// Delete country admin main start
const deleteCountryAdminSuccess = (response, message) => {
  return {
    type: actions.DELETE_BRANCH_SHIFT_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteCountryAdminFail = (message) => {
  return {
    type: actions.DELETE_BRANCH_SHIFT_FAIL,
    message: message,
  };
};

const deleteCountryAdminApiMain = (
  t,
  navigate,
  loadingFlag,
  data,
  setDeleteCountryModal
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteCountryCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              deleteCountryAdminApiMain(
                t,
                navigate,
                loadingFlag,
                data,
                setDeleteCountryModal
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_01"
            ) {
              setDeleteCountryModal(false);
              await dispatch(
                deleteCountryAdminSuccess(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_DeleteCountryCity_01")
                )
              );
              await dispatch(getCountryCitiesApi(t, navigate, loadingFlag));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_02"
            ) {
              await dispatch(
                deleteCountryAdminFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_03"
            ) {
              await dispatch(
                deleteCountryAdminFail(
                  t("Admin_AdminServiceManager_DeleteCountryCity_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_04"
            ) {
              await dispatch(
                deleteCountryAdminFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_05"
            ) {
              dispatch(deleteCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountryCity_06"
            ) {
              await dispatch(
                deleteCountryAdminFail(
                  t("Admin_AdminServiceManager_DeleteCountryCity_06")
                )
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteCountryAdminFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(deleteCountryAdminFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteCountryAdminFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteCountryAdminFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// Delete country admin main end

//Get country service list api start

const getCountryServiceSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTRY_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const getCountryServiceFail = (message) => {
  return {
    type: actions.GET_COUNTRY_SERVICE_FAIL,
    message: message,
  };
};

const getCountryServiceMainApi = (t, navigate, loadingFlag) => {
  let data = { CountryID: Number(localStorage.getItem("countryID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCountryServiceScreen.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getCountryServiceMainApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryServiceList_01"
            ) {
              await dispatch(
                getCountryServiceSuccess(
                  response.data.responseResult.countryServices,
                  t("Admin_AdminServiceManager_GetCountryServiceList_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryServiceList_02"
            ) {
              await dispatch(
                getCountryServiceFail(
                  t("Admin_AdminServiceManager_GetCountryServiceList_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryServiceList_03"
            ) {
              await dispatch(
                getCountryServiceFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryServiceList_04"
            ) {
              await dispatch(getCountryServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getCountryServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getCountryServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCountryServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCountryServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Get country service list api end

//Update country service list api start
const updateCountryServiceSuccess = (response, message) => {
  return {
    type: actions.UPDATE_COUNTRY_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const updateCountryServiceFail = (message) => {
  return {
    type: actions.UPDATE_COUNTRY_SERVICE_FAIL,
    message: message,
  };
};

const updateCountryServiceMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCountryServiceScreen.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              updateCountryServiceMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryServicesList_01"
            ) {
              await dispatch(
                updateCountryServiceSuccess(
                  t("Admin_AdminServiceManager_UpdateCountryServicesList_01")
                )
              );
              await dispatch(
                getCountryServiceMainApi(t, navigate, loadingFlag)
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryServicesList_02"
            ) {
              await dispatch(
                updateCountryServiceFail(
                  t("Admin_AdminServiceManager_UpdateCityServiceList_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryServicesList_03"
            ) {
              await dispatch(
                updateCountryServiceFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountryServicesList_04"
            ) {
              await dispatch(
                updateCountryServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                updateCountryServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateCountryServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateCountryServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCountryServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//Update country service list api end

// get all branch service of city api start
const getAllBranchServiceSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCH_SERVICE_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllBranchServiceFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCH_SERVICE_CITY_FAIL,
    message: message,
  };
};

const getAllBranchServiceMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllBranchServiceCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAllBranchServiceMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_01"
            ) {
              await dispatch(
                getAllBranchServiceSuccess(
                  response.data.responseResult.cityBranchServiceList,
                  t("Admin_AdminServiceManager_GetAllBranchServiceOfCity_01")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_02"
            ) {
              await dispatch(
                getAllBranchServiceFail(
                  t("Admin_AdminServiceManager_GetAllBranchServiceOfCity_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_03"
            ) {
              await dispatch(
                getAllBranchServiceFail(
                  t("Admin_AdminServiceManager_GetAllBranchServiceOfCity_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_04"
            ) {
              await dispatch(
                getAllBranchServiceFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_05"
            ) {
              await dispatch(
                getAllBranchServiceFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchServiceOfCity_06"
            ) {
              await dispatch(
                getAllBranchServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllBranchServiceFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllBranchServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllBranchServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllBranchServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// get all branch service of city api end

//get all branch shift services of city api start
const getAllBranchShiftSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCH_SHIFT_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllBranchShiftFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCH_SHIFT_CITY_FAIL,
    message: message,
  };
};

const getAllBranchSiftMainApi = (t, data, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllBranchShiftServiceCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getAllBranchSiftMainApi(t, data, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_01"
            ) {
              await dispatch(
                getAllBranchShiftSuccess(
                  response.data.responseResult,
                  t(
                    "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_01"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_02"
            ) {
              await dispatch(
                getAllBranchShiftSuccess(
                  response.data.responseResult,
                  t(
                    "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_02"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_03"
            ) {
              await dispatch(
                getAllBranchShiftFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_04"
            ) {
              await dispatch(
                getAllBranchShiftFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftServiceOfCity_05"
            ) {
              await dispatch(getAllBranchShiftFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getAllBranchShiftFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllBranchShiftFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllBranchShiftFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllBranchShiftFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//get all branch shift services of city api end

//get all branch shift Counter services of city api in country admin start
const getAllBranchCounterSucces = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCH_COUNTER_CITY_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllBranchCounterFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCH_COUNTER_CITY_FAIL,
    message: message,
  };
};

const getAllBranchCounterMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllBranchCounterServiceCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAllBranchCounterMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_01"
            ) {
              await dispatch(
                getAllBranchCounterFail(
                  t(
                    "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_02"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_02"
            ) {
              await dispatch(
                getAllBranchCounterSucces(
                  response.data.responseResult.bscModel,
                  t(
                    "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_01"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_03"
            ) {
              await dispatch(
                getAllBranchCounterFail(
                  t(
                    "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_03"
                  )
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_04"
            ) {
              await dispatch(
                getAllBranchCounterFail(
                  t("Admin_AdminServiceManager_UpdateCityBranch_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllBranchShiftCounterServiceOfCity_05"
            ) {
              await dispatch(
                getAllBranchCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllBranchCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllBranchCounterFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllBranchCounterFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllBranchCounterFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//get all branch shift Counter services of city api in country admin end

//get country List api in Global Admin Start
const getCountryListSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTRY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getCountryListFail = (message) => {
  return {
    type: actions.GET_COUNTRY_LIST_FAIL,
    message: message,
  };
};

const getCountryListMainApi = (t, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getCountryList.RequestMethod);
    // form.append("RequestData", JSON.stringify());
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getCountryListMainApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryList_01"
            ) {
              await dispatch(
                getCountryListSuccess(
                  response.data.responseResult.countries,
                  t("Admin_AdminServiceManager_GetCountryList_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryList_02"
            ) {
              await dispatch(
                getCountryListFail(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetCountryList_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetCountryList_03"
            ) {
              await dispatch(getCountryListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getCountryListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getCountryListFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getCountryListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getCountryListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//get country List api in Global Admin End

//add country List api in Global Admin Start
const addCountyListSuccess = (response, message) => {
  return {
    type: actions.ADD_COUNTRY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const addCountyListFail = (message) => {
  return {
    type: actions.ADD_COUNTRY_LIST_FAIL,
    message: message,
  };
};

const addCountryListMainApi = (t, navigate, loadingFlag, Data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addCountryList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              addCountryListMainApi(t, navigate, loadingFlag, Data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountry_01"
            ) {
              setState({
                CountryNameEnglish: "",
                CountryNameArabic: "",
                IsCountryActive: false,
              });
              await dispatch(
                addCountyListSuccess(
                  response.data.responseResult.country,
                  t("Admin_AdminServiceManager_AddCountry_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountry_02"
            ) {
              await dispatch(
                addCountyListFail(t("Admin_AdminServiceManager_AddCountry_02"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountry_03"
            ) {
              await dispatch(
                addCountyListFail(t("Admin_AdminServiceManager_AddCountry_03"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddCountry_04"
            ) {
              await dispatch(addCountyListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addCountyListFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addCountyListFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addCountyListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addCountyListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//add country List api in Global Admin End

//update country List api in Global Admin start
const updateCountryListSuccess = (response, message) => {
  return {
    type: actions.UPDATE_COUNTRY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const updateCountryListFail = (message) => {
  return {
    type: actions.UPDATE_COUNTRY_LIST_FAIL,
    message: message,
  };
};

const updateCountryListMainApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateCountryList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              updateCountryListMainApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setState,
                setCheckFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountry_01"
            ) {
              setState({
                CountryNameEnglish: "",
                CountryNameArabic: "",
                IsCountryActive: false,
                CountryID: Number(localStorage.getItem("countryID")),
              });
              setCheckFlag(false);
              await dispatch(
                updateCountryListSuccess(
                  response.data.responseResult.country,
                  t("Admin_AdminServiceManager_UpdateCountry_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountry_02"
            ) {
              await dispatch(
                updateCountryListFail(
                  t("Admin_AdminServiceManager_UpdateCountry_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountry_03"
            ) {
              await dispatch(
                updateCountryListFail(
                  t("Admin_AdminServiceManager_UpdateCountry_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateCountry_04"
            ) {
              dispatch(updateCountryListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateCountryListFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateCountryListFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateCountryListFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateCountryListFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// update country List api in Global Admin End

// delete country List api in Global Admin Start
const deleteCountryMainSuccess = (response, message) => {
  return {
    type: actions.DELETE_COUNTRY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteCountryMainFail = (message) => {
  return {
    type: actions.DELETE_COUNTRY_LIST_FAIL,
    message: message,
  };
};

const deleteCountryMainApi = (
  t,
  navigate,
  loadingFlag,
  data,
  setDeleteCountryModal
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteCountryList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              deleteCountryMainApi(
                t,
                navigate,
                loadingFlag,
                data,
                setDeleteCountryModal
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountry_01"
            ) {
              setDeleteCountryModal(false);
              await dispatch(
                deleteCountryMainSuccess(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_DeleteCountry_01")
                )
              );
              await dispatch(getCountryListMainApi(t, navigate, loadingFlag));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountry_02"
            ) {
              await dispatch(
                deleteCountryMainFail(
                  t("Admin_AdminServiceManager_DeleteCountry_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountry_03"
            ) {
              await dispatch(
                deleteCountryMainFail(
                  t("Admin_AdminServiceManager_GetCountryNationalHoliday_04")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteCountry_04"
            ) {
              dispatch(deleteCountryMainFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteCountryMainFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(deleteCountryMainFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteCountryMainFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteCountryMainFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// delete country List api in Global Admin End

// get Global Service List api in Global Admin Start
const getGlobalServiceSuccess = (response, message) => {
  return {
    type: actions.GET_GLOBAL_SERVICE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getGlobalServiceFail = (message) => {
  return {
    type: actions.GET_GLOBAL_SERVICE_LIST_FAIL,
    message: message,
  };
};

const getGlobalServiceMainApi = (t, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getGlobalServiceList.RequestMethod);
    // form.append("RequestData", JSON.stringify());
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetGlobalServiceList_01"
            ) {
              await dispatch(
                getGlobalServiceSuccess(
                  response.data.responseResult.servicesList,
                  t("Admin_AdminServiceManager_GetGlobalServiceList_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetGlobalServiceList_02"
            ) {
              await dispatch(
                getGlobalServiceFail(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetGlobalServiceList_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetGlobalServiceList_03"
            ) {
              await dispatch(getGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getGlobalServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getGlobalServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getGlobalServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// get Global Service List api in Global Admin End

// Add Global Service LIst api in Global Admin Start
const addGlobalServiceSuccess = (response, message) => {
  return {
    type: actions.ADD_GLOBAL_SERVICE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const addGlobalServiceFail = (message) => {
  return {
    type: actions.ADD_GLOBAL_SERVICE_LIST_FAIL,
    message: message,
  };
};

const addGlobalServiceMainApi = (t, navigate, loadingFlag, Data, setState) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", addGlobalServiceList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              addGlobalServiceMainApi(t, navigate, loadingFlag, Data, setState)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddGlobalService_01"
            ) {
              setState({
                ServiceNameEnglish: "",
                ServiceNameArabic: "",
                IsServiceActive: false,
              });
              await dispatch(
                addGlobalServiceSuccess(
                  response.data.responseResult.serviceObject,
                  t("Admin_AdminServiceManager_AddGlobalService_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddGlobalService_02"
            ) {
              await dispatch(
                addGlobalServiceFail(
                  t("Admin_AdminServiceManager_AddGlobalService_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddGlobalService_03"
            ) {
              await dispatch(
                addGlobalServiceFail(
                  t("Admin_AdminServiceManager_AddGlobalService_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddGlobalService_04"
            ) {
              await dispatch(addGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(addGlobalServiceFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(addGlobalServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(addGlobalServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(addGlobalServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// Add Global Service LIst api in Global Admin End

// Update Global Service LIst api in Global Admin Start
const updateGlobalServiceSuccess = (response, message) => {
  return {
    type: actions.UPDATE_GLOBAL_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const updateGlobalServiceFail = (message) => {
  return {
    type: actions.UPDATE_GLOBAL_SERVICE_FAIL,
    message: message,
  };
};

const updateGlobalServiceMainApi = (
  t,
  navigate,
  loadingFlag,
  Data,
  setState,
  setCheckFlag
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateGlobalServiceList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              updateGlobalServiceMainApi(
                t,
                navigate,
                loadingFlag,
                Data,
                setState,
                setCheckFlag
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateGlobalService_01"
            ) {
              await setState({
                ServiceNameEnglish: "",
                ServiceNameArabic: "",
                IsServiceActive: false,
                ServiceID: 0,
              });
              await setCheckFlag(false);
              await dispatch(
                updateGlobalServiceSuccess(
                  response.data.responseResult.serviceObject,
                  t("Admin_AdminServiceManager_UpdateGlobalService_01")
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateGlobalService_02"
            ) {
              await dispatch(
                updateGlobalServiceFail(
                  t("Admin_AdminServiceManager_UpdateGlobalService_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateGlobalService_03"
            ) {
              await dispatch(
                updateGlobalServiceFail(
                  t("Admin_AdminServiceManager_UpdateGlobalService_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateGlobalService_04"
            ) {
              dispatch(updateGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(updateGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(updateGlobalServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateGlobalServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateGlobalServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
// Update Global Service LIst api in Global Admin End

//Delete Global Service List api in Global Admin Start
const deleteGlobalServiceSuccess = (response, message) => {
  return {
    type: actions.DELETE_GLOBAL_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteGlobalServiceFail = (message) => {
  return {
    type: actions.DELETE_GLOBAL_SERVICE_FAIL,
    message: message,
  };
};

const deleteGlobalServiceMainApi = (
  t,
  navigate,
  loadingFlag,
  data,
  setGlobalModal
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", deleteGlobalServiceList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              deleteGlobalServiceMainApi(
                t,
                navigate,
                loadingFlag,
                data,
                setGlobalModal
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteGlobalService_01"
            ) {
              setGlobalModal(false);
              await dispatch(
                deleteGlobalServiceSuccess(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_DeleteGlobalService_01")
                )
              );
              await dispatch(getGlobalServiceMainApi(t, navigate, loadingFlag));
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteGlobalService_02"
            ) {
              await dispatch(
                deleteGlobalServiceFail(
                  t("Admin_AdminServiceManager_DeleteGlobalService_02")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteGlobalService_03"
            ) {
              await dispatch(
                deleteGlobalServiceFail(
                  t("Admin_AdminServiceManager_DeleteGlobalService_03")
                )
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteGlobalService_04"
            ) {
              dispatch(deleteGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              dispatch(deleteGlobalServiceFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(deleteGlobalServiceFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(deleteGlobalServiceFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(deleteGlobalServiceFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//Delete Global Service List api in Global Admin End

//Get All Employee List api in Global Admin Start
const getAllEmployeeSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_EMPLOYEE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllEmployeeFail = (message) => {
  return {
    type: actions.GET_ALL_EMPLOYEE_LIST_FAIL,
    message: message,
  };
};

const getAllEmployeeMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllEmployeeList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getAllEmployeeMainApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllEmployeeList_01"
            ) {
              await dispatch(
                getAllEmployeeSuccess(
                  response.data.responseResult.employeeList,
                  t("Admin_AdminServiceManager_GetAllEmployeeList_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllEmployeeList_02"
            ) {
              await dispatch(
                getAllEmployeeFail(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetAllEmployeeList_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllEmployeeList_03"
            ) {
              await dispatch(getAllEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(getAllEmployeeFail(t("something_went_wrong")));
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllEmployeeFail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllEmployeeFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllEmployeeFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};
//Get All Employee List api in Global Admin End

//get All services of the cities
const getAllServicesCitySuccess = (response, message) => {
  return {
    type: actions.GET_ALL_SERVICES_OF_CITIES_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllServicesCityFailed = (message) => {
  return {
    type: actions.GET_ALL_SERVICES_OF_CITIES_FAIL,
    message: message,
  };
};

const getAllCityServicesMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllCityServices.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(getAllCityServicesMainApi(t, navigate, loadingFlag, data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityServices_01"
            ) {
              await dispatch(
                getAllServicesCitySuccess(
                  response.data.responseResult.cityServiceList,
                  t("Admin_AdminServiceManager_GetAllCityServices_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityServices_02"
            ) {
              await dispatch(
                getAllServicesCityFailed(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetAllCityServices_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityServices_03"
            ) {
              await dispatch(
                getAllServicesCityFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllServicesCityFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(getAllServicesCityFailed(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getAllServicesCityFailed(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllServicesCityFailed(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

//get All City Branch Wise Services

const getAllCityBranchWiseServicesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SERVICES_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllCityBranchWiseServicesFail = (message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SERVICES_FAIL,
    message: message,
  };
};

const getAllCityBranchWiseServicesMainApi = (
  t,
  navigate,
  loadingFlag,
  data
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getAllCityBranchWiseServices.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAllCityBranchWiseServicesMainApi(
                t,
                navigate,
                loadingFlag,
                data
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchServices_01"
            ) {
              await dispatch(
                getAllCityBranchWiseServicesSuccess(
                  response.data.responseResult.cityBranchServiceList,
                  t("Admin_AdminServiceManager_GetAllCityBranchServices_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchServices_02"
            ) {
              await dispatch(
                getAllCityBranchWiseServicesFail(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetAllCityBranchServices_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchServices_03"
            ) {
              await dispatch(
                getAllCityBranchWiseServicesFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllCityBranchWiseServicesFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getAllCityBranchWiseServicesFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getAllCityBranchWiseServicesFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllCityBranchWiseServicesFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// Get all Branch Shift Wise Service Availability

const getAllBranchShiftServicesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SHIFT_SERVICES_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllBranchShiftServicesFailed = (message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SHIFT_SERVICES_FAIL,
    message: message,
  };
};

const getAllBranchShiftWiseServicesMainApi = (
  t,
  navigate,
  loadingFlag,
  data
) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append(
      "RequestMethod",
      getAllCityBranchShiftWiseServices.RequestMethod
    );
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAllBranchShiftWiseServicesMainApi(
                t,
                navigate,
                loadingFlag,
                data
              )
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchShiftServices_01"
            ) {
              await dispatch(
                getAllBranchShiftServicesSuccess(
                  response.data.responseResult.cityBranchShiftServiceList,
                  t(
                    "Admin_AdminServiceManager_GetAllCityBranchShiftServices_01"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchShiftServices_02"
            ) {
              await dispatch(
                getAllBranchShiftServicesFailed(
                  response.data.responseResult.responseMessage,
                  t(
                    "Admin_AdminServiceManager_GetAllCityBranchShiftServices_02"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchServices_03"
            ) {
              await dispatch(
                getAllBranchShiftServicesFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllBranchShiftServicesFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getAllBranchShiftServicesFailed(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getAllBranchShiftServicesFailed(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllBranchShiftServicesFailed(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// get all branch shift counter services Api Start
const getAllBranchShiftCounterSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SHIFT_COUNTER_SERVICE_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllBranchShiftCounterFail = (message) => {
  return {
    type: actions.GET_ALL_CITY_BRANCH_SHIFT_COUNTER_SERVICE_FAIL,
    message: message,
  };
};

const getAllBranchShiftCounterMainApi = (t, navigate, loadingFlag, data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append(
      "RequestMethod",
      getAllCityBranchShiftCounterServices.RequestMethod
    );
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getAllBranchShiftCounterMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchShiftCounterServices_01"
            ) {
              await dispatch(
                getAllBranchShiftCounterSuccess(
                  response.data.responseResult
                    .countryWiseCityWiseBranchShiftServiceCounters,
                  t(
                    "Admin_AdminServiceManager_GetAllCityBranchShiftCounterServices_01"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchShiftCounterServices_02"
            ) {
              await dispatch(
                getAllBranchShiftCounterFail(
                  response.data.responseResult.responseMessage,
                  t(
                    "Admin_AdminServiceManager_GetAllCityBranchShiftCounterServices_02"
                  )
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetAllCityBranchShiftCounterServices_03"
            ) {
              await dispatch(
                getAllBranchShiftCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getAllBranchShiftCounterFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getAllBranchShiftCounterFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            getAllBranchShiftCounterFail(t("something_went_wrong"))
          );
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getAllBranchShiftCounterFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// get all branch shift counter services Api End

// get service wise country in service page in global admin start

const getServiceWiseCountrySuccess = (response, message) => {
  return {
    type: actions.GET_SERVICE_WISE_COUNTRY_SUCCESS,
    response: response,
    message: message,
  };
};

const getServiceWiseCountryFail = (message) => {
  return {
    type: actions.GET_SERVICE_WISE_COUNTRY_FAIL,
    message: message,
  };
};

const getServiceWiseCountryMainApi = (t, navigate, loadingFlag) => {
  let data = { ServiceID: Number(localStorage.getItem("serviceID")) };
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", getServiceWiseCountryList.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(
              getServiceWiseCountryMainApi(t, navigate, loadingFlag, data)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetServiceWiseCountryList_01"
            ) {
              await dispatch(
                getServiceWiseCountrySuccess(
                  response.data.responseResult.countryServices,
                  t("Admin_AdminServiceManager_GetServiceWiseCountryList_01")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetServiceWiseCountryList_02"
            ) {
              await dispatch(
                getServiceWiseCountryFail(
                  response.data.responseResult.responseMessage,
                  t("Admin_AdminServiceManager_GetServiceWiseCountryList_02")
                )
              );

              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetServiceWiseCountryList_03"
            ) {
              await dispatch(
                getServiceWiseCountryFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else {
              await dispatch(
                getServiceWiseCountryFail(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            }
          } else {
            await dispatch(
              getServiceWiseCountryFail(t("something_went_wrong"))
            );
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(getServiceWiseCountryFail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(getServiceWiseCountryFail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// get service wise country in service page in global admin End

export {
  clearResponseMessageAdmin,
  AdminCleareState,
  getSystemSupportedLanguage,
  getLastSelectedLanguage,
  setLastSelectedLanguage,
  getAllShiftsOfBranch,
  getAllCountersOfBranch,
  addBranchShiftApi,
  addBranchShiftFail,
  updateBranchShiftApi,
  updateBranchShiftFail,
  deleteBranchShiftApi,
  deleteBranchShiftFail,
  addBranchCounterApi,
  addBranchCountertFail,
  addBranchRoasterEntryApiFunction,
  getSingleBranchRoasterApiFunction,
  removingBranchEntryRoasterApiFunction,
  getBranchServicesApi,
  //Commented Because Using
  // updateBranchServicesApi,
  updateAllBranchServicesApi,
  updateBranchCounterApi,
  updateBranchCounterFail,
  deleteBranchCounterApi,
  deleteBranchCounterFail,
  // ===================================CITY ADMIN==========================================//
  getCityBranchListApi,
  addCityBranchApi,
  addCityBranchFail,
  deleteCityBranchApi,
  deleteCityBranchFail,
  updateCityBranchApi,
  updateCityBranchFail,
  getCityServiceListApi,
  updateCityServiceListApi,
  getCityBranchServiceListApi,
  //for icon click when data is null
  getCityBranchServiceFail,
  //for icon click when data is null
  getAllShiftsOfBranchFail,
  getAllShiftsOfBranchCleare,
  updateCityBranchServiceListApi,
  getBranchShiftCounterMainApi,
  getBranchShiftCounterClear,
  getCityEmployeeMainApi,
  getCityEmployeeClear,
  addCityEmployeeMainApi,
  updateExistingEmployeeMainApi,
  deleteExistingEmployeeMainApi,
  addEditFlagModal,
  getAppointmentReportCityAPI,
  // ===================================COUNTRY ADMIN START==========================================//
  getNationalHolidayMainApi,
  addNationalHolidayMainApi,
  deleteNationalHolidayMainApi,
  getAppointmentReportBranchAPI,
  getCountryWorkingDaysApi,
  updateWorkingDaysApi,
  getCountryCitiesApi,
  addCountryAdminMainApi,
  addCountryAdminFail,
  updateCountryAdminMainApi,
  updateCountryAdminFail,
  deleteCountryAdminApiMain,
  getCountryServiceMainApi,
  updateCountryServiceMainApi,
  getAllBranchServiceMainApi,
  getCityServiceListFail,
  getAllBranchSiftMainApi,
  getAllBranchCounterMainApi,
  // ===================================GLOBAL ADMIN START==========================================//
  getCountryListMainApi,
  addCountryListMainApi,
  addCountyListFail,
  updateCountryListMainApi,
  updateCountryListFail,
  deleteCountryMainApi,
  getGlobalServiceMainApi,
  addGlobalServiceMainApi,
  updateGlobalServiceMainApi,
  deleteGlobalServiceMainApi,
  addGlobalServiceFail,
  updateGlobalServiceFail,
  getAllEmployeeMainApi,
  getAllCityServicesMainApi,
  getAllCityBranchWiseServicesMainApi,
  getAllBranchShiftWiseServicesMainApi,
  getAllBranchShiftCounterMainApi,
  getServiceWiseCountryMainApi,
};

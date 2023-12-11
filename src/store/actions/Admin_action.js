import * as actions from "../action_types";
import axios from "axios";
import { loader_Actions } from "./Loader_action";
import {
  addBranchRoasterEntry,
  addBranchShift,
  allCountersOfBranch,
  allShiftsOfBranch,
  getSingleDayBranchRoaster,
  lastSelectedLanguage,
  removeBranchRoasterEntry,
  systemSupportedLanguage,
  token,
  updateLastSelectedLanguage,
  getBranchServices,
  updateBranchServices,
  updateBranchCounter,
  deleteBranchCounter,
} from "../../commen/apis/Api_config";
import { adminURL } from "../../commen/apis/Api_ends_points";
import moment from "moment";

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
              // await dispatch(loader_Actions(false));
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
              console.log("i18nextLng", data.SystemSupportedLanguageID === 2);
              console.log("i18nextLng", data.SystemSupportedLanguageID);
              setSelectedLanguage({
                languageTitle:
                  data.SystemSupportedLanguageID === 2 ? "عربى" : "English",
                systemSupportedLanguageID: data.SystemSupportedLanguageID,
                code: data.SystemSupportedLanguageID === 2 ? "ar" : "en",
              });
              const newLanguage =
                data.SystemSupportedLanguageID === 2 ? "ar" : "en";
              // Change the language using i18next instance directly
              setTimeout(() => {
                // window.location.reload()
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

const getAllShiftsOfBranch = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
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

const getAllCountersOfBranch = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
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

//Get All Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
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
        _token: token,
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
              "Admin_AdminServiceManager_AddBranchShift_01"
            ) {
              setState({
                ShiftNameEnglish: "",
                ShiftNameArabic: "",
                IsShiftActive: false,
                ShiftStartTime: "",
                ShiftEndTime: "",
                BranchID: 1,
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

// this is for cleare states
const RoasterClearingState = () => {
  return {
    type: actions.ROASTER_CLEARING_STATE,
  };
};

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
const addBranchRoasterEntryApiFunction = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              addBranchRoasterEntryApiFunction(t, navigate, loadingFlag)
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
                addBrandRoasterEntryFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_04"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_AddBranchRoasterEntry_05"
            ) {
              await dispatch(
                addBrandRoasterEntryFailed(t("something_went_wrong"))
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
const getSingleBranchRoasterApiFunction = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              getSingleBranchRoasterApiFunction(t, navigate, loadingFlag)
            );
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetSingleDayBranchRoaster_01"
            ) {
              await dispatch(
                getSingleBranchRoasterSuccess(
                  response.data.responseResult.counterModelList,
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
                getSingleBranchRoasterFailed(t("something_went_wrong"))
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
const removingBranchEntryRoasterApiFunction = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(
              removingBranchEntryRoasterApiFunction(t, navigate, loadingFlag)
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
                removeBranchEntryRoasterFailed(t("something_went_wrong"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_RemoveBranchRoasterEntry_04"
            ) {
              await dispatch(
                removeBranchEntryRoasterFailed(t("something_went_wrong"))
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

const GetBranchServices = (t, navigate, loadingFlag) => {
  let data = { BranchID: 1 };
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
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            // await dispatch(RefreshToken(navigate, t))
            dispatch(GetBranchServices(t, navigate, loadingFlag));
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

//Update Branch Services
const updateBranchServicesSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_SERVICES_SUCCESS,
    response: response,
    message: message,
  };
};

const updateBranchServicesFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_SERVICES_FAIL,
    message: message,
  };
};

const UpdateBranchServices = (Data, t, navigate, loadingFlag) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateBranchServices.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(UpdateBranchServices(Data, t, navigate, loadingFlag));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchServices_01"
            ) {
              await dispatch(
                updateBranchServicesSuccess(
                  response.data.responseResult.branchServiceModelList,
                  t("Admin_AdminServiceManager_UpdateBranchServices_01")
                )
              );
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchServices_02"
            ) {
              await dispatch(
                updateBranchServicesFail(
                  t("Admin_AdminServiceManager_UpdateBranchServices_02")
                )
              );
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchServices_03"
            ) {
              await dispatch(
                updateBranchServicesFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_GetBranchServices_04"
            ) {
              await dispatch(
                updateBranchServicesFail(t("something_went_wrong"))
              );
              // await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(updateBranchServicesFail(t("something_went_wrong")));
            // await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(updateBranchServicesFail(t("something_went_wrong")));
          // await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateBranchServicesFail(t("something_went_wrong")));
        // dispatch(loader_Actions(false));
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

const UpdateBranchCounterApi = (t, navigate, loadingFlag, Data) => {
  return async (dispatch) => {
    if (!loadingFlag) {
      dispatch(loader_Actions(true));
    }
    let form = new FormData();
    form.append("RequestMethod", updateBranchCounter.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: adminURL,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(UpdateBranchCounterApi(t, navigate, loadingFlag, Data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateBranchCounter_01"
            ) {
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
                  t("Admin_AdminServiceManager_UpdateBranchCounter_03")
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

const DeleteBranchCounterApi = (t, navigate, loadingFlag, Data) => {
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
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseCode === 417) {
            dispatch(DeleteBranchCounterApi(t, navigate, loadingFlag, Data));
          } else if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_DeleteBranchCounter_01"
            ) {
              await dispatch(
                deleteBranchCounterSuccess(
                  response.data.responseResult.deletedCounterID,
                  t("Admin_AdminServiceManager_DeleteBranchCounter_01")
                )
              );
              await dispatch(loader_Actions(false));
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
                  t("Admin_AdminServiceManager_DeleteBranchCounter_03")
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

export {
  AdminCleareState,
  getSystemSupportedLanguage,
  getLastSelectedLanguage,
  setLastSelectedLanguage,
  getAllShiftsOfBranch,
  getAllCountersOfBranch,
  addBranchShiftApi,
  addBranchShiftFail,
  RoasterClearingState,
  addBranchRoasterEntryApiFunction,
  getSingleBranchRoasterApiFunction,
  removingBranchEntryRoasterApiFunction,
  GetBranchServices,
  UpdateBranchServices,
  UpdateBranchCounterApi,
  DeleteBranchCounterApi,
};

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
  getCityBranchList,
  addCityBranch,
  deleteCityBranch,
  updateCityBranch,
} from "../../commen/apis/Api_config";
import { adminURL } from "../../commen/apis/Api_ends_points";
import moment from "moment";
let token = JSON.parse(localStorage.getItem("token"));

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
              console.log("i18nextLng", data.SystemSupportedLanguageID === 2);
              console.log("i18nextLng", data.SystemSupportedLanguageID);
              setSelectedLanguage({
                languageTitle:
                  data.SystemSupportedLanguageID === 2 ? "Ø¹Ø±Ø¨Ù‰" : "English",
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
  let data = { BranchID: Number(localStorage.getItem("branchID")) };
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
  let data = { BranchID: Number(localStorage.getItem("branchID")) };
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
        _token: token,
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
        _token: token,
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
        _token: token,
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
            } else {
              dispatch(deleteBranchShiftFail(t("something_went_wrong")));
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
        _token: token,
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
        _token: token,
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
        _token: token,
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
        _token: token,
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
        _token: token,
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
//         _token: token,
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
        _token: token,
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
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_02"
            ) {
              await dispatch(
                updateAllBranchServicesFail(
                  t("Admin_AdminServiceManager_UpdateBranchServices_02")
                )
              );
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_03"
            ) {
              await dispatch(
                updateAllBranchServicesFail(
                  t("Admin_AdminServiceManager_GetBranchServices_03")
                )
              );
              // await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "Admin_AdminServiceManager_UpdateAllBranchServices_04"
            ) {
              await dispatch(
                updateAllBranchServicesFail(t("something_went_wrong"))
              );
              // await dispatch(loader_Actions(false));
            } else {
              dispatch(getLastSelectedLanguageFail(t("something_went_wrong")));
            }
          } else {
            await dispatch(
              updateAllBranchServicesFail(t("something_went_wrong"))
            );
            // await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(
            updateAllBranchServicesFail(t("something_went_wrong"))
          );
          // await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(updateAllBranchServicesFail(t("something_went_wrong")));
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
        _token: token,
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
        _token: token,
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

const getCityBranchListApi = (t, navigate, loadingFlag) => {
  let data = { CityID: Number(localStorage.getItem("cityID")) };
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
        _token: token,
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
        _token: token,
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
        _token: token,
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
        _token: token,
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

export {
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
};

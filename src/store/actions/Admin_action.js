import * as actions from "../action_types";
import axios from "axios";
import { loader_Actions } from "./Loader";
import {
  lastSelectedLanguage,
  systemSupportedLanguage,
  updateLastSelectedLanguage,
} from "../../commen/apis/Api_config";
import { adminURL } from "../../commen/apis/Api_ends_points";

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
const getSystemSupportedLanguage = (t, navigate, route) => {
  return (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", systemSupportedLanguage.RequestMethod);
    axios({
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
                  t("Admin_AdminServiceManager_GetSystemSupportedLanguage_01")
                )
              );
              //   this check is for which routes its comming from
              if (route === "login") {
              } else if (route === "forgetPassword") {
              } else {
              }
              await dispatch(loader_Actions(false));
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

const getLastSelectedLanguage = (t, navigate) => {
  return (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", lastSelectedLanguage.RequestMethod);
    axios({
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

const setLastSelectedLanguage = (t, navigate, data) => {
  return (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", updateLastSelectedLanguage.RequestMethod);
    form.append("RequestData", JSON.stringify(data));

    axios({
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

export {
  AdminCleareState,
  getSystemSupportedLanguage,
  getLastSelectedLanguage,
  setLastSelectedLanguage,
};

import * as actions from "../action_types";
import axios from "axios";
import { loader_Actions } from "./Loader_action";
import { logIn } from "../../commen/apis/Api_config";
import { authURL } from "../../commen/apis/Api_ends_points";
import { getLastSelectedLanguage } from "./Admin_action";
let token = JSON.parse(localStorage.getItem("token"));

// for Log In APi
const loginsuccess = (response, message) => {
  return {
    type: actions.LOG_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const loginfail = (message) => {
  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const setLogIn = (t, navigate, data, i18n) => {
  return (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", logIn.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: authURL,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_01"
            ) {
              await dispatch(
                loginfail(t("ERM_AuthService_AuthManager_Login_01"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_02"
            ) {
              await dispatch(
                loginfail(t("ERM_AuthService_AuthManager_Login_02"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_03"
            ) {
              await localStorage.setItem(
                "userID",
                response.data.responseResult.userID
              );
              await localStorage.setItem(
                "name",
                response.data.responseResult.name
              );
              await localStorage.setItem(
                "nameArabic",
                response.data.responseResult.nameArabic
              );
              await localStorage.setItem(
                "loginID",
                response.data.responseResult.loginID
              );
              await localStorage.setItem(
                "roleID",
                response.data.responseResult.roleID
              );
              await localStorage.setItem(
                "token",
                JSON.stringify(response.data.responseResult.token)
              );

              await localStorage.setItem(
                "refreshToken",
                JSON.stringify(response.data.responseResult.refreshToken)
              );
              await localStorage.setItem(
                "loginID",
                response.data.responseResult.loginID
              );
              await localStorage.setItem(
                "isFirstLogIn",
                response.data.responseResult.isFirstLogIn
              );
              await localStorage.setItem(
                "countryID",
                response.data.responseResult.countryID
              );
              await localStorage.setItem(
                "cityID",
                response.data.responseResult.cityID
              );
              await localStorage.setItem(
                "branchID",
                response.data.responseResult.branchID
              );
              await localStorage.setItem(
                "cityName",
                response.data.responseResult.cityName
              );
              await localStorage.setItem(
                "cityNameArabic",
                response.data.responseResult.cityNameArabic
              );
              await localStorage.setItem(
                "countryName",
                response.data.responseResult.countryName
              );
              await localStorage.setItem(
                "countryNameArabic",
                response.data.responseResult.countryNameArabic
              );
              await localStorage.setItem(
                "branchName",
                response.data.responseResult.branchName
              );
              await localStorage.setItem(
                "branchNameArabic",
                response.data.responseResult.branchNameArabic
              );
              let i18nextLngFlag = localStorage.getItem("i18nextLngFlag");
              let data = {
                UserID: Number(response.data.responseResult.userID),
              };

              if (response.data.responseResult.roleID === 1) {
                if (i18nextLngFlag !== null && i18nextLngFlag !== undefined) {
                } else {
                  await dispatch(
                    getLastSelectedLanguage(t, i18n, navigate, data)
                  );
                }
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                await navigate("/GlobalAdmin/");
                // await dispatch(loader_Actions(false));
              } else if (response.data.responseResult.roleID === 2) {
                if (i18nextLngFlag !== null && i18nextLngFlag !== undefined) {
                } else {
                  await dispatch(
                    getLastSelectedLanguage(t, i18n, navigate, data)
                  );
                }
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                await navigate("/CountryAdmin/");
                // await dispatch(loader_Actions(false));
              } else if (response.data.responseResult.roleID === 3) {
                if (i18nextLngFlag !== null && i18nextLngFlag !== undefined) {
                } else {
                  await dispatch(
                    getLastSelectedLanguage(t, i18n, navigate, data)
                  );
                }
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                await localStorage.setItem("selectedKeys", "5");

                await navigate("/CityAdmin/");
                // await dispatch(loader_Actions(false));
              } else if (response.data.responseResult.roleID === 4) {
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                if (i18nextLngFlag !== null && i18nextLngFlag !== undefined) {
                } else {
                  await dispatch(
                    getLastSelectedLanguage(t, i18n, navigate, data)
                  );
                }
                await localStorage.setItem("selectedKeys", ["2"]);
                await navigate("/BranchAdmin/");
                // await dispatch(loader_Actions(false));
              } else if (response.data.responseResult.roleID === 5) {
                if (i18nextLngFlag !== null && i18nextLngFlag !== undefined) {
                } else {
                  await dispatch(
                    getLastSelectedLanguage(t, i18n, navigate, data)
                  );
                }
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                // await navigate("/BranchAdmin/");
                // await dispatch(loader_Actions(false));
              } else {
                await dispatch(
                  loginfail(t("ERM_AuthService_AuthManager_Login_04"))
                );
              }
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_04"
            ) {
              await dispatch(
                loginfail(t("ERM_AuthService_AuthManager_Login_04"))
              );
              await dispatch(loader_Actions(false));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_05"
            ) {
              await dispatch(
                loginfail(t("ERM_AuthService_AuthManager_Login_05"))
              );
              await dispatch(loader_Actions(false));
            } else {
              dispatch(loginfail(t("something_went_wrong")));
            }
          } else {
            await dispatch(loginfail(t("something_went_wrong")));
            await dispatch(loader_Actions(false));
          }
        } else {
          await dispatch(loginfail(t("something_went_wrong")));
          await dispatch(loader_Actions(false));
        }
      })
      .catch((response) => {
        dispatch(loginfail(t("something_went_wrong")));
        dispatch(loader_Actions(false));
      });
  };
};

// for sign out
const signOut = (navigate, message) => {
  let i18nextLng = localStorage.getItem("i18nextLng");
  localStorage.clear();
  localStorage.setItem("i18nextLng", i18nextLng);
  navigate("/");
  return {
    type: actions.SIGN_OUT,
    message: message,
  };
};

// For Auth State Cleare
const authCleareState = () => {
  return {
    type: actions.AUTH_CLEARE_STATE,
  };
};

export { setLogIn, signOut, authCleareState };

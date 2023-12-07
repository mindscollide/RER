import * as actions from "../action_types";
import axios from "axios";
import { loader_Actions } from "./Loader";
import { logIn } from "../../commen/apis/Api_config";
import { authURL } from "../../commen/apis/Api_ends_points";

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

const setLogIn = (t, navigate, UserData) => {
  let Data = {
    UserName: UserData.UserName,
    Password: UserData.Password,
    DeviceID: "1",
    Device: "browser",
  };
  return (dispatch) => {
    dispatch(loader_Actions(true));
    let form = new FormData();
    form.append("RequestMethod", logIn.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
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
                "firstName",
                response.data.responseResult.firstName
              );
              await localStorage.setItem(
                "lastName",
                response.data.responseResult.lastName
              );
              await localStorage.setItem(
                "userName",
                response.data.responseResult.userName
              );
              await localStorage.setItem(
                "roleID",
                response.data.responseResult.roleID
              );
              await localStorage.setItem(
                "token",
                response.data.responseResult.token
              );

              await localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken
              );
              if (response.data.responseResult.roleID === 2) {
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                await navigate("/REM/");
                await dispatch(loader_Actions(false));
              } else if (response.data.responseResult.roleID === 4) {
                await dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    t("ERM_AuthService_AuthManager_Login_03")
                  )
                );
                await navigate("/AdminDashboard/");
                await dispatch(loader_Actions(false));
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
  localStorage.clear();
  navigate("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

// For Auth State Cleare
const authCleareState = () => {
  return {
    type: actions.AUTH_CLEARE_STATE,
  };
};

export { setLogIn, signOut, authCleareState };
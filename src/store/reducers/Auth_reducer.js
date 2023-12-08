import * as actions from "../action_types";

const initialState = {
  userDetails: null,
  auth_ResponseMessage: null,
  roles: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // For login
    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        userDetails: action.response,
        auth_ResponseMessage: action.message,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        userDetails: null,
        auth_ResponseMessage: action.message,
      };

    // For Sign Out
    case actions.SIGN_OUT:
      return {
        ...state,
        userDetails: null,
        auth_ResponseMessage: action.message,
      };

    // For Cleare State
    case actions.AUTH_CLEARE_STATE:
      return {
        ...state,
        auth_ResponseMessage: null,
      };

    default:
      return { ...state };
  }
};

export default authReducer;

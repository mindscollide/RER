import * as actions from "../action_types";

const initialState = {
  supportedLanguage: null,
  supportedLanguageSelected: null,
  admin_ResponseMessage: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // For Admin Cleare State
    case actions.ADMIN_CLEARE_STATE:
      return {
        ...state,
        admin_ResponseMessage: null,
      };

    //Get System Supported Language Api
    case actions.GET_SYSTEM_SUPPORTED_LANGUAGE_SUCCESS:
      return {
        ...state,
        supportedLanguage: action.responce,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_SYSTEM_SUPPORTED_LANGUAGE_FAIL:
      return {
        ...state,
        supportedLanguage: null,
        admin_ResponseMessage: action.message,
      };

    //GET LAST SELECTED Language Api
    case actions.GET_LAST_SELECTED_LANGUAGE_SUCCESS:
      return {
        ...state,
        supportedLanguageSelected: action.responce,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_LAST_SELECTED_LANGUAGE_FAIL:
      return {
        ...state,
        supportedLanguageSelected: null,
        admin_ResponseMessage: action.message,
      };

    //Set System Supported Language Api
    case actions.SET_LAST_SELECTED_LANGUAGE_SUCCESS:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    case actions.SET_LAST_SELECTED_LANGUAGE_FAIL:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default adminReducer;

import * as actions from "../action_types";

const initialState = {
  supportedLanguage: null,
  supportedLanguageSelected: null,
  admin_ResponseMessage: null,
  branchesList: null,
  allCountersOfBranchList: null,
  addBranchShiftData:null
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
        supportedLanguage: action.response,
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
        supportedLanguageSelected: action.response,
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

    //Get All Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
    case actions.GET_ALL_SHIFTS_OF_BRANCH_SUCCESS:
      return {
        ...state,
        branchesList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_SHIFTS_OF_BRANCH_FAIL:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    //for ALL COUNTERS OF BRANCH Api fot(CounterMain for listing of all branches && Branch Roaster for Counter drop down)
    case actions.ALL_COUNTERS_OF_BRANCH_SUCCESS:
      return {
        ...state,
        allCountersOfBranchList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ALL_COUNTERS_OF_BRANCH_FAIL:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    //for ALL COUNTERS OF BRANCH Api fot(CounterMain for listing of all branches && Branch Roaster for Counter drop down)
    case actions.ADD_BRANCH_SHIFT_SUCCESS:
      return {
        ...state,
        addBranchShiftData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_SHIFT_FAIL:
      return {
        ...state,
        addBranchShiftData:null,
        admin_ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default adminReducer;

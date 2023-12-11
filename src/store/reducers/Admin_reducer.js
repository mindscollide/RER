import * as actions from "../action_types";

const initialState = {
  supportedLanguage: null,
  supportedLanguageSelected: null,
  admin_ResponseMessage: null,
  branchesList: null,
  allCountersOfBranchList: null,
  addBranchShiftData: null,
  roasterList: [],
  singleDayRoaster: [],
  removeRoasterEntryBranch: [],
  branchServicesData: null,
  branchServicesUpdatedData: null,
  updateBranchCounterData: null,
  deleteBranchCounterData: null,
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
        addBranchShiftData: null,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_ROASTER_ENTRY_SUCCESS:
      return {
        ...state,
        roasterList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_ROASTER_ENTRY_FAILED:
      return {
        ...state,
        roasterList: [],
        admin_ResponseMessage: action.message,
      };

    case actions.GET_SINGLE_DAY_BRANCH_ROASTER_SUCCESS:
      return {
        ...state,
        singleDayRoaster: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_SINGLE_DAY_BRANCH_ROASTER_FAILED:
      return {
        ...state,
        singleDayRoaster: [],
        admin_ResponseMessage: action.message,
      };

    case actions.REMOVE_BRANCH_ROASTER_ENTRY_SUCCESS:
      return {
        ...state,
        removeRoasterEntryBranch: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.REMOVE_BRANCH_ROASTER_ENTRY_FAILED:
      return {
        ...state,
        removeRoasterEntryBranch: [],
        admin_ResponseMessage: action.message,
      };
    //Get Branch Services Reducers
    case actions.GET_ALL_BRANCH_SERVICES_SUCCESS:
      return {
        ...state,
        branchServicesData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCH_SERVICES_FAIL:
      return {
        ...state,
        branchServicesData: null,
        admin_ResponseMessage: action.message,
      };

    //Update Branch Services Reducers
    case actions.UPDATE_BRANCH_SERVICES_SUCCESS:
      return {
        ...state,
        branchServicesUpdatedData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_SERVICES_FAIL:
      return {
        ...state,
        branchServicesUpdatedData: null,
        admin_ResponseMessage: action.message,
      };

    //Update branch counter reducer cases

    case actions.UPDATE_BRANCH_COUNTER_SUCCESS:
      return {
        ...state,
        updateBranchCounterData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_COUNTER_FAILED:
      return {
        ...state,
        updateBranchCounterData: null,
        admin_ResponseMessage: action.message,
      };

    //Delete Branch Counter

    case actions.DELETE_BRANCH_COUNTER_SUCCESS:
      return {
        ...state,
        deleteBranchCounterData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_BRANCH_COUNTER_FAILED:
      return {
        ...state,
        deleteBranchCounterData: null,
        admin_ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default adminReducer;

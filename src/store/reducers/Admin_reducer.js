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
  //Commented Because Using Update All
  // branchServicesUpdatedData: null,
  branchServicesUpdatedAllData: null,
  updateBranchCounterData: null,
  deleteBranchCounterData: null,
  addBranchCounterData: null,
  updateBranchShiftData: null,
  deleteBranchShiftID: null,
  cityBranchListData: null,
  addedCityBranchData: null,
  deletedCityBranchData: null,
  updatedCityBranchData: null,
  cityServiceListData: null,
  cityBranchWiseData: null,
  updateCityBranchWiseData: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Response Message Admin Clear
    case actions.CLEAR_RESPONSEMESSAGE_ADMIN: {
      return {
        ...state,
        admin_ResponseMessage: action.response,
      };
    }

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

    //for Add BRANCH SHIFT OF BRANCH shift Api
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

    //Update Branch Services Reducers (Commented Because Using Update All)
    // case actions.UPDATE_BRANCH_SERVICES_SUCCESS:
    //   return {
    //     ...state,
    //     branchServicesUpdatedData: action.response,
    //     admin_ResponseMessage: action.message,
    //   };

    // case actions.UPDATE_BRANCH_SERVICES_FAIL:
    //   return {
    //     ...state,
    //     branchServicesUpdatedData: null,
    //     admin_ResponseMessage: action.message,
    //   };

    //Update All Branch Services Reducer
    case actions.UPDATE_ALL_BRANCH_SERVICES_SUCCESS:
      return {
        ...state,
        branchServicesUpdatedAllData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_ALL_BRANCH_SERVICES_FAIL:
      return {
        ...state,
        branchServicesUpdatedAllData: null,
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

    //for update BRANCH SHIFT OF BRANCH shift Api
    case actions.UPDAT_EBRANCH_SHIFT_SUCCESS:
      return {
        ...state,
        updateBranchShiftData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_SHIFT_FAIL:
      return {
        ...state,
        updateBranchShiftData: null,
        admin_ResponseMessage: action.message,
      };

    //for update BRANCH SHIFT OF BRANCH shift Api
    case actions.DELETE_BRANCH_SHIFT_SUCCESS:
      return {
        ...state,
        deleteBranchShiftID: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_BRANCH_SHIFT_FAIL:
      return {
        ...state,
        deleteBranchShiftID: null,
        admin_ResponseMessage: action.message,
      };

    //for ALL COUNTERS OF BRANCH counter Api
    case actions.ADD_BRANCH_COUNTER_SUCCESS:
      return {
        ...state,
        addBranchCounterData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_COUNTERT_FAIL:
      return {
        ...state,
        addBranchCounterData: null,
        admin_ResponseMessage: action.message,
      };

    // ===================================CITY ADMIN==========================================//

    //Get All GET CITY BRANCH LIST Api for(City Admin for listing down existing branches in city)
    case actions.GET_CITY_BRANCH_LIST_SUCCESS:
      return {
        ...state,
        cityBranchListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_BRANCH_LIST_FAIL:
      return {
        ...state,
        cityBranchListData: null,
        admin_ResponseMessage: action.message,
      };

    //Get add City Branch Api for(City Admin for adding new branch in the city)
    case actions.ADD_CITY_BRANCH_SUCCESS:
      return {
        ...state,
        addedCityBranchData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_CITY_BRANCH_FAIL:
      return {
        ...state,
        addedCityBranchData: null,
        admin_ResponseMessage: action.message,
      };

    //for delete City Branch Api (City Admin for deleting existing branch in the city)
    case actions.DELETE_CITY_BRANCH_SUCCESS:
      return {
        ...state,
        deletedCityBranchData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_CITY_BRANCH_FAIL:
      return {
        ...state,
        deletedCityBranchData: null,
        admin_ResponseMessage: action.message,
      };

    //for UPDAT Shifts Of Branch Api (City Admin for update existing branch in the city)
    case actions.UPDATE_CITY_BRANCH_SUCCESS:
      return {
        ...state,
        updatedCityBranchData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_CITY_BRANCH_FAIL:
      return {
        ...state,
        updatedCityBranchData: null,
        admin_ResponseMessage: action.message,
      };

    //Get  Country Wise City for listing down existing services in city
    case actions.GET_CITY_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        cityServiceListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_SERVICE_LIST_FAIL:
      return {
        ...state,
        cityServiceListData: null,
        admin_ResponseMessage: action.message,
      };

    //Country Wise City for updating all existing services in a city in a single request
    case actions.UPDATE_CITY_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_CITY_SERVICE_LIST_FAIL:
      return {
        ...state,
        admin_ResponseMessage: action.message,
      };

    // Get City Branch Services in City Admin
    case actions.GET_CITY_BRANCH_SERVICE_SUCCESS:
      return {
        ...state,
        cityBranchWiseData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_BRANCH_SERVICE_FAIL:
      return {
        ...state,
        cityBranchWiseData: null,
        admin_ResponseMessage: action.message,
      };

    // Update City Branch Services in City Admin
    case actions.UPDATE_CITY_BRANCH_SERVICE_SUCCESS:
      return {
        ...state,
        updateCityBranchWiseData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_CITY_BRANCH_SERVICE_FAIL:
      return {
        ...state,
        updateCityBranchWiseData: null,
        admin_ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default adminReducer;

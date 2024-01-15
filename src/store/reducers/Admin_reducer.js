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
  getBranchShiftWiseCounter: null,
  cityEmployeeMain: null,
  addNewEmployeeData: null,
  updateExistingEmployeeData: null,
  deleteExistingEmployeeData: null,
  countryNationalHoliday: null,
  addCountryNationalData: null,
  deleteCountryNational: null,
  isEditEmployeeFlag: false,
  servicesList: null,
  getAppointmentBranchReportData: null,
  getWorkingDaysCountry: null,
  updateWorkingDaysCountry: null,
  cityList: null,
  getAppointmentCityReportData: null,
  countryAdminMainData: null,
  updateCountryAdmin: null,
  deleteCountryAdmin: null,
  countryServiceScreenList: null,
  updateCountryServiceList: null,
  getAllBranchServiceData: null,
  getAllBranchShiftData: null,
  getAllBranchCounterData: null,
  getCountryListData: null,
  addCountryListData: null,
  updateCountryListData: null,
  deleteCountryListData: null,
  getGlobalServiceData: null,
  addGlobalServiceData: null,
  updateGlobalServiceData: null,
  deleteGlobalServiceData: null,
  getEmployeeList: null,
  servicesCity: [],
  cityBranchWiseServicesList: [],
  citybranchShiftServicesListData: [],
  getAllBranchShiftCounterData: null,
  getServiceWiseCountryData: null,
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

    case actions.GET_ALL_SHIFTS_OF_BRANCH_CLEARE:
      return {
        ...state,
        branchesList: null,
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

    // Get Branch shift wise Counter in City Admin
    case actions.GET_BRANCH_SHIFT_COUNTER_SUCCESS:
      return {
        ...state,
        getBranchShiftWiseCounter: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_BRANCH_SHIFT_COUNTER_FAIL:
      return {
        ...state,
        getBranchShiftWiseCounter: null,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_BRANCH_SHIFT_COUNTER_CLEAR:
      return {
        ...state,
        getBranchShiftWiseCounter: null,
      };

    // Get City Employee Main in City Admin
    case actions.GET_CITY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        cityEmployeeMain: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_EMPLOYEE_FAIL:
      return {
        ...state,
        cityEmployeeMain: null,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_EMPLOYEE_CLEAR:
      return {
        ...state,
        cityEmployeeMain: null,
      };

    // Add New Employyee Data in City Admin
    case actions.ADD_NEW_EMPLOYEE_CITY_SUCCESS:
      return {
        ...state,
        addNewEmployeeData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_NEW_EMPLOYEE_CITY_FAIL:
      return {
        ...state,
        addNewEmployeeData: null,
        admin_ResponseMessage: action.message,
      };

    // Update Existing Employee Data in City Admin
    case actions.UPDATE_EXISTING_EMPLOYEE_CITY_SUCCESS:
      return {
        ...state,
        updateExistingEmployeeData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_EXISTING_EMPLOYEE_CITY_FAIL:
      return {
        ...state,
        updateExistingEmployeeData: null,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_EDIT_MODAL_EMPLOYEE:
      return {
        ...state,
        isEditEmployeeFlag: action.response,
      };

    // Update Existing Employee Data in City Admin
    case actions.DELETE_EXISTING_EMPLOYEE_CITY_SUCCESS:
      return {
        ...state,
        deleteExistingEmployeeData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_EXISTING_EMPLOYEE_CITY_FAIL:
      return {
        ...state,
        deleteExistingEmployeeData: null,
        admin_ResponseMessage: action.message,
      };

    //GET APPOINTMENT REPORT CITY
    case actions.GET_CITY_APPOINTMENT_SUCCESS:
      return {
        ...state,
        getAppointmentCityReportData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_CITY_APPOINTMENT_FAIL:
      return {
        ...state,
        getAppointmentCityReportData: null,
        admin_ResponseMessage: action.message,
      };

    // ===================================COUNTRY ADMIN==========================================//

    // get Country National Holiday in Country admin
    case actions.GET_NATIONAL_HOLIDAY_SUCCESS:
      return {
        ...state,
        countryNationalHoliday: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_NATIONAL_HOLIDAY_FAIL:
      return {
        ...state,
        countryNationalHoliday: null,
        admin_ResponseMessage: action.message,
      };

    // add country National Holiday in Country admin
    case actions.ADD_NATIONAL_HOLIDAY_SUCCESS:
      return {
        ...state,
        addCountryNationalData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_NATIONAL_HOLIDAY_FAIL:
      return {
        ...state,
        addCountryNationalData: null,
        admin_ResponseMessage: action.message,
      };

    // delete country National Holiday in Country Admin
    case actions.DELETE_NATIONAL_HOLIDAY_SUCCESS:
      return {
        ...state,
        deleteCountryNational: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_NATIONAL_HOLIDAY_FAIL:
      return {
        ...state,
        deleteCountryNational: null,
        admin_ResponseMessage: action.message,
      };

    //GET APPOINTMENT REPORT BRANCH
    case actions.GET_APPOINTMENT_BRANCH_REPORT_SUCCESS:
      return {
        ...state,
        getAppointmentBranchReportData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_APPOINTMENT_BRANCH_REPORT_FAIL:
      return {
        ...state,
        getAppointmentBranchReportData: null,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_WORKING_DAYS_SUCCESS:
      return {
        ...state,
        getWorkingDaysCountry: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_WORKING_DAYS_FAIL:
      return {
        ...state,
        getWorkingDaysCountry: null,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_COUNTRY_WORKING_DAYS_SUCCESS:
      return {
        ...state,
        updateWorkingDaysCountry: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_COUNTRY_WORKING_DAYS_FAIL:
      return {
        ...state,
        updateWorkingDaysCountry: null,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_CITIES_API_SUCCESS:
      return {
        ...state,
        cityList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_CITIES_API_FAIL:
      return {
        ...state,
        cityList: null,
        admin_ResponseMessage: action.message,
      };

    // add country National Holiday in Country admin
    case actions.ADD_COUNTRY_ADMIN_SUCCESS:
      return {
        ...state,
        countryAdminMainData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_COUNTRY_ADMIN_FAIL:
      return {
        ...state,
        countryAdminMainData: null,
        admin_ResponseMessage: action.message,
      };

    // update country National Holiday in Country admin
    case actions.UPDATE_COUNTRY_ADMIN_SUCCESS:
      return {
        ...state,
        updateCountryAdmin: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_COUNTRY_ADMIN_FAIL:
      return {
        ...state,
        updateCountryAdmin: null,
        admin_ResponseMessage: action.message,
      };

    // delete country National Holiday in Country admin
    case actions.DELETE_COUNTRY_ADMIN_SUCCESS:
      return {
        ...state,
        deleteCountryAdmin: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_COUNTRY_ADMIN_FAIL:
      return {
        ...state,
        deleteCountryAdmin: null,
        admin_ResponseMessage: action.message,
      };

    // get country service screen in country Admin
    case actions.GET_COUNTRY_SERVICE_SUCCESS:
      return {
        ...state,
        countryServiceScreenList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_SERVICE_FAIL:
      return {
        ...state,
        countryServiceScreenList: null,
        admin_ResponseMessage: action.message,
      };

    // update country service screen in country Admin
    case actions.UPDATE_COUNTRY_SERVICE_SUCCESS:
      return {
        ...state,
        updateCountryServiceList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_COUNTRY_SERVICE_FAIL:
      return {
        ...state,
        updateCountryServiceList: null,
        admin_ResponseMessage: action.message,
      };

    // get all Branch service in country Admin
    case actions.GET_ALL_BRANCH_SERVICE_CITY_SUCCESS:
      return {
        ...state,
        getAllBranchServiceData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCH_SERVICE_CITY_FAIL:
      return {
        ...state,
        getAllBranchServiceData: null,
        admin_ResponseMessage: action.message,
      };

    // get all Branch Shify in country Admin
    case actions.GET_ALL_BRANCH_SHIFT_CITY_SUCCESS:
      return {
        ...state,
        getAllBranchShiftData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCH_SHIFT_CITY_FAIL:
      return {
        ...state,
        getAllBranchShiftData: null,
        admin_ResponseMessage: action.message,
      };

    // get all Branch Counter in country Admin
    case actions.GET_ALL_BRANCH_COUNTER_CITY_SUCCESS:
      return {
        ...state,
        getAllBranchCounterData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCH_COUNTER_CITY_FAIL:
      return {
        ...state,
        getAllBranchCounterData: null,
        admin_ResponseMessage: action.message,
      };

    // ===================================GLOBAL ADMIN==========================================//

    // get country List in global Admin
    case actions.GET_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        getCountryListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_COUNTRY_LIST_FAIL:
      return {
        ...state,
        getCountryListData: null,
        admin_ResponseMessage: action.message,
      };

    // add Country List in global Admin
    case actions.ADD_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        addCountryListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_COUNTRY_LIST_FAIL:
      return {
        ...state,
        addCountryListData: null,
        admin_ResponseMessage: action.message,
      };

    // update Country List in global Admin
    case actions.UPDATE_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        updateCountryListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_COUNTRY_LIST_FAIL:
      return {
        ...state,
        updateCountryListData: null,
        admin_ResponseMessage: action.message,
      };

    // delete Country List in global Admin
    case actions.DELETE_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        deleteCountryListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_COUNTRY_LIST_FAIL:
      return {
        ...state,
        deleteCountryListData: null,
        admin_ResponseMessage: action.message,
      };

    //get Global Service List in Global Admin
    case actions.GET_GLOBAL_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        getGlobalServiceData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_GLOBAL_SERVICE_LIST_FAIL:
      return {
        ...state,
        getGlobalServiceData: null,
        admin_ResponseMessage: action.message,
      };

    //add Global Service List in Global Admin
    case actions.ADD_GLOBAL_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        addGlobalServiceData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.ADD_GLOBAL_SERVICE_LIST_FAIL:
      return {
        ...state,
        addGlobalServiceData: null,
        admin_ResponseMessage: action.message,
      };

    //update Global Service List in Global Admin
    case actions.UPDATE_GLOBAL_SERVICE_SUCCESS:
      return {
        ...state,
        updateGlobalServiceData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.UPDATE_GLOBAL_SERVICE_FAIL:
      return {
        ...state,
        updateGlobalServiceData: null,
        admin_ResponseMessage: action.message,
      };

    //delete Global Service List in Global Admin
    case actions.DELETE_GLOBAL_SERVICE_SUCCESS:
      return {
        ...state,
        deleteGlobalServiceData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.DELETE_GLOBAL_SERVICE_FAIL:
      return {
        ...state,
        deleteGlobalServiceData: null,
        admin_ResponseMessage: action.message,
      };

    // get ALL Employee List in Global Admin
    case actions.GET_ALL_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        getEmployeeList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_EMPLOYEE_LIST_FAIL:
      return {
        ...state,
        getEmployeeList: null,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_SERVICES_OF_CITIES_SUCCESS:
      return {
        ...state,
        servicesCity: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_SERVICES_OF_CITIES_FAIL:
      return {
        ...state,
        servicesCity: [],
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_CITY_BRANCH_SERVICES_SUCCESS:
      return {
        ...state,
        cityBranchWiseServicesList: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_CITY_BRANCH_SERVICES_FAIL:
      return {
        ...state,
        cityBranchWiseServicesList: [],
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_CITY_BRANCH_SHIFT_SERVICES_SUCCESS:
      return {
        ...state,
        citybranchShiftServicesListData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_CITY_BRANCH_SHIFT_SERVICES_FAIL:
      return {
        ...state,
        citybranchShiftServicesListData: [],
        admin_ResponseMessage: action.message,
      };

    // get All City Branch Shift Counter Services in Counter Page global Admin
    case actions.GET_ALL_CITY_BRANCH_SHIFT_COUNTER_SERVICE_SUCCESS:
      return {
        ...state,
        getAllBranchShiftCounterData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_ALL_CITY_BRANCH_SHIFT_COUNTER_SERVICE_FAIL:
      return {
        ...state,
        getAllBranchShiftCounterData: null,
        admin_ResponseMessage: action.message,
      };

    // get All service wise country list in global Admin
    case actions.GET_SERVICE_WISE_COUNTRY_SUCCESS:
      return {
        ...state,
        getServiceWiseCountryData: action.response,
        admin_ResponseMessage: action.message,
      };

    case actions.GET_SERVICE_WISE_COUNTRY_FAIL:
      return {
        ...state,
        getServiceWiseCountryData: null,
        admin_ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default adminReducer;

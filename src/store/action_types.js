// this is for loader only
export const SET_LOADER_STATES = "SET_LOADER_STATES";

// For Auth
//for signout
export const SIGN_OUT = "SIGN_OUT";

export const AUTH_CLEARE_STATE = "AUTH_CLEARE_STATE";

// For Login
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAIL = "LOG_IN_FAIL";

// For Admin
// for cleare states of admin reducer
export const ADMIN_CLEARE_STATE = "ADMIN_CLEARE_STATE";

//Clear Response Message Admin
export const CLEAR_RESPONSEMESSAGE_ADMIN = "CLEAR_RESPONSEMESSAGE_ADMIN";

// for GET_SYSTEM_SUPPORTED_LANGUAGE Api
export const GET_SYSTEM_SUPPORTED_LANGUAGE_SUCCESS =
  "GET_SYSTEM_SUPPORTED_LANGUAGE_SUCCESS";
export const GET_SYSTEM_SUPPORTED_LANGUAGE_FAIL =
  "GET_SYSTEM_SUPPORTED_LANGUAGE_FAIL";

// for GET_LAST_SELECTED_LANGUAGE Api
export const GET_LAST_SELECTED_LANGUAGE_SUCCESS =
  "GET_LAST_SELECTED_LANGUAGE_SUCCESS";
export const GET_LAST_SELECTED_LANGUAGE_FAIL =
  "GET_LAST_SELECTED_LANGUAGE_FAIL";

// for SET_LAST_SELECTED_LANGUAGE Api
export const SET_LAST_SELECTED_LANGUAGE_SUCCESS =
  "SET_LAST_SELECTED_LANGUAGE_SUCCESS";
export const SET_LAST_SELECTED_LANGUAGE_FAIL =
  "SET_LAST_SELECTED_LANGUAGE_FAIL";

//for All Shifts Of Branch Api fot(Branch Admin for listing of all branches && Branch Roaster for Shifts drop down)
export const GET_ALL_SHIFTS_OF_BRANCH_SUCCESS =
  "GET_ALL_SHIFTS_OF_BRANCH_SUCCESS";
export const GET_ALL_SHIFTS_OF_BRANCH_FAIL = "GET_ALL_SHIFTS_OF_BRANCH_FAIL";
export const GET_ALL_SHIFTS_OF_BRANCH_CLEARE =
  "GET_ALL_SHIFTS_OF_BRANCH_CLEARE";

//for ALL COUNTERS OF BRANCH Api fot(CounterMain for listing of all branches && Branch Roaster for Counter drop down)
export const ALL_COUNTERS_OF_BRANCH_SUCCESS = "ALL_COUNTERS_OF_BRANCH_SUCCESS";
export const ALL_COUNTERS_OF_BRANCH_FAIL = "ALL_COUNTERS_OF_BRANCH_FAIL";

//for Branch Admin for adding new shift
export const ADD_BRANCH_SHIFT_SUCCESS = "ADD_BRANCH_SHIFT_SUCCESS";
export const ADD_BRANCH_SHIFT_FAIL = "ADD_BRANCH_SHIFT_FAIL";

export const ROASTER_CLEARING_STATE = "ROASTER_CLEARING_STATE";

export const ADD_BRANCH_ROASTER_ENTRY_SUCCESS =
  "ADD_BRANCH_ROASTER_ENTRY_SUCCESS";
export const ADD_BRANCH_ROASTER_ENTRY_FAILED =
  "ADD_BRANCH_ROASTER_ENTRY_FAILED";

export const GET_SINGLE_DAY_BRANCH_ROASTER_SUCCESS =
  "GET_SINGLE_DAY_BRANCH_ROASTER_SUCCESS";

export const GET_SINGLE_DAY_BRANCH_ROASTER_FAILED =
  "GET_SINGLE_DAY_BRANCH_ROASTER_FAILED";

export const REMOVE_BRANCH_ROASTER_ENTRY_SUCCESS =
  "REMOVE_BRANCH_ROASTER_ENTRY_SUCCESS";

export const REMOVE_BRANCH_ROASTER_ENTRY_FAILED =
  "REMOVE_BRANCH_ROASTER_ENTRY_FAILED";
//Get Branch Services
export const GET_ALL_BRANCH_SERVICES_SUCCESS =
  "GET_ALL_BRANCH_SERVICES_SUCCESS";
export const GET_ALL_BRANCH_SERVICES_FAIL = "GET_ALL_BRANCH_SERVICES_FAIL";

//Update Branch Services (Commented Because Using Update All)
// export const UPDATE_BRANCH_SERVICES_SUCCESS = "UPDATE_BRANCH_SERVICES_SUCCESS";
// export const UPDATE_BRANCH_SERVICES_FAIL = "UPDATE_BRANCH_SERVICES_FAIL";

//Update All Branch Services
export const UPDATE_ALL_BRANCH_SERVICES_SUCCESS =
  "UPDATE_ALL_BRANCH_SERVICES_SUCCESS";
export const UPDATE_ALL_BRANCH_SERVICES_FAIL =
  "UPDATE_ALL_BRANCH_SERVICES_FAIL";

//update Branch Counter
export const UPDATE_BRANCH_COUNTER_SUCCESS = "UPDATE_BRANCH_COUNTER_SUCCESS";
export const UPDATE_BRANCH_COUNTER_FAILED = "UPDATE_BRANCH_COUNTER_FAILED";

//Delete Branch Counter
export const DELETE_BRANCH_COUNTER_SUCCESS = "DELETE_BRANCH_COUNTER_SUCCESS";
export const DELETE_BRANCH_COUNTER_FAILED = "DELETE_BRANCH_COUNTER_FAILED";
//for Branch Admin for updating  shift
export const UPDAT_EBRANCH_SHIFT_SUCCESS = "UPDAT_EBRANCH_SHIFT_SUCCESS";
export const UPDATE_BRANCH_SHIFT_FAIL = "UPDATE_BRANCH_SHIFT_FAIL";

//for Branch Admin for delete  shift
export const DELETE_BRANCH_SHIFT_SUCCESS = "DELETE_BRANCH_SHIFT_SUCCESS";
export const DELETE_BRANCH_SHIFT_FAIL = "DELETE_BRANCH_SHIFT_FAIL";

//for ADD BRANCH COUNTER  for adding new BRANCH COUNTER
export const ADD_BRANCH_COUNTER_SUCCESS = "ADD_BRANCH_COUNTER_SUCCESS";
export const ADD_BRANCH_COUNTERT_FAIL = "ADD_BRANCH_COUNTERT_FAIL";

// ===================================CITY ADMIN==========================================//

//Get All GET CITY BRANCH LIST Api for(City Admin for listing down existing branches in city)
export const GET_CITY_BRANCH_LIST_SUCCESS = "GET_CITY_BRANCH_LIST_SUCCESS";
export const GET_CITY_BRANCH_LIST_FAIL = "GET_CITY_BRANCH_LIST_FAIL";

//Get add City Branch Api for(City Admin for adding new branch in the city)
export const ADD_CITY_BRANCH_SUCCESS = "ADD_CITY_BRANCH_SUCCESS";
export const ADD_CITY_BRANCH_FAIL = "ADD_CITY_BRANCH_FAIL";

//for delete City Branch Api (City Admin for deleting existing branch in the city)
export const DELETE_CITY_BRANCH_SUCCESS = "DELETE_CITY_BRANCH_SUCCESS";
export const DELETE_CITY_BRANCH_FAIL = "DELETE_CITY_BRANCH_FAIL";

//for UPDAT Shifts Of Branch Api (City Admin for update existing branch in the city)
export const UPDATE_CITY_BRANCH_SUCCESS = "UPDATE_CITY_BRANCH_SUCCESS";
export const UPDATE_CITY_BRANCH_FAIL = "UPDATE_CITY_BRANCH_FAIL";

//Get  Country Wise City for listing down existing services in city
export const GET_CITY_SERVICE_LIST_SUCCESS = "GET_CITY_SERVICE_LIST_SUCCESS";
export const GET_CITY_SERVICE_LIST_FAIL = "GET_CITY_SERVICE_LIST_FAIL";

///Country Wise City for updating all existing services in a city in a single request
export const UPDATE_CITY_SERVICE_LIST_SUCCESS =
  "UPDATE_CITY_SERVICE_LIST_SUCCESS";
export const UPDATE_CITY_SERVICE_LIST_FAIL = "UPDATE_CITY_SERVICE_LIST_FAIL";

// get city Branch services Api (City Admin for GetCityBranchServices in the City)
export const GET_CITY_BRANCH_SERVICE_SUCCESS =
  "GET_CITY_BRANCH_SERVICE_SUCCESS";
export const GET_CITY_BRANCH_SERVICE_FAIL = "GET_CITY_BRANCH_SERVICE_FAIL";

// update city Branch service Api (City Admin for GetCityBranchServices in the City)
export const UPDATE_CITY_BRANCH_SERVICE_SUCCESS =
  "UPDATE_CITY_BRANCH_SERVICE_SUCCESS";
export const UPDATE_CITY_BRANCH_SERVICE_FAIL =
  "UPDATE_CITY_BRANCH_SERVICE_FAIL";

// action Types For Global Action
export const SET_COUNTRY_CITY_WISE_COUNTER = "SET_COUNTRY_CITY_WISE_COUNTER";
export const SET_CITY_WISE_BRANCH_SERVICE = "SET_CITY_WISE_BRANCH_SERVICE";

// GetBranchShiftWiseCounter action Types for city admin Api
export const GET_BRANCH_SHIFT_COUNTER_SUCCESS =
  "GET_BRANCH_SHIFT_COUNTER_SUCCESS";
export const GET_BRANCH_SHIFT_COUNTER_FAIL = "GET_BRANCH_SHIFT_COUNTER_FAIL";
export const GET_BRANCH_SHIFT_COUNTER_CLEAR = "GET_BRANCH_SHIFT_COUNTER_CLEAR";

// Get City Employee Main action types for city admin api
export const GET_CITY_EMPLOYEE_SUCCESS = "GET_CITY_EMPLOYEE_SUCCESS";
export const GET_CITY_EMPLOYEE_FAIL = "GET_CITY_EMPLOYEE_FAIL";
export const GET_CITY_EMPLOYEE_CLEAR = "GET_CITY_EMPLOYEE_CLEAR";

//add new Employee city action types for city admin
export const ADD_NEW_EMPLOYEE_CITY_SUCCESS = "ADD_NEW_EMPLOYEE_CITY_SUCCESS";
export const ADD_NEW_EMPLOYEE_CITY_FAIL = "ADD_NEW_EMPLOYEE_CITY_FAIL";

// update Existing Employee city action types for city admin
export const UPDATE_EXISTING_EMPLOYEE_CITY_SUCCESS =
  "UPDATE_EXISTING_EMPLOYEE_CITY_SUCCESS";
export const UPDATE_EXISTING_EMPLOYEE_CITY_FAIL =
  "UPDATE_EXISTING_EMPLOYEE_CITY_FAIL";

export const ADD_EDIT_MODAL_EMPLOYEE = "ADD_EDIT_MODAL_EMPLOYEE";

// delete Existing Employee city action types for city admin
export const DELETE_EXISTING_EMPLOYEE_CITY_SUCCESS =
  "DELETE_EXISTING_EMPLOYEE_CITY_SUCCESS";
export const DELETE_EXISTING_EMPLOYEE_CITY_FAIL =
  "DELETE_EXISTING_EMPLOYEE_CITY_FAIL";

export const GET_CITY_APPOINTMENT_SUCCESS = "GET_CITY_APPOINTMENT_SUCCESS";
export const GET_CITY_APPOINTMENT_FAIL = "GET_CITY_APPOINTMENT_FAIL";

// ===================================CITY ADMIN END ==========================================//

// ===================================COUNTRY ADMIN START ==========================================//

// For get country national holiday action types for country admin
export const GET_NATIONAL_HOLIDAY_SUCCESS = "GET_NATIONAL_HOLIDAY_SUCCESS";
export const GET_NATIONAL_HOLIDAY_FAIL = "GET_NATIONAL_HOLIDAY_FAIL";

// For add country national holiday action types for country admin
export const ADD_NATIONAL_HOLIDAY_SUCCESS = "ADD_NATIONAL_HOLIDAY_SUCCESS";
export const ADD_NATIONAL_HOLIDAY_FAIL = "ADD_NATIONAL_HOLIDAY_FAIL";

// For delete Country national holiday action types for country admin
export const DELETE_NATIONAL_HOLIDAY_SUCCESS =
  "DELETE_NATIONAL_HOLIDAY_SUCCESS";
export const DELETE_NATIONAL_HOLIDAY_FAIL = "DELETE_NATIONAL_HOLIDAY_FAIL";

// For Get Working Days in Country Admin on Working days page action types for country admin
export const GET_COUNTRY_WORKING_DAYS_SUCCESS =
  "GET_COUNTRY_WORKING_DAYS_SUCCESS";
export const GET_COUNTRY_WORKING_DAYS_FAIL = "GET_COUNTRY_WORKING_DAYS_FAIL";

// For Update Working Days in Country Admin on Working days page action types for country admin
export const UPDATE_COUNTRY_WORKING_DAYS_SUCCESS =
  "UPDATE_COUNTRY_WORKING_DAYS_SUCCESS";
export const UPDATE_COUNTRY_WORKING_DAYS_FAIL =
  "UPDATE_COUNTRY_WORKING_DAYS_FAIL";

// Get Country Cities CITY using in drope down of city in employess API
export const GET_COUNTRY_CITIES_API_SUCCESS = "GET_COUNTRY_CITIES_API_SUCCESS";
export const GET_COUNTRY_CITIES_API_FAIL = "GET_COUNTRY_CITIES_API_FAIL";

//For add Country city in country admin main page
export const ADD_COUNTRY_ADMIN_SUCCESS = "ADD_COUNTRY_ADMIN_SUCCESS";
export const ADD_COUNTRY_ADMIN_FAIL = "ADD_COUNTRY_ADMIN_FAIL";

//For update Country city in country admin main page
export const UPDATE_COUNTRY_ADMIN_SUCCESS = "UPDATE_COUNTRY_ADMIN_SUCCESS";
export const UPDATE_COUNTRY_ADMIN_FAIL = "UPDATE_COUNTRY_ADMIN_FAIL";

// for delete country city in country admin main page
export const DELETE_COUNTRY_ADMIN_SUCCESS = "DELETE_COUNTRY_ADMIN_SUCCESS";
export const DELETE_COUNTRY_ADMIN_FAIL = "DELETE_COUNTRY_ADMIN_FAIL";

// for get country service screen list api in country admin page
export const GET_COUNTRY_SERVICE_SUCCESS = "GET_COUNTRY_SERVICE_SUCCESS";
export const GET_COUNTRY_SERVICE_FAIL = "GET_COUNTRY_SERVICE_FAIL";

// for update country service screen list api in country admin page
export const UPDATE_COUNTRY_SERVICE_SUCCESS = "UPDATE_COUNTRY_SERVICE_SUCCESS";
export const UPDATE_COUNTRY_SERVICE_FAIL = "UPDATE_COUNTRY_SERVICE_FAIL";

// Get All BranchService Of City in BRANCH SCREEN on country admin
export const GET_ALL_BRANCH_SERVICE_CITY_SUCCESS =
  "GET_ALL_BRANCH_SERVICE_CITY_SUCCESS";
export const GET_ALL_BRANCH_SERVICE_CITY_FAIL =
  "GET_ALL_BRANCH_SERVICE_CITY_FAIL";

// Get All Branch Shift Service Of City in BRANCH SCREEN on country admin
export const GET_ALL_BRANCH_SHIFT_CITY_SUCCESS =
  "GET_ALL_BRANCH_SHIFT_CITY_SUCCESS";
export const GET_ALL_BRANCH_SHIFT_CITY_FAIL = "GET_ALL_BRANCH_SHIFT_CITY_FAIL";

// Get All Branch Shift Counter Service Of City in BRANCH SCREEN on country admin
export const GET_ALL_BRANCH_COUNTER_CITY_SUCCESS =
  "GET_ALL_BRANCH_COUNTER_CITY_SUCCESS";
export const GET_ALL_BRANCH_COUNTER_CITY_FAIL =
  "GET_ALL_BRANCH_COUNTER_CITY_FAIL";

// ===================================COUNTRY ADMIN END ==========================================//

//====================================BRANCH WISE APPOINTMENT=====================================//

//GET APPOINTMENT REPORT BRANCH

export const GET_APPOINTMENT_BRANCH_REPORT_SUCCESS =
  "GET_APPOINTMENT_BRANCH_REPORT_SUCCESS";

export const GET_APPOINTMENT_BRANCH_REPORT_FAIL =
  "GET_APPOINTMENT_BRANCH_REPORT_FAIL";

// ===================================GLOBAL ADMIN START ==========================================//
// Action Type For Global Action
export const SET_COUNTRY_WISE_CITY_COMPONENT =
  "SET_COUNTRY_WISE_CITY_COMPONENT";

// For country service screen component
export const SET_COUNTRY_SERVICE_SCREEN_COMPONENT =
  "SET_COUNTRY_SERVICE_SCREEN_COMPONENT";

// For service country screen component
export const SET_SERVICE_COUNTRY_SCREEN_COMPONENT =
  "SET_SERVICE_COUNTRY_SCREEN_COMPONENT";

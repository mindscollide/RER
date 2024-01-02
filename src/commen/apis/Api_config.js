// for login
const logIn = {
  RequestMethod: "ServiceManager.Login",
};

// for user role list
const roleList = {
  RequestMethod: "ServiceManager.RoleList",
};

// for Get System Supported Language for drope down option
const systemSupportedLanguage = {
  RequestMethod: "ServiceManager.GetSystemSupportedLanguage",
};

// for Get Last Selected Language for shown
const lastSelectedLanguage = {
  RequestMethod: "ServiceManager.GetLastSelectedLanguage",
};

// for Set Last Selected Language from Dropedown
const updateLastSelectedLanguage = {
  RequestMethod: "ServiceManager.SetLastSelectedLanguage",
};

// for all Shifts Of Branch list and drope down
const allShiftsOfBranch = {
  RequestMethod: "ServiceManager.GetAllShiftsOfBranch",
};

// for all Counters Of Branch list and Dropedown
const allCountersOfBranch = {
  RequestMethod: "ServiceManager.GetAllCountersOfBranch",
};

// for Add Branch Shift
const addBranchShift = {
  RequestMethod: "ServiceManager.AddBranchShift",
};

// for Add Branch Roaster Entry
const addBranchRoasterEntry = {
  RequestMethod: "ServiceManager.AddBranchRoasterEntry",
};

//for getting Single Day  Branch Entry

const getSingleDayBranchRoaster = {
  RequestMethod: "ServiceManager.GetSingleDayBranchRoaster",
};

const removeBranchRoasterEntry = {
  RequestMethod: "ServiceManager.RemoveBranchRoasterEntry",
};
// for Get Branch Services
const getBranchServices = {
  RequestMethod: "ServiceManager.GetBranchServices",
};

// for Update Branch Services (Commented Because Using Update All)
// const updateBranchServices = {
//   RequestMethod: "ServiceManager.UpdateBranchServices",
// };

// for Update Branch All Services
const updateAllBranchServices = {
  RequestMethod: "ServiceManager.UpdateAllBranchServices",
};

//For update branch Counter

const updateBranchCounter = {
  RequestMethod: "ServiceManager.UpdateBranchCounter",
};

//For Delelte Branch Counter
const deleteBranchCounter = {
  RequestMethod: "ServiceManager.DeleteBranchCounter",
};
// for Add Branch Shift
const updateBranchShift = {
  RequestMethod: "ServiceManager.UpdateBranchShift",
};

// for Add Branch Shift
const deleteBranchShift = {
  RequestMethod: "ServiceManager.DeleteBranchShift",
};

// for Add Branch Counter
const addBranchCounter = {
  RequestMethod: "ServiceManager.AddBranchCounter",
};

//GET APPOINTMENT REPORT BRANCH

const getAppointmentBranchReport = {
  RequestMethod: "ServiceManager.GetAppointmentReportBranchAdmin",
};

// ===================================CITY ADMIN==========================================//

// for all Shifts Of Branch list and drope down
const getCityBranchList = {
  RequestMethod: "ServiceManager.GetCityBranchList",
};

// for Add City Branch
const addCityBranch = {
  RequestMethod: "ServiceManager.AddCityBranch",
};

// for delete City Branch
const deleteCityBranch = {
  RequestMethod: "ServiceManager.DeleteCityBranch",
};

// for Update City Branch
const updateCityBranch = {
  RequestMethod: "ServiceManager.UpdateCityBranch",
};

// for Get Branch Services
const getCityServiceList = {
  RequestMethod: "ServiceManager.GetCityServiceList",
};

// for update City Service List
const updateCityServiceList = {
  RequestMethod: "ServiceManager.UpdateCityServiceList",
};

// =================== City Branch Service Start =====================
const getCityBranchServices = {
  RequestMethod: "ServiceManager.GetCityBranchServices",
};

const updateCityBranchService = {
  RequestMethod: "ServiceManager.UpdateCityBranchServices",
};
// =================== City Branch Service End =====================

// for get Branch Shift Wise Counter
const getBranchShiftWiseCounter = {
  RequestMethod: "ServiceManager.GetBranchShiftWiseCounter",
};

//for get city Employees Main
const getCityEmployee = {
  RequestMethod: "ServiceManager.GetCityEmployees",
};

// for add New Employee of City
const addNewEmployeeCity = {
  RequestMethod: "ServiceManager.AddNewEmployeeOfCity",
};

// for update Existing Employee Of City
const updateExistingEmployeeCity = {
  RequestMethod: "ServiceManager.UpdateExistingEmployeeOfCity",
};

// for delete Existing Employee Of City
const deleteExistingEmployeeCity = {
  RequestMethod: "ServiceManager.DeleteExistingEmployeeOfCity",
};

// ===================================CITY ADMIN END ==========================================//

// ===================================COUNTRY ADMIN START ==========================================//

// for get country national holiday COUNTRY ADMIN
const getCountryNationalHoliday = {
  RequestMethod: "ServiceManager.GetCountryNationalHoliday",
};

// Get Country Cities CITY using in drope down of city in employess API
const getCountryCities = {
  RequestMethod: "ServiceManager.GetCountryCities",
};

//for add country National Holiday COUNTRY ADMIN
const addCountryNationalHoliday = {
  RequestMethod: "ServiceManager.AddCountryNationalHoliday",
};

//for delete country National Holiday COUNTRY ADMIN
const deleteCountryNationalHoliday = {
  RequestMethod: "ServiceManager.DeleteCountryNationalHoliday",
};

//For get Country Admin Working Days Api COUNTRY ADMIN
const getCountryWorkingDays = {
  RequestMethod: "ServiceManager.GetCountryWorkingDays",
};

//GET APPOINTMENT CITY BRANCH

const getAppointmentCityReport = {
  RequestMethod: "ServiceManager.GetAppointmentReportCityAdmin",
};

//For update Country Admin Working Days Api COUNTRY ADMIN
const updateCountryWorkingDays = {
  RequestMethod: "ServiceManager.UpdateCountryWorkingDays",
};

//For add Country city in country admin main page
const addCountryCity = {
  RequestMethod: "ServiceManager.AddCountryCity",
};

//For update Country city in country admin main page
const updateCountryCity = {
  RequestMethod: "ServiceManager.UpdateCountryCity",
};

//For delete country City in country admin main page
const deleteCountryCity = {
  RequestMethod: "ServiceManager.DeleteCountryCity",
};

//For get country service list api in SERVICE COUNTRY SCREEN
const getCountryServiceScreen = {
  RequestMethod: "ServiceManager.GetCountryServiceList",
};

//For update country service list api in SERVICE COUNTRY SCREEN
const updateCountryServiceScreen = {
  RequestMethod: "ServiceManager.UpdateCountryServicesList",
};

// Get All BranchService Of City in BRANCH SCREEN on country admin
const getAllBranchServiceCity = {
  RequestMethod: "ServiceManager.GetAllBranchServiceOfCity",
};

// Get all branch shift service of city in shift screen on country admin
const getAllBranchShiftServiceCity = {
  RequestMethod: "ServiceManager.GetAllBranchShiftServiceOfCity",
};

// Get All BranchShiftCounter Service Of City in COUNTER screen on country admin
const getAllBranchCounterServiceCity = {
  RequestMethod: "ServiceManager.GetAllBranchShiftCounterServiceOfCity",
};

// ===================================COUNTRY ADMIN END ==========================================//

// ===================================GLOBAL ADMIN START ==========================================//

// Get Country List in COUNTRY MAIN screen on Global admin
const getCountryList = {
  RequestMethod: "ServiceManager.GetCountryList",
};

// Add Country List in COUNTRY MAIN screen on Global admin
const addCountryList = {
  RequestMethod: "ServiceManager.AddCountry",
};

// Update Country List in COUNTRY MAIN screen on Global admin
const updateCountryList = {
  RequestMethod: "ServiceManager.UpdateCountry",
};

// Delete Country List in COUNTRY MAIN screen on Global admin
const deleteCountryList = {
  RequestMethod: "ServiceManager.DeleteCountry",
};

// get Global Service List in SERVICE MAIN screen on Global admin
const getGlobalServiceList = {
  RequestMethod: "ServiceManager.GetGlobalServiceList",
};

// add Global Service List in SERVICE MAIN screen on Global admin
const addGlobalServiceList = {
  RequestMethod: "ServiceManager.AddGlobalService",
};

// update Global Service List in SERVICE MAIN screen on Global admin
const updateGlobalServiceList = {
  RequestMethod: "ServiceManager.UpdateGlobalService",
};

// delete Global Service List in SERVICE MAIN screen on Global admin
const deleteGlobalServiceList = {
  RequestMethod: "ServiceManager.DeleteGlobalService",
};

// ===================================GLOBAL ADMIN END ==========================================//

export {
  logIn,
  roleList,
  systemSupportedLanguage,
  lastSelectedLanguage,
  updateLastSelectedLanguage,
  allShiftsOfBranch,
  allCountersOfBranch,
  addBranchShift,
  addBranchRoasterEntry,
  getSingleDayBranchRoaster,
  removeBranchRoasterEntry,
  getBranchServices,
  //Commented Because Using Update All
  // updateBranchServices,
  updateAllBranchServices,
  updateBranchCounter,
  deleteBranchCounter,
  updateBranchShift,
  deleteBranchShift,
  addBranchCounter,
  getAppointmentBranchReport,

  // ===================================CITY ADMIN==========================================//
  getCityBranchList,
  addCityBranch,
  deleteCityBranch,
  updateCityBranch,
  getCityServiceList,
  updateCityServiceList,
  getCityBranchServices,
  updateCityBranchService,
  getBranchShiftWiseCounter,
  getCityEmployee,
  addNewEmployeeCity,
  updateExistingEmployeeCity,
  deleteExistingEmployeeCity,
  getAppointmentCityReport,
  // ===================================CITY ADMIN END ==========================================//

  // ===================================COUNTRY ADMIN START ==========================================//
  getCountryNationalHoliday,
  addCountryNationalHoliday,
  deleteCountryNationalHoliday,
  getCountryWorkingDays,
  updateCountryWorkingDays,
  getCountryCities,
  addCountryCity,
  updateCountryCity,
  deleteCountryCity,
  getCountryServiceScreen,
  updateCountryServiceScreen,
  getAllBranchServiceCity,
  getAllBranchShiftServiceCity,
  getAllBranchCounterServiceCity,
  // ===================================COUNTRY ADMIN END ==========================================//

  // ===================================GLOBAL ADMIN START ==========================================//
  getCountryList,
  addCountryList,
  updateCountryList,
  deleteCountryList,
  getGlobalServiceList,
  addGlobalServiceList,
  updateGlobalServiceList,
  deleteGlobalServiceList,
  // ===================================GLOBAL ADMIN END ==========================================//
};

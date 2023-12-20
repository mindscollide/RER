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

//for add country National Holiday COUNTRY ADMIN
const addCountryNationalHoliday = {
  RequestMethod: "ServiceManager.AddCountryNationalHoliday",
};

//for delete country National Holiday COUNTRY ADMIN
const deleteCountryNationalHoliday = {
  RequestMethod: "ServiceManager.DeleteCountryNationalHoliday",
};

//GET APPOINTMENT REPORT BRANCH

const getAppointmentBranchReport = {
  RequestMethod: "ServiceManager.GetAppointmentReportBranchAdmin",
};

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
  // ===================================CITY ADMIN END ==========================================//

  // ===================================COUNTRY ADMIN START ==========================================//
  getCountryNationalHoliday,
  addCountryNationalHoliday,
  deleteCountryNationalHoliday,
  // ===================================COUNTRY ADMIN END ==========================================//
  getAppointmentBranchReport,
};

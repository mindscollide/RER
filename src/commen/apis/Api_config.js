let token = JSON.parse(localStorage.getItem("token"));

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

// for Update Branch Services
const updateBranchServices = {
  RequestMethod: "ServiceManager.UpdateBranchServices",
};

//For update branch Counter

const updateBranchCounter = {
  RequestMethod: "ServiceManager.UpdateBranchCounter",
};

//For Delelte Branch Counter
const deleteBranchCounter = {
  RequestMethod: "ServiceManager.DeleteBranchCounter",
};

export {
  token,
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
  updateBranchServices,
  updateBranchCounter,
  deleteBranchCounter,
};

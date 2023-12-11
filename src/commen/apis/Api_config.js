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

// for Set Last Selected Language from Dropedown
const allShiftsOfBranch = {
  RequestMethod: "ServiceManager.GetAllShiftsOfBranch",
};

export {
  token,
  logIn,
  roleList,
  systemSupportedLanguage,
  lastSelectedLanguage,
  updateLastSelectedLanguage,
  allShiftsOfBranch,
};

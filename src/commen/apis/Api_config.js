const token = localStorage.getItem("token");

// for login
const logIn = {
  token: token,
  RequestMethod: "ServiceManager.Login",
};

// for user role list
const roleList = {
  token: token,
  RequestMethod: "ServiceManager.RoleList",
};

// for Get System Supported Language for drope down option
const systemSupportedLanguage = {
  token: token,
  RequestMethod: "ServiceManager.GetSystemSupportedLanguage",
};

// for Get Last Selected Language for shown
const lastSelectedLanguage = {
  token: token,
  RequestMethod: "ServiceManager.GetLastSelectedLanguage",
};

// for Set Last Selected Language from Dropedown
const updateLastSelectedLanguage = {
  token: token,
  RequestMethod: "ServiceManager.SetLastSelectedLanguage",
};

export {
  logIn,
  roleList,
  systemSupportedLanguage,
  lastSelectedLanguage,
  updateLastSelectedLanguage,
};

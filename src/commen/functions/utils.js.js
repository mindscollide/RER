export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// Your generateMenuItems function
export function generateMenuItems(roleID, t) {
  const GlobalAdmin = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("Services"), "21"),
        getItem(t("Country"), "22"),
        getItem(t("City"), "23"),
        getItem(t("Branch"), "24"),
        getItem(t("Employee"), "25"),
        getItem(t("Shifts"), "26"),
        getItem(t("Counters"), "27"),
      ],
      "menu-item-sub"
    ),
    getItem(
      <div className="setup-text-style">{t("Reports")}</div>,
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "12"),
        getItem(t("City-wise-reports"), "13"),
        getItem(t("Branch-wise-reports"), "14"),
        getItem(t("Employee-wise-reports"), "15"),
        getItem(t("Service-wise-reports"), "16"),
      ],
      "menu-item-sub"
    ),
  ];
  const CountryAdmin = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("City"), "12"),
        getItem(t("Services"), "13"),
        getItem(t("Branch"), "14"),
        getItem(t("Shifts"), "15"),
        getItem(t("Counters"), "16"),
        getItem(t("Employee"), "17"),
        getItem(t("Holidays"), "19"),
        getItem(t("Working-days"), "29"),
      ],
      "menu-item-sub"
    ),
    getItem(
      <div className="setup-text-style">{t("Reports")}</div>,
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "12"),
        getItem(t("City-wise-reports"), "13"),
        getItem(t("Branch-wise-reports"), "14"),
        getItem(t("Employee-wise-reports"), "15"),
        getItem(t("Service-wise-reports"), "16"),
      ],
      "menu-item-sub"
    ),
  ];
  const CityAdmin = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("Branch"), "5"),
        getItem(t("Services"), "20"),
        getItem(t("Shifts"), "7"),
        getItem(t("Counters"), "8"),
        getItem(t("Employee"), "9"),
      ],
      "menu-item-sub"
    ),
    getItem(
      <div className="setup-text-style">{t("Reports")}</div>,
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "12"),
        getItem(t("City-wise-reports"), "13"),
        getItem(t("Branch-wise-reports"), "14"),
        getItem(t("Employee-wise-reports"), "15"),
        getItem(t("Service-wise-reports"), "16"),
        getItem(t("Appointment-report-city"), "30"),
      ],
      "menu-item-sub"
    ),
  ];
  const BranchAdmin = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("Shifts"), "2"),
        getItem(t("Counters"), "3"),
        getItem(t("Services"), "4"),
        getItem(t("Branch-roaster"), "18"),
      ],
      "menu-item-sub"
    ),
    getItem(
      <div className="setup-text-style">{t("Reports")}</div>,
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "12"),
        getItem(t("City-wise-reports"), "13"),
        getItem(t("Branch-wise-reports"), "14"),
        getItem(t("Employee-wise-reports"), "15"),
        getItem(t("Service-wise-reports"), "16"),
        getItem(t("Appoinment-report"), "28"),
      ],
      "menu-item-sub"
    ),
  ];

  const BranchEmployee = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("City-admin"), "5"),
        getItem(t("City-wise-branch-services"), "6"),
        getItem(t("City-branch-wise-shifts"), "7"),
        getItem(t("City-branch-shifts-wise-counter"), "8"),
        getItem(t("Employee-main"), "9"),
        getItem(t("Country-city-wise-counter"), "10"),
        getItem(t("Country-main"), "11"),
      ],
      "menu-item-sub"
    ),
    getItem(
      <div className="setup-text-style">{t("Reports")}</div>,
      "sub2",
      <i className="icon-file side-bar-icons"></i>,
      [
        getItem(t("Country-wise-reports"), "12"),
        getItem(t("City-wise-reports"), "13"),
        getItem(t("Branch-wise-reports"), "14"),
        getItem(t("Employee-wise-reports"), "15"),
        getItem(t("Service-wise-reports"), "16"),
      ],
      "menu-item-sub"
    ),
  ];
  // Check roleID and append specific items
  if (roleID === "1") {
    // Add items specific to roleID 1
    return GlobalAdmin;
  } else if (roleID === "2") {
    // Add items specific to roleID 2
    return CountryAdmin;
  } else if (roleID === "3") {
    // Add items specific to roleID 3
    return CityAdmin;
  } else if (roleID === "4") {
    // Add items specific to roleID 4
    return BranchAdmin;
  } else if (roleID === "3") {
    // Add items specific to roleID 5
    return BranchEmployee;
  }

  // Default items if roleID doesn't match any condition
  return [
    getItem(
      <div className="setup-text-style">{t("Default-menu-item")}</div>,
      "defaultKey"
    ),
    // Add other default items if needed
    // ...
  ];
}
// ================== This is used for covert json all key values first charactor itno capitle =========//
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Recursively capitalize keys in an object
const capitalizeObjectKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = capitalizeFirstLetter(key);
      newObj[newKey] =
        typeof obj[key] === "object"
          ? capitalizeObjectKeys(obj[key])
          : obj[key];
    }
  }
  return newObj;
};

// Capitalize keys in an array of objects
export function capitalizeKeysInArray(arr) {
  return arr.map((item) => capitalizeObjectKeys(item));
}
// ================== End This is used for covert json all key values first charactor itno capitle =========//

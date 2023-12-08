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
  const BranchAdmin = [
    getItem(
      <div className="setup-text-style">{t("Setups")}</div>,
      "sub1",
      <i className="icon-settings side-bar-icons"></i>,
      [
        getItem(t("Shift"), "2"),
        getItem(t("Counter-admin"), "3"),
        getItem(t("Branch-service"), "4"),
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
  if (roleID === "4") {
    // Add items specific to roleID 4
    return BranchAdmin;
  } else if (roleID === "3") {
    // Add items specific to roleID 5
    return CityAdmin;
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

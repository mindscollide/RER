import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import imageProfile from "../../../assets/images/profile3.png";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSystemSupportedLanguage,
  setLastSelectedLanguage,
} from "../../../store/actions/Admin_action";
import { Loader } from "../../elements";
import { signOut } from "../../../store/actions/Auth_action";

const Header = ({ isLoginScreen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.Loader.Loading);
  const supportedLanguage = useSelector(
    (state) => state.admin.supportedLanguage
  );
  // const dropdownRef = useRef(null);
  let currentUserID = Number(localStorage.getItem("userID"));
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    systemSupportedLanguageID:
      localStorage.getItem("i18nextLng") === null
        ? 1
        : localStorage.getItem("i18nextLng") === "en"
        ? 1
        : 2,
    languageTitle:
      localStorage.getItem("i18nextLng") === null
        ? "English"
        : localStorage.getItem("i18nextLng") === "en"
        ? "English"
        : "عربى",
    code:
      localStorage.getItem("i18nextLng") === null
        ? "en"
        : localStorage.getItem("i18nextLng"),
  });

  // Assuming "en" is the default language
  const callAPIOnPageLoad = async () => {
    if (location.pathname === "/" || location.pathname === "/Forgot") {
      await dispatch(getSystemSupportedLanguage(t, i18n, navigate, "login"));
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage(localStorage.getItem("i18nextLng"));
      }, 100);
      document.body.dir =
        localStorage.getItem("i18nextLng") === "ar" ? "rtl" : "ltr";
      moment.locale(localStorage.getItem("i18nextLng"));
    } else {
      let data = { UserID: Number(currentUserID) };
      await dispatch(
        getSystemSupportedLanguage(t, i18n, navigate, "main", data)
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") === null) {
      if (location.pathname === "/" || location.pathname === "/Forgot") {
        console.log("i18nextLng head", localStorage.getItem("i18nextLng"));
        dispatch(getSystemSupportedLanguage(t, i18n, navigate, "login"));
        setTimeout(() => {
          i18n.changeLanguage("en");
        }, 100);
        localStorage.setItem("i18nextLng", "en");
        document.body.dir = "ltr";
        moment.locale("en");
      } else {
        console.log("i18nextLng head", localStorage.getItem("i18nextLng"));
        dispatch(getSystemSupportedLanguage(t, i18n, navigate, "BranchAdmin"));
        setTimeout(() => {
          i18n.changeLanguage("en");
        }, 100);
        localStorage.setItem("i18nextLng", "en");
        document.body.dir = "ltr";
        moment.locale("en");
      }
    } else {
      callAPIOnPageLoad();
    }
  }, []);

  const handleChangeLocale = async (eventKey, event) => {
    let lang = Number(eventKey);
    if (location.pathname === "/" || location.pathname === "/Forgot") {
      setSelectedLanguage({
        languageTitle: lang === 2 ? "عربى" : "English",
        systemSupportedLanguageID: lang,
        code: lang === 2 ? "ar" : "en",
      });
      const newLanguage = lang === 2 ? "ar" : "en";
      // Change the language using i18next instance directly
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage(newLanguage);
      }, 100);
      console.log("i18nextLng", newLanguage);

      localStorage.setItem("i18nextLng", newLanguage);
      moment.locale(newLanguage);
      // Set document direction based on the selected language
      document.body.dir = lang === 2 ? "rtl" : "ltr";
    } else {
      let data = {
        UserID: Number(currentUserID),
        SystemSupportedLanguageID: Number(lang),
      };
      await dispatch(
        setLastSelectedLanguage(t, i18n, navigate, data, setSelectedLanguage)
      );
    }
  };

  const handleSelectFromHeaderMenu = async (eventKey, event) => {
    let lang = Number(eventKey);
    if (lang === 3) {
      await dispatch(signOut(navigate));
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Navbar expand="lg" className="site-header">
        <Container fluid className="page-gutter">
          <Navbar.Brand href="#">
            {location.pathname !== "/" && location.pathname !== "/Forgot" ? (
              <>
                <img
                  src={process.env.PUBLIC_URL + "/REM-Logo.svg"}
                  width="110"
                  alt="REM Logo"
                />
              </>
            ) : null}
          </Navbar.Brand>
          <Nav
            className="align-items-center flex-row flex-sm-row flex-xs-column 
          flex-md-row 
          flex-lg-row flex-xl-row"
          >
            {/* Language Dropdown */}

            <NavDropdown
              title={
                <div className="language-dd d-flex align-items-center ps-2">
                  <span className="user-name text-truncate">
                    {" "}
                    {selectedLanguage.code === "en" ? "English" : "عربى"}
                  </span>
                  <span
                    className="user-thumb-globe"
                    style={
                      selectedLanguage.code === "en"
                        ? { marginRight: "5px" }
                        : { marginLeft: "5px" }
                    }
                  >
                    <i className="icon-globe icon-globe-color"></i>
                  </span>
                </div>
              }
              onSelect={handleChangeLocale}
              id="user-dropdown"
              menuVariant="light"
              className="ms-md-2" // Margin added to separate dropdowns on larger screens
            >
              {supportedLanguage != null &&
                supportedLanguage.map((LangData, index) => {
                  return (
                    <NavDropdown.Item
                      key={Number(LangData.systemSupportedLanguageID)}
                      data-bs-toggle="modal"
                      data-bs-target="#UserSettingModal"
                      eventKey={Number(LangData.systemSupportedLanguageID)}
                    >
                      {LangData.languageTitle}
                    </NavDropdown.Item>
                  );
                })}
            </NavDropdown>

            {/* User Dropdown */}
            {location.pathname !== "/" && location.pathname !== "/Forgot" ? (
              <>
                <NavDropdown
                  title={
                    <div className="user-dd d-flex align-items-center ps-2">
                      <span
                        className="user-name-two text-truncate"
                        style={
                          selectedLanguage.code === "en"
                            ? { marginRight: "5px" }
                            : { marginLeft: "5px" }
                        }
                      >
                        {selectedLanguage.code === "en"
                          ? localStorage.getItem("name")
                          : localStorage.getItem("nameArabic")}
                      </span>
                      <span className="user-thumb">
                        <img
                          className="rounded-circle img-fluid"
                          src={imageProfile}
                          alt="user"
                        />
                      </span>
                    </div>
                  }
                  onSelect={handleSelectFromHeaderMenu}
                  id="user-dropdown"
                  menuVariant="light"
                >
                  <NavDropdown.Item
                    data-bs-toggle="modal"
                    data-bs-target="#UserSettingModal"
                    eventKey={1}
                  >
                    <i className="icon-settings me-1" />
                    {t("Setting")}
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={2}>
                    <i className="icon-lock me-1"></i>
                    {t("Lock-screen")}
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={3}>
                    <i className="icon-logout me-1"></i>
                    {t("Logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

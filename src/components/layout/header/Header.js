import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import imageProfile from "../../../assets/images/profile3.png";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Header = ({ isLoginScreen }) => {
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState({
    systemSupportedLanguageID: 1,
    languageTitle: "English",
    code: "en",
  }); // Assuming "en" is the default language
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();
  let currentUserID = Number(localStorage.getItem("userID"));

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    setTimeout(() => {
      // window.location.reload()
      i18n.changeLanguage("en");
    }, 100);
    localStorage.setItem("i18nextLng", "en");
    moment.locale("en");
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChangeLocale = (eventKey, event) => {
    let lang = Number(eventKey);
    let data = {
      UserID: currentUserID,
      SystemSupportedLanguageID: lang,
    };

    // Dispatch your language change action here if needed
    // dispatch(changeNewLanguage(data, navigate, t));

    setSelectedLanguage({
      languageTitle: lang === 1 ? "Arabic" : lang === 2 ? "English" : "French",
      systemSupportedLanguageID: lang,
      code: lang === 1 ? "ar" : lang === 2 ? "en" : "fr",
    });
    const newLanguage = lang === 1 ? "ar" : lang === 2 ? "en" : "fr";
    // Change the language using i18next instance directly
    setTimeout(() => {
      // window.location.reload()
      i18n.changeLanguage(newLanguage);
    }, 100);
    localStorage.setItem("i18nextLng", newLanguage);
    moment.locale(newLanguage);
    // Set document direction based on the selected language
    document.body.dir = lang === 1 ? "rtl" : "ltr";
  };

  return (
    <>
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
              <NavDropdown.Item
                data-bs-toggle="modal"
                data-bs-target="#UserSettingModal"
                eventKey={2}
              >
                English
              </NavDropdown.Item>
              <NavDropdown.Item eventKey={1}>عربى</NavDropdown.Item>
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
                        Owais Wajid
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
                  id="user-dropdown"
                  menuVariant="light"
                >
                  <NavDropdown.Item
                    data-bs-toggle="modal"
                    data-bs-target="#UserSettingModal"
                  >
                    <i className="icon-settings me-1" />
                    Setting
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <i className="icon-lock me-1"></i>Lock Screen
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <i className="icon-logout me-1"></i>Logout
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

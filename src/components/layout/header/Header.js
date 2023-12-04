import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import imageProfile from "../../../assets/images/profile3.png";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("En");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
  };

  const handleTitleClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid className="page-gutter">
          <Navbar.Brand href="#">
            <img
              src={process.env.PUBLIC_URL + "/REM-Logo.svg"}
              width="110"
              className="img-fluid"
              alt="REM Logo"
            />
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <div
              ref={dropdownRef}
              className={`custom-dropdown ${dropdownVisible ? "open" : ""}`}
              onClick={handleTitleClick}
            >
              <span
                className={`custom-dropdown-title ${
                  selectedLanguage === "En" ? "english" : "arabic"
                }`}
              >
                {selectedLanguage === "En" ? "English" : "عربى"}
              </span>
              {dropdownVisible && (
                <div className="custom-dropdown-content">
                  <span
                    className={selectedLanguage === "En" ? "english" : "arabic"}
                    onClick={() => handleLanguageSelect("En")}
                  >
                    English
                  </span>
                  <span
                    className={selectedLanguage === "Ar" ? "english" : "arabic"}
                    onClick={() => handleLanguageSelect("Ar")}
                  >
                    عربى
                  </span>
                </div>
              )}
            </div>
            <i className="icon-globe"></i>
            {/* Language Dropdown */}

            {/* User Dropdown */}
            <NavDropdown
              title={
                <div className="user-dd d-flex align-items-center ps-2">
                  <span className="user-name text-truncate">Owais Wajid</span>
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React from "react";
import "./Header.css";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";

const Header = () => {
  return (
    <div className="site-header">
      {/* Container */}
      <Container className="page-gutter">
        {/* Header inner container */}
        <div className="header-inner">
          <div className="site-logo">
            <img
              src={process.env.PUBLIC_URL + "/REM-Logo.svg"}
              width="110"
              className="img-fluid"
              alt="REM Logo"
            />
          </div>
          <div className="ms-auto">
            <div className="d-flex align-items-center">
              {/* Language dropdown */}
              <div className="lang-dd custom-width me-3">
                <select className="form-control pe-3 text-end">
                  <option value="En">English</option>
                  <option value="Ar">عربى</option>
                </select>
              </div>

              {/* User Dropdown */}
              <Dropdown className="user-ddd d-flex align-items-center ps-2">
                <Dropdown.Toggle
                  id="user-dropdown"
                  className="user-thumb button-background"
                >
                  <span className="user-name text-truncate">Owais Wajid</span>
                  {/* <img
                    className="rounded-circle img-fluid"
                    src="img/profile3.png"
                    alt="user"
                  /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#UserSettingModal"
                  >
                    <i className="icon-settings me-1"></i>Setting
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">
                    <i className="icon-lock me-1"></i>Lock Screen
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">
                    <i className="icon-logout me-1"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* Header inner container */}
      </Container>
      {/* Container */}
    </div>
  );
};

export default Header;

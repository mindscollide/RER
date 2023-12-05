import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import LanguageIcon from "../../../assets/images/Language.svg";
// import LanguageArrowDown from "../../../assets/images/New folder/LanguaugeSelector_Down.svg";
// import LanguageArrowUp from "../../../assets/images/New folder/LanguaugeSelector_Up.svg";
// import LanguageArrowDownBlack from "../../../assets/images/New folder/Language_ArrowDown.svg";
// import LanguageArrowUpBlack from "../../../assets/images/New folder/Language_ArrowUp.svg";
// import LanguageBlack from "../../../assets/images/Language_Black.svg";
// import styles from "./Language-selector.module.css";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
// import {
//   getAllLanguages,
//   getSelectedLanguage,
//   changeNewLanguage,
// } from "../../../store/actions/Language_actions";
import moment from "moment";

const LanguageSelector = ({ dropdownVisible }) => {
  //   const { LanguageReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentUserID = Number(localStorage.getItem("userID"));
  const languageref = useRef();
  const location = useLocation();
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState({
    systemSupportedLanguageID: 1,
    languageTitle: "English",
    code: "en",
  });

  useEffect(() => {
    // dispatch(getAllLanguages(navigate, t));
  }, []);

  useEffect(() => {
    if (
      currentUserID !== null &&
      currentUserID !== undefined &&
      currentUserID !== 0
    ) {
      let data = { UserID: currentUserID };
      //   dispatch(getSelectedLanguage(data, navigate, t));
    }
  }, []);

  const handleChangeLocale = (lang) => {
    setLanguageDropdown(false);

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
    i18n.language = newLanguage;
    localStorage.setItem("i18nextLng", newLanguage);
    moment.locale(newLanguage);

    // Set document direction based on the selected language
    document.documentElement.dir = lang === 1 ? "rtl" : "ltr";
  };

  const handleOutsideClick = (event) => {
    if (
      languageref.current &&
      !languageref.current.contains(event.target) &&
      languageDropdown
    ) {
      setLanguageDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [languageDropdown]);

  return (
    <section>
      <span
        className={`custom-dropdown-title ${
          selectedLanguage.code === "en" ? "english" : "arabic"
        }`}
      >
        {selectedLanguage.code === "en" ? "English" : "عربى"}
      </span>
      {dropdownVisible && (
        <div className="custom-dropdown-content">
          <span
            className={selectedLanguage.code === "en" ? "english" : "arabic"}
            onClick={() => handleChangeLocale(2)}
          >
            English
          </span>
          <span
            className={selectedLanguage.code === "ar" ? "arabic" : "french"}
            onClick={() => handleChangeLocale(1)}
          >
            عربى
          </span>
        </div>
      )}
    </section>
  );
};

export default LanguageSelector;

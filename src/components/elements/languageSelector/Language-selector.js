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
  let currentLanguage = localStorage.getItem("i18nextLng");
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
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

  //   useEffect(() => {
  //     if (
  //       LanguageReducer.AllLanguagesData !== null &&
  //       LanguageReducer.AllLanguagesData !== undefined &&
  //       LanguageReducer.AllLanguagesData.length !== 0
  //     ) {
  //       let newValues = [];
  //       LanguageReducer.AllLanguagesData.map((langValues, index) => {
  //         newValues.push({
  //           languageTitle:
  //             langValues.systemSupportedLanguageID === 1
  //               ? t("English")
  //               : langValues.systemSupportedLanguageID === 2
  //               ? t("Arabic")
  //               : langValues.systemSupportedLanguageID === 3
  //               ? t("French")
  //               : "",
  //           systemSupportedLanguageID: langValues.systemSupportedLanguageID,
  //         });
  //       });

  //       setLanguages(newValues);
  //     }
  //   }, [LanguageReducer.AllLanguagesData]);

  //   useEffect(() => {
  //     if (
  //       LanguageReducer.SetLanguageData !== null &&
  //       LanguageReducer.SetLanguageData !== undefined &&
  //       LanguageReducer.SetLanguageData.length !== 0
  //     ) {
  //       setSelectedLanguage({
  //         ...selectedLanguage,
  //         systemSupportedLanguageID:
  //           LanguageReducer.SetLanguageData.systemSupportedLanguageID,
  //         languageTitle: LanguageReducer.SetLanguageData.languageTitle,
  //         code:
  //           LanguageReducer.SetLanguageData.systemSupportedLanguageID === 1
  //             ? "en"
  //             : LanguageReducer.SetLanguageData.systemSupportedLanguageID === 2
  //             ? "ar"
  //             : LanguageReducer.SetLanguageData.systemSupportedLanguageID === 3
  //             ? "fr"
  //             : "",
  //       });
  //     }
  //   }, [LanguageReducer.SetLanguageData]);

  const handleChangeLocale = (lang) => {
    setLanguageDropdown(false);
    // setLanguage(lang)
    let data = {
      UserID: currentUserID,
      SystemSupportedLanguageID: lang,
    };
    // dispatch(changeNewLanguage(data, navigate, t));
    if (lang === 1) {
      setSelectedLanguage({
        languageTitle: "English",
        systemSupportedLanguageID: 1,
        code: "en",
      });
      localStorage.setItem("i18nextLng", "en");
      moment.locale("en");
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage("en");
      }, 100);
    } else if (lang === 2) {
      setSelectedLanguage({
        languageTitle: "Arabic",
        systemSupportedLanguageID: 2,
        code: "ar",
      });
      localStorage.setItem("i18nextLng", "ar");
      moment.locale("ar");
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage("ar");
      }, 100);
    } else {
      setSelectedLanguage({
        languageTitle: "French",
        systemSupportedLanguageID: 3,
        code: "fr",
      });
      localStorage.setItem("i18nextLng", "fr");
      moment.locale("fr");
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage("fr");
      }, 1000);
    }
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

  // useEffect(() => {
  //   if (currentLanguage === "ar") {
  //     document.body.dir = "rtl";
  //     i18n.changeLanguage("ar");
  //   } else if (currentLanguage === "fr") {
  //     document.body.dir = "ltr";
  //     i18n.changeLanguage("fr");
  //   } else {
  //     document.body.dir = "ltr";
  //     i18n.changeLanguage("en");
  //   }
  // }, [currentLanguage]);

  return (
    <section>
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
            onClick={() => handleChangeLocale(2)}
          >
            English
          </span>
          <span
            className={selectedLanguage === "Ar" ? "english" : "arabic"}
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

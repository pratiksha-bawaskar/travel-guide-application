import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ textAlign: "right", padding: "10px 20px" }}>
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("hi")} style={{ marginLeft: 10 }}>
        हिंदी
      </button>
      <button onClick={() => changeLang("mr")} style={{ marginLeft: 10 }}>
        मराठी
      </button>
    </div>
  );
};

export default LanguageSwitcher;

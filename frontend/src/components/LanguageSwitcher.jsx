import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="language-menu">
      <button
        className="language-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        🌐 {currentLanguage.label} ▾
      </button>

      {open && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                i18n.language === lang.code ? "selected" : ""
              }`}
              onClick={() => changeLang(lang.code)}
            >
              {i18n.language === lang.code ? "✓ " : ""}
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
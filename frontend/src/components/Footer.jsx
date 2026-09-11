import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>© 2025 Travel Guide · {t("welcome")}</p>
    </footer>
  );
};

export default Footer;
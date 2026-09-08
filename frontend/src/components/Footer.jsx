import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        padding: "15px",
        marginTop: "40px",
        textAlign: "center",
        background: "#f2f2f2",
      }}
    >
      <p>© 2025 Travel Guide · {t("welcome")}</p>
    </footer>
  );
};

export default Footer;

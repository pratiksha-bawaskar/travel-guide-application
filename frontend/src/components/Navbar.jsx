import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav
      style={{
        display: "flex",
        padding: "15px 25px",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: 20 }}>
          {t("home")}
        </Link>
        <Link to="/favourites" style={{ marginRight: 20 }}>
          {t("favourites")}
        </Link>
      </div>

      <div>
        <Link to="/login" style={{ marginRight: 20 }}>
          {t("login")}
        </Link>
        <Link to="/register">{t("register")}</Link>
      </div>
    </nav>
  );
};

export default Navbar;

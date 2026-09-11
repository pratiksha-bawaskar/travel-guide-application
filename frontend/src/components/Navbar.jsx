import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">
          {t("home")}
        </Link>

        <Link to="/favourites" className="nav-link">
          {t("favourites")}
        </Link>

        <Link to="/my-trip" className="nav-link">
          🧳 My Trip
        </Link>
      </div>

      <div>
        <Link to="/login" className="nav-link">
          {t("login")}
        </Link>

        <Link to="/register" className="nav-link">
          {t("register")}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import api from "../../api/axiosInstance";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    api.post("/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        alert(t("welcome") + " " + res.data.username);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(() => alert(t("failedLoad")));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🌍</div>

        <h1>{t("login")}</h1>

        <p className="auth-subtitle">
          Explore amazing destinations and plan your journey.
        </p>

        <div className="form-group">
          <label>{t("email")}</label>
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t("password")}</label>
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-button" onClick={submitLogin}>
          {t("login")} →
        </button>

        <p className="auth-footer-text">
          Discover. Explore. Travel. ✈️
        </p>
      </div>
    </div>
  );
};

export default Login;
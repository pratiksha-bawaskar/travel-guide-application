import React, { useState } from "react";
import api from "../../api/axiosInstance";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitRegister = () => {
    api
  .post("/api/users/register", {
        username,
        email,
        password,
      })
      .then(() => {
        alert(t("createAccount"));

        setUsername("");
        setEmail("");
        setPassword("");
        setShowPassword(false);
      })
      .catch(() => alert(t("failedLoad")));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">✈️</div>

        <h1>{t("register")}</h1>

        <p className="auth-subtitle">
          Create your account and start exploring amazing destinations.
        </p>

        <div className="form-group">
          <label>{t("username")}</label>

          <input
            type="text"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button className="auth-button" onClick={submitRegister}>
          {t("register")} →
        </button>

        <p className="auth-footer-text">
          Your journey starts here. 🌍
        </p>
      </div>
    </div>
  );
};

export default Register;
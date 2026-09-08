import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    axios
      .post("http://localhost:8080/api/users/login", {
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
    <div style={{ padding: 20 }}>
      <h1>{t("login")}</h1>

      <input
        placeholder={t("email")}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder={t("password")}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submitLogin}>{t("login")}</button>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = () => {
    axios
      .post("http://localhost:8080/api/users/register", {
        username,
        email,
        password,
      })
      .then(() => alert(t("createAccount")))
      .catch(() => alert(t("failedLoad")));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{t("register")}</h1>

      <input
        placeholder={t("username")}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder={t("email")}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder={t("password")}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submitRegister}>{t("register")}</button>
    </div>
  );
};

export default Register;

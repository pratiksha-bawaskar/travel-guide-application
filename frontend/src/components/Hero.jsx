import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className="hero">
      <h1>{t("heroTitle")}</h1>
    </header>
  );
};

export default Hero;

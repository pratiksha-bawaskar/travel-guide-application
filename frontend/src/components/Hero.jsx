import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className="hero">
      <div className="hero-content">
        <p className="hero-badge">🌍 Explore • Discover • Travel</p>

        <h1>{t("heroTitle")}</h1>

        <p className="hero-subtitle">
          Discover beautiful destinations across India,
          explore local experiences, and plan your next journey.
        </p>

        <button
          className="hero-button"
          onClick={() =>
            document
              .querySelector(".places-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Destinations →
        </button>
      </div>
    </header>
  );
};

export default Hero;
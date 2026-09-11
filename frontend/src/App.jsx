import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./i18n";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Places from "./components/Places";
import PlaceDetails from "./components/PlaceDetails";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Footer from "./components/Footer";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Favourites from "./pages/Favourites.jsx";
import MyTrip from "./pages/MyTrip.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("travelGuideTheme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "travelGuideTheme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className="app">
      <div className="theme-toggle-container">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <LanguageSwitcher />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Places />
            </>
          }
        />

        <Route path="/place/:id" element={<PlaceDetails />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/my-trip" element={<MyTrip />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
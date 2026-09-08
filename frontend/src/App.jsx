import React from "react";
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

function App() {
  return (
    <div className="app">
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

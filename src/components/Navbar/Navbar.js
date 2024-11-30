import React from "react";
import "./Navbar.css";
import ToggleButton from "../ToggleButton/ToggleButton";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CineScope</h1>
      <div className="navbar_links">
        <ToggleButton />
        <a href="#popular">Popular</a>
        <a href="#top_rated">Top Rated</a>
        <a href="#upcoming">Upcoming</a>
      </div>
    </nav>
  );
};

export default Navbar;

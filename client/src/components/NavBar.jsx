import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../App.css";

const AppNavbar = () => {
  const [currentPage, handlePageChange] = useState("Home");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const userLoggedIn = Auth.loggedIn();

  // Update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 600) {
        // If the screen width is less than or equal to 600px, update the state
        setScreenWidth(newScreenWidth);
      } else {
        // If the screen width becomes larger than 600px, close the hamburger menu
        setScreenWidth(newScreenWidth);
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavOpen]);

  return (
    <nav>
      {/* Render hamburger menu icon for screen width <= 600px */}
      {screenWidth <= 600 && (
        <div className={`navbar-toggler ${isNavOpen ? "active" : ""}`} onClick={toggleNav}>
          <div className="burger-menu">
            <div className={`burger-bar ${isNavOpen ? "clicked" : "unclicked"}`}></div>
            <div className={`burger-bar ${isNavOpen ? "clicked" : "unclicked"}`}></div>
            <div className={`burger-bar ${isNavOpen ? "clicked" : "unclicked"}`}></div>
          </div>
        </div>
      )}

      {/* Conditionally render navigation links based on screen width and hamburger state */}
      {(screenWidth > 600 || isNavOpen) && (
        <ul className={`nav-links ${isNavOpen ? "open" : ""}`}>
          <div>
            <li>
              <Link
                to="/"
                onClick={() => {
                  handlePageChange("Home");
                  setIsNavOpen(false);
                }}
                className={currentPage === "Home" ? "active" : ""}
              >
                Home
              </Link>
            </li>
          </div>
          <div>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  handlePageChange("Login");
                  setIsNavOpen(false);
                }}
                className={currentPage === "Login" ? "active" : ""}
              >
                Login
              </Link>
            </li>
          </div>
          <div>
            <li>
              <Link
                to="/signup"
                onClick={() => {
                  handlePageChange("Signup");
                  setIsNavOpen(false);
                }}
                className={currentPage === "Signup" ? "active" : ""}
              >
                Signup
              </Link>
            </li>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default AppNavbar;

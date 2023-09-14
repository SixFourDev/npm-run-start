import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../App.css";

const AppNavbar = () => {
  const [currentPage, handlePageChange] = useState("Home");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isNavOpen, setIsNavOpen] = useState(false); // Add state for the mobile menu

  // Update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const userLoggedIn = Auth.loggedIn();

  return (
    <nav>
      {/* Render hamburger menu icon for screen width <= 600px */}
      {screenWidth <= 600 ? (
        <div
          className={`navbar-toggler ${isNavOpen ? "active" : ""}`}
          onClick={toggleNav}
        >
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
        </div>
      ) : (
        // Conditionally render navigation links based on screen width
        <ul className={`nav-links ${isNavOpen ? "open" : ""}`}>
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
        </ul>
      )}

      <ul>
        {userLoggedIn ? (
          <>
            <li>
              <Link
                to="/"
                onClick={() => {
                  Auth.logout();
                  setIsNavOpen(false); // Close the mobile menu when a link is clicked
                }}
                className="logout"
              >
                Logout
              </Link>
            </li>
            <li>
              <Link to="/signup" className="signup">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="login">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="signup">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default AppNavbar;

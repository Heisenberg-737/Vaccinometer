import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/Context";

export const Header = () => {
  const history = useHistory();
  const [scrolled, setScrolled] = useState(true);
  const [route, setRoute] = useState("/");
  const { logout, currentUser } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(window.location.pathname);
    setRoute(window.location.pathname);
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 10 ||
        document.body.scrollTop > 10
      ) {
        setScrolled(false);
      } else if (
        document.documentElement.scrollTop < 11 ||
        document.body.scrollTop < 11
      ) {
        setScrolled(true);
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  useEffect(() => {
    console.log(currentUser);
    setUser(currentUser);
  }, []);
  const handleLogout = async () => {
    await logout();
    history.push("/");
  };
  return (
    <div
      className="header"
      style={{
        background: scrolled ? "transparent" : "#0cb09799",
        color: scrolled ? (route === "/" ? "#ffffff" : "#0cb097") : "#ffffff",
      }}
    >
      <h1>
        <Link
          to={
            route.includes("/manufacturer")
              ? "/manufacturer"
              : route.includes("/hospital")
              ? "/hospital"
              : route.includes("/know_your_vaccine")
              ? "/"
              : "/"
          }
          style={{ color: "inherit", textDecoration: "none" }}
        >
          VACCINOMETER
        </Link>
      </h1>
      <div className="header__right">
        {route === "/" && (
          <p>
            <Link
              to="/login"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        )}
        {route === "/" && (
          <p>
            <Link
              to="/signup"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Signup
            </Link>
          </p>
        )}
        {route.includes("/manufacturer") && (
          <p>
            <Link
              to="/manufacturer/create_record"
              style={{ color: "#0cb097", textDecoration: "none" }}
            >
              Create Record
            </Link>
          </p>
        )}
        {route.includes("/hospital") && (
          <p>
            <Link
              to="/hospital/scan_vaccine"
              style={{ color: "#0cb097", textDecoration: "none" }}
            >
              Scan Vaccine
            </Link>
          </p>
        )}
        {(route.includes("/manufacturer") || route.includes("/hospital")) && (
          <p>
            <Link
              to="/manufacturer/history"
              style={{ color: "#0cb097", textDecoration: "none" }}
            >
              My History
            </Link>
          </p>
        )}
        {(route.includes("/manufacturer") || route.includes("/hospital")) && (
          <p onClick={handleLogout}>Logout</p>
        )}
      </div>
    </div>
  );
};

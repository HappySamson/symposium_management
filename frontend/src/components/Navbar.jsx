import React, { useEffect } from "react";
import { FaHome, FaInfoCircle, FaCalendarAlt, FaUsersCog, FaEnvelope, FaUserShield, FaList } from "react-icons/fa";
import { Collapse } from "bootstrap";
import "./Navbar.css";

export default function Navbar() {

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarCollapse = document.getElementById("navMenu");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div className="container">

        <a className="navbar-brand d-flex align-items-center fw-bold" href="#home">
          SYMPOSIUM 2025
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home"><FaHome className="me-1"/> Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about"><FaInfoCircle className="me-1"/> About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#events"><FaCalendarAlt className="me-1"/> Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#schedule"><FaList className="me-1"/>Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#team"><FaUsersCog className="me-1"/> Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact"><FaEnvelope className="me-1"/> Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-light btn-sm ms-2" href="/admin-login">
                <FaUserShield className="me-1"/> Admin Login
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
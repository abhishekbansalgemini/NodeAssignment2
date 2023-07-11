import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./CreateNavbar.css";

const CreateNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="create-navbar">
      <div className="create-navbar-brand">
        <Link to="/" className="create-navbar-logo">
          Registration form
        </Link>
      </div>

      <button className="create-navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      <div className={`create-navbar-menu ${isOpen ? "active" : ""}`}>
        <ul className="create-navbar-nav">
          <li className="create-nav-item">
            <Link to="/" className="create-nav-link">
              Home
            </Link>
          </li>
          <li className="create-nav-item">
            <Link to="/record" className="create-nav-link">
              View
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CreateNavbar;

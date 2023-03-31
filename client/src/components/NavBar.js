import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="https://www2.gov.bc.ca/StaticWebResources/static/gov3/images/gov_bc_logo.svg"
            alt="BC Service"
            width="150"
            height="75"
          />
        </Link>
      </div>
    </nav>
  );
}

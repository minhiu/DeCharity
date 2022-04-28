import React from "react";
import { Link } from "../routes";

const Header = () => {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link route="/#home">
          <a className="nav-link">Home</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link route="/#about">
          <a className="nav-link">About Us</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link route="/#faq">
          <a className="nav-link">FAQs</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link route="/#roadmap">
          <a className="nav-link">Road Map</a>
        </Link>
      </li>
      <li className="vl-wrapper">
        <div className="vl"></div>
      </li>
      <li className="nav-item">
        <Link route="/">
          <a className="nav-link">Campaigns</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link route="/profile">
          <a className="nav-link">Profile</a>
        </Link>
      </li>
    </ul>
  );
};

export default Header;

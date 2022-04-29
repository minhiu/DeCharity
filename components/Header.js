import Router from "next/router";
import React from "react";
import { Link } from "../routes";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import web3 from "../ethereum/web3";

const Header = () => {
  const onClickProfile = async () => {
    const accounts = await web3.eth.getAccounts();
    const loggedIn = accounts.length > 0;
    if (loggedIn) Router.push("/profile");
    else {
      NotificationManager.warning(
        "Please log in to your MetaMask and use Rinkeby Testnet",
        "Warning",
        3000
      );
    }
  };

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
        <Link route="/campaigns">
          <a className="nav-link">Campaigns</a>
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={onClickProfile} className="nav-link" role="button">
          Profile
        </a>
      </li>

      <NotificationContainer />
    </ul>
  );
};

export default Header;

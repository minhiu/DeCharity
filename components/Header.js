import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from '../routes';
import {Profile} from '../pages/Profile';

export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">DeCharity</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>  
        </Link>
        <Link href="/Profile">
          <a>Profile</a>
        </Link>
      </Menu.Menu>
    </Menu> 
  );
};
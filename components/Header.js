import React from "react";
import { Menu, Button } from "semantic-ui-react";
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
        <Link route="/Profile">
          <a className="item">Profile</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>  
        </Link>
        
      </Menu.Menu>
    </Menu> 
  );
};
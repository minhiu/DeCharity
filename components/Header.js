import React from "react";
import {Button, Menu } from "semantic-ui-react";
import { Link } from '../routes';

export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">DeCharity</a>
      </Link>
      
      <Menu.Menu position="right">
        <Link route="/campaign_owner_view">
            <a>
              <Button content='View Campaign' icon='magnify' primary />
            </a>
        </Link>
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>  
        </Link>
      </Menu.Menu>
    </Menu> 
  );
};
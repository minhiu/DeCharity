import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from '../routes';

export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">DeCharity</a>
      </Link>
        <Menu.Menu position="right">
        <Link route="/home">
          <a className="item">Home</a>
        </Link>
        <Link route="/about">
          <a className="item">About</a>
        </Link>
        <Link route="/contact">
          <a className="item">Contact</a>
        </Link>
        <Link route="/newsfeed">
          <a className='item'>Newsfeed</a>
        </Link>
        <Link route="/support">
          <a className='item'>Support</a>
        </Link>
      </Menu.Menu>
      <Menu.Menu position="right">
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
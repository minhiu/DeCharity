import React from "react";
import { Menu } from "semantic-ui-react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from '../routes';
import Loginheader from './LoginHeader';
export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">DeCharity</a>
      </Link>
      
      <Menu.Menu position="right">
        
        <Loginheader></Loginheader>
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
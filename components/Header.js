import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from '../routes';

//Basic header so that we can naviagate the site
export default () => {
  return (
    <Menu>
      {/*This is the link to the index*/}
      <Link route="/">
        <a className="item">DeCharity</a>
      </Link>
        <Menu.Menu position="right">
        {/*This is the link to the home page that does not display cmapaigns */}
        <Link route="/home">
          <a className="item">Home</a>
        </Link>
        {/*Displays info about DeCharity*/}
        <Link route="/about">
          <a className="item">About</a>
        </Link>
        {/*Link to contact the developrs*/}
        <Link route="/contact">
          <a className="item">Contact</a>
        </Link>
        {/*Link to a newsfeed where latest campaign updates will show.*/}
        <Link route="/newsfeed">
          <a className='item'>Newsfeed</a>
        </Link>
      </Menu.Menu>
      <Menu.Menu position="right">
        {/*This is the link to display a user's donated to campaigns */}
        <Link route="/campaigns/donatedCampaignsView/CampaignsIndex">
          <a className="item">Campaigns</a>
        </Link>
        {/*This is the link to the User's profile */}
        <Link route="/Profile">
          <a className="item">Profile</a>
        </Link>
        {/*A link to create a new campaign */}
        <Link route="/campaigns/new">
          <a className="item">+</a>  
        </Link>
        
      </Menu.Menu>
    </Menu> 
  );
};
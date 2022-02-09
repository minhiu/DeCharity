import React from "react";
import { Menu } from "semantic-ui-react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import ProfilePage from "./ProfilePage";

const LoginHeader = () => {

    const handleClick = () => {
        console.log('button clicked');
    }

    return (
        <button onClick={handleClick}>Profile</button>
    );
}

export default LoginHeader;
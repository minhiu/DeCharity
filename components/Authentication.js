import React from "react";
import { Box, Form, Input, Heading,Grid, Button, Message } from 'semantic-ui-react';
import { useMoralis } from "react-moralis";
const Moralis = require('moralis');

export const Authentication = () => {
  const {
    authenticate,
    user,
    authError,
    isAuthenticated,
    isAuthenticating,
    logout,
  } = useMoralis();
  

  const serverUrl = "https://v8fuoirhamw1.usemoralis.com:2053/server";
  const appId = "oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z";
  Moralis.start({ serverUrl, appId });
  return (
      <Grid>
        <Grid.Row>
          {isAuthenticated ? (
            <Button onClick={() => logout()}>Logout</Button> ) :
            (<Button onClick={() => authenticate()}>Authenticate</Button>)}
        </Grid.Row>
        
      </Grid>
  );
};
export default Authentication;
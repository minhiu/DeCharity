import React from "react";
import { Box, Form, Input, Heading,Grid, Button, Message } from 'semantic-ui-react';
import { useMoralis } from "react-moralis";


export const Authentication = () => {
  const {
    authenticate,
    user,
    authError,
    isAuthenticated,
    isAuthenticating,
    logout,
  } = useMoralis();

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
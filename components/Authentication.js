import React from "react";
import { Grid, Button } from 'semantic-ui-react';
import { useMoralis } from "react-moralis";

export const Authentication = () => {
  const {
    authenticate,
    isAuthenticated,
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
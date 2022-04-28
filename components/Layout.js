import React from "react";
import Header from "./Header";
import Head from "next/head";
import { Container } from "semantic-ui-react";

const Layout = (props) => {
  return (
    <Container style={{ marginTop: "10px" }}>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;

import React from "react";
import Header from "../Header";
import Image from "next/image";

const Home = (props) => {
  return (
    <div id="home">
      <Header />
      <div className="home-wrapper">
        <div className="pb-5">
          <Image
            src="/images/logo.png"
            className="fade-in"
            height={200}
            width={200}
          />
        </div>
        <p className="fade-in delay-1s">
          "a Decentralized Charity platform where everyone can Trust"
        </p>
      </div>
    </div>
  );
};

export default Home;

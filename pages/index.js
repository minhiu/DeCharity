import React, { Component } from "react";
import AboutUs from "../components/homepage/AboutUs";
import Home from "../components/homepage/Home";
import FAQs from "../components/homepage/FAQs";
import RoadMap from "../components/homepage/RoadMap";
import Footer from "../components/Footer";

class CampaignIndex extends Component {
  render() {
    return (
      <>
        <Home />
        <AboutUs />
        <FAQs />
        <RoadMap />
        <Footer backgroundColor={"#393e46"} color={"#fff"} />
      </>
    );
  }
}

export default CampaignIndex;

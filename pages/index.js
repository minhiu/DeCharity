import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card } from "semantic-ui-react";
import { Link } from "../routes";
import AboutUs from "../components/homepage/AboutUs";
import Home from "../components/homepage/Home";
import FAQs from "../components/homepage/FAQs";
import RoadMap from "../components/homepage/RoadMap";
import Footer from "../components/Footer";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    

    return (
      <>
        <Home />
        <AboutUs />
        <FAQs />
        <RoadMap />
        <Footer />
      </>
    );
  }
}

export default CampaignIndex;

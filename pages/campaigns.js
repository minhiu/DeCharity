import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../routes";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";

class Campaigns extends Component {
  state = {
    loadingCampaigns: true,
  };

  static getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  };

  renderCampaigns = () => {
    if (!this.props.campaigns.length) {
      return <h4>None</h4>;
    }
    return this.props.campaigns.map((item, index) => {
      return (
        <Card
          img="/images/background-campaign.jpg"
          address={item}
          description={"hello"}
          key={index}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div className="main-container">
          <Header />
          <div className="text-center pt-10">
            <Image src="/images/logo.png" height={100} width={100} />
          </div>
          <div id="project-card">
            <div className="text-center pb-5">
              <h2>Campaigns</h2>
              <div className="pt-5">
                <Link route="/campaigns/new">
                  <Button content="Create Campaign" icon="add circle" primary />
                </Link>
              </div>
            </div>
            <div className="wrapper">{this.renderCampaigns()}</div>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default Campaigns;

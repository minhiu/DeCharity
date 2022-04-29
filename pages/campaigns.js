import React, { Component } from "react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";
import web3 from "../ethereum/web3";

class Campaigns extends Component {
  state = {
    loadingCampaigns: true,
    account: "",
  };

  static getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  };

  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  };

  renderCampaigns = () => {
    if (!this.props.campaigns) {
      return <h4>None</h4>;
    }
    return this.props.campaigns.map((item, index) => {
      return (
        <Card
          img="/images/background-campaign.jpg"
          title={item}
          description={"hello"}
          key={index}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div id="profile">
          <Header />
          <div className="text-center pt-10 pb-10">
            <Image src="/images/logo.png" height={100} width={100} />
          </div>
          <div id="project-card">
            <div className="text-center pb-5">
              <h2>Campaigns</h2>
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

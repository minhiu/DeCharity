import React, { Component } from "react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import ScaleLoader from "react-spinners/ScaleLoader";

class Profile extends Component {
  state = {
    loadingDonatedCampaigns: true,
    account: "",
    totalDonated: 0,
  };

  static getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  };

  componentDidMount = async () => {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      this.donatedCampaigns = await this.getDonatedCampaigns();
      this.setState({ loadingDonatedCampaigns: false });
  };

  getDonatedCampaigns = async () => {
    const donatedCampaigns = [];
    let totalDonated = 0;

    for (const address of this.props.campaigns) {
      const campaign = Campaign(address);
      const hasDonated = await campaign.methods
        .contributors(this.state.account)
        .call();
      if (hasDonated) {
        const donatedCampaign = {};
        const donationValueWei = await campaign.methods
          .balances(this.state.account)
          .call();
        const donationValueEther = parseFloat(
          web3.utils.fromWei(donationValueWei)
        );
        totalDonated += donationValueEther;

        donatedCampaign.address = address;
        donatedCampaign.value = donationValueEther;
        donatedCampaigns.push(donatedCampaign);
      }
    }

    this.setState({ totalDonated });
    return donatedCampaigns;
  };

  renderDonatedCampaigns = () => {
    if (!this.donatedCampaigns.length) {
      return <h4>None</h4>
    }
    return this.donatedCampaigns.map((item, index) => {
      return (
        <Card
          img="/images/background-campaign.jpg"
          title={item.address}
          valueDonated={item.value}
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
            <h2>
              <a
                href={`https://rinkeby.etherscan.io/address/${this.state.account}`}
                target="_blank"
              >
                {this.state.account.substring(0, 5) +
                  "..." +
                  this.state.account.slice(this.state.account.length - 4)}
              </a>
            </h2>
            <p>
              Total Amount Donated:{" "}
              {this.state.loadingDonatedCampaigns ? (
                <ScaleLoader
                  loading={this.state.loadingDonatedCampaigns}
                  color={"#035397"}
                  height={15}
                />
              ) : (
                this.state.totalDonated
              )}{" "}
              ETH
            </p>
          </div>
          <div id="project-card">
            <div className="text-center pb-5">
              <h2>Donated Campaigns</h2>
            </div>
            <div className="wrapper">
              {this.state.loadingDonatedCampaigns ? (
                <ScaleLoader
                  color={"#035397"}
                  height={50}
                  width={10}
                  radius={50}
                  margin={5}
                />
              ) : (
                this.renderDonatedCampaigns()
              )}
            </div>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default Profile;

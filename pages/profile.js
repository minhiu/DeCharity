import React, { Component } from "react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Button } from "semantic-ui-react";

class Profile extends Component {
  state = {
    loadingCampaigns: true,
    account: "",
    totalDonated: 0,
    totalCreated: 0,
    showingDonatedCampaigns: true,
  };

  static getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  };

  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.donatedCampaigns = await this.getDonatedCampaigns();
    this.createdCampaign = await this.getCreatedCampaigns();
    this.setState({ loadingCampaigns: false });
  };

  componentWillUnmount = () => {
    this.setState({ account: "" });
  };

  getDonatedCampaigns = async () => {
    const donatedCampaigns = [];
    let totalDonated = 0;
    try {
      for (const address of this.props.campaigns) {
        const campaign = await Campaign(address);
        const hasDonated = await campaign.methods
          .contributors(this.state.account)
          .call();
        if (hasDonated) {
          const donatedCampaign = {};
          const donationValueWei = await campaign.methods
            .balances(this.state.account)
            .call();
          const donationValueEther = parseFloat(
            web3.utils.fromWei(donationValueWei, "ether")
          );
          totalDonated += donationValueEther;

          const summary = await campaign.methods.getSummary().call();
          donatedCampaign.balance = summary[1];
          donatedCampaign.title = summary[6];
          donatedCampaign.goal = summary[9];
          donatedCampaign.deadline = summary[10];
          donatedCampaign.startingFund = summary[11];
          donatedCampaign.address = address;
          donatedCampaign.value = donationValueEther;
          donatedCampaigns.push(donatedCampaign);
        }
      }

      this.setState({ totalDonated });
      return donatedCampaigns;
    } catch (err) {
      console.log(err);
    }
  };

  getCreatedCampaigns = async () => {
    const createdCampaigns = [];

    for (const address of this.props.campaigns) {
      const campaign = await Campaign(address);
      const isCreator =
        (await campaign.methods.manager().call()) == this.state.account;
      if (isCreator) {
        const createdCampaign = {};
        const summary = await campaign.methods.getSummary().call();
        createdCampaign.balance = summary[1];
        createdCampaign.title = summary[6];
        createdCampaign.category = summary[8];
        createdCampaign.goal = summary[9];
        createdCampaign.deadline = summary[10];
        createdCampaign.startingFund = summary[11];
        createdCampaign.address = address;
        createdCampaigns.push(createdCampaign);
      }
    }
    this.setState({ totalCreated: createdCampaigns.length });
    return createdCampaigns;
  };

  renderCampaigns = () => {
    const campaigns = this.state.showingDonatedCampaigns
      ? this.donatedCampaigns
      : this.createdCampaign;
    if (!campaigns.length) {
      return <h4>None</h4>;
    }
    return campaigns.map((item, index) => {
      return (
        <Card
          img="/images/background-campaign.jpg"
          address={item.address}
          valueDonated={this.state.showingDonatedCampaigns ? item.value : null}
          deadline={item.deadline}
          category={!this.state.showingDonatedCampaigns ? item.category : null}
          key={index}
          startingFund={item.startingFund}
          goal={item.goal}
          title={item.title}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div className="main-container">
          <Header />
          <div className="text-center pt-10 pb-10">
            <Image src="/images/logo.png" height={100} width={100} />
            <h2>
              <a
                href={`https://rinkeby.etherscan.io/address/${this.state.account}`}
                target="_blank"
              >
                {this.state.loadingCampaigns ? (
                  <ScaleLoader
                    loading={this.state.loadingCampaigns}
                    color={"#035397"}
                    height={15}
                  />
                ) : (
                  this.state.account.substring(0, 5) +
                  "..." +
                  this.state.account.slice(this.state.account.length - 4)
                )}
              </a>
            </h2>
            <p>
              Total Amount Donated:{" "}
              {this.state.loadingCampaigns ? (
                <ScaleLoader
                  loading={this.state.loadingCampaigns}
                  color={"#035397"}
                  height={15}
                />
              ) : (
                this.state.totalDonated
              )}{" "}
              ETH
            </p>
            <p>
              Total Campaigns Created:{" "}
              {this.state.loadingCampaigns ? (
                <ScaleLoader
                  loading={this.state.loadingCampaigns}
                  color={"#035397"}
                  height={15}
                />
              ) : (
                this.state.totalCreated
              )}{" "}
              Campaigns
            </p>
            <Button.Group>
              <Button
                onClick={() => this.setState({ showingDonatedCampaigns: true })}
                primary
              >
                Donated Campaigns
              </Button>
              <Button.Or />
              <Button
                onClick={() =>
                  this.setState({ showingDonatedCampaigns: false })
                }
                primary
              >
                Created Campaigns
              </Button>
            </Button.Group>
          </div>
          <div id="project-card">
            <div className="text-center pb-5">
              <h2>
                {this.state.showingDonatedCampaigns
                  ? "Donated Campaigns"
                  : "Created Campaigns"}
              </h2>
            </div>
            <div className="wrapper">
              {this.state.loadingCampaigns ? (
                <ScaleLoader
                  color={"#035397"}
                  height={50}
                  width={10}
                  radius={50}
                  margin={5}
                />
              ) : (
                this.renderCampaigns()
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

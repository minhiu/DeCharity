import React, { Component } from "react";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import NameForm from "../../components/NameForm";
import { Router, Link } from "../../routes";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/ProgressBar";
import DescriptionForm from "../../components/DescriptionForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    const isRejected = await campaign.methods.isRejected().call();
    return {
      address: address,
      minimumContribution: summary[0],
      balance: web3.utils.fromWei(summary[1], "ether"),
      requestsCount: summary[2],
      contributorsCount: summary[3],
      approversCount: summary[4],
      manager: summary[5],
      name: summary[6],
      description: summary[7],
      category: summary[8][0].toUpperCase() + summary[8].substr(1),
      goal: web3.utils.fromWei(summary[9], "ether"),
      startingFund: web3.utils.fromWei(summary[11], "ether"),
      deadline: new Date(summary[10] * 1000).toLocaleDateString(),
      isRejected: isRejected,
    };
  }

  constructor(props) {
    super();
    this.campaign = Campaign(props.address);
    this.state.isVisible = false;
  }

  async componentDidMount() {
    this.accounts = await web3.eth.getAccounts();
    const {
      manager
    } = this.props;
    this.setState({ isVisible: manager === this.accounts[0] }, () => {{}});

  }

  state = {
    loadingBecomingApprover: false,
  };

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      contributorsCount,
      approversCount,
      manager,
      name,
      description,
      category,
      goal,
      deadline,
      startingFund,
    } = this.props;

    const items = [
      {
        header:
          manager.substring(0, 5) + "..." + manager.slice(manager.length - 4),
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: name,
        meta: "Campaign Name",
        description:
          "Action without a name, a who attached to it, is meaningless.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(minimumContribution, "ether"),
        meta: "Minimum Contribution (ether)",
        description: "Minimum amount of donation in wei to become an approver.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: description,
        meta: "Campaign Description",
        description:
          "Brief description of how the manager plans to use the donation.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: category,
        meta: "Campaign Category",
        description: "Category of the campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: deadline,
        meta: "Campaign Deadline",
        description:
          "If the goal is not met by the deadline, all funds will be refunded to all donors.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contributorsCount,
        meta: "Number of Contributors",
        description:
          "Number of people who have already donated into this campaign.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have privileges to approve requests in this campaign.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: balance,
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: startingFund,
        meta: "Campaign Donated Balance (ether)",
        description:
          "The total balance donated to this Campaign. This does not reflect the current balance as refunds might happen.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: goal,
        meta: "Campaign Goal",
        description: "How much total fund does this campaign require to have",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }

  onBecomeApprover = async () => {
    this.setState({ loadingBecomingApprover: true });
    try {
      await this.campaign.methods.becomeApprover().send({
        from: this.accounts[0],
      });
    } catch (err) {
      console.log(err);
    }

    this.setState({ loadingBecomingApprover: false });
    Router.replaceRoute(`/campaigns/${this.props.address}`);
  };

  render() {
    return (
      <>
        <div id="campaign-detail" className="main-container">
          <Header />
          <div className="wrapper">
            <div className="text-center mt-10 mb-5 position-relative">
              <Image src="/images/logo.png" height={100} width={100} />
              <h2>Campaigns Detail</h2>
              <h4 className={this.props.isRejected ? "rejected" : null}>
                {this.props.address}
              </h4>
              {this.props.isRejected ? (
                <h4 style={{ color: "#EE5007" }}>Rejected</h4>
              ) : null}
              <Grid.Row className="pt-5">
                <Grid.Column>
                  <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                      <Button primary>View Request</Button>
                    </a>
                  </Link>
                  <Button
                    secondary
                    onClick={this.onBecomeApprover}
                    loading={this.state.loadingBecomingApprover}
                  >
                    Become an approver
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <div className="progress-bar-wrapper mt-5">
                <ProgressBar
                  startingFund={this.props.startingFund}
                  goal={this.props.goal}
                />
              </div>
              <div className="contribute mt-5">
                <ContributeForm address={this.props.address} />
              </div>
              <div
                className="ui vertical animated button back-btn"
                tabIndex="0"
                onClick={() => Router.back()}
              >
                <div className="hidden content">
                  <i className="arrow alternate circle left icon"></i>
                </div>
                <div className="visible content">Back</div>
              </div>
            </div>
            <div className="campaign-info">
              <div className="cards-wrapper">{this.renderCards()}</div>
            </div>
            <div className="nameform mt-5">
              <NameForm address={this.props.address} visible={this.state.isVisible} />
            </div>
            <div className="descriptionform mt-5">
              <DescriptionForm address={this.props.address} visible={this.state.isVisible} />
            </div>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default CampaignShow;

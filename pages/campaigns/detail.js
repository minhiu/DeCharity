import React, { Component } from "react";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Router, Link } from "../../routes";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      contributorsCount: summary[3],
      approversCount: summary[4],
      manager: summary[5],
    };
  }

  constructor(props) {
    super();
    this.campaign = Campaign(props.address);
  }

  async componentDidMount() {
    this.accounts = await web3.eth.getAccounts();
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
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(minimumContribution, "ether"),
        meta: "Minimum Contribution (ether)",
        description: "Minimum amount of donation in wei to become an approver.",
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
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
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
              <h4>{this.props.address}</h4>
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

              <div className="contribute">
                <ContributeForm address={this.props.address} />
              </div>
            </div>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default CampaignShow;

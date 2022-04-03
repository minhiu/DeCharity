import React, { Component} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Image, Card, Grid, Button } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Router, Link } from '../../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Moralis = require('moralis');

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
      manager: summary[5]
    };
  }

  constructor(props) {
    super()
    this.campaign = Campaign(props.address);
    this.campaignPhoto = "";
  }

  async componentDidMount() {
    this.accounts = await web3.eth.getAccounts();

    const getPhoto = async (address) => {
      const serverUrl = "https://v8fuoirhamw1.usemoralis.com:2053/server";
      const appId = "oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z";
      await Moralis.start({serverUrl,appId});
      const query = new Moralis.Query( Moralis.Object.extend("Campaign"));
      console.log()
      query.equalTo("address", this.props.address);
      const result = await query.first();
      const photoUrl = await result.get("CampaignThumbnail");
      return photoUrl;
    }
    getPhoto(this.props.address).then(photoUrl => this.setState({campaignPhoto: photoUrl}));
  }

  state = {
    loadingBecomingApprover: false
  };

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      contributorsCount,
      approversCount,
      manager
    } = this.props;
    
    
    const items = [
      {
        header: manager,
        meta:'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(minimumContribution, 'ether'),
        meta:'Minimum Contribution (ether)',
        description: 'Minimum amount of donation in wei to become an approver.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta:'Number of Requests',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: contributorsCount,
        meta:'Number of Contributors',
        description: 'Number of people who have already donated into this campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta:'Number of Approvers',
        description: 'Number of people who have privileges to approve requests in this campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta:'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left to spend.',
        style: { overflowWrap: 'break-word' }
      }
    ]
    return (
        <Card.Group items={items} />
      );
  }

  onBecomeApprover = async () => {
    this.setState({ loadingBecomingApprover: true })
    try {
      await this.campaign.methods.becomeApprover().send({
        from: this.accounts[0]
      });
    } catch(err) { console.log(err) };
    
    this.setState({ loadingBecomingApprover: false });
    Router.replaceRoute(`/campaigns/${this.props.address}`);
  }

  render() {
    //Async function to get the campaign photo
    
    
    
    return (
      <Layout>
        <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          />
        </>
        <h3>Campaign Detail</h3>
        <img src={this.state.campaignPhoto} alt="Campaign Photo" style={{width: "50%"}}/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a> 
                  <Button primary>View Request</Button>
                </a>
              </Link>
              <Button secondary onClick={this.onBecomeApprover} loading={this.state.loadingBecomingApprover}>
                Become an approver
              </Button>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Layout>
    );
  };
}

export default CampaignShow;
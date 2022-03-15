import React, { Component, useState} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Container, Header, Card, Grid, Button } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Router, Link } from '../../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CampaignShow extends Component {
  constructor(props) {
    super(props);
    this.fileData = null;
    this.setFileData = this.setFileData.bind(this);
  }
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
  }

  async componentDidMount() {
    this.accounts = await web3.eth.getAccounts();
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
    return <Card.Group items={items} />
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
    
    return (
      <Layout>
        <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          />
        </>
        <h3>Campaign Detail</h3>
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
        <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server">
        <File setFileData={this.setFileData}></File>
        <Container>
          <CardCarousel img1={this.fileData ? this.fileData['_url']:"https://discountseries.com/wp-content/uploads/2017/09/default.jpg"} img2="https://discountseries.com/wp-content/uploads/2017/09/default.jpg" img3="https://discountseries.com/wp-content/uploads/2017/09/default.jpg"/>
        </Container>
        </MoralisProvider>
      </Layout>
      
      
    );
  };
}

export default CampaignShow;
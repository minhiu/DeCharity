import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import { File } from '../components/UploadFile';
import { Authentication } from '../components/Authentication';
import { SignUp }  from '../components/UserData';
import { MoralisProvider } from "react-moralis";

class CampaignIndex extends Component {
  
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      
      <Layout>
        <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server">
          <Authentication></Authentication>
          <File></File>
        
        
        <div>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <a>
              <Button floated="right" content='Create Campaign' icon='add circle' primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        
        <h3>View SelfCampaign</h3>
          <Link route="/campaign_owner_view">
            <a>
              <Button floated="right" content='View Campaign' icon='magnify' primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
        </MoralisProvider>
      </Layout>
    );
  };
}

export default CampaignIndex;
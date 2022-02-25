import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    toast("Welcome to DeCharity!");
    const notify = () => {toast("default notification")};
    return (
      <Layout>
        <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          />
        </>
        <div>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <a>
              <Button floated="right" content='Create Campaign' icon='add circle' primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
        <div>
          <button onClick={notify}>test notification</button>
        </div>
      </Layout>
    );
  };
}

export default CampaignIndex;
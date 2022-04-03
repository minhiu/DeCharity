import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Moralis = require('moralis');


class NewCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const address = await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });
        //There is definitely a better way to do this like we should just init this once but I'm not sure where because im not sure where our root is.
        const serverUrl = "https://v8fuoirhamw1.usemoralis.com:2053/server";
        const appId = "oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z";
        await Moralis.start({serverUrl,appId});
        const Campaign = Moralis.Object.extend('Campaign');
        const campaign = new Campaign();
        campaign.set('address', address.to);
        campaign.set('owner', accounts[0]);
        campaign.set('name', address.to);
        campaign.save();
        
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    
    this.setState({ loading: false });
  };
/*
  campaignNotify = async (event) => {
    event1.preventDefault();
    const campaignSuccess = () => {toast.success("Campaign successfully created.")}
    const campaignFail = () => {toast.error("Campaign could not be created.")}
    return campaignSuccess
  }
*/
  render() {
    return (
      <Layout>
        <>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          />
        </>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              label="wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })} 
            />
          </Form.Field>

          <Message error header="Oops..." content={this.state.errorMessage} />
          <Button type="submit" loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
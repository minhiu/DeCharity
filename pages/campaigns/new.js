import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import useMoralis from 'react-moralis';
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
      
        const tempuser = await Moralis.User.current();
        const Campaign = Moralis.Object.extend('Campaign');
        const newCampaign = new Campaign();
        newCampaign.set("owner",tempuser);
        newCampaign.set("address",accounts[0]);
        console.log(address);
        newCampaign.set("name",address[0]);
        newCampaign.save();  
        
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    
    
    
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
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
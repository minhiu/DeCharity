import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
<<<<<<< HEAD
<<<<<<< HEAD
import { useMoralis} from "react-moralis";
=======
import useMoralis from 'react-moralis';
const Moralis = require('moralis');
>>>>>>> 96e5015b6fb98b040a64694217e32b79400bdd66
=======
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> master

class NewCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    fileInfo: null,
  };
  setFileInfo = (fileInfo) => {
    this.setState({ fileInfo });
  }
  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const address = await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });
<<<<<<< HEAD
      const Campaign = Moralis.Object.Extend('Campaign');
      const thisCampaign = new Campaign();
      thisCampaign.set('address', address);
      const { authenticate, isAuthenticated, user } = useMoralis();
      thisCampaign.set('userID', user.get("authData").get("id"));
      thisCampaign.save();
=======
      
        const tempuser = await Moralis.User.current();
        const Campaign = Moralis.Object.extend('Campaign');
        const newCampaign = new Campaign();
        newCampaign.set("owner",tempuser);
        newCampaign.set("address",accounts[0]);
        console.log(address);
        newCampaign.set("name",address[0]);
        newCampaign.save();  
        
>>>>>>> 96e5015b6fb98b040a64694217e32b79400bdd66
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
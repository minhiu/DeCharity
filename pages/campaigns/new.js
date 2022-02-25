import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };
/*
  const notify = () => {
    const campaignSuccess = () => {toast.success("Campaign successfully created.")};
    const campaignFail = () => {toast.error("Campaign could not be created.")}
  }
*/
  render() {
    const campaignSuccess = () => {toast.success("Campaign successfully created.")};
    const campaignFail = () => {toast.error("Campaign could not be created.")}
    return (
      <Layout>
        <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
          <Button onClick={campaignFail} type="submit" loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
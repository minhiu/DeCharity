import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class NameForm extends Component {
  state = {
    value: '',
    loading: false,
    errorMessage: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.setCampaignName(this.state.value).send({from: accounts[0]});
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
    Router.replaceRoute(`/campaigns/${this.props.address}`);
  };

  render() {
    if (this.props.visible){
        return (
        
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                <Input 
                    placeholder="Edit Campaign Name"
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    
                />
                
                </Form.Field><Button loading={this.state.loading} primary>Submit Campaign Name Change</Button>
                <Message error header="Oops..." content={this.state.errorMessage} />
                
            </Form>
            )
    } else {
        return null
    }
  }
}

export default NameForm;
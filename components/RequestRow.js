import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import moment from 'moment';
import { Router } from '../routes';

class RequestRow extends Component {
  constructor(props) {
    super()
    this.campaign = Campaign(props.address);
  }

  async componentDidMount() {
    this.accounts = await web3.eth.getAccounts();
  }

  state = {
    loadingApprove: false,
    loadingReject: false,
    loadingFinalize: false,
    loadingClamingReward: false
  };

  onApprove = async () => {
    this.setState({ loadingApprove: true });
    try {
      await this.campaign.methods.approveRequest(this.props.id).send({
        from: this.accounts[0]
      });  
    } catch (err) {
      console.log(err)
     }
    this.setState({ loadingApprove: false });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  };

  onReject = async () => {
    this.setState({ loadingReject: true });
    try {
      await this.campaign.methods.rejectRequest(this.props.id).send({
        from: this.accounts[0]
      });  
    } catch (err) {
      console.log(err)
     }
    this.setState({ loadingReject: false });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  };

  onFinalize = async () => {
    this.setState({ loadingFinalize: true });
    try {
      await this.campaign.methods.finalizeRequest(this.props.id).send({
        from: this.accounts[0]
      });
    } catch (err) { }
    this.setState({ loadingFinalize: false });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  }

  onClaimingReward = async () => {
    this.setState({ onClaimingReward: true });
    try {
      this.campaign.methods.claimReward().send({
        from: this.accounts[0]
      });
    } catch (err) { }
    this.setState({ onClaimingReward: false });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
  }

  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;
    const readyToFinalize = request.approvalCount > request.totalVoteCount / 2;

    return (
      <Row disabled={request.completed} positive={readyToFinalize && !request.completed}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>
          <a href={`https://rinkeby.etherscan.io/address/${request.recipient}`} target="_blank">
            {'...' + request.recipient.substr(-4)}
          </a>
          </Cell>
        <Cell>{moment.unix(this.props.request.expirationDate).format('MM/DD/YY')}</Cell>
        <Cell>{`${request.approvalCount}/${request.totalVoteCount}`}</Cell>
        <Cell>
          {request.completed ? 
            (request.isApproved ? 'Approved' : 'Rejected') : 'On-Going'
          }
        </Cell>
        <Cell>
          {request.completed ? 
            null :
            <Button color="green" basic onClick={this.onApprove} loading={this.state.loadingApprove}>Approve</Button>
          }
        </Cell>
        <Cell>
          {request.completed ? 
            null :
            <Button color="red" basic onClick={this.onReject} loading={this.state.loadingReject}>Reject</Button>
          }
        </Cell>
        <Cell>
          {request.completed ?
            null :
            <Button color="teal" basic onClick={this.onFinalize} loading={this.state.loadingFinalize}>Finalize</Button>
          }
        </Cell>
        <Cell>
          {request.completed ?
            <Button color="blue" basic onClick={this.onClaimingReward} loading={this.state.onClaimingReward}>Claim</Button> :
            <Button color="blue" basic disabled>N/A</Button> 
          }
        </Cell>
      </Row>
    )
  }
}

export default RequestRow;
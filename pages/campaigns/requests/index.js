import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = await Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((elem, index) => {
          return campaign.methods.requests(index).call()
        })
    );

    return { address, requests, requestCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
        />
      )
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amout</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Expire</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Reject</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
              <HeaderCell>Reward</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>

        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  };
}

export default RequestIndex;
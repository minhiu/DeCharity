import React, { Component } from "react";
import Image from "next/image";
import web3 from "../../../ethereum/web3";
import { Link } from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import HeaderComponent from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Router } from "../../../routes";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    const campaignBalance = summary[1];
    const requestsCount = parseInt(summary[2]);
    const requests = await Promise.all(
      Array(requestsCount)
        .fill()
        .map((elem, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    const isRejected = await campaign.methods.isRejected().call();

    return {
      address,
      requests,
      requestsCount,
      campaignBalance,
      isRejected,
    };
  }

  state = {
    loadingRefund: false,
  };

  renderRows = () => {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          campaignBalance={this.props.campaignBalance}
          address={this.props.address}
        />
      );
    });
  };

  onIssueRefund = async () => {
    this.setState({ loadingRefund: true });
    try {
      const campaign = await Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.issueRefund().send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
    this.setState({ loadingRefund: false });
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <>
        <div id="requests" className="main-container">
          <HeaderComponent />
          <div className="wrapper">
            <div className="text-center mt-10 mb-5 position-relative">
              <Image src="/images/logo.png" height={100} width={100} />
              <h2>Requests</h2>
              {this.props.requestsCount === 0 ? (
                <div className="mt-5 mb-5">
                  <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                      <Button primary className="mt-5">
                        Add Requests
                      </Button>
                    </a>
                  </Link>
                </div>
              ) : null}
              {this.props.isRejected ? (
                <div className="mt-5">
                  <Button
                    primary
                    onClick={this.onIssueRefund}
                    loading={this.state.loadingRefund}
                  >
                    Get Refund
                  </Button>
                </div>
              ) : null}
              <div
                className="ui vertical animated button back-btn"
                tabIndex="0"
                onClick={() => Router.back()}
              >
                <div className="hidden content">
                  <i className="arrow alternate circle left icon"></i>
                </div>
                <div className="visible content">Back</div>
              </div>
            </div>
            {this.props.requestsCount > 0 ? (
              <Table>
                <Header>
                  <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
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
            ) : null}
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default RequestIndex;

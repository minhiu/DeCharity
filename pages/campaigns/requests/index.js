import React, { Component } from "react";
import Image from "next/image";
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
    const requestCount = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((elem, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests };
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
      );
    });
  }

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
              <div
                class="ui vertical animated button back-btn"
                tabindex="0"
                onClick={() => Router.back()}
              >
                <div class="hidden content">Back</div>
                <div class="visible content">
                  <i class="large arrow alternate circle left icon"></i>
                </div>
              </div>
            </div>
            {/* <Link route={`/campaigns/${this.props.address}/requests/new`}>
              <a>
                <Button primary floated="right" style={{ marginBottom: 10 }}>
                  Add Request
                </Button>
              </a>
            </Link> */}
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
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default RequestIndex;

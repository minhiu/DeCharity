import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import Header from "../../../components/Header";
import Image from "next/image";
import Footer from "../../../components/Footer";

class NewRequest extends Component {
  state = {
    descriptionOne: "",
    descriptionTwo: "",
    descriptionThree: "",
    descriptionFour: "",
    recipientOne: "",
    recipientTwo: "",
    recipientThree: "",
    recipientFour: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    const campaign = Campaign(this.props.address);

    // try {
    //   const accounts = await web3.eth.getAccounts();
    //   await campaign.methods
    //     .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
    //     .send({ from: accounts[0] });

    //   Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    // } catch (err) {
    //   this.setState({ errorMessage: err.message });
    // }

    this.setState({
      descriptionOne: "",
      descriptionTwo: "",
      descriptionThree: "",
      descriptionFour: "",
      recipientOne: "",
      recipientTwo: "",
      recipientThree: "",
      recipientFour: "",
      recipient: "",
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div id="new-requests" className="main-container">
          <Header />
          <div className="wrapper">
            <div className="text-center mt-10 mb-5 position-relative">
              <Image src="/images/logo.png" height={100} width={100} />
              <h2>Create new Requests</h2>
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
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <h3>Request 1</h3>
              <Form.Group className="mb-5">
                <Form.Input
                  required
                  fluid
                  width={9}
                  label="Description"
                  placeholder="Request 1 Description"
                  value={this.state.descriptionOne}
                  onChange={(event) =>
                    this.setState({ descriptionOne: event.target.value })
                  }
                />
                <Form.Input
                  required
                  fluid
                  width={7}
                  label="Recipient"
                  placeholder="Request 1 Recipient"
                  value={this.state.recipientOne}
                  onChange={(event) =>
                    this.setState({ recipientOne: event.target.value })
                  }
                />
              </Form.Group>

              <h3>Request 2</h3>
              <Form.Group className="mb-5">
                <Form.Input
                  required
                  fluid
                  width={9}
                  label="Description"
                  placeholder="Request 2 Description"
                  value={this.state.descriptionTwo}
                  onChange={(event) =>
                    this.setState({ descriptionTwo: event.target.value })
                  }
                />
                <Form.Input
                  required
                  fluid
                  width={7}
                  label="Recipient"
                  placeholder="Request 2 Recipient"
                  value={this.state.recipientTwo}
                  onChange={(event) =>
                    this.setState({ recipientTwo: event.target.value })
                  }
                />
              </Form.Group>

              <h3>Request 3</h3>
              <Form.Group className="mb-5">
                <Form.Input
                  required
                  fluid
                  width={9}
                  label="Description"
                  placeholder="Request 3 Description"
                  value={this.state.descriptionThree}
                  onChange={(event) =>
                    this.setState({ descriptionThree: event.target.value })
                  }
                />
                <Form.Input
                  required
                  fluid
                  width={7}
                  label="Recipient"
                  placeholder="Request 3 Recipient"
                  value={this.state.recipientThree}
                  onChange={(event) =>
                    this.setState({ recipientThree: event.target.value })
                  }
                />
              </Form.Group>

              <h3>Request 4</h3>
              <Form.Group className="mb-5">
                <Form.Input
                  required
                  width={9}
                  label="Description"
                  placeholder="Request 4 Description"
                  value={this.state.descriptionFour}
                  onChange={(event) =>
                    this.setState({ descriptionFour: event.target.value })
                  }
                />
                <Form.Input
                  required
                  width={7}
                  label="Recipient"
                  placeholder="Request 4 Recipient"
                  value={this.state.recipientFour}
                  onChange={(event) =>
                    this.setState({ recipientFour: event.target.value })
                  }
                />
              </Form.Group>

              <Message
                error
                header="Oops..."
                content={this.state.errorMessage}
              />
              <Button loading={this.state.loading} primary>
                Create
              </Button>
            </Form>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"} />
      </>
    );
  }
}

export default NewRequest;

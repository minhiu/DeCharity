import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class NewCampaign extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    minimumContribution: "",
    goal: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      if (!this.state.category) {
        throw new Error("Category must be filled");
      }

      // const accounts = await web3.eth.getAccounts();
      // const address = await factory.methods
      //   .createCampaign(
      //     this.state.name,
      //     this.state.description,
      //     this.state.category,
      //     this.state.minimumContribution,
      //     this.state.goal
      //   )
      //   .send({ from: accounts[0] });

      // Router.pushRoute("/");
      console.log(this.state);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const categories = [
      { key: "m", text: "Medical", value: "medical" },
      { key: "e", text: "Emergency", value: "emergency" },
      { key: "n", text: "Non-Profit", value: "nonprofit" },
      { key: "f", text: "Financial", value: "financial" },
      { key: "a", text: "Animal", value: "animal" },
      { text: "Environment", value: "environment" },
      { text: "Event", value: "event" },
    ];

    return (
      <>
        <div id="new-campaign" className="main-container">
          <Header />
          <div className="wrapper">
            <div className="text-center mt-10 mb-5 position-relative">
              <Image src="/images/logo.png" height={100} width={100} />
              <h2>Create a Campaign</h2>
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
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Name"
                  placeholder="Campaign Name"
                  value={this.state.name}
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                />
                <Form.Select
                  required
                  fluid
                  label="Category"
                  options={categories}
                  placeholder="Campaign Category"
                  onChange={(event, { value }) => {
                    this.setState({ category: value });
                  }}
                />
              </Form.Group>
              <Form.Input
                required
                fluid
                label="Description"
                placeholder="Campaign Description"
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              />
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Minimum Contribution</label>
                  <Input
                    label="ETH"
                    labelPosition="right"
                    value={this.state.minimumContribution}
                    onChange={(event) =>
                      this.setState({ minimumContribution: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>Goal</label>
                  <Input
                    label="ETH"
                    labelPosition="right"
                    value={this.state.goal}
                    onChange={(event) =>
                      this.setState({ goal: event.target.value })
                    }
                  />
                </Form.Field>
              </Form.Group>

              <Message
                error
                header="Oops..."
                content={this.state.errorMessage}
              />
              <Button type="submit" loading={this.state.loading} primary>
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

export default NewCampaign;

import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { categories } from "../../constants/categories";

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

      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          web3.utils.toWei(this.state.minimumContribution, 'ether'),
          this.state.name,
          this.state.description,
          this.state.category,
          web3.utils.toWei(this.state.goal, 'ether'),
        )
        .send({ from: accounts[0] });
        
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      const campaign = campaigns[campaigns.length - 1];
      Router.pushRoute(`/campaigns/${campaign}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <>
        <div id="new-campaign" className="main-container">
          <Header />
          <div className="wrapper">
            <div className="text-center mt-10 mb-5 position-relative">
              <Image src="/images/logo.png" height={100} width={100} />
              <h2>Create a Campaign</h2>
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
                    placeholder="Minimum Contribution for donors to become validators"
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
                    placeholder="Goal of total funds needed"
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

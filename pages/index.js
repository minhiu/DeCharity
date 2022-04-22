import React, { Component } from "react";
import Image from "next/image";
import factory from "../ethereum/factory";
import { Card } from "semantic-ui-react";
import { Link } from "../routes";
import Header from "../components/Header";
import classNames from "classnames";
import ExpandableForm from "../components/ExpandableForm";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    const faqs = [
      {question: "A", answer: "B"},
      {question: "A", answer: "B"},
      {question: "A", answer: "B"},
      {question: "A", answer: "B"},
      {question: "A", answer: "B"},
    ];

    return (
      <>
        <div id="home">
          <Header />
          <h1 className="fade-in">DeCharity</h1>
          <p className="fade-in delay-1s">
            "a Decentralized Charity platform where everyone can Trust"
          </p>
        </div>
        <div id="about">
          <div className="col-xl-8 col-lg-8 col-md-8 m-auto text-center mt-5 mb-5 pt-5 pb-5">
            <h2 className="mb-5">About Us</h2>
            <p>
              Founded in 2021, DeCharity was created to be a voice for people.
              According to the Association of Certified Fraud Examiners (ACFE),
              approximately $40 billion is lost to non-profit fraud loss
              annually. DeCharity was created to increase the real-time tracking
              of both income and spending of the people who create them.
              Utilizing revolutionary blockchain technology, people can be
              assured that their money is safe and their transactions are
              protected.
              <br /> <br />
              DeCharity was designed to be a platform that everyone can trust;
              the creator and each individual supporter. We wanted to ensure
              that people knew exactly where their money was going and it would
              encourage creators to remain in contact with their supporters to
              complete their cause.
            </p>
          </div>
        </div>
        <div id="faq">
          <div className="col-xl-8 col-lg-8 col-md-8 m-auto text-center mt-5 mb-5 pt-5 pb-5">
            <h2 className="pt-5 mb-5">FAQs</h2>
            <ExpandableForm items={faqs} />
          </div>
        </div>
      </>
    );
  }
}

export default CampaignIndex;

{
  /* <div
              className="why-us-content"
              style={{
                display: "grid",
                gridAutoFlow: "column",
                padding: "10px",
                margin: "10px",
              }}
            >
              <div className="traditional-content">
                <h3>Traditional Non-Profit Platforms</h3>
                <p>Long Wait Times</p>
                <p>Transaction &#38; Service Fees</p>
                <p>Fraud Vulnerability</p>
                <p>Limited Financial Services</p>
                <p>Lack of Transparency</p>
              </div>
              <div className="decharity-content">
                <h3>The DeCharity Solution</h3>
                <p>Fast settlement with Confirmation</p>
                <p>Low to no Fees</p>
                <p>Vote and Assert Your Voice</p>
                <p>Cryptographic Security</p>
                <p>Transparency in real time</p>
              </div>
            </div> */
}

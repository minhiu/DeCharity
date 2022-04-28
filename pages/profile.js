import React, { Component } from "react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";

class Profile extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    const cardList = this.props.campaigns.map((item, index) => {
      return (
        <Card
          img="https://paysimple.com/blog/wp-content/uploads/2018/02/hand-putting-coins-in-glass-jar-for-giving-and-donation-concept-picture-id813128966.jpg"
          title={item}
          description="Charity Description"
          key={index}
        />
      );
    });

    return (
      <>
        <div id="profile">
          <Header />
          <div className="text-center pt-10 pb-10">
            <div className="image-wrapper">
              <Image src="/images/logo.png" height={100} width={100} />
            </div>
          </div>
          <div id="project-card">
            <div className="text-center pb-5">
              <h2>Donated Campaign</h2>
            </div>
            <div className="wrapper">{cardList}</div>
          </div>
        </div>
        <Footer backgroundColor={"#cff1ef"}/>
      </>
    );
  }
}

export default Profile;

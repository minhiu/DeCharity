import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../routes";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import Card from "../components/Card";
import Image from "next/image";
import Footer from "../components/Footer";
import { Pagination } from "semantic-ui-react";
import DropdownFilter from "../components/DropdownFilter";
import Campaign from "../ethereum/campaign";

const Campaigns = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filterData, setFilterData] = useState([]);

  const renderCampaigns = () => {
    if (!props.campaigns.length) {
      return <h4>None</h4>;
    }
    const indexShowing = {
      start: (activePage - 1) * itemsPerPage,
      end: activePage * itemsPerPage - 1,
    };

    const filteredCampaigns = props.campaignsSummary.filter(
      (item) => !filterData.length || filterData.includes(item[8])
    );

    return filteredCampaigns.map((item, index) => {
      if (indexShowing.start <= index && index <= indexShowing.end) {
        return (
          <Card
            img="/images/background-campaign.jpg"
            balance={item[1]}
            title={item[6]}
            manager={item[5]}
            category={item[8]}
            goal={item[9]}
            deadline={item[10]}
            startingFund={item[11]}
            key={index}
            address={item.address}
            isRejected={item.isRejected}
          />
        );
      }
    });
  };

  const onFilterChange = (event, data) => {
    setFilterData(data.value);
  };

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="text-center pt-10">
          <Image src="/images/logo.png" height={100} width={100} />
        </div>
        <div id="project-card">
          <div className="text-center pb-5">
            <h2>Campaigns</h2>
            <div className="mt-5 mb-5">
              <Link route="/campaigns/new">
                <Button content="Create a Campaign" icon="add circle" primary />
              </Link>
            </div>
            {props.campaignsLength > 0 ? (
              <DropdownFilter onFilterChange={onFilterChange} />
            ) : null}
          </div>
          <div className="wrapper">{renderCampaigns()}</div>

          {props.campaignsLength > itemsPerPage ? (
            <div className="text-center mt-5">
              <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(props.campaignsLength / itemsPerPage)}
                onPageChange={(event, data) => setActivePage(data.activePage)}
              />
            </div>
          ) : null}
        </div>
      </div>
      <Footer backgroundColor={"#cff1ef"} />
    </>
  );
};

Campaigns.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  const campaignsLength = campaigns.length;
  const campaignsSummary = [];
  for (let i = 0; i < campaignsLength; i++) {
    const campaign = await Campaign(campaigns[i]);
    const campaignSummary = await campaign.methods.getSummary().call();
    campaignSummary.address = campaigns[i];
    const isRejected = await campaign.methods.isRejected().call();
    campaignSummary.isRejected = isRejected;
    campaignsSummary.push(campaignSummary);
  }
  return { campaigns, campaignsLength, campaignsSummary };
};

export default Campaigns;

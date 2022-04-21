
import { MoralisProvider, useMoralis } from "react-moralis";
import React, { Component, useState} from "react";
import Layout from "./Layout";
import { Container, Header, Card, Grid, Button } from 'semantic-ui-react';
const Moralis = require('moralis');


export default () => {
    const { isAuthenticated, user, setUserData} = useMoralis();
    //Quick and dirty setup to get campaigns for testing DEPRECATED
    const enterData = async () => {
     //Declare both campaign types
        const DonatedCampaign = Moralis.Object.extend('DonatedCampaign');

        const Campaign = Moralis.Object.extend('Campaign');
        //Create all the campaign objects
        const donatedCampaign = new DonatedCampaign();
        const donatedCampaign2 = new DonatedCampaign();
        const donatedCampaign3 = new DonatedCampaign();
        const donatedCampaign4 = new DonatedCampaign();
        //Fill in all the campaigns with info
        const testcamp1 = new Moralis.Query(Campaign);
        testcamp1.equalTo('name', 'Test Camp1');
        const results = await testcamp1.find();
        const testcamp2 = new Moralis.Query(Campaign);
        testcamp2.equalTo('name', 'Test Camp2');
        const results2 = await testcamp2.find();
        const testcamp3 = new Moralis.Query(Campaign);
        testcamp3.equalTo('name', 'Test Camp3');
        const results3 = await testcamp3.find();
        const testcamp4 = new Moralis.Query(Campaign);
        testcamp4.equalTo('name', 'Test Camp4');
        const results4 = await testcamp4.find();


        //Set and save all the campaigns
        donatedCampaign.set("campaign",results[0]);
        donatedCampaign.set("donor",user);
        donatedCampaign.set("next_vote",user.createdAt);
        donatedCampaign.save();
        donatedCampaign2.set("campaign",results2[0]);
        donatedCampaign2.set("donor",user);
        donatedCampaign2.set("next_vote",user.createdAt);
        donatedCampaign2.save();
        donatedCampaign3.set("campaign",results3[0]);
        donatedCampaign3.set("donor",user);
        donatedCampaign3.set("next_vote",user.createdAt);
        donatedCampaign3.save();
        donatedCampaign4.set("campaign",results4[0]);
        donatedCampaign4.set("donor",user);
        donatedCampaign4.set("next_vote",user.createdAt);
        donatedCampaign4.save();
        
        

    }
    //Log testing for adjacent stuff
    const logDonatedCampaigns = async () => {
        const DonatedCampaign = Moralis.Object.extend('DonatedCampaign');
        const Campaign = Moralis.Object.extend('Campaign');
        //Create a querty to find a donated campaign
        const testcamp1 = new Moralis.Query(DonatedCampaign);
        testcamp1.equalTo('donor', user);
        const results = await testcamp1.find();
        console.log(results);
    }


    //Testing get user campaigns
    const logMoralis = async () => {
       const result = await Moralis.Cloud.run("getUserCampaignsData")
       console.log(result);
    }
    //JSX frontend to power the functions
    return (
        <Layout>
            <Container>
                <Button onClick={enterData}> Press To enter data! </Button>
            </Container>
        </Layout>


    );
}
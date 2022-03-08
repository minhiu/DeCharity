
import { useMoralis, useMoralisFile} from "react-moralis";
import { useState, useEffect } from "react";
import { Icon, Card, Button } from 'semantic-ui-react';
import { Authentication } from './../../../components/Authentication';
const Moralis = require('moralis');


export const ShowCampaigns = () => {
    const { isAuthenticated, user, setUserData} = useMoralis();
    const [campaigns, setCampaigns] = useState(null);
    const [results, setResults] = useState(null);
    useEffect(() => {
        usercampaigns();
      }, [])
    const usercampaigns =  async function(){
      try{
        const DonatedCampaign = Moralis.Object.extend('DonatedCampaign');
        const Campaign = Moralis.Object.extend('Campaign');
        
        const camps = new Moralis.Query(DonatedCampaign);
        camps.equalTo('donor', user);
        const temp = await camps.find();
        // console.log(results[0].get('campaign'));
        // console.log(JSON.stringify(results));
        if (window !== undefined) {
            setCampaigns(temp);
        }
        console.log(campaigns)
      }catch (err){
        console.log(err);
      }
      
    }
    const renderCampaign = (campaign) => {
      
      const Campaign = Moralis.Object.extend('Campaign');
      const camp = new Moralis.Query(Campaign);
      camp.equalTo('objectId', campaign.get('campaign'));
      setResults(camp.find())
      // console.log(campaign.get('campaign'));
      console.log(JSON.stringify(result));
      console.log("test");
      result = result.then(() => {
        if (result.length > 0) {
          return <Div> No Matches</Div>;
        }
        // console.log(campaign.get('name'));
        return (
          <Card>
            <Card.Content>
              <Card.Header>{campaign.get('name')}</Card.Header>
              <Card.Meta>
                <span className='date'>{campaign.get('next_vote')}</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {campaign.get('owner')}
              </a>
            </Card.Content>
          </Card>
        );
      },(err) => {});
      // console.log(JSON.stringify(result));
      //console.log(err);
      return ( <div> Loading </div>);
    }
    if(isAuthenticated) {
      try{
        return campaigns.map(campaign => renderCampaign(campaign));
      }catch(err){
        console.log(err)
        return <div> DataLoading </div> 
      }
      
      
      } else {
        return (
          <div >
            Authentication has Failed
            <Authentication></Authentication>
          </div>
        )
      }




}


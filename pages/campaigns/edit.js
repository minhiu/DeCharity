import React, { useState,useEffect} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Image, Card, Grid, Button, Form } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Router, Link } from '../../routes';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MoralisProvider, useMoralis} from 'react-moralis';
import { useRouter } from 'next/router'


export const CampaignEdit = () => {
    const router = useRouter();
    const query = router.asPath;
    const params = query.split('/');
    console.log(params);
    const address = params[2];
    if (typeof window === 'undefined') {
    }else{
        const campaign = Campaign(address);

    }
    console.log(campaign);
    const [campInfo,setCampInfo] = useState([]);
    const [photoUrl,setPhotoUrl] = useState([]);
    // const { isAuthenticated, user, setUserData, authError} = useMoralis();
    useEffect(() => {
        
        // const getPhoto = async (address) => {
        //     const query = new Moralis.Query( Moralis.Object.extend("Campaign"));
        //     const serverUrl = "https://v8fuoirhamw1.usemoralis.com:2053/server";
        //     const appId = "oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z";
        //     Moralis.start({serverUrl,appId})
        //     query.equalTo("address", address);
        //     const result = await query.first();
        //     console.log(result);
        //     const photoUrl = await result.get("CampaignThumbnail");
        //     return photoUrl;
        // }
        // setPhotoUrl(getPhoto(address));
        const getSummary = async () =>{
            const summary = await campaign.methods.getSummary().call();
            return summary;
        }
        if (campaign) {
            const summary = getSummary();
            setCampInfo({address: address,
                minimumContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                contributorsCount: summary[3],
                approversCount: summary[4],
                manager: summary[5]
            });
        }
        
    },[]);
    console.log(campaign);
    const {
        minimumContribution,
        balance,
        requestsCount,
        contributorsCount,
        approversCount,
        manager
    } = {minimumContribution:"-1",
        balance:"-1",
        requestsCount:"-1",
        contributorsCount:"-1",
        approversCount:"-1",
        manager:"-1"}
    if (campInfo) {
        const {
            minimumContribution,
            balance,
            requestsCount,
            contributorsCount,
            approversCount,
            manager
      } = campInfo;
    }
      
    if (campInfo) {
        console.log(campInfo);
      const items = [
        {
          header: manager,
          meta:'Address of Manager',
          description: 'The manager created this campaign and can create requests to withdraw money.',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: web3.utils.fromWei(minimumContribution, 'ether'),
          meta:'Minimum Contribution (ether)',
          description: 'Minimum amount of donation in wei to become an approver.',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: requestsCount,
          meta:'Number of Requests',
          description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: contributorsCount,
          meta:'Number of Contributors',
          description: 'Number of people who have already donated into this campaign.',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: approversCount,
          meta:'Number of Approvers',
          description: 'Number of people who have privileges to approve requests in this campaign.',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: web3.utils.fromWei(balance, 'ether'),
          meta:'Campaign Balance (ether)',
          description: 'The balance is how much money this campaign has left to spend.',
          style: { overflowWrap: 'break-word' }
        }
      ]
    return (
        <Card.Group items={items} />
    );
    }else{
        return <div> Broke </div>;
    }
}
const editWrapper = () => {
    return <MoralisProvider
    appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
    serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server"
    > <CampaignEdit></CampaignEdit></MoralisProvider>
}


export default editWrapper;
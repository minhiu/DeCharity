import { useState, useEffect } from "react";
import {Image, Icon, Card, Button } from 'semantic-ui-react';
const Moralis = require('moralis');
import {useMoralis} from 'react-moralis';
import factory from '../../../ethereum/factory';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';



const CampPage = () => {
    
    const [camps, setCamps] = useState(null);
    const [campPhotos, setCampPhotos] = useState(null);
    useMoralis();
    //Get a list of all deployed campaigns and then attach whether or not the current user has donated to them or not.
    useEffect(() => {
        const getDonatedCampaigns = async () => {
            //Get the campaigns
            const campaigns = await factory.methods.getDeployedCampaigns().call();
            //Get current user account
            const accounts = await web3.eth.getAccounts();
            //Get the donated status for each campaign and return them as an array
            const donatedCampaigns = await Promise.all(
                campaigns.map(async (address) => {
                    const campaign = Campaign(address);
                    const donated = await campaign.methods.contributors(accounts[0]).call();
                    return {
                        address,
                        donated
                    };
                })
            );
            console.log(donatedCampaigns);
            //Update the state with the list of campaigns
            setCamps(donatedCampaigns);
        }
        //Call the function we just defined to set the state with the list of campaigns
        getDonatedCampaigns();
    }, []);
    // useEffect(() => {
    //     async function queryWrap() {
    //          if(user){
    //             const DonatedCampaign = Moralis.Object.extend('DonatedCampaign');
    //             const camps = new Moralis.Query(DonatedCampaign);
    //             camps.equalTo('donor', user);
    //             const temp = await Moralis.Cloud.run('getUserCampaignsData');
                
    //             setCamps(temp);
    //          }
    //         }
    //         queryWrap();
    //     }, [camps]);

    //Get the photos for each campaign and filter out the ones that the current user hasn't donated to.
    useEffect(() => {
        const getRenderedCamps = async (camps) => {
            return await Promise.all(camps.map(async (camp) => {
                if (camp.donated) {
                    //Create Moralis queery to get the campaign we are looking for.
                    const query = new Moralis.Query( Moralis.Object.extend("Campaign"));
                    //Filter the campaign by the address
                    query.equalTo('address', camp.address);
                    //Return the results of the query
                    const result = await query.first();
                    // console.log(camp.address);
                    // console.log(result);
                    //Get the campaign thumbnail
                    const photoUrl = await result.get('CampaignThumbnail');
                    const address = camp.address;
                    // console.log(photoUrl);
                    return (
                        {address,photoUrl}
                    );
                }
            }));
                
        }
        if ( camps && camps.length > 0){
            getRenderedCamps(camps).then(res => {
                setCampPhotos(res);
            });
            // setCampPhotos(getRenderedCamps(camps));
        }
    }, [camps]);

    console.log(campPhotos);
    if (campPhotos) {
        return (
            <div>
                <h1>Voted Campaigns</h1>
                <p> Your previously voted campaings:</p>
                <div>
                    {campPhotos.map(campaign => (
                    campaign ? <Card key={campaign.address}>
                            <Card.Content>
                                <Card.Header>
                                    {campaign.address}
                                </Card.Header>
                                <Card.Meta>
                                    <img class ="ui small image" src={campaign.photoUrl} />
                                </Card.Meta>
                                <Card.Description>
                                    <Link route={`/campaigns/${campaign.address}`}>
                                        <a>View Campaign</a>
                                    </Link>
                                </Card.Description>
                            </Card.Content>
                    </Card> : null))}
                </div>
            </div>
        )}else{
            return <div> broken </div>;
        }



}


// const getCampaigns = () => {
//     return Moralis.Cloud.run('getUserCampaigns');
// }

// export async function getStaticProps(){
//     const temp = await getCampaigns();
//     console.log(temp);
//     return {
//         props: {
//             campaigns: JSON.parse(JSON.stringify(temp))
//         }
//     }
// }
export default CampPage;
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

    useEffect(() => {
        const getDonatedCampaigns = async () => {
            const campaigns = await factory.methods.getDeployedCampaigns().call();
            const accounts = await web3.eth.getAccounts();
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
            setCamps(donatedCampaigns);
        }
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

    const photos = [];

    useEffect(() => {
        const getRenderedCamps = async (camps) => {
            return await Promise.all(camps.map(async (camp) => {
                if (camp.donated) {
                    const query = new Moralis.Query( Moralis.Object.extend("Campaign"));
                    query.equalTo('address', camp.address);
                    const result = await query.first();
                    // console.log(camp.address);
                    // console.log(result);
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
        }
    }, [camps]);


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
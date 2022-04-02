import { useState, useEffect } from "react";
import { Icon, Card, Button } from 'semantic-ui-react';
const Moralis = require('moralis');
import {useMoralis} from 'react-moralis';




const CampPage = () => {
    const {user} = useMoralis();
    const [camps, setCamps] = useState(null);


    useEffect(() => {
        async function queryWrap() {
             if(user){
                const DonatedCampaign = Moralis.Object.extend('DonatedCampaign');
                const camps = new Moralis.Query(DonatedCampaign);
                camps.equalTo('donor', user);
                const temp = await Moralis.Cloud.run('getUserCampaignsData');
                
                setCamps(temp);
             }
            }
            queryWrap();
        }, [user]);

    
    if ( camps && camps.length > 0){
        console.log(camps[0]['campInfo'][0]);
        console.log(camps[0]['campInfo'][0]['_p_owner']);
        //console.log(JSON.stringify(camps[0].get('campaign')));
        return (
            <div>
                <h1>Voted Campaigns</h1>
                <p> Your previously voted campaings:</p>
                <div>
                    {camps.map(campaign => (
                        
                        campaign['campInfo'].map(possibleCamp => (
                            possibleCamp['_id'] === campaign['campaign']['id'] ? (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>{possibleCamp['name']}</Card.Header>
                                        <img src={possibleCamp['CampaignThumbnail']} alt=""/>
                                        <Card.Meta>
                                            <span className='date'>{campaign['next_vote'].toString()}</span>
                                        </Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='user' />
                                            {possibleCamp['_p_owner']}
                                        </a>
                                    </Card.Content>
                                </Card>
                            ) : null
                        ))))
                    }
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
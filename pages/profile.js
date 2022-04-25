import React, { Component } from "react";
import { MoralisProvider, useMoralis, useMoralisFile } from "react-moralis";
import { Card } from "semantic-ui-react";
import { Link } from "../routes";
import Header from "../components/Header";
import factory from "../ethereum/factory";

class ProfilePage extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
      }

    
    render() {
        const user = {
            name: 'Bart Veneman',
            username: 'bartveneman',
            gravatar: 'https://gravatar.com/avatar/56d18ba2b0bf189436499b0f215b5e29?s=100'
        }

        const cList = this.props.campaigns.map((item) => {
            return (
                <div class="project-cards">
                    <div class="card">
                        <div class="card__body">
                            <img src="https://paysimple.com/blog/wp-content/uploads/2018/02/hand-putting-coins-in-glass-jar-for-giving-and-donation-concept-picture-id813128966.jpg" alt="" class="card__image"></img>
                            <h2 class="card__title">{item}</h2>
                            <p class="card__description">Charity descripton</p>
                        </div>
                    </div>
                </div>
                
                // <Card 
                //     className="wrapper">
                //     <Card.Header className="card__title">
                //         {item}
                //     </Card.Header>

                //     <Link route={`/campaigns/${item}`}>
                //     <a>View Campaign</a>
                //     </Link>
                // </Card>
            );
        })
        
        return (
            <MoralisProvider 
        appId="mtI7RNIJyg9YQ9KlY0lxRWT07i948n2P18xGY9lJ"
        serverUrl="https://isnfg1uqrfen.usemoralis.com:2053/server">
                <div id="profile">
                    <Header/>
                    <div className="user-profile">
                        <div className="profile-card">
                            <h1 className="card__title"> {user.name} </h1>
                            <p className="card__subtitle"> @{user.username} </p>
                            <img 
                                className="card__avatar" 
                                src={user.gravatar} 
                                alt='Avatar for ${user.name}' 
                                style={{width: 200, height: 200, borderRadius: 200/ 2}} 
                            /> 
                        </div>
                    </div>

                    <div className="profile-projects">
                        <h2> {user.name}'s Campaigns </h2>
                        <ol className="cards">
                            {cList}
                        </ol>
                    </div>
                </div>
            </MoralisProvider>
            )
    } 
}

export default ProfilePage;
import React, { Component } from "react";
import { MoralisProvider, useMoralis, useMoralisFile } from "react-moralis";
import { Card } from "semantic-ui-react";
import Header from "../components/Header";
import factory from "../ethereum/factory";

class ProfilePage extends Component {
    render() {
        const user = {
            name: 'Bart Veneman',
            username: 'bartveneman',
            gravatar: 'https://gravatar.com/avatar/56d18ba2b0bf189436499b0f215b5e29?s=100'
        }
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

                    {/* <div className="profile-projects">
                        <h2> #{user.name}'s Projects </h2>
                        <ol className="cards">
                            <mapProjects></mapProjects>
                        </ol>
                    </div> */}
                </div>
            </MoralisProvider>
            )
    }

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
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
   
}

export default ProfilePage;
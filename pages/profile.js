import React, { Component } from "react";
import { MoralisProvider, useMoralis, useMoralisFile } from "react-moralis";
import { Card, Divider } from "semantic-ui-react";
import { Link } from "../routes";
import Header from "../components/Header";
import factory from "../ethereum/factory";

class ProfilePage extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
      }
    
    render() {
        function Card(props) {
            return (
                <div id="project-card">
                    <div className="card">
                        <div className="card__body">
                        <img src={props.img} class="card__image" />
                        <h2 className="card__title">{props.title}</h2>
                        <p className="card__description">{props.description}</p>
                        </div>
                        <button className="card__btn">View Charity</button>
                    </div>
              </div>
            );
          }

        const user = {
            name: 'Bart Veneman',
            username: 'bartveneman',
            gravatar: 'https://gravatar.com/avatar/56d18ba2b0bf189436499b0f215b5e29?s=100'
        }

        const cList = this.props.campaigns.map((item) => {
            return (
                    <Card
                        img="https://paysimple.com/blog/wp-content/uploads/2018/02/hand-putting-coins-in-glass-jar-for-giving-and-donation-concept-picture-id813128966.jpg"
                        title={item}
                        description="Charity Description"
                    />
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

                        <div id="project-card">
                            <div class="wrapper">
                                {cList}
                            </div>
                        </div>
                    </div>
              
            </MoralisProvider>
        )
            
    } 
}

export default ProfilePage;
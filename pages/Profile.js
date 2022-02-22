import { Divider, Form, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProfilePic from './profile-pic.png';
import { SignUp }  from '../components/UserData';
import { MoralisProvider } from "react-moralis";
import { useMoralis } from "react-moralis";

export default()=>{

    return(
        <Layout>
           <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server">
          <div>
                <img src={require("./profile-pic.png")} height ={200} width={200} />
            </div>
        
            <SignUp></SignUp>
        </MoralisProvider>
        </Layout>

    )
} 
import Layout from '../components/Layout';
import { SignUp }  from '../components/UserData';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';


export default()=>{
    return(
        <Layout>
           <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server">
            <ChakraProvider>
                <SignUp></SignUp>
            </ChakraProvider>
            </MoralisProvider>
        </Layout>
    )
} 
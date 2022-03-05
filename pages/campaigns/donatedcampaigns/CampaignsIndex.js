import React from 'react';
import { MoralisProvider } from 'react-moralis';
import {ChakraProvider} from "@chakra-ui/react";
import { ShowCampaigns } from './AllUserCampaigns';
import HardCodeDataEntry from '../../../components/HardCodeDataEntry';

export default () => {
  return(

    <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server"
          >
        <ChakraProvider>
          <HardCodeDataEntry />
          <ShowCampaigns />
        </ChakraProvider> 
    </MoralisProvider>
  
  )

}

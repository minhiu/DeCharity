import React from 'react';
import { MoralisProvider } from 'react-moralis';
import {ChakraProvider} from "@chakra-ui/react";
import HardCodeDataEntry from '../../../components/HardCodeDataEntry';
import Authentication from '../../../components/Authentication.js'

import CampPage from './TestCampaigns';

export default () => {
  return(
    //Basic setup of all the components with the hard code data entry if people need to enter data
    <MoralisProvider
          appId="oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z"
          serverUrl="https://v8fuoirhamw1.usemoralis.com:2053/server"
          >
        <ChakraProvider>
          <Authentication></Authentication>
          <HardCodeDataEntry />
           //Entry point for the campaign page
          <CampPage  />
        </ChakraProvider> 
    </MoralisProvider>
  
  )

}

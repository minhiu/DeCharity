import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1ddaC4A66844e19d4185d16B61fCEfD0eDB8e24C'
);

export default instance;
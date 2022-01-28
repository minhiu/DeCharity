import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4aA98317f9B49BF9ad3821C2e303d196f581B05c'
);

export default instance;
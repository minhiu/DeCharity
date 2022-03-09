import web3 from './web3';
import contracts from './build/contracts.json';
const { contractAddress } = require('../ADDRESS.js');

const CampaignFactory = contracts['Campaign.sol']['CampaignFactory'];
const instance = new web3.eth.Contract(
  (CampaignFactory.abi),
  contractAddress.latest
);

export default instance;

import web3 from './web3';
import contracts from './build/contracts.json';

export default (address) => {
  const campaign = contracts['Campaign.sol']['Campaign'];
  return new web3.eth.Contract(
    campaign.abi,
    address
  );
};
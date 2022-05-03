import web3 from './web3';
import contracts from './build/contracts.json';

const Campaign = (address) => {
  const campaign = contracts['Campaign.sol']['Campaign'];
  return new web3.eth.Contract(
    campaign.abi,
    address
  );
};

export default Campaign;
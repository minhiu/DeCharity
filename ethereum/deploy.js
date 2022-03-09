const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledContracts = require('./build/contracts.json');
const CampaignFactory = compiledContracts['Campaign.sol']['CampaignFactory'];
const provider = new HDWalletProvider(
  'ranch skin mass seminar adult enemy expect symbol camera holiday fix coconut',
  'https://speedy-nodes-nyc.moralis.io/b9ed6f87e41b561c27824874/eth/rinkeby'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(CampaignFactory.abi)
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();

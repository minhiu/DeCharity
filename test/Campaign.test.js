const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  
  await factory.methods.createCampaign('100').send({
      from: accounts[0],
      gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // Campaign Contract is created differently, because it was already deployed
  // We only retrieve it using its address
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface), 
    campaignAddress
  );
});

describe('Campaigns', () => {

  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  })

  it('require a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[2],
        value: '5'
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allow a manager to make a payment request', async () => {
    await campaign.methods
    .createRequest('Buy MacBook Pros', '200', accounts[1])
    .send({ from: accounts[0], gas: '1000000' });

    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'Buy MacBook Pros');
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('Buy Food', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    assert(balance > 104);
  });
});
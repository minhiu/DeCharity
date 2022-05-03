<h1>DeCharity</h1>
<p>a Decentralized Charity platform where everyone can trust.<p>

<h2>Tech Stack</h2>
<p>1. Solidity</p>
<p>2. React.JS / Next.JS</p>

<h2>Installation Guide</h2>
<h4>Campaign Contract</h4>
<p>1. Install MetaMask Wallet browser extension - https://metamask.io/</p>
<p>2. Update to the latest npm version - npm install -g npm</p>
<p>3. Update to the latest node version - npm install --latest</p>
<p>4. Make sure solc version is the same as solidiy contract version in package.json</p>
<p>5. Compile contract using node ethereum/compile.js</p>
<p>6. Deploy contract using node version older than 17 (16 or below)</p>
<p>7. [SKIP FOR NOW] Set up an Infura Rinkeby Testnet faucet, and replace it inside ethereum/contracts/deploy.js</p>
<p>8. Contract address is currently stored at "ADDRESS.txt", replace your own address here</p>


<h4>Token Contract</h4>
<p>1. Install brownie to compile, test, and deploy ERC tokens - pip install brownie</p>
<p>2. Create a rinkeby testnet network using brownie and link it to Moralis Speedy Node</p>
<p>3. Compile the erc-20 token contract - brownie console (keep current directory as /ethereum/erc-20) </p>
<p>4. Install OpenZeppelin Token Contract (IERC-20) - brownie pm install OpenZeppelin/openzeppelin-contracts@4.0.0
<p>5. Deploy erc-20 token contract - brownie console --network "network-name"</p>
<p>                                  account = accounts.load('account-name')</p>
<p>                                  tokenContractName.deploy(initialSupply,{'from':account})</p>
<p>                                  >>> Decha.deploy('1000000000000000000000000000', {'from': account});

<h2>Folder Structure</h2>
<p>1. Server:</p>
<ul>
  <li>ethereum - contains Contract source code; compile and deploy script.</li>
  <li>test - contains test cases for Contract</li>
  <li>server.js - specifies hosting url</li>
</ul>

<p>2. Client:</p>
<ul>
  <li>components - contains all Layout components</li>
  <li>pages - contains all directories of the website</li>
</ul>

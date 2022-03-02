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
<p>4. Install all the dependencies - npm install</p>
<p>5. [SKIP FOR NOW] Set up an Infura Rinkeby Testnet faucet, and replace it inside ethereum/contracts/deploy.js</p>
<p>6. [SKIP FOR NOW] Contract address is currently stored at "ADDRESS.txt", replace your own address here</p>

<h4>Token Contract</h4>
<p>1. Install brownie to compile, test, and deploy ERC tokens - pip install brownie</p>
<p>2. Create a rinkeby testnet network using brownie and link it to Moralis Speedy Node</p>
<p>3. Compile the erc-20 token contract - brownie console </p>
<p>4. Deploy erc-20 token contract - brownie console --network "network-name"</p>
<p>                                  account = accounts.load('account-name')</p>
<p>                                  tokenContractName.deploy(initialSupply,{'from':account})</p>

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

<h2>Implementing Notifications</h2>
<p>1. Importing react-toastify</p>
<ul>
  <li>Add the lines import { ToastContainer, toast} from 'react-toastify'; and import 'react-toastify/dist/ReactToastify.css'; to the top of the file in which notifications are desired.</li>
</ul>

<p>2. Declaration and customization of notifications</p>
<ul>
  <li>react-toastify requires a container called ToastContainer in order to specify certain information about the notifications</li>
  <li>The following example is a ToastContainer that is declared within the main render function of a given page:
      <>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </>
  </li>
  <li>As we can see, there are many elements of the notifications that can be adjusted, and some of these are already enabled by default</li>
  <li>A single toast notification can be declared such that: const exampleNotification = () => {toast("example notification")};</li>
  <li>If desired, you could show different types of notifications by replacing toast with toast.info, toast.success, toast.warn, and toast.error while toast is just the default notification</li>
</ul>


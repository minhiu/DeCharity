// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

/** Factory Contract keep tracks of all Campagins */
contract CampaignFactory {
    /** Keep all addresses of deployed Campaigns */
    address[] public deployedCampaigns;
    // Retrieve Decha Token Contract (Use double slash because Solidity mistakes for doc comments)
    IERC20 token = IERC20(0xa896B25da9d40F486C8917E184C3CB0d6B91adda);

    /** Create a new campaign */
    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender, token));
        deployedCampaigns.push(newCampaign);
    }

    /** Retrieve all created campaigns for the current address */
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

/** Campaign Contract */
contract Campaign {
    
    // Inherits Token Contract functions from OpenZeppelin
    // Declare in Contract Constructor for $DECHA
    // (Use double slash because Solidity mistakes for doc comments)
    IERC20 private _token;

    /** Transaction Event to emit to UI */
    event Transaction(address from);

    /** Request struct for each Campaign */
    struct Request {
        string description; // Description of request
        uint value; // Total amount of money needed for this request
        address payable recipient; // Recipient of the value
        bool completed; // Has the request been fulfilled or not
        bool isApproved; // Has the request been approved or not
        uint approvalCount; // Total approved approvers for this request
        uint totalVoteCount; // Total approvers for this request
        uint expirationDate; // Expiration date of this request
        mapping(address => bool) votedAddresses; // Map of address to boolean to determine if address voted
        mapping(address => bool) approvedAddress; // Map of address to boolean to determine if address approved
    }

    string public campaignName; // Campaign name
    string public campaignDescription; // Campaign description (includes 4 phase details and twitter)
    enum Category { MEDICAL, EMERGENCY, NONPROFIT, FINANCIAL, ANIMAL, ENVIRONMENT, EVENT }; // Enum for filtering campaigns based on category
    Category public campaignCategory;
    uint public goalFund;  // Goal amount a campaign is seeking for donation
    Request[] public requests; // Array of all requests from current Contract, maximum 4 allowed per campaign.
    address public manager; // Address of Contract Creator
    uint public minimumContribution; // Minimum Ether Value a contributor needs to donate to become an approver
    mapping(address => bool) public contributors; // Map to keep track who has donated (No minimum value required)
    mapping(address => bool) public approvers; // Map to keep track who has donated above the minimum and became approvers
    mapping(address => uint) public balances; // Map to keep track how much an user has donated to the campaign
    mapping(address => bool) public refunded;   // Mapping that specifies which contributors(address) have been refunded
    uint public contributorsCount; // Count of all contributors
    uint public approversCount; // Count of all approvers
    uint public campaignStartDate;
    uint public campaignDeadline;   //deadline Campaign has to raise goal fund
    

    /** Modifier that requires manager privilege */
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    /** Modifier that requires user to contribute above minimum value */
    modifier contributionCheck() {
        require(balances[msg.sender] >= minimumContribution);
        _;
    }

    /** Modifier that requires a request expiration date passes */
    modifier requestExpirationDateCheck(uint index) {
        require(block.timestamp >= requests[index].expirationDate);
        _;
    }


    /** Contract Constructor */
    constructor (string name, string description, Category category, uint minimum, uint goal,  address creator, IERC20 token) {
        campaignName = name;
        campaignDescription = description;
        campaignCategory = category;
        minimumContribution = minimum;
        goalFund = goal;
        manager = creator;
        _token = token;
        campaignStartDate = (block.timestamp);
        campaignDeadline = (block.timestamp + 45 days );
    }

    /** Function to let users contribute (no minimum) */
    function contribute() public payable {
        // Count number of contributors (distinctively)
        if (!contributors[msg.sender]) {
            contributors[msg.sender] = true;
            contributorsCount++;
        }
        
        // Update contributed balance of user
        balances[msg.sender] += msg.value;
    }

    /** Function to let user becomes an approver */
    function becomeApprover() public contributionCheck {
        // Count number of approvers (distinctively)
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount += 1;
        }
    }

    /** Function to create a request for the current campaign by the manager */
    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage newRequest = requests.push();

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.completed = false;
        newRequest.isApproved = false;
        newRequest.approvalCount = 0;
        newRequest.totalVoteCount = 0;
        newRequest.expirationDate = (block.timestamp + 15 days);
    }

    /** Function to approve the vote of the request */
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // Require user to be an approver and not yet voted
        require(approvers[msg.sender]);
        require(!request.votedAddresses[msg.sender]);

        request.votedAddresses[msg.sender] = true;
        request.approvedAddress[msg.sender] = true;
        request.approvalCount++;
        request.totalVoteCount++;
    }

    /** Function to reject the vote of the request */
    function rejectRequest(uint index) public {
        Request storage request = requests[index];

        // Require user to be an approver and not yet voted
        require(approvers[msg.sender]);
        require(!request.votedAddresses[msg.sender]);

        request.votedAddresses[msg.sender] = true;
        request.approvedAddress[msg.sender] = false;
        request.totalVoteCount++;
    }

    /** 
      * Function to finalize the request to see the outcome of the request
      * Called by anyone
      * Reward anyone who called it with 10 DECHA token
      */
    function finalizeRequest(uint index) public requestExpirationDateCheck(index) {
        Request storage request = requests[index];

        require(!request.completed);
        if (request.approvalCount > (request.totalVoteCount / 2)) {
            request.recipient.transfer(request.value);
            request.isApproved = true;
        } else {
            request.isApproved = false;

        }
        request.completed = true;

        // Reward caller
        _token.transfer(msg.sender, 10);
        emit Transaction(msg.sender);
    }

    /** Function to claim reward after the request ended
      * Called by approvers
      */
    function claimReward(uint index) public contributionCheck {
        Request storage request = requests[index];
        uint amount = 50; // Needs an algorithm to determine the best amount to reward validators
        if (request.isApproved 
            && request.votedAddresses[msg.sender] 
            && request.approvedAddress[msg.sender] ) {
                _token.transfer(msg.sender, amount);
        } else if (!request.isApproved 
            && request.votedAddresses[msg.sender] 
            && !request.approvedAddress[msg.sender] ) {
                _token.transfer(msg.sender, amount);
            }
        emit Transaction(msg.sender);
    }

    /** Get basic, unbiased information of the campaign */
    function getSummary() public view returns (
        uint, uint, uint, uint, uint, address
        ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            contributorsCount,
            approversCount,
            manager
        );
    }

    /** Return total number of requests inside a campaign */
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    /** Issues calculated refund to all contributors
     *  when campaign has been deemed unsuccessful
     */
    function issueRefund() {
        // require last request to be finalized OR campaign did not reach contribution by deadline
        require(request[3].completed | ((campaignStartDate >= campaignDeadline) & (address(this).balance < goalFund)));
        // requires user requesting refund to be a contributor
        require(contributors[msg.sender]);
        //requires contributor to not have been refunded already 
        require(!refunded[msg.sender]);

        uint balanceRefunded = 0;
        uint numValidRequests = 0;

        // Loop to see how many of the requests are valid
        for( uint i = 0; i < requests.length; i++ ) {
            if(request[i].isApproved) {
                numValidRequests++;
            }
        }

        // if only 1 request was found to be valid, issue 75% of contributor's donation
        if(numValidRequests == 1) {
            balanceRefunded = balances[msg.sender] * 0.75;
            balances[msg.sender] -= balanceRefunded;
            msg.sender.transfer(balanceRefunded);
            refunded[msg.sender] = true;
        }
        // if 2 requests was found to be valid, issue 50% of contributor's donation
        else if(numValidRequests == 2) {
            balanceRefunded = balances[msg.sender] * 0.50;
            balances[msg.sender] -= balanceRefunded;
            msg.sender.transfer(balanceRefunded);
            refunded[msg.sender] = true;
        }
        // if only 3 requests was found to be valid, issue 25% of contributor's donation
        else if(numValidRequests == 3) {
            balanceRefunded = balances[msg.sender] * 0.25;
            balances[msg.sender] -= balanceRefunded;
            msg.sender.transfer(balanceRefunded);
            refunded[msg.sender] = true;
        }
        // if contributor gets 100% of balance refunded
        else {
            balanceRefunded = balances[msg.sender];
            balances[msg.sender] -= balanceRefunded;
            msg.sender.transfer(balanceRefunded);
            refunded[msg.sender] = true;
        }
    }   

}

// TODO Implement tokens retrieval for unsuccessful campagin

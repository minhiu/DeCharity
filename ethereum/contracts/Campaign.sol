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
    function createCampaign(string memory name,string memory description,string memory stringCategory,  uint minimum, uint fundGoal) public {
        address newCampaign = address(new Campaign(name, description, stringCategory, minimum, fundGoal,msg.sender, token));
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
        string status; // Status of the request
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


    Request[] public requests; // Array of all requests from current Contract
    address public manager; // Address of Contract Creator
    uint public minimumContribution; // Minimum Ether Value a contributor needs to donate to become an approver
    mapping(address => bool) public contributors; // Map to keep track who has donated (No minimum value required)
    mapping(address => bool) public approvers; // Map to keep track who has donated above the minimum and became approvers
    mapping(address => uint) public balances; // Map to keep track how much an user has donated to the campaign
    mapping(address => bool) public refunded; // Map to keep track if an user has been refunded
    address[] public donors; //List of all of the donor adresses.
    uint public contributorsCount; // Count of all contributors
    uint public approversCount; // Count of all approvers
    uint public fundingGoal; //The minimum required funds to start a campaign.
    string public campaignName; //The name of the campaign
    string public campaignDescription; //A text description of the campaign.
    enum category { DEFAULT ,MEDICAL, EMERGENCY, NONPROFIT, FINANCIAL, ANIMAL, ENVIRONMENT, EVENT }//The category of the campaign.
    category public campaignCategory; //The category of the campaign.
    uint public deadline; //The deadline of the campaign.

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
    constructor (string memory name,string memory description,string memory stringCategory,  uint minimum, uint fundGoal,address creator, IERC20 token) {
        campaignName = name;
        campaignCategory = stringToCategory(stringCategory);
        campaignDescription = description;
        manager = creator;
        minimumContribution = minimum;
        _token = token;
        contributorsCount =0;
        approversCount =0;
        fundingGoal = fundGoal;
        deadline = block.timestamp + 45 days;
    }
    /** convert string representation of category to category enum*/
    function stringToCategory(string memory input) public pure returns (category) {
        if (keccak256(bytes(input)) == keccak256(bytes("default"))) return category.DEFAULT;
        if (keccak256(bytes(input)) == keccak256(bytes("medical"))) return category.MEDICAL;
        if (keccak256(bytes(input)) == keccak256(bytes("emergency"))) return category.EMERGENCY;
        if (keccak256(bytes(input)) == keccak256(bytes("nonprofit"))) return category.NONPROFIT;
        if (keccak256(bytes(input)) == keccak256(bytes("financial"))) return category.FINANCIAL;
        if (keccak256(bytes(input)) == keccak256(bytes("animal"))) return category.ANIMAL;
        if (keccak256(bytes(input)) == keccak256(bytes("environment"))) return category.ENVIRONMENT;
        if (keccak256(bytes(input)) == keccak256(bytes("event"))) return category.EVENT;
        return category.DEFAULT;

    }

    /** get this campaigns category as a string. */
    function getCategory() public view returns (string memory) {
        if (campaignCategory == category.DEFAULT) return "default";
        if (campaignCategory == category.MEDICAL) return "medical";
        if (campaignCategory == category.EMERGENCY) return "emergency";
        if (campaignCategory == category.NONPROFIT) return "nonprofit";
        if (campaignCategory == category.FINANCIAL) return "financial";
        if (campaignCategory == category.ANIMAL) return "animal";
        if (campaignCategory == category.ENVIRONMENT) return "environment";
        if (campaignCategory == category.EVENT) return "event";
        return "default";
    }

    /** Function to let users contribute (no minimum) */
    function contribute() public payable {
        // Count number of contributors (distinctively)
        if (!contributors[msg.sender]) {
            contributors[msg.sender] = true;
            donors.push(msg.sender);
            contributorsCount++;
        }
        
        // Update contributed balance of user
        balances[msg.sender] += msg.value;
    }


    

    /** Function to return the next phase to be voted on minimum is 2 maximum is 4 */
    function getNextVotingPhase() public view returns (uint) {
        require(requests.length > 0);
        uint phase = 0;
        for (uint i = 0; i < requests.length; i++) {
            if (requests[i].completed == false) {
                phase = i+1;
                break;
            }
        }

        return phase;
    }
    

    /** Function to check if the current donated balances are greater than the minimum funds to start */
    
    
    /** Function to let user becomes an approver */
    function becomeApprover() public contributionCheck {
        // Count number of approvers (distinctively)
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount += 1;
        }
    }

    /** Function to create a request for the current campaign by the manager */
    function createRequests(string[] memory descriptions, address payable[] memory recipients) restricted public {
        // Iterate through the descriptions reciepients and create a request for each by pushing them to the requests array
        for (uint256 index = 0; index < descriptions.length; index++) {
            Request storage newRequest = requests.push();
            newRequest.expirationDate = block.timestamp + (15 days)*(index+1);
            newRequest.description = descriptions[index];
            newRequest.recipient = recipients[index];
            newRequest.completed = false;
            newRequest.isApproved = false;
            newRequest.approvalCount = 0;
            newRequest.totalVoteCount = 0;
            newRequest.status = "not-started";
            

        }
        
    }

    /** Function to approve the vote of the request */
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // Require user to be an approver and not yet voted
        require(approvers[msg.sender]);
        require(!request.completed);
        require(!request.votedAddresses[msg.sender]);

        request.votedAddresses[msg.sender] = true;
        request.approvedAddress[msg.sender] = true;
        request.approvalCount++;
        request.totalVoteCount++;
    }

    /** Function to set the name of the campaign */
    function setCampaignName(string calldata  campName) public {
        require(msg.sender == manager);
        campaignName = campName;
    }
    /** Function to set the name of the campaign */
    function setCampaignDescription(string calldata  campDesc) public {
        require(msg.sender == manager);
        campaignDescription = campDesc;
    }
    /** Function to reject the vote of the request */
    function rejectRequest(uint index) public {
        Request storage request = requests[index];

        // Require user to be an approver and not yet voted
        require(approvers[msg.sender]);
        require(!request.votedAddresses[msg.sender]);

        request.votedAddresses[msg.sender] = true;
        request.totalVoteCount++;
    }
    /** Function to finalize the first request that skips a vote. */
    function finalizeFirstRequest() public  requestExpirationDateCheck(1) {
        //Create check for minimum funds needing to be met to finalize requests.
        uint256 fundSum = 0;
        for (uint256 i = 0; i < donors.length; i++) {
            fundSum += balances[donors[i]];
        }
        require(fundSum >= fundingGoal);
        Request storage request = requests[1];
        request.recipient.transfer(request.value);
        request.isApproved = true;
        request.completed = true;
        request.status = "approved";
        _token.transfer(msg.sender, 10);
        emit Transaction(msg.sender);

    }


    /** 
      * Function to finalize the request to see the outcome of the request
      * Called by anyone
      * Reward anyone who called it with 10 DECHA token
      */
    function finalizeRequest(uint index) public requestExpirationDateCheck(index) {
        Request storage request = requests[index];
        //First request is handled elsewhere
        require(index>0);
        
        
        require(!request.completed);
        if (request.approvalCount > (request.totalVoteCount / 2)) {
            request.recipient.transfer(request.value);
            request.isApproved = true;
            request.status = "approved";
        } else {
            for (uint256 j = index; j < requests.length; j++) {
                requests[j].isApproved = false;
                requests[j].completed = false;
                requests[j].status = "rejected";
            }
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
    // With a bunch of other book keeping elsewhere in the code this function will return the status of a phase correctly.
    // A request status is just it's status unless the current date is within 15 days of the request's expiration date.
    // And if the request has not yet been finalized.
    function getPhaseStatus(uint index) public view returns (string memory) {
        Request storage request = requests[index];
        // We check if the current date is within 15 days of the request's expiration date but not after it's expiration date.
        if (request.expirationDate - block.timestamp < 15 days && request.expirationDate - block.timestamp > 0) {
            // Then if the request has not been finalized that means people are currently voting on it.
            if (request.completed) {
                return "validating";
            }
        }
        //Otherwise it is just the request's status.
        return request.status;
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
    /** Issue refund to the function caller */
    function issueRefund(address payable refundee) public payable {
        uint256 fundSum = 0;
        for (uint256 i = 0; i < donors.length; i++) {
            fundSum += balances[donors[i]];
        }
        // If we are currently past the dead line and their is not enough funds we can refund the entire balance
        if (block.timestamp > deadline && fundSum < fundingGoal) {
            refundee.transfer(balances[refundee]);
            balances[refundee] = 0;
            refunded[refundee] = true;
            return;
        }

        // If that is not the case we only refund if the campaign has ended.
        // IF the campaign has ended that means their must be 4 phases in the requests array
        require(requests.length == 4);
        // If the campaign has ended that means the last request must be completed.
        require(requests[3].completed);

        // At this point the campaign has ended so we can go ahead and calculate if they get a refund and refund them if they do.

        //We get the number of approved requests
        uint numApproved = 0;
        for (uint256 i = 0; i < requests.length; i++) {
            if (requests[i].isApproved) {
                numApproved++;
            }
        }
        //We calculate the fraction that should be reunded back to the requester
        uint fractionRefund = 1 - (numApproved / 4);
        //We calculate the amount that should be refunded
        uint refundAmount = (balances[refundee] * fractionRefund);
        //We refund the requester
        refundee.transfer(refundAmount);
        //We update the balance of the requester
        balances[refundee] = balances[refundee] - refundAmount;
        //We update the refunded array
        refunded[refundee] = true;

    }
}

// TODO Implement tokens retrieval for unsuccessful campagin

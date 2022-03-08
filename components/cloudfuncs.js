// this goes in the Moralis server Cloud Functions section
Moralis.Cloud.define("getUserCampaignsData", function(request) {
    const userAddress = request.params.userAddress;
    const query = new Moralis.Query("DonatedCampaign");
    const userQuery = new Moralis.Query("User").equalTo('ethAdress', userAddress);
    const result = await userQuery.find();
    
  
    const pipeline = [
      // only transfers to or from userAddress
      {match: {donor: result}}
    ];
  
    return query.aggregate(pipeline);
  });
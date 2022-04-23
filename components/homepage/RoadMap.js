import React from "react";

export default () => {
  return (
    <div id="roadmap">
      <div className="col-xl-8 col-lg-8 col-md-8 m-auto text-center pt-10 pb-10">
        <h1 className="mb-5">Road Map</h1>
        <div className="point">
          <div className="point-index">1</div>
          <div className="point-label">Q4/2021 - Planning Phase</div>
          <div className="point-text">
            Planning use cases, diagrams, documentations, and all features for DeCharity. Deciding technology stack, determining blockchain network and implementing prototype for DeCharity Smart Contract.
          </div>
        </div>
        <div className="point">
          <div className="point-index">2</div>
          <div className="point-label">Q1/2022 - Implementation Phase</div>
          <div className="point-text">
            Implementing and testing the smart contract, constructing the front-end and integrating data. Deciding the most optimal off-chain storage for the application.
          </div>
        </div>
        <div className="point">
          <div className="point-index">3</div>
          <div className="point-label">Q2/2022 - ERC-20 Phase</div>
          <div className="point-text">
            Creating the DECHA token for rewarding purpose. Integrating DECHA to DeCharity and implementing all features relating to transactions between the smart contract and the users. Deploying the complete ready-to-use application on Ethereum Rinkeby Test-net.
          </div>
        </div>
        <div className="point">
          <div className="point-index">4</div>
          <div className="point-label">Q3/2022 - ICO Phase </div>
          <div className="point-text">
            Conducting marketing strategies, finding angel investors, auditing the application with reputable service, and shipping the application to Ethereum Mainnet.
          </div>
        </div>
      </div>
    </div>
  );
};

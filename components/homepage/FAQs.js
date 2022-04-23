import react from "react";
import ExpandableForm from "../ExpandableForm";

export default () => {
  const faqs = [
    {
      question: "What is the goal of DeCharity?",
      answer:
        "DeCharity's main goal is to prevent charity fradulant, thus provides more opportunities to donate to people who are in need. We utilize the power of blockchain to limit the number of fraudulant transactions by up to 75%.",
      alignLeft: true,
    },
    {
      question: "Why choose us over other charity platforms?",
      answer: (
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div className="traditional-content">
            <h5>
              <u>Traditional Non-Profit Platforms</u>
            </h5>
            <span>Long Wait Times</span>
            <br />
            <span>Transaction &#38; Service Fees</span>
            <br />
            <span>Fraud Vulnerability</span>
            <br />
            <span>Limited Financial Services</span>
            <br />
            <span>Lack of Transparency</span>
            <br />
          </div>
          <div className="decharity-content">
            <h5>
              <u>The DeCharity Solution</u>
            </h5>
            <span>Fast settlement with Confirmation</span>
            <br />
            <span>Low to no Fees</span>
            <br />
            <span>Vote and Assert Your Voice</span>
            <br />
            <span>Cryptographic Security</span>
            <br />
            <span>Transparency in real time</span>
            <br />
          </div>
        </div>
      ),
    },
    {
      question: "How does DeCharity prevent fradulant?",
      answer:
        "DeCharity offers a fair solution to all charity campaigns inside the platform. Upon campaign creation, creator musts describe the campaign, detailed plan, roadmap and the recipient wallet address. After that, the creator needs to create a phase (a task inside the campaign), with the detailed description of how the money will be used and the total money needed (which cannot exceed 1/4 of the total money inside the campaign). Once done, all donators, who have donated at least a minimum donation value listed by the creator, will be able to validate the phase by voting on whether this phase should be executed. If the phase gets rejected, the campaign will not send out any fund.",
      alignLeft: true,
    },
    {
      question:
        "Do I get my Ethereum back if a phase inside a campaign gets rejected?",
      answer:
        "The maximum number of rejections a campaign can get is 3. After that, all unused funds will be distributed back proportionally to all donators. Donators need to go to the campaign to claim their own refunds.",
      alignLeft: true,
    },
    {
      question: "How do I use DeCharity?",
      answer:
        "DeCharity requires every users to have MetaMask installed with the desired donation value in Ethereum (Ethereum mainnet).",
      alignLeft: true,
    },
  ];

  return (
    <div id="faq">
      <div className="col-xl-8 col-lg-8 col-md-8 m-auto text-center pt-10 pb-10">
        <h2 className="pt-5 mb-5">FAQs</h2>
        <ExpandableForm items={faqs} />
      </div>
    </div>
  );
};

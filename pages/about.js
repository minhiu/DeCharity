import React from "react";
import Layout from "../components/Layout";

export default function About() {
    return (
        <Layout>
            <div className="about-beginning" style={{
                display: "grid",
                gridAutoFlow: "column"
            }}>
                <div className="video" style={{
                    padding: "10px",
                    margin: "10px"
                }}> 
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/C0DPdy98e4c" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="description">
                    <h1>About Us</h1>
                    <br/>
                    <p2>Philantropy with an emphasis on real-time tracking of funds. Be a part of helping something
                        greater together with the latest blockchain technology.</p2> 
                </div>
            </div>
            <div className="our-cause" style={{
                background: "#EAF9FE",
                width: "100%",
                padding: "10px",
                margin: "10px"
            }}>
                <h1>Our Cause</h1>
                <p1>
                    Founded in 2021, DeCharity was created to be a voice for people. According to the Association of 
                    Certified Fraud Examiners (ACFE), approximately $40 billion is lost to non-profit fraud loss annually.
                    DeCharity was created to increase the real-time tracking of both income and spending of the people who 
                    create them. Utilizing revolutionary blockchain technology, people can be assured that their money is 
                    safe and their transactions are protected.
                    <br/> <br/>
                    DeCharity was designed to be a platform that everyone can trust; the creator and each individual supporter.
                    We wanted to ensure that people knew exactly where their money was going and it would encourage creators
                    to remain in contact with their supporters to complete their cause.
                </p1>
            </div>

            <div className="why-us-content" style={{
                display: "grid",
                gridAutoFlow: "column",
                padding: "10px",
                margin: "10px"
            }}>
                <div className="traditional-content">
                    <h1>Traditional Non-Profit Platforms</h1>
                    <h5>Long Wait Times</h5>
                    <h5>Transaction &#38; Service Fees</h5>
                    <h5>Fraud Vulnerability</h5>
                    <h5>Limited Financial Services</h5>
                    <h5>Lack of Transparency</h5>
                </div> 
                <div className="decharity-content">
                    <h1>The DeCharity Solution</h1>
                    <h5>Fast settlement with Confirmation</h5>
                    <h5>Low to no Fees</h5>
                    <h5>Vote and Assert Your Voice</h5>
                    <h5>Cryptographic Security</h5>
                    <h5>Transparency in real time</h5>
                </div>
            </div>

            <div className="about-highlights" style={{
                gridAutoFlow: "column",
                padding: "10px",
                margin: "10px"
            }}>
                <h1>Highlights</h1>
                <h3>Blockchain technology allows donors to trace transactions in real-time.</h3>
                <h3>Donors can see how much has been donated and from where.</h3>
                <h3>Donors have control over the course of the project.</h3>
                <h3></h3>
            </div>
        </Layout>
    );
};

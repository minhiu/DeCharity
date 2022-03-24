import React from "react";
import Layout from "../components/Layout";

export default function About() {
    return (
        <Layout>
            <div className="about" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr"
            }}>
                <div className="video"> 
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
                    <h3>About Us</h3>
                    <br></br>
                </div>
            </div>
        </Layout>
    );
};

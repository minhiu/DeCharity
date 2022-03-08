import React from "react";
import Layout from "../components/Layout"
import logo from "./decharitylogo.png"

export default function Contact() {
    return (
        <Layout>
            <div className="contact">
                <div className="container">
                    <div className="row align-items-center my-5">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Contact</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

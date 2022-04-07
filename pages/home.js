import React, {Component} from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import logo from './decharitylogo.png';
import { Card, Button } from 'semantic-ui-react';

export default function Home() {
    return (
        <Layout>
            {/* <div style={{
                position: 'absolute', left: '50%', right: '100%',
                transform: 'translate(-50%, 50%)'
            }}> */}
            <div>
                <h1>DeCharity</h1>
                <div className='image-carosel-container'>
                    <img className='logo-image' src="https://i.imgur.com/QBQEjqN.png" alt="logo" 
                        width="100" height="100"/>
                    <br></br>
                    <div className='image-carosel' style={{
                        borderWidth: 3,
                    }}>
                        
                    </div>
                    <p1>
                        insert rotating image pool here
                    </p1>
                </div>
                <div classname='home'>
                    <div classname='featured-projects'>
                        <h2 classname='section-title'>
                            Featured Projects
                        </h2>
                        <div className='project-card'>

                        </div>
                        <h4 classname='description-title'>
                            Check out currently active projects to support!
                        </h4>
                        {/* <!-- This is where we could put some of the sample projects--> */}
                        <div className='item-container' style={{
                            display: 'flex',
                        }}>
                            <div className='card'>
                                <div className='container' style={{
                                    border: 'solid #000',
                                    padding: '10px'
                                }}>
                                    <h4><b>Create Ambulances</b></h4>
                                    <p>Support our cause to create more ambulances</p>
                                    <p>Our goal is to $10,000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br></br>

                    <div className='mission-info' style={{
                        background: '#EAF9FE'
                    }}>
                        <h2 className='section-title'  style={{
                            textAlign: "center",
                        }}>
                           <b> Why Us? </b>
                        </h2>
                        <hr style={{width: "30%"}}></hr>
                        <br></br>
                        <div className='item-container' style={{
                            display: 'flex',
                            flexShrink: "1",
                            justifyContent: 'center'
                        }}>
                            <div className='itemContent'>
                                <h3>Global</h3>
                                <p>Assist and support causes worldwide.</p>
                            </div>
                            <div className='itemContent'>
                                <h3>Mission</h3>
                                <p>Support people through technology.</p> 
                            </div>
                            <div className='itemContent'>
                                <h3>Innovate</h3>
                                <p>Utilizing latest technology with Blockchain and Cryptocurrency</p>
                            </div>
                            <div className='itemContent'>
                                <h3>Transparency</h3>
                                <p>Ensure everyone knows where money is coming and going from.</p>
                            </div>
                        </div>
                    </div>

                    <br></br>

                    <div className='join-promo'>
                        <h2 className='section-title' style={{
                            textAlign: "center"
                        }}>
                            Ready to Start?
                        </h2>
                        <br></br>
                        <hr style={{width: "30%"}}></hr>
                        <div className='item-container' style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <div className='itemContent' style={{
                                padding: '10px'
                            }}>
                                <h3>Donate</h3>
                                <p>Explore our newsfeed for a cause that matches you.</p>
                                <button className='button'>Discover Projects</button>
                            </div>
                            <div className='itemContent'>
                                <h3>Start a Project</h3>
                                <p>Start a project here for your cause.</p>
                                <button className='button'>Fundraise</button>
                            </div>
                            <div className='itemContent'>
                                <h3>Not Registered?</h3>
                                <p>Click to begin the registration process through MetaMask!</p>
                                <button className='button'>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
import React, {Component} from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import logo from './decharitylogo.png';

export default function Home() {
    return (
        <Layout>
            <div>
                <h1>DeCharity</h1>
                <div classname='image-carosel'>
                    <img src={logo} alt="logo" />
                    <br></br>
                    <p1>
                        insert rotating image pool here
                    </p1>
                </div>
                <div classname='home'>
                    <div classname='featured-projects'>
                        <h2 classname='section-title'>
                            Featured Projects
                        </h2>
                        <h4 classname='description-title'>
                            Check out currently active projects to support!
                        </h4>
                        {/* <!-- This is where we could put some of the sample projects--> */}
                    </div>
                    
                </div>
            </div>
        </Layout>
    );
}
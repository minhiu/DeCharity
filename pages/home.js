import React, {Component} from 'react';
import Layout from '../components/Layout';
import logo from '../public/images/decharitylogo.png';

export default function Home() {
    return (
        <Layout>
            <div>
                <h1>DeCharity</h1>
                <div>
                    <img src={logo} alt='logo' /> 
                </div>
                <div>
                    <br></br>
                    <p1>
                        insert rotating image pool here
                    </p1>
                </div>
            </div>
        </Layout>
    );
}
import React, {Component} from 'react';
import Layout from '../components/Layout';
import logo from './decharitylogo.png';

export default function Home() {
    return (
        <Layout>
            <div>
                <h1>DeCharity</h1>
                <img src={logo} alt='logo' />
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
import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default()=>{
    return(
        <Layout>
            <div>
                <h1>View Profile Information</h1>
            </div>
            <div>
                <img src={'./images/sampleprofilepic.jpeg'} />
            </div>
            <div>
                <h2>This will display the user's name</h2>
            </div>
            <div>
                <div>
                    <h3>This will display the user's bio</h3>
                    <p>Sample biography text</p>
                </div>
            </div>
        </Layout>
    )
}
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
                <img src={'./sampleprofilepic.jpeg'} />
            </div>
        </Layout>
    )
}
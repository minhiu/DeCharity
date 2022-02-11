import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default()=>{
    return(
        <Layout>
            <div>
                <h1>This is the profile page</h1>
            </div>
            <div>
                <img src={'./profile-pic.png'} />
            </div>
        </Layout>
    )
} 
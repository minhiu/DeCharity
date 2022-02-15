import { Divider, Form, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';


export default()=>{
    return(
        <Layout>

            <div>
                <img src={require("./profile-pic.png")} height ={200} width={200} />
            </div>
        
            <Form>
                <Form.Field>
                    <input type='text' placeholder='First name' />
                    {/* <Label pointing>Please enter a value</Label> */}
            </Form.Field>
            <br />

            <Form.Field>
                {/* <Label pointing='below'>Please enter a value</Label> */}
                <input type='text' placeholder='Last Name' />
            </Form.Field>
            <Divider />

            <Form.Field>
                {/* <Label pointing='below'>Please enter a value</Label> */}
                <input type='text' placeholder='Email' />
            </Form.Field>
            <br />

            <Form.Field>
                {/* <Label pointing='below'>Please enter a value</Label> */}
                <input type='text' placeholder='Phone Number' />
            </Form.Field>
            <Divider />

            <Form.Field>
                {/* <Label pointing='below'>Please enter a value</Label> */}
                <input type='text' placeholder='Birthdate' />
            </Form.Field>
            <br />

            <Form.Field>
                {/* <Label pointing='below'>Please enter a value</Label> */}
                <input type='text' placeholder='Address' />
            </Form.Field>
            <br />
            <input type="submit" value="Submit"></input>

            </Form>
        </Layout>
    )
} 
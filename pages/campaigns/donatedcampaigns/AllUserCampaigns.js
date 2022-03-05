
import { useMoralis, useMoralisFile} from "react-moralis";
import { useState } from "react";
import { Form, Divider , Input} from "semantic-ui-react";
import { Button, Image, Box } from '@chakra-ui/react'
import { Authentication } from './../../../components/Authentication';


export const ShowCampaigns = () => {
    const { isAuthenticated, user, setUserData} = useMoralis();
    const { error, isUploading, saveFile} = useMoralisFile();

    const [ username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ birthdate, setBirthdate ] = useState();
    const [ localFile, setLocalFile ] = useState();


    if(isAuthenticated) {
        return (
          
          <div>
            <Box>
              <Image 
              style={{width: 200, height: 200, borderRadius: 200/ 2}}
              src={user.attributes.profile_url} />
            </Box>
  
            <Form onSubmit={console.log()} error={!!error}>
              <Input type="file" onChange={console.log()} className="inputfile ui grey right floated button" 
                style={{position: 'absolute', middle: 50, right: 0,top: -50}}
              />
              <Button type="submit" disabled={console.log()} 
                style={{position: 'absolute', middle: 50, right: 0,top: -90}}>Upload</Button>
            </Form>
            
            <p>Username</p>
            <div class="ui fluid icon input">
              <input 
                placeholder={user.attributes.username} 
                type="text" 
                onChange={console.log()}
              />
            </div>
            <Divider></Divider>
  
            <p>Email</p>
            <div class="ui fluid icon input">
              <input 
                placeholder={user.attributes.email} 
                type="text" 
                onChange={console.log()}
              />
            </div>
            <Divider></Divider>
  
            <p>Birth Date  </p>
            <div class="ui fluid icon input">
              <input placeholder={user.attributes.birthdate} 
              type="text" 
              onChange={console.log()}></input>
            </div>
            <Divider></Divider>
  
            <Button onClick={console.log()}>Submit Changes</Button>
          </div>
        );
      } else {
        return (
          <div >
            Authentication has Failed
            <Authentication></Authentication>
          </div>
        )
      }




}

export default ShowCampaigns;
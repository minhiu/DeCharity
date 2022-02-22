import react from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Divider } from "semantic-ui-react";
import { Button, Input, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'

export const SignUp = () => {
    const { isAuthenticated, user , setUserData} = useMoralis();

    const [username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [birthdate, setBirthdate ] = useState();

    const handleSave = () => {
      setUserData({
        username,
        email,
        birthdate,
      })
    } 

    if(isAuthenticated) {
      return (
        <div>
          
                <img src={require('../pages/profile-pic.png').default} height ={200} width={200} />
            
          <text>Username  </text>
          <Input value={user.attributes.username} onChange={(event) => setUsername(event.currentTarget.value)}/>
          <Divider></Divider>
          <text>Email  </text>
          <Input value={user.attributes.email} onChange={(event) => setEmail(event.currentTarget.value)}/>
          <Divider></Divider>
          <text>Birth Date  </text>
          <Input value={user.attributes.birthdate} onChange={(event) => setBirthdate(event.currentTarget.value)}/>
          <Divider></Divider>
          <text>EthAddress  </text>
          <Input value={user.attributes.ethAddress} />
          <Divider></Divider>
         
          <Button onClick={handleSave}>Submit Changes</Button>
        </div>
      );
    } else {
      return (
        <div>
          Auth Error
        </div>
      )
    }
   
  };
  
  
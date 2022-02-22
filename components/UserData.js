import react from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Divider, Input } from "semantic-ui-react";

export const SignUp = () => {
    const { isAuthenticated, user } = useMoralis();

    const [username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState('');
    const [birthdate, setBirthdate ] = useState();

    if(isAuthenticated) {
      return (
        <div>
          <text>Username  </text>
          <Input value={user.attributes.username} />
          <Divider></Divider>
          <text>Email  </text>
          <Input value={user.attributes.email} />
          <Divider></Divider>
          <text>Birth Date  </text>
          <Input value={user.attributes.birthdate} />
          <Divider></Divider>
          <text>EthAddress  </text>
          <Input value={user.attributes.ethAddress} />
          <Divider></Divider>
          <text>Password</text>
          <Input value={password} />
          <Divider></Divider>
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
  
  
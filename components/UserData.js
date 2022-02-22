import react from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Divider, Input } from "semantic-ui-react";

export const SignUp = () => {
    const { isAuthenticated, user , setUserData} = useMoralis();

    const [username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState('');
    const [birthdate, setBirthdate ] = useState();

    const handleSave = () => {
      setUserData({
        username,
        email,
        birthdate,
        password: password === "" ? undefined : password
      })
    } 

    if(isAuthenticated) {
      return (
        <div>
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
          <text>Password</text>
          <Input value={password} />
          <Divider></Divider>
          <button onClick={handleSave}>Submit Changes</button>
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
  
  
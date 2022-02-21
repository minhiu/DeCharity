import react from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Input } from "semantic-ui-react";

export const SignUp = () => {
    const { signup , isAuthenticated, user } = useMoralis();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
  
    return (
      <div>
        <Input placeholder={user.attributes.email} value = {email} onChange={(event) => setEmail(event.currentTarget.value)} />
        <Input placeholder="password" type="password" value = {password} onChange={(event) => setPassword(event.currentTarget.value)} />
        <button onClick = {() => signup()}>Submit</button>
      </div>
    );
  };
  
  
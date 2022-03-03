import react from "react";
import { useMoralis, useMoralisFile} from "react-moralis";
import { useState } from "react";
import { Form, Divider , Input} from "semantic-ui-react";
import { Button, Image, Box } from '@chakra-ui/react'

export const SignUp = () => {
    const { isAuthenticated, user, setUserData} = useMoralis();
    const { error, isUploading, saveFile} = useMoralisFile();

    const [ username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ birthdate, setBirthdate ] = useState();
    const [ localFile, setLocalFile ] = useState();
  
    const handleSave = () => {
      setUserData({
        username,
        email,
        birthdate,
      })
    }
    
    const handleUpload = async () => {
      console.log("Uploading file...");
      if (localFile) {
        let temp = await saveFile("upload.jpeg", localFile);
        user.set("profile_url", temp._url);
        user.save();
        return temp; 
      }
    }

    const handleChange = (event) => {
      if (event.currentTarget.files) {
        setLocalFile(event.currentTarget.files[0]);
      }
    }

    if(isAuthenticated) {
      return (
        <div>
          <Box>
            <Image 
            style={{width: 200, height: 200, borderRadius: 200/ 2}}
            src={user.attributes.profile_url} />
          </Box>

          <Form onSubmit={handleUpload} error={!!error}>
            <Input type="file" onChange={handleChange} className="inputfile ui grey right floated button" 
              style={{position: 'absolute', middle: 50, right: 0,top: -50}}
            />
            <Button type="submit" disabled={isUploading} 
              style={{position: 'absolute', middle: 50, right: 0,top: -90}}>Upload</Button>
          </Form>
          
          <p>Username</p>
          <div class="ui fluid icon input">
            <input 
              placeholder={user.attributes.username} 
              type="text" 
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <Divider></Divider>

          <p>Email</p>
          <div class="ui fluid icon input">
            <input 
              placeholder={user.attributes.email} 
              type="text" 
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <Divider></Divider>

          <p>Birth Date  </p>
          <div class="ui fluid icon input">
            <input placeholder={user.attributes.birthdate} 
            type="text" 
            onChange={(event) => setBirthdate(event.currentTarget.value)}/></div>
          <Divider></Divider>

          <Button onClick={handleSave}>Submit Changes</Button>
        </div>
      );
    } else {
      return (
        <div >
          Authentication has Failed
        </div>
      )
    }
  };
  
  
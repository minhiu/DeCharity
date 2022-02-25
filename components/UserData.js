import react from "react";
import { useMoralis, useMoralisFile} from "react-moralis";
import { useState } from "react";
import { Form, Divider } from "semantic-ui-react";
import { Button, Input, Image, Container, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { File } from '../components/UploadFile';

export const SignUp = () => {
    const { isAuthenticated, user, setUserData} = useMoralis();
    const { error, isUploading, saveFile} = useMoralisFile();

    const [username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [birthdate, setBirthdate ] = useState();
    const [ localFile, setLocalFile ] = useState();
    const [ profile_url, setProfileUrl ] = useState();

    const handleSave = () => {
      setUserData({
        username,
        email,
        birthdate,
      })
    }
    
    const handleUpload = async (e) => {
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
            boxSize='200px'
            
            src={user.attributes.profile_url} />
        
          </Box>
          <Form onSubmit={handleUpload} error={!!error}>
            <Input type="file" onChange={handleChange} className="inputfile ui grey right floated button"/>
            <Button type="submit" disabled={isUploading}>Upload</Button>
          </Form>
          
          <p>Username  </p>
          <Input value={user.attributes.username} onChange={(event) => setUsername(event.currentTarget.value)}/>
          <Divider></Divider>
          <p>Email  </p>
          <Input value={user.attributes.email} onChange={(event) => setEmail(event.currentTarget.value)}/>
          <Divider></Divider>
          <p>Birth Date  </p>
          <Input value={user.attributes.birthdate} onChange={(event) => setBirthdate(event.currentTarget.value)}/>
          <Divider></Divider>
          <p>EthAddress  </p>
          <Container>
            value={user.attributes.ethAddress}
          </Container> 
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
  
  
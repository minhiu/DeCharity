import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useMoralis, useMoralisFile } from "react-moralis";
export const File = (setFileData) => {
    const [localFile, setLocalFile] = useState();
    const [uploadData, setUploadData] = useState();
    const { setUserData, userError, isUserUpdating, user } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  
    const handleUpload = async (e) => {
      console.log("Uploading file...");
      if (localFile) {
        let temp = await saveFile("upload.png", localFile);
<<<<<<< HEAD
        console.log(error);
        console.log(setFileData);
        setFileData(temp);
=======

        console.log()

>>>>>>> 96e5015b6fb98b040a64694217e32b79400bdd66
      }
    }
  
    const handleChange = (event) => {
      if (event.currentTarget.files) {
        setLocalFile(event.currentTarget.files[0]);
      }
    }
    return (
        
        <Form onSubmit={handleUpload} error={!!error}>
            <Input type="file" onChange={handleChange} className="inputfile ui grey right floated button"/>
            <Button type="submit" disabled={isUploading}>Upload</Button>
        </Form>
        
            
    );
}
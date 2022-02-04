import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useMoralis, useMoralisFile } from "react-moralis";
export const File = () => {
    const [localFile, setLocalFile] = useState();
    
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  
    const handleUpload = async (e) => {
      console.log("Uploading file...");
      if (localFile) {
        let temp = await saveFile("upload.png", localFile);
        console.log(error);
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
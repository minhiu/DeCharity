import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useMoralis, useMoralisFile } from "react-moralis";
//Example of a file upload component.
export const File = ({setFileData}) => {
    //Create file state functions
    const [localFile, setLocalFile] = useState();
    //Setup uploadFunctions to pass to parent
    const [uploadData, setUploadData] = useState();
    //Get variables from moralis hooks
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
    //Function to handle upload when upload button is pressed
    const handleUpload = async (e) => {
      console.log("Uploading file...");
      if (localFile) {
        let temp = await saveFile("upload.png", localFile);
        setFiledata(temp);
        console.log()

      }
    }
    //Function to change the state of the local file when a new file is selected
    const handleChange = (event) => {
      if (event.currentTarget.files) {
        setLocalFile(event.currentTarget.files[0]);
      }
    }
    return (
        //Simple front end to display and select file components
        <Form onSubmit={handleUpload} error={!!error}>
            <Input type="file" onChange={handleChange} className="inputfile ui grey right floated button"/>
            <Button type="submit" disabled={isUploading}>Upload</Button>
        </Form>
        
            
    );
}
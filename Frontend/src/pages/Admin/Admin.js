import React, { useEffect, useState } from 'react'
import "./Admin.css"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Admin.css';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Admin() {

  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=> {
    fetch("/admin", {
      method: "GET",
      credentials: 'include' // Ensures cookies are sent with the request
    })
    .then((response) => {
      if(response.ok) {
        setAuthenticated(true);
      }else{
        navigate("/login");
      }
    })
    .catch(() => navigate("/login"));
  },[navigate]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    link: "",
    body: "",
    file: null
  });

  const onInputChange = (e) => {
    if(e.target.name === "file"){
      setFormData({...formData, file: e.target.files[0]});
    }else{
      setFormData({...formData,[e.target.name]:e.target.value});
    }
  }

  const handleUpload = async(e) => {
    e.preventDefault();

    const formDataToSend =  new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc",formData.desc);
    formDataToSend.append("link",formData.link);
    formDataToSend.append("body",formData.body);
    formDataToSend.append("file", formData.file);

    try{
      const response = await axios.post("http://localhost:8080/project/upload",formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
        },
      });
      console.log(response);
    }catch(error){
      console.error("Error submitting form :", error);
    };
  }

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: "POST",
        credentials: 'include' 
      });
 
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return authenticated ? (
    <div className='admin'>
        <Box sx={{ width: '80%', maxWidth: '90%' }}>
        <form onSubmit={(e) => handleUpload(e)}>
          <TextField
            fullWidth
            label="Project Titile"
            variant="standard"
            color="warning"
            name='title'
            value={formData.title}
            onChange={(e) => onInputChange(e)}
            style={{ marginBottom: '2%' }}
          />
          <TextField
            fullWidth
            label="Project Description"
            variant="standard"
            color="warning"
            name='desc'
            value={formData.desc}
            onChange={(e) => onInputChange(e)}
            style={{ marginBottom: '2%' }}
          />
          <TextField
            fullWidth
            label="Repository Link"
            variant="standard"
            color="warning"
            name='link'
            value={formData.link}
            onChange={(e) => onInputChange(e)}
            style={{ marginBottom: '2%' }}
          />
          <TextField
            fullWidth
            label="Project Body"
            variant="standard"
            color="warning"
            name='body'
            value={formData.body}
            onChange={(e) => onInputChange(e)}
            multiline
            rows={4}
            style={{ marginBottom: '2%' }}
          />
          
          <input
            accept="image/*"
            type="file"
            name="file"
            onChange={(e) => onInputChange(e)}
            style={{ marginBottom: '2%', padding: '1%' }}
            />
          <div className='button'>
            <Button 
              style={{backgroundColor:'#555'}}
              type="submit"
              onSubmit={(e)=>handleUpload(e)}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Upload Project
            </Button>
          </div>
        </form>
        
            <Button 
              onClick={handleLogout}
              variant="contained"
              style={{marginTop: '2%'}}
            >
              Logout
            </Button>
          
      </Box>
    </div>
  ) : null;
}

export default Admin
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Contact.css';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'; // Import sweetalert2

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_b7zvk2u', 'template_3vmkbup', form.current, '7H9N0PDlUOA51Z0Ga')
      .then(
        () => {
          // Show success popup
          Swal.fire({
            icon: 'success',
            title: 'Email Sent',
            text: 'Your message has been sent successfully!',
          });
        },
        (error) => {
          // Show error popup
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong: ${error.text}`,
          });
        },
      );
  };

  return (
    <div className='contact'>
      <Box className='right' sx={{ width: '80%', maxWidth: '100%' }}>
        <form ref={form} onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="Name"
            id="name"
            variant="standard"
            color="warning"
            name='user_name'
            style={{ marginBottom: '5%' }}
          />
          <TextField
            fullWidth
            label="Email"
            id="email"
            variant="standard"
            color="warning"
            name='user_email'
            style={{ marginBottom: '5%' }}
          />
          <TextField
            fullWidth
            label="Subject"
            id="subject"
            variant="standard"
            color="warning"
            name='subject'
            style={{ marginBottom: '5%' }}
          />
          <TextField
            fullWidth
            label="Message"
            id="message"
            variant="standard"
            color="warning"
            name='message'
            multiline
            rows={4}
            style={{ marginBottom: '5%' }}
          />
          <div className='button'>
            <Button 
              style={{backgroundColor:'#555'}}
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </form>
      </Box>
      <Box className='left'>
        <h1 style={{fontWeight:'bold', color:'white'}}>Let's talk</h1>
        <p style={{fontStyle: 'italic', color: 'white', fontSize:20, textAlign:'center'}}>"I appreciate hearing from you,<br/> And will get back to you as soon as possible"</p>
      </Box>
    </div>
  );
}

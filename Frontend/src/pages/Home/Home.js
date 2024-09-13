import React from 'react';
import Navbar from '../../components/Navbar/Navbar.tsx';
import "./Home.css";
import profile from "../../components/Images/profile7.png"
import { Typography, 
         Box, 
         Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import cv from '../../components/Images/ShabeebaBanu-CV.pdf'


function Home() {
  return (
        <div className='home'>
            <div className='left'>
               <img src={profile}/>
            </div>
            <div className='right'>
            <Box>
                
                <Typography className='myname' style={{ margin: 0, lineHeight: 0.5}}>
                    <h2>SHABEEBA BANU</h2>
                </Typography>
                <Typography className='desc'>
                    <div className='text'>
                        <span>Full-Stack Developer |</span><br/>
                        <span>UI Designer</span>
                    </div>
                </Typography>
                <Typography className='resume' style={{paddingTop: '3%', paddingBottom: '3%'}}>
                  <a href={cv}>
                   <Button variant="contained" style={{width: '50%', backgroundColor: "#B79499", fontWeight:'bold'}}>
                      Resume
                   </Button>
                  </a>
                </Typography>
                <Typography className='sm'>
                    <Button onClick={() => window.open('https://www.linkedin.com/in/shabeeba-banu-9a3366213/')}>
                         <LinkedInIcon className='icon'/>
                    </Button>
                    <Button onClick={() => window.open('https://github.com/ShabeebaBanu')}>
                          <GitHubIcon  className='icon'/>
                    </Button>
                </Typography>
            </Box>
            </div>
        </div>
   
  )
}

export default Home
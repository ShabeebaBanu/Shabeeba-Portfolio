import React, { useState } from 'react';
import './About.css';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';

//skills data file
import skills from "../../dataFiles/Skills.json"

function About() {
   
  const [hoveredSkill,setHoveredSkill] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredSkill(index);
  }

  const handleMouseLeave = () =>{
    setHoveredSkill(null);
  }

  return (
    <div className='about'>
      <div className='left'>
      <Box
            sx={{
              display: 'grid', 
              gap: 5                                 
            }}
          >
        <Typography variant="h1" style={{fontWeight:'bold'}}>Hello, <br/> I am Shabeeba</Typography>
        <Button style={{width: '50%', color: 'white', border: '1px solid white', fontWeight:'bold'}}
                onClick={() => window.open('https://www.linkedin.com/in/shabeeba-banu-9a3366213/')}>
           Linkedin
        </Button>
      </Box>
      </div>
      <div className='right'>
        <div className='row0'>
          <h2 style={{color:'#555'}}>About Me</h2>
          <Typography>
          Quick learner with strong problem-solving skills, 
          eager to take on challenging projects with fresh mindset. 
          Skilled in adopting new technologies, collaborating in dynamic teams, and communicating effectively, 
          I aim to fully commit to innovative projects as a Software Engineer while enhancing my skills. 
          </Typography>
        </div>
        <div className='row1'>
          <Box
            component="form"
            sx={{
              display: 'grid',               
              gridTemplateColumns: '1fr 1fr', 
              rowGap: 3,
              columnGap: 4                        
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              variant="standard"
              label="Name"
              defaultValue="Shabeeba Banu"
              InputProps={{
                readOnly: true,
                sx: {
                  color: '#916a68', 
                }
              }}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Age"
              defaultValue="22 Years"
              InputProps={{
                readOnly: true,
                sx: {
                  color: '#916a68', 
                }
              }}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Country"
              defaultValue="Sri Lanka"
              InputProps={{
                readOnly: true,
                sx: {
                  color: '#916a68', 
                }
              }}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Email"
              defaultValue="shabeebabanu.user@gmail.com"
              InputProps={{
                readOnly: true,
                sx: {
                  color: '#916a68', 
                }
              }}
            />
          </Box>
        </div>
        <div className='row2'>
        <h2 style={{color:'#555'}}>Skills</h2>
          <div className='skills-list'
          >
          {skills.map((skill,index) => (
            <div
            key={index}
            className='skill'
            onMouseEnter={()=>handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            >
              <Button className='contained' size="small" variant="outlined" color="warning">
                {skill.type}
              </Button>
              {
              hoveredSkill === index && (
                <div className='sub-menu'>
                  {skill.sub.map((subskill,index)=>(
                    <div className='sub-item'>
                        {subskill}
                    </div>
                  ))}
                </div>
              )
            }
            </div>
          ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default About;

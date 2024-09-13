import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Education.css';

//images
import uom from '../../components/Images/uom.png';
import ca from '../../components/Images/ca.png';
import aat from '../../components/Images/aat.png';
import bcc from '../../components/Images/bcc.png';
import aatpf from '../../components/Images/Shabeeba AAT PF.jpg'

//data file
import EducationData from '../../dataFiles/EducationData.json'

const images = {uom,ca,aat,bcc,aatpf};


export default function Education() {
  const [isselect,setIsSelect] = useState(null);

  const handleAccordinChange = (index) =>{
   setIsSelect(isselect === index ? null : index);
  }

  return (
    <div className='education'>
      {EducationData.map((edu, index) => (
        <Accordion key={index}
          onChange={() => handleAccordinChange(index)}
          style={{
            backgroundColor: isselect === index ? "#f5e4d244" : "white"
          }}
          className='catagory'
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <img src={images[edu.img]} alt={edu.title} />
            <Typography style={{fontSize:'15px',fontWeight:'bold'}}>{edu.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography 
              dangerouslySetInnerHTML={{ __html: edu.description }} 
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import './Services.css';

//main image
import dev from "../../components/Images/dev.gif"
import design from "../../components/Images/design.gif"
import teach from "../../components/Images/teach.gif"
import audit from "../../components/Images/audit.gif"

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';


//images
import s1 from "../../components/Images/Samples/s1.png";
import s2 from "../../components/Images/Samples/s2.png";
import s3 from "../../components/Images/Samples/s3.png";
import s4 from "../../components/Images/Samples/s4.png";
import s6 from "../../components/Images/Samples/s6.png";
import s7 from "../../components/Images/Samples/s7.jpg";
import s8 from "../../components/Images/Samples/s8.png";
import s9 from "../../components/Images/Samples/s9.jpg";
import s10 from "../../components/Images/Samples/s10.jpg";
import s11 from "../../components/Images/Samples/s11.png";
import s12 from "../../components/Images/Samples/s12.png";
import s13 from "../../components/Images/Samples/s13.jpg";
import s14 from "../../components/Images/Samples/s14.jpg";
import s15 from "../../components/Images/Samples/s15.jpg";
import s16 from "../../components/Images/Samples/s16.jpg";
import s17 from "../../components/Images/Samples/s17.jpg";

//data file
import ServiceData from "../../dataFiles/ServiceData.json"

const imageSam = [s1, s2, s3, s4, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16,s17];
const images = {dev,design,teach,audit};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

function Services() {
    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const cardRefs = useRef([]);

    const handleClickOpen = (index) => {
        setActiveCard(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNavigation = (page) => {
        navigation(page);
    }

    const handleRedirect = () => {
        window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSds9o1-7LL1masGjZwfIsBE9dj8H2FjetwN6QbmJCjgkjsDYA/viewform";
    }

    useEffect(() => {
        const observerOptions = {
            root: null, 
            threshold: 0.6 
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('large');
                    entry.target.classList.remove('small');
                } else {
                    entry.target.classList.remove('large');
                    entry.target.classList.add('small');
                }
            });
        }, observerOptions);
    
        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card); 
        });
    
        return () => {
            cardRefs.current.forEach((card) => {
                if (card instanceof Element) {
                    observer.unobserve(card); 
                }
            });
            observer.disconnect();
        };
    }, []);
    

    return (
        <div className="services">
            {ServiceData.map((ser, index) => (
                <div
                    key={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="card-container"
                >
                    <Card className='card'>
                        <div className='media'>
                           <img src={images[ser.img]}/>
                        </div>
                        <div className='desc'>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                {ser.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                 dangerouslySetInnerHTML={{ __html: ser.desc }} 

                            >
                            </Typography>
                        </CardContent>
                        
                       
                        <CardActions>
                        {ser.title === "Flyer Design" ? (
                            <Button size="small" variant="outlined" color="warning" onClick={() => handleClickOpen(index)}>
                                View My Works
                            </Button>
                        ) : ser.title === "ICT Tutorial" ? (
                            <Button size="small" variant="outlined" color="warning" onClick={() => handleRedirect()}>
                                Register
                            </Button>
                        ): null}
                            
                        </CardActions>
                        </div>
                    </Card>
                </div>
            ))}

            {activeCard !== null && (
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ fontWeight: 'bold' }}>
                        {ServiceData[activeCard].title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                        <div className='gallery'>
                            <ImageList cols={2} gap={20}>
                                {imageSam.map((imgSrc, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            srcSet={`${imgSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${imgSrc}?w=248&fit=crop&auto=format`}
                                            loading="lazy"
                                            alt={`Sample Image ${index + 1}`}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                        </Typography>
                    </DialogContent>
                </BootstrapDialog>
            )}
        </div>
    );
}

export default Services;

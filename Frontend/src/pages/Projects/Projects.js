import * as React from 'react';
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
import "./Projects.css";
import axios from 'axios';

// main images
import transitgo from "../../components/Images/transitgo.png";
import chatbot from "../../components/Images/chatbot.png";
import portfolio from "../../components/Images/portfolio.png";

//data file
import projectData from "../../dataFiles/ProjectData.json"

// For managing the images dynamically
const images = { transitgo, chatbot, portfolio };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

export default function Projects() {
  const [open, setOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(null);
  const [projectData, setProjectData] = React.useState([]);

  // Fetch project data on component mount
  React.useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/project/projects");
      const projectArray = response.data;
      console.log(projectArray);
      setProjectData(projectArray);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleClickOpen = (project) => {
    setActiveProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="projects">
      {projectData.length > 0 ? (
        projectData.map((pro, index) => (
          <Card key={index} className="card">
            <CardMedia
              component="img"
              className="card-media"
              image={pro.imageUrl}  
              alt={pro.title}
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h6" component="div" className="card-title">
                {pro.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-desc">
                {pro.desc}
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
              <Button size="small" variant="outlined" color="warning" onClick={() => handleClickOpen(pro)}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="text.secondary">
          Loading....
        </Typography>
      )}

      {activeProject && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ fontWeight: 'bold' }}>
            {activeProject.title}
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
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={{ __html: activeProject.body }}  // Safely rendering HTML
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => window.open(activeProject.link, "_blank")}>
              CODE or MORE
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </div>
  );
}

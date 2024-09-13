import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Navbar from '../../components/Navbar/Navbar.tsx';
import Home from '../Home/Home.js';
import About from '../About/About.js';
import Education from '../Education/Education.js'
import Projects from '../Projects/Projects.js'
import Gallery from '../Gallery/Gallery.js'
import Contact from '../Contact/Contact.js'
import Services from '../Services/Services.js';
import './FirstPage.css';
import Admin from '../Admin/Admin.js';

function FirstPage() {
  const [selectedPage, setSelectedPage] = useState('Home');

  const handlePageSelect = (page) => {
    setSelectedPage(page);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Education':
        return <Education />;
      case 'Projects':
        return <Projects />;
      case 'Gallery':
        return <Gallery />;
      case 'Contact':
        return <Contact />;
      case 'Services':
        return <Services />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="container">
      <div className='navbar'>
      <Navbar onPageSelect={handlePageSelect} />
      </div>
      <SwitchTransition> 
        <CSSTransition key={selectedPage} timeout={300} classNames="scale">
          <div className='page'>{renderPage()}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default FirstPage;

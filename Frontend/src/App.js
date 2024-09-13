
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import FirstPage from './pages/FirstPage/FirstPage';
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar.tsx';
import Login from './pages/Login/Login.js';
import Admin from './pages/Admin/Admin.js';

function App() {
  return (
    <div>
   
          <FirstPage/>
          {/* <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/> */}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './Login.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const response = await axios.post("http://localhost:8080/login", {
          username: username,
          password: password
        }, {
            withCredentials: true
        });
        if(response.ok) {
          navigate("/admin");
        }else{
          console.log("login failed");
        }
        window.location.href = '/admin'; 
    } catch (error) {
        console.error('Login failed:', error);
    }
  };

  return (
    <div  className='login'>
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <div>
        <label>Username:</label>
        <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;

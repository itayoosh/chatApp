import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const signupContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f8ea', 
};

const formStyle = {
  width: '300px',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const inputStyle = {
  width: '100%',
  marginBottom: '10px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  backgroundColor: '#4caf50',
  color: '#fff',
  cursor: 'pointer',
};

export default function Signup() {
  const url = 'http://localhost:3003/';
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    axios.defaults.withCredentials = true;
    try {
      await axios.post(url + 'users/signup', { phone, password });
      navigate("./")

    } catch (err) {
      console.log(err);
      if(phone.length>15||phone.length<8){
        setErr("phone must contain between 8 to 15 numbers")
      }else if(password<3||password>16){
        setErr("password must be between 3 to 16 characters long")
      }else if(err.response.data.code==11000){
        setErr("phone is already in system")
      }
  };}

  return (
    <div style={signupContainerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#4caf50' }}>Sign Up</h2>
        <form>
          <label>
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </label>
          <button type="button" onClick={handleSignup} style={buttonStyle}>
            Sign Up
          </button>
          <span style={{color: "red"}}>{err}</span>
        </form>
        <span>already have an account?   <a href='./'>log in</a></span>
      </div>
    </div>
  );
  }
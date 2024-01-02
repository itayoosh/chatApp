import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';


const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f8ea', // Light green background color
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


export default function Login() {

  const url = "http://localhost:3003/"
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]=useState("");
  const context = useContext(Context);
  
  const handleLogin = async() => {
    axios.defaults.withCredentials= true;
    try{
    const {data} = await axios.post(url+"users/login", {phone, password});
    context.setUserInfo(data);

    }catch(err){
      console.log(err);
      setErr("phone or password is'nt correct");
    }

    

  };

  return (
    <div style={loginContainerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#4caf50' }}>Login</h2>
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
          <button type="button" onClick={handleLogin} style={buttonStyle}>
            Login
          </button>
          <span style={{color: "red"}}>{err}</span>
        </form>
        <span>dont have an account?   <a href='/signUp'>sign up</a></span>
      </div>
    </div>
  );
}

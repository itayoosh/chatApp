import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'; 
const socket = io('http://localhost:3003'); 
const LogOut = () => {
    Cookies.remove("authToken");
    const navi = useNavigate();
    socket.disconnect();
    useEffect(()=>{
      return()=>{  
        navi("/");}
    },[])
  };

export default LogOut;

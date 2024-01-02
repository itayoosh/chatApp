import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'
import ShowChats from './ShowChats';
import NavBar from './NavBar';
import { Context } from '../context/Context';

export default function Chats() {
  const url = "http://localhost:3003/"
  const [chats, setChats] = useState([]);
const socket = useContext(Context).socket;

  const fetchChats= async()=>{
    try {
      const {data} = await axios.get(url+"chats/showChats", {
        headers:{
          "Content-Type": "application/json",
            "x-api-key": Cookies.get("authToken")
        }
      });
      setChats(data)
    } catch (error) {
      console.log(error);
    }
  }
  socket.on('newMessage', () => {
   fetchChats();
  });
  useEffect(()=>{
   fetchChats();
  },[])

  return (
    <>
    <NavBar/>
    <ShowChats chats={chats}/>
</>
  )
}

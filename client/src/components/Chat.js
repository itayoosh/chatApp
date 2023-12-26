import React, { useEffect } from 'react'
import ShowMessages from './ShowMessages'
import { useParams } from 'react-router-dom'
import ShowContact from './ShowContact';
import NavBar from './NavBar';


export default function Chat() {
  const {chatId} = useParams();
  
  return (
    <>
      <NavBar/>
      <ShowContact chatId={chatId}/>
      <ShowMessages chatId={chatId}/>
      </>
  )
}

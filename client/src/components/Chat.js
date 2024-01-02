import ShowMessages from './ShowMessages'
import { useParams } from 'react-router-dom'
import ShowChatter from './ShowChatter';
import NavBar from './NavBar';
import { Context } from '../context/Context';
import { useContext } from 'react';


export default function Chat() {
  const {chatId} = useParams();
  const socket = useContext(Context).socket;

  socket.emit('userEnterred');

  
  return (
    <>
      <NavBar/>
      <ShowChatter chatId={chatId}/>
      <ShowMessages chatId={chatId}/>
      </>
  )
}

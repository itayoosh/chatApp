import React, { useState } from 'react'
import Routs from './Routs'
import {Context} from "../context/Context"
import io from 'socket.io-client';
export default function Provider() {
    const [userInfo, setUserInfo] = useState({});
    const socket = io('http://localhost:3003');

  return (
    <Context.Provider value={{userInfo, setUserInfo, socket}}>
   <Routs/>
    </Context.Provider>
  )
}

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chats from './Chats';
import { Context } from '../context/Context';
import Chat from './Chat';
import Signup from './SignUp';
import LogOut from './logOut';
import MyProfile from './MyProfile';
import Search from './Search';



export default function Routs() {
  const url = "http://localhost:3003/";
  const context = useContext(Context);
  const checkLogIn=async()=>{
    
    if (Cookies.get("authToken")){
      try{
      const {data} = await axios.get(url+"users/showInfo", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": Cookies.get("authToken"),
        }
      });
      if(data._id){

        if (!context.userInfo.phone){
          context.setUserInfo(data);
        }
      }else{
        Cookies.remove("authToken");
      }
    
    }catch(err){
      Cookies.remove("authToken");
      console.log(err);
    }
    }else{
      if(context.userInfo.phone){
        context.setUserInfo({});
      }
    }
  }
  useEffect(()=>{checkLogIn()}, [context.userInfo]);

  return (
    <Router>
      
      <Routes>
      {context.userInfo.phone?<>
        <Route path="/*" exact element={<Chats />} />
        <Route path="/chat/:chatId" exact element={<Chat />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/logOut" exact element={<LogOut />} />
        <Route path="/myProfile" exact element={<MyProfile />} />
        </>
:
<>
        <Route path="/*" exact element={<Login />} />
        <Route path="/SignUp" exact element={<Signup />} />
        
        </>
        
      }
      </Routes>
    </Router>
  );
}

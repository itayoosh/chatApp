import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';


export default function ShowMessages({ chatId }) {
  const socket = useContext(Context).socket;
  const url = "http://localhost:3003/";
  const [messages, setMessages] = useState([]);
  const userInfo = useContext(Context).userInfo;
  const [newMessage, setNewMessage] = useState('');
  const sendMessage = async () => {
    try {
      await axios.post(url + "chats/sendMessage/" + chatId, { text: newMessage }, {
        headers: {
          "Content-Type": 'application/json',
          "x-api-key": Cookies.get("authToken"),
        }
      });
      socket.emit('sendMessage');
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(url + "chats/showChat/" + chatId, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": Cookies.get("authToken"),
        }
      })
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage();
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  
  
useEffect(
  ()=>{
    fetchMessages();
    socket.on('friendEnterred', () => {
      fetchMessages();
    });
    socket.on('newMessage', () => {
    fetchMessages();
  });
  },[]
)

  const chatContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: "80vh"
  };

  const chatMessagesStyle = {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    overflowY: 'auto',
    height: '100%',
    maxHeight: '100%',
  };

  const userMessageStyle = {
    backgroundColor: '#dcf8c6',
    marginBottom: '8px',
    marginLeft: '120px',
    padding: '8px',
    borderRadius: '8px',
    wordWrap: 'break-word',
    position: 'relative',
  };
  
  const friendMessageStyle = {
    backgroundColor: '#ffffff',
    marginBottom: '8px',
    marginRight: '120px',
    padding: '8px',
    borderRadius: '8px',
    wordWrap: 'break-word',
    position: 'relative',
  }
  
  const checkIconStyle = {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    color: '#128C7E',
  };
  const messageSenderStyle = {
    fontWeight: 'bold',
    marginRight: '4px',
  };

  const inputContainerStyle = {
    display: 'flex',
    marginTop: '10px',
    borderTop: '1px solid #ccc', 
    padding: '10px', 
  };

  const inputStyle = {
    flex: '1',
    marginRight: '10px',
    padding: '10px',
    borderRadius: '10px',
  };
  
  const buttonStyle = {
    padding: '10px', 
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: '#128C7E', 
    color: '#fff', 
  };

  return (
    <div style={chatContainerStyle}>

      <div style={chatMessagesStyle}>
        {messages.map((message) => (
          <div
            key={message._id}
            style={message.senderPhone === userInfo.phone ? userMessageStyle : friendMessageStyle}
          >
            <div style={messageSenderStyle}> {message.text}</div>
            {message.senderPhone === userInfo.phone&&message.isWatched && (
            <span style={checkIconStyle}>✓</span>
             )}
          </div>
        ))}
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          style={inputStyle}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

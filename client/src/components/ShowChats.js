import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

export default function ShowChats({ chats }) {
  const navigate = useNavigate();
  const userInfo = useContext(Context).userInfo;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Chats</h2>
      {chats.length > 0 ? (
        <ul style={styles.list}>
          {chats.map((chat, index) => (
            <li
              key={index}
              style={styles.listItem}
              onClick={() => {
                navigate("/chat/" + chat._id);
              }}
            >
              {chat.contactName ? (
                <div style={styles.contact}>{chat.contactName}</div>
              ) : (
                <div style={styles.contact}>{chat.contactPhone}</div>
              )}
              <div style={styles.lastMessage}>
                {chat.lastMessage ? (
                  chat.lastMessage.senderPhone === userInfo.phone ? 'You: ' : ''
                ) : (
                  'No messages'
                )}
                {chat.lastMessage && chat.lastMessage.text}
              </div>
              <hr style={styles.hr} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    color: '#25d366', 
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    
  },
  contact: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#25d366', 
  },
  lastMessage: {
    fontSize: '14px',
    color: '#777',
  },
  hr: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #ddd',
   
  },
};
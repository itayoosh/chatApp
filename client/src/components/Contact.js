import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact({ contact }) {
  const url = "http://localhost:3003/";
  const navigate = useNavigate();

  const createChat = async () => {
    try {
      const { data } = await axios.post(url + "chats/createChat/" + contact.phone, {}, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": Cookies.get("authToken"),
        },
      });
      navigate("../chat/" + data._id);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-name">{contact.name}</div>
      <div className="contact-info">
        <img className="contact-image" src={url + "/" + contact.img_url} alt={contact.name} />
        <span className="contact-phone">{contact.phone}</span>
      </div>
      <button className="btn chat-btn" onClick={createChat}>
        Chat
      </button>

      <style>
        {`
          .contact-card {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
          }

          .contact-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .contact-info {
            display: flex;
            align-items: center;
          }

          .contact-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .contact-phone {
            font-size: 16px;
          }

          .chat-btn {
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .chat-btn:hover {
            background-color: #45a049;
          }
        `}
      </style>
    </div>
  );
}

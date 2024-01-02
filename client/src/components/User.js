import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ContactSavePopup from './ContactSavePopup';
import { Context } from '../context/Context';

export default function User({ user }) {
  const url = "http://localhost:3003";
  let chat = null;
  const navigate = useNavigate();
const context = useContext(Context);
const setUserInfo = context.setUserInfo;
  const [showPopup, setShowPopup] = useState(false);
  const authToken = Cookies.get("authToken");

  const createChat = async () => {
    try {
      const { data } = await axios.post(url + "/chats/createChat/" + user.phone, {}, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": authToken,
        },
      });
      chat = data;
      navigate("../chat/" + chat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveContact = (contactName) => {
    setShowPopup(false);
    postContact(contactName);
  };

  const postContact = async (name) => {
    try {
      const {data} = await axios.put(
        `${url}/users/SaveContact/${user.phone}/${name}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': authToken,
          },
        }
      );
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-item" onClick={() => setShowPopup(true)}>
        <span><img src={url+"/"+user.img_url}></img><div style={{display: "flex", flexDirection:"column"}}>
          <span>{user.contactName? user.contactName:""}</span>
          <span>{user.phone}</span>
          </div>
          </span>
        <button className="btn chat-btn" onClick={createChat}>
          Chat
        </button>
      </div>

      {showPopup && (
        <ContactSavePopup
        phone={user.phone}
          onSave={handleSaveContact}
          onClose={() => setShowPopup(false)}
        />
      )}

      <style>
        {`
          .user-item {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border: 1px solid #ddd;
            margin-bottom: 8px;
            background-color: #fff;
          }
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .user-item:hover {
            background-color: #f5f5f5;
          }

          .chat-btn {
            background-color: #25d366;
            color: #fff;
            padding: 8px 16px;
            border: none;
            cursor: pointer;
          }

          .contact-save-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            text-align: center;
          }

          .contact-save-popup h3 {
            margin-bottom: 10px;
          }

          .contact-save-popup label {
            display: block;
            margin-bottom: 5px;
          }

          .contact-save-popup input {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
          }

          .contact-save-popup button {
            background-color: #007bff;
            color: #fff;
            padding: 8px 16px;
            border: none;
            cursor: pointer;
            margin-right: 5px;
          }

          .contact-save-popup button:last-child {
            background-color: #ccc;
          }
        `}
      </style>
    </>
  );
}

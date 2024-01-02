import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

export default function ShowChatter({ chatId }) {
  const url = "http://localhost:3003/";
  const [friendData, setFriendData] = useState({});

  const getFriendData = async () => {
    try {
      const { data } = await axios.get(url + "chats/friendData/" + chatId, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": Cookies.get("authToken"),
        },
      });
      setFriendData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendData();
  }, [chatId]);

  return (
    <div style={styles.container}>
      <img style={styles.profileImage} src={url + friendData.img_url} alt="Profile" />

      <div style={styles.contactInfo}>
        <div style={styles.contactName}>{friendData.contactName}</div>
        <div style={styles.phone}>{friendData.phone}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  contactName: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "5px",
  },
  phone: {
    fontSize: "14px",
    color: "#888",
  },
};

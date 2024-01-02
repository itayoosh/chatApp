import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import NavBar from './NavBar';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ShowProfile() {
  const userInfo = useContext(Context).userInfo;
  const url = "http://localhost:3003/";
  const [imgUrl, setImgUrl]=useState(userInfo.img_url);

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("myFile", imageFile);
      try {
        const {data} = await axios.post(url + "upload/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": Cookies.get("authToken"),
          },
        });
        setImgUrl(data.data.fileName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      padding: '20px',
      backgroundColor: '#f4f4f4', // Neutral background color
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ddd', // Subtle border
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff', // White background
    },
    phone: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    image: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      margin: '10px 0',
      border: '2px solid #4caf50', // Green border
    },
    uploadButton: {
      background: '#4caf50', // Green background
      color: '#fff', // White text color
      height: '40px',
      padding: '10px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.infoContainer}>
          <img style={styles.image} src={url + imgUrl} alt="Profile" />
          <p style={styles.phone}>Phone: {userInfo.phone}</p>
          <div style={styles.uploadButton}>
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
              📎 Upload Profile Picture
              <input
                id="fileInput"
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}


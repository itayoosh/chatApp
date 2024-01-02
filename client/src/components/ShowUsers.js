import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import User from './User';
import { Context } from '../context/Context';

const url = 'http://localhost:3003/';

const ShowUsers = ({phone}) => {
  const [users, setUsers] = useState([]);
const userInfo = useContext(Context).userInfo;
  const fetchUsers = async () => {
    try {
      const {data} = await axios.get(`${url}users/searchUsers?s=${phone}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cookies.get('authToken'),
        },
      });
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [phone, userInfo.contacts]);

  return (
    <div className="container mt-4">
      <p>click on a user to save as a contact</p>
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <User user={user} />
          </li>
        ))}
      <style>
        {`
          .list-group {
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default ShowUsers;

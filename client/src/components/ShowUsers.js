import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import User from './User';

const url = 'http://localhost:3003/';

const ShowUsers = ({phone}) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${url}users/searchUsers?s=${phone}`, {
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
  }, [phone]);

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

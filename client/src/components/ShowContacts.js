import React, { useContext, useEffect, useState } from 'react';
import Contact from './Contact';
import { Context } from '../context/Context';


const ShowContacts = ({search}) => {
    const userInfo = useContext(Context).userInfo;
    const [searchedContacts, setSearchedContacts] = useState([]);
    const allContacts = userInfo.contacts;
  
  useEffect(() => {
    handleSearch();
  }, [search, userInfo.contacts]);
  const handleSearch = () => {
    const searchRegex = new RegExp(search, 'i');
  
    const contacts = allContacts.filter((contact) => {
      return searchRegex.test(contact.phone) || searchRegex.test(contact.name);
    });
  
    setSearchedContacts(contacts);
  };

  return (
    <div className="container mt-4">

        {searchedContacts.map((contact) => (
          <li key={contact.id} className="list-group-item">
            <Contact contact={contact}/>
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

export default ShowContacts;

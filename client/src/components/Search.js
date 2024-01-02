import React, { useState } from 'react';
import NavBar from './NavBar';
import ShowUsers from './ShowUsers';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ShowContacts from './ShowContacts';

export default function Search() {
  const [search, setSearch] = useState('');
  const [key, setKey]=useState("Users");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2>Search {key}</h2>
        <div className="mb-3">
          <input
            type="text"
            className='form-control'
            placeholder={key=="Users"?'search for users..':'search for contacts..'}          
             value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Users" title="Users">
      <ShowUsers phone={search} />
        
      </Tab>
      <Tab eventKey="Contacts" title="Contacts">
       <ShowContacts search={search}/>
      </Tab>
    </Tabs>
  

      </div>
    </div>
  );
}

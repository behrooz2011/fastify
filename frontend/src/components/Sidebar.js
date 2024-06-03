// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Divider } from '@mui/material';

const Sidebar = ({ emails, onEmailSelect, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style={{ width: 400, borderRight: '1px solid #ccc' }}>
      <TextField
        fullWidth
        placeholder="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginRight: 10}}
      />
      <Divider />
      <div>
        <List>
            {emails && emails.map((email) => (
            <ListItem button key={email.id} onClick={() => onEmailSelect(email)}>
                <ListItemText primary={email.subject} secondary={email.to} />
            </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

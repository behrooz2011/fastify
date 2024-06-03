// components/ComposeEmail.js
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';

const ComposeEmail = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState({ to: '', cc: '', bcc: '', subject: '', body: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
  };

  const handleSave = () => {
    console.log("--saved---");
    onSave(email);
    setOpen(false);
    setEmail({ to: '', cc: '', bcc: '', subject: '', body: '' });
  };

  return (
    <div>
      <Fab 
        color="primary" 
        aria-label="compose" 
        onClick={() => setOpen(true)} 
        style={{ 
          position: 'fixed', 
          bottom: 20, 
          left: 1450, 
          zIndex: 1000,
          padding:3
        }}
      >
        {/* <AddIcon /> */}
        <EditNoteIcon/>
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Compose Email</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="To" name="to" value={email.to} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="CC" name="cc" value={email.cc} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="BCC" name="bcc" value={email.bcc} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Subject" name="subject" value={email.subject} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Body" name="body" value={email.body} onChange={handleChange} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ComposeEmail;

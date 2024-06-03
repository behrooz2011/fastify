// components/EmailView.js
import React from 'react';
import { Typography, Paper } from '@mui/material';

const EmailView = ({ email }) => {
  if (!email) {
    return <Typography variant="h6" style={{ margin: 16 }}>Select an email to view</Typography>;
  }

  return (
    <Paper style={{ margin: 16, padding: 16,  border:"1px solid #ccc"}}>
      <Typography variant="h6">{email.subject}</Typography>
      <Typography variant="subtitle1">To: {email.to}</Typography>
      <Typography variant="subtitle2">CC: {email.cc}</Typography>
      <Typography variant="body1" style={{ marginTop: 16 }}>{email.body}</Typography>
    </Paper>
  );
};

export default EmailView;

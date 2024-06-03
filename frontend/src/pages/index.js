// pages/index.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import EmailView from '../components/EmailView';
import ComposeEmail from '../components/ComposeEmail';
import debounce from 'lodash/debounce';

// const mockEmails = [
//   // Sample data, replace with actual data fetching logic
//   { id: 1, to: 'example@example.com', cc: '', bcc: '', subject: 'Hello World', body: 'This is a test message' },
//   { id: 2, to: 'another@example.com', cc: '', bcc: '', subject: 'Second Email', body: 'This is another test email' },
//   { id: 3, to: 'Bruce@example.com', cc: '', bcc: '', subject: 'Third Email', body: 'This is the third test email' },
//   { id: 4, to: 'Dan@example.com', cc: '', bcc: '', subject: 'Fourth Email', body: 'This is the fourth test email' },
// ];

const Home = () => {
  // const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [originalEmails, setOriginalEmails]= useState([])
  const [emailListDB, setEmailListDB]= useState([])




  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    // setEmailListDB(email)
  };

  const handleSearch = debounce(async (searchText) => {
    //mockEmails
    //emailListDB
    const filteredEmails = originalEmails.filter(email =>
      email.to.includes(searchText) ||
      email.cc.includes(searchText) ||
      email.bcc.includes(searchText) ||
      email.subject.includes(searchText) ||
      email.body.includes(searchText)
    );
    // setEmails(filteredEmails);
    console.log("handleSearch filter:",filteredEmails);
    setEmailListDB(filteredEmails)
  }, 500);

  const handleSaveEmail = (email) => {
    // setEmails((prevEmails) => [...prevEmails, { id: prevEmails.length + 1, ...email }]);
    console.log("Save on db",email);
    const payload = email;
    const endpoint = 'http://localhost:3001/add-lead';
    
    try {
      axios.post(endpoint, payload)
        .then(response => {
          console.log('Response:', response.data);
          setEmailSaved(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error occurred while sending the request:', error);
    }
  };
  const [emailSaved, setEmailSaved] = useState(false);
  useEffect(()=>{
    console.log("--effect--");
    async function fetchData() {
      // Make a call to the backend
      try {
        const response = await axios.get("http://localhost:3001/leads");
        setEmailListDB(response.data.leads)
        setOriginalEmails(response.data.leads)
        console.log('Data fetched successfully:', response.data.leads);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },[emailSaved])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar emails={emailListDB} onEmailSelect={handleEmailSelect} onSearch={handleSearch} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <EmailView email={selectedEmail} />
      </div>
      <ComposeEmail onSave={handleSaveEmail} />
    </div>
  );
};

export default Home;
